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

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ff7f7f;
  background-color: #ffe5e5;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff7f7f;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`;

const ForgetLink = styled.a`
  color: #333;
  text-decoration: none;
  float: right;
  font-size: 12px;
`;

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', username, password);
  };
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
        //setActiveTab(result.qanda_bar[1]); // Set the first tab as active by default
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
          <Title>Login</Title>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <div style={{ position: 'relative' }}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <ForgetLink href="#">Forget</ForgetLink>
            </div>
            <Button type="submit">Log in</Button>
          </form>
        </Section>
      </Container>
    </div>
  );
}

export default SidebarComponent;