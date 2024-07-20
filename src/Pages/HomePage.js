import React, { useState, useEffect } from 'react';
import '../App.css';
import Side from '../Side';
import QandABar from '../QandABar';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import '../Modal.css';

const LeftSectionButton = styled.button`
  text-decoration: none;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;

  &:hover {
    color: #333;
    transition: color 0.1s ease-in;
  }
`;

function HomePage() {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = "http://localhost:8080/home";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTabs(result.middel_bar);
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

  const login = () => {
    navigate('/login');
  }

  return (
    <div className="header-container">
      <div className="top-bar-content">
        <div className="top-bar">
          <div className="left-section">
            <LeftSectionButton onClick={() => { login() }}>Login</LeftSectionButton>
            <LeftSectionButton>Add post</LeftSectionButton>
          </div>
          <div className="right-section">
            <div style={{ display: 'flex', alignItems: 'center' }}><AiOutlineSearch /></div>
            <input
              type="text"
              placeholder="Search here ..."
              className='search-input'
              style={{ backgroundColor: 'transparent', color: 'white' }}
            />
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="logo">
          <span style={{ fontSize: '36px' }}>?</span>ASK me
        </div>
        <ul className="nav-list">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className='nav-list-item'
              style={index === 0 ? { backgroundColor: '#ff6b6b', padding: 10, borderRadius: 2 } : { padding: 10, borderRadius: 2 }}
            >
              <a href="/" role="button" className="nav-item">
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="page-title">Add post</div>
      <div className="breadcrumb">Home / Add post</div>
      <div className="thirdbar">
        <QandABar />
        <Side />
      </div>
    </div>
  );
}

export default HomePage;
