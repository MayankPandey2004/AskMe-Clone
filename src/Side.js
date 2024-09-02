import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { lineSpinner } from 'ldrs';

lineSpinner.register()

const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 300px;
  margin: 15px auto;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 0px;
  margin-left: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #131d52;
  font-size: 24px;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const Tag = styled.button`
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
  background-color: #343a40;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 2px;
  border-radius: 5px;

  &:hover {
    background-color: #98c4e3;
    color: #333;
    transition: background-color 0.2s ease-in;
  }
`;

const QuestionHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    color: #ff7f7f;
    transition: color 0.2s ease-in;
  }
`;

const QuestionBody = styled.div`
  font-size: 13px;
  font-weight: 300;
  color: #333;
  margin-bottom: 5px;
`;

const QuestionDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: gray;
`;

const AskButton = styled.button`
  width: 300px;
  padding: 10px;
  margin-left: 50px;
  background-color: #131e56;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #98c4e3;
    color: #333;
    transition: background-color 0.2s ease-in;
  }
`;

function Side() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();

  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState();
  const [recQuestions, setRecQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = `http://localhost:8080/home?user_id=3`;
        const response = await fetch(url);
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setQuestions(result.stat.questions);
        setAnswers(result.stat.answers);
        setUsers(result.stat.users);
        setTags(result?.tags);
        setRecQuestions(result?.recent_questions);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    getApiData();
  }, []);

  const handleTagSearch = (tname) => {
    navigate(`/search`, { state: { tname } });
  };


  if (isLoading) return <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <l-line-spinner
      size="40"
      stroke="3"
      speed="1"
      color="#333"
    ></l-line-spinner>
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AskButton onClick={() => navigate("/askquestion")}>
        Ask A Question
      </AskButton>
      <Container>
        <Section>
          <Title>Stats</Title>
          <hr />
            <StatItem>
              Questions ({questions})
            </StatItem>
            <StatItem>
              Answers ({answers})
            </StatItem>
            <StatItem>
              Users ({users})
            </StatItem>
        </Section>
      </Container>
      <Container>
        <Section>
          <Title>Tags</Title>
          <hr />
          {Array.isArray(tags) && tags.map((tag, index) => (
            <Tag key={index} style={{marginBottom: '5px'}} onClick={()=>handleTagSearch(tag.Tname)}>{tag.Tname}</Tag>
          ))}
        </Section>
      </Container>
      <Container>
        <Section>
          <Title>Recent Questions</Title>
          <hr />
          {Array.isArray(recQuestions) && recQuestions.slice(0,3).map((question, index) => (
            <div key={index}>
              {(index>0) && <hr style={{color:'gray'}}/>}
              <QuestionHeader onClick={()=>{navigate('/addanswer',{ state: { questionId: question.question_id }});window.location.reload();}}>{question.question}</QuestionHeader>
              <QuestionBody>{question.discription}</QuestionBody>
              <QuestionDate>Posted by {question.username} on {new Date(question.date).toLocaleDateString()}</QuestionDate>
            </div>
          ))}
        </Section>
      </Container>
    </div>
  );
}

export default Side;
