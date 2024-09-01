import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../api/Axios";
import { FaInfoCircle } from "react-icons/fa";
import "../App.css";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const ErrorMessage = styled.div`
  color: white;
  margin-top: 5px;
`;

const SignInText = styled.div`
  color: gray;
  font-size: 15;
  font-weight: 300;
  margin-top: 10px;
`;

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "/signup";

function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { setAuth } = useAuth();
  const fromLogin = location.state?.fromLogin || false; 

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = `http://localhost:8080/auth/data`;
        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const accessToken = data.accessToken;
        const user_id = data?.user_id || false;
        const user = data.user_name;
        const pwd = data.password;
        setAuth({ user, pwd, user_id, accessToken });
        setUser("");
        setPwd("");
        console.log(user_id);
        if (user_id && !fromLogin) { // Check if not from the login page
          navigate("/");
        }
      } catch (e) {
        console.error("An error occurred while fetching the data: ", e);
      }
    };

    getApiData();
  }, [setAuth, fromLogin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          username: user,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
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

  return (
    <>
      {success ? (
        <Container>
          <Form>
            <h1 style={{ fontSize: 35, color: "#ff6b6b" }}>Success!</h1>
            <SignInText>
              <a href="/login">Sign In</a>
            </SignInText>
          </Form>
        </Container>
      ) : (
        <Container>
          <Form onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h2 style={{ fontSize: 27, color: "#ff6b6b" }}>Sign Up</h2>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
            />
            <ErrorMessage
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              6 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </ErrorMessage>

            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
            />
            <ErrorMessage
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FaInfoCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </ErrorMessage>

            <Input
              type="password"
              id="confirm_pwd"
              placeholder="Confirm Password"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
            />
            <ErrorMessage
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle />
              Must match the first password input field.
            </ErrorMessage>

            <Button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </Button>
            <SignInText>
              Already registered?
              <br />
              <span className="line">
                <a href="/login">Sign In</a>
              </span>
            </SignInText>
          </Form>
        </Container>
      )}
    </>
  );
}

export default SignUpPage;
