// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const NavContainer = styled.nav`
//   font-family: Arial, sans-serif;
//   margin-bottom: 20px;
// `;

// const NavList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   border-bottom: 2px solid #ff6b6b;
// `;

// const NavItem = styled.li`
//   padding: 10px 20px;
//   cursor: pointer;
//   font-weight: ${props => props.active ? 'bold' : 'normal'};
//   background-color: ${props => props.active ? '#ff6b6b' : 'transparent'};
//   color: ${props => props.active ? 'white' : 'black'};

//   &:hover {
//     background-color: ${props => props.active ? '#ff6b6b' : '#ffeded'};
//   }
// `;

// function QuestionNav () {
//   const [activeTab, setActiveTab] = useState('Most Answered');


//   const [tabs,setData]=useState(undefined);
//     const getApidata = async ()=>{
//         const url="http://localhost:8080/home";
//         let result = await fetch (url);
//         result =await result.json();
//         setData(result);
//     }

//     useEffect (()=>{
//         getApidata();
//     },[])
//     console.log(tabs)
// //   const tabs = [
// //     'Recent Questions',
// //     'Most Answered',
// //     'Answers',
// //     'No Answers',
// //     'Most Visited',
// //     'Recent Posts'
// //   ];
//     // let tabs =[];
//     // tabs = data2.qanda_bar
//   return (
//     <NavContainer>
//       <NavList>
//         {tabs.qanda_bar.map((tabu) => (
//           <NavItem
//             key={tabu}
//             active={activeTab === tabu}
//             onClick={() => setActiveTab(tabu)}
//           >
//             {tabu}
//           </NavItem>
//         ))}
//       </NavList>
//     </NavContainer>
//   );
// }

// export default QuestionNav;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { lineSpinner } from 'ldrs';
import useAuth from './hooks/useAuth';

lineSpinner.register();

const NavContainer = styled.nav`
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
  margin-top: 30px;
  margin: 30px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-left: 40px;
  display: flex;
  border-bottom: 2px solid #ff6b6b;

`;

const NavItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  background-color: ${props => props.active ? '#ff6b6b' : 'transparent'};
  color: ${props => props.active ? 'white' : 'black'};

  &:hover {
    background-color: ${props => props.active ? '#ff6b6b' : '#ffeded'};
  }
`;

function QuestionNav() {
  const [activeTab, setActiveTab] = useState('Recent Questions');
  const tabs = ["Recent Questions", "Most Answered", "No Answers"];
  const [isLoading, setIsLoading] = useState(true);
  const [recentquestions, setRecentQuestions] = useState([]);
  const [mostAnsweredquestions, setMostAnsweredQuestions] = useState([]);
  const [noAnsweredquestions, setNoAnsweredQuestions] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = `http://localhost:8080/home?user_id=${auth.user_id}`;
        const response = await fetch(url);
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setRecentQuestions(result.recent_questions);
        setNoAnsweredQuestions(result.no_answered);
        setMostAnsweredQuestions(result.most_answered);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    getApiData();
  }, [auth.user_id]);

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
    <NavContainer>
      <NavList>
        {tabs.map((tab) => (
          <NavItem
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </NavItem>
        ))}
      </NavList>
      <QuestionCard questions={activeTab==="Recent Questions"?recentquestions:activeTab==="Most Answered"?mostAnsweredquestions:noAnsweredquestions}/>
    </NavContainer>
  );
}

export default QuestionNav;