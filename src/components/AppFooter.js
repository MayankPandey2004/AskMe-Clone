import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #131d52;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;

`;

const FooterColumn = styled.div`
  flex: 1;
  margin: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;

  h4 {
    margin-bottom: 10px;
    font-weight: 700;
  }

  a {
    color: white;
    text-decoration: none;
    margin: 5px 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function AppFooter() {
  return (
    <FooterContainer>
      <FooterColumn>
        <h4>Quick Links</h4>
        <a href="/recentquestion"><i>Recent Question</i></a>
        <a href="/mostanswered"><i>Most Answered Questions</i></a>
        <a href="/noanswered"><i>Not Answered Questions</i></a>
      </FooterColumn>
      <FooterColumn>
        <h4>Account Links</h4>
        <a href="/profile"><i>Profile</i></a>
        <a href="/question"><i>Asked Questions</i></a>
        <a href="/answer"><i>Answered Questions</i></a>
      </FooterColumn>
      <FooterColumn>
        <h4>Contact Us</h4>
        <a href="/contact"><i>Email</i></a>
        <a href="/support"><i>Support</i></a>
      </FooterColumn>
    </FooterContainer>
  );
}

export default AppFooter;
