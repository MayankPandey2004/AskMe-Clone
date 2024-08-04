import React from 'react';
import './QuestionCard.css';
import styled from "styled-components";
import UserImage from './assets/profilephoto.png';
import { FaThumbsUp } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const AskButton = styled.button`
  width: 30%;
  padding: 10px;
  margin-right: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`

const QuestionButton = styled.div`
  width: 10%;
  margin-right: 10px;
  display: flex;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  height: 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 12px;
`

const QuestionTitle = styled.p`
  &:hover{
    color: #ff6b6b;
    cursor: pointer;
  }
`
const QuestionCard = ({ questions }) => {

  const navigate = useNavigate();
  
  return(
  <>
    {questions.map((question, index) => (
      <div className="question-card" style={{ marginLeft: 40, padding: 30, paddingBottom: 10, flexDirection: 'column' }}>
      <div className="question-content">
        <div style={{ display:'flex', justifyContent:'space-between'}}>
          <div style={{display:'flex'}}>
          <div style={{borderRadius:'50%', height:40, width:40, backgroundColor:'lightgray'}}>
            <img src={UserImage} alt="profile-photo" style={{height:40, width:40}} />
          </div>
          <p style={{ fontSize: 18, fontWeight: '400', marginTop: 5, marginLeft:5 }}>{question.username}</p>
          </div>
          <QuestionButton><AiFillQuestionCircle style={{marginRight:2}}/>Question</QuestionButton>
        </div>
        <QuestionTitle style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }} onClick={()=>navigate('/addanswer',{ state: { questionId: question.question_id }})}>{question.question}</QuestionTitle>
        <p style={{ fontSize: 16 }}>{question.discription}</p>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <AskButton>Add Answer to the Question</AskButton>
        <div style={{ display: 'flex', marginTop: 8, marginRight: 10 }}>
          <FaThumbsUp style={{ marginRight: 5, marginTop: 3 }} color="gray" />
          <p style={{ color: 'gray', fontSize: 16 }}>{question.like}</p>
        </div>
      </div>
    </div>
    ))}
  </>
  )
};

export default QuestionCard;
