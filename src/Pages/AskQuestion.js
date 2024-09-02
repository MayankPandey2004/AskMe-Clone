import React, { useState } from "react";
import MainNav from "../components/MainNav";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import Side from "../Side";
import { FaCheck } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 900px;
  background-color: white;
  color: #333;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 50px auto;
  margin-top: 30px;
`;

const CardTitle = styled.div`
  display: flex;
  padding: 10px;
  color: #131d52;
  font-size: 22px;
  font-weight: 500;
  justify-content: flex-start;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  margin: 10px 0;
  border: 0.5px solid #ddd;
  border-radius: 4px;
  color: #131d52;

  &:focus {
    border-color: #131d52;
    transition: border-color 0.2s ease-in-out;
  }
`;

const Label = styled.label`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
  align-items: center;
  font-size: 14px;
  font-weight: 450;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  margin: 10px 0;
  border: 0.5px solid #ddd;
  border-radius: 4px;
  color: #131d52;

  &:focus {
    border-color: #131d52;
    transition: border-color 0.2s ease-in-out;
  }
`;

const CustomCheckbox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  margin: 10px 0;
  border: 0.5px solid #ddd;
  border-radius: 4px;
  color: #131d52;

  &:focus {
    border-color: #131d52;
    transition: border-color 0.2s ease-in-out;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.03);
  margin: 10px 0;
  border: 0.5px solid #ddd;
  border-radius: 4px;
  color: #131d52;
  outline: none;
  resize: none;
  &:focus {
    border-color: #131d52;
    transition: border-color 0.2s ease-in-out;
  }
`;

const AskButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  margin-right: 10px;
  background-color: #131d52;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`;

function AskQuestion() {
  const [isSelected, setIsSelected] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { auth } = useAuth();
  return (
    <div style={{backgroundColor:'#fff'}}>
      <TopBar
        isLoggedIn={true}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        loginAreaHeight="0px"
        profile={() => {}}
        login={() => {}}
        navigate={() => {}}
        Logout={() => {}}
        username={auth.username}
      />
      <MainNav />
      <div style={{ display: "flex" }}>
        <div style={{marginLeft:'50px'}}>
          <CardContainer>
            <CardTitle>Ask Question</CardTitle>
            <hr style={{ marginTop: 0, color: "gray" }} />
            <form>
              <div style={{ display: "flex" }}>
                <Label htmlFor="title" style={{ marginBottom: 30 }}>
                  Question Title{" "}
                  <span style={{ color: "red", marginLeft: 2 }}>*</span>
                </Label>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 5 }}
                >
                  <Input type="text" id="title" />
                  <p style={{ fontSize: 11 }}>
                    Please choose an appropriate title for the question to
                    answer it even easier .
                  </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Label htmlFor="title" style={{ marginBottom: 30 }}>
                  Category{" "}
                  <span style={{ color: "red", marginLeft: 2 }}>*</span>
                </Label>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 5 }}
                >
                  <Select defaultValue={"Select a Category"}>
                    <option value="Select a Category">Select a Category</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Company">Company</option>
                    <option value="Language">Language</option>
                    <option value="Management">Management</option>
                    <option value="Programmers">Programmers</option>
                  </Select>
                  <p style={{ fontSize: 11 }}>
                    Please choose the appropriate category so others can easily
                    search your question.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Label htmlFor="title" style={{ marginBottom: 30 }}>
                  Tags
                </Label>
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 5 }}
                >
                  <Input type="text" id="title" />
                  <p style={{ fontSize: 11 }}>
                    Please choose suitable Keywords Ex :{" "}
                    <span style={{ color: "#BCBEBF" }}>question , poll</span> .
                  </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Label htmlFor="title">Poll</Label>
                <div style={{ display: "flex", flex: 5 }}>
                  <CustomCheckbox onClick={() => setIsSelected(!isSelected)}>
                    {isSelected && <FaCheck />}
                  </CustomCheckbox>
                  <p style={{ fontSize: 12, marginTop: 15, marginLeft: 10 }}>
                    This question is a poll ?{" "}
                    <span style={{ color: "#BCBEBF" }}>
                      If you want to be doing a poll click here
                    </span>
                  </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Label htmlFor="title">
                  Details <span style={{ color: "red", marginLeft: 2 }}>*</span>
                </Label>
                <div style={{ display: "flex", flex: 5 }}>
                  <Textarea />
                </div>
              </div>
            </form>
            <AskButton>Publish Your Question</AskButton>
          </CardContainer>
        </div>
        <div style={{ marginRight: 50 }}>
          <Side />
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
