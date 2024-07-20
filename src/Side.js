import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 250px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #ff7f7f;
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

// const Icon = styled.span`
//   background-color: #333;
//   color: white;
//   width: 24px;
//   height: 24px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 10px;
// `;

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
    background-color: #ff7f7f;
    transition: background-color 0.2s ease-in;
  }
`

const QuestionHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover{
    color: #ff7f7f;
    transition: color 0.2s ease-in;
  }
`

const QuestionBody = styled.div`
  font-size: 13px;
  font-weight: 300;
  color: #333;
  margin-bottom: 5px;
`

const QuestionDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: gray;
`

const AskButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff7f7f;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 30px;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`

function SidebarComponent() {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = "http://localhost:8080/home";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTabs(result.stats);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    getApiData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{display:'flex',flexDirection:'column',marginRight:30}}>
      <AskButton> 
        Ask A Question
      </AskButton>
      <Container>
        <Section>
          <Title>Stats</Title>
          <hr />
          {tabs.map((tab) => (
            <StatItem
            >
              {tab.name} ({tab.count})
            </StatItem>
          ))}
          {/* <StatItem><Icon>?</Icon> Questions ( 00 )</StatItem>
           <StatItem><Icon>💬</Icon> Answers ( 00 )</StatItem>
           <StatItem><Icon>*</Icon> Best Answers ( 00 )</StatItem>
           <StatItem><Icon>👤</Icon> Users ( 00 )</StatItem> */}
        </Section>
      </Container>
      <Container>
        <Section>
          <Title>Tags</Title>
          <hr />
          <Tag>Analytic</Tag>
          <Tag>British</Tag>
          <Tag>Company</Tag>
        </Section>
      </Container>
      <Container>
        <Section>
          <Title>Recent Questions</Title>
          <hr />
          <QuestionHeader>Do I need to have a undergrad percentage of 70%</QuestionHeader>
          <QuestionBody>Participate in the referendum, Please...</QuestionBody>
          <QuestionDate>November 19, 2023</QuestionDate>
        </Section>
      </Container>
    </div>
  );
}

export default SidebarComponent;