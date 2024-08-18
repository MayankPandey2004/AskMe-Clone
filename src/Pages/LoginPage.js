import React, { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Background from "../assets/LoginBack.png";
import { FcGoogle } from "react-icons/fc";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  padding: 20px;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e55b5b;
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  color: gray;
  font-weight: 500;
  border-color: gray;
  border-width: 0.2px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    scale: 0.9;
    transition: scale 0.3s ease-in-out;
  }
`;

const ErrorMessage = styled.div`
  color: white;
  margin-top: 5px;
`;

const SignUpText = styled.div`
  color: gray;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const PageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SignUpLink = styled.a`
  color: #ff6b6b;

  &:hover {
    color: gray;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin: 0 10px;
  }
`;

const DividerText = styled.span`
  font-size: 14px;
  color: #8a8a8a;
`;

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{7,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function LoginPage() {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data.accessToken;
      const user_id = response?.data?.user_id;
      console.log(user_id);
      setAuth({ user, pwd, user_id, accessToken });
      setUser("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const handleGoogle = async () => {
    window.location.href = "http://localhost:8080/auth/oauth";
  };

  return (
    <Container>
      <PageSection style={{ flex: 1 }}>
        <img
          src={Background}
          alt="login-image"
          style={{ width: "100%", height: "100vh" }}
        />
      </PageSection>
      <PageSection>
        <Form onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h2 style={{ fontSize: 27, color: "#ff6b6b" }}>Login</h2>
          <Input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            placeholder="Username"
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onBlur={() => setUserFocus(true)}
          />
          <ErrorMessage
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </ErrorMessage>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="Password"
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onBlur={() => setPwdFocus(true)}
          />
          <ErrorMessage
            id="pwdnote"
            className={
              pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
            }
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </ErrorMessage>
          <Button disabled={!validName || !validPwd ? true : false}>
            Sign In
          </Button>
          <SignUpText>
            <div></div>
            <br />
            <span className="line">
              <SignUpLink href="/signup">Create an account</SignUpLink>
            </span>
          </SignUpText>
          <Divider>
            <DividerText>Or login with</DividerText>
          </Divider>
          <GoogleButton type="button" onClick={handleGoogle}><FcGoogle style={{marginBottom:2, marginRight:10}}/>Continue with Google</GoogleButton>
        </Form>
      </PageSection>
    </Container>
  );
}

export default LoginPage;
