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

const NavContainer = styled.nav`
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
  margin-top: 30px;
  margin: 30px;

`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
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
  const [activeTab, setActiveTab] = useState('');
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
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
        setTabs(result.qanda_bar);
        setQuestions(result.questions);
        setActiveTab(result.qanda_bar[1]); // Set the first tab as active by default
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
      <QuestionCard questions={questions}/>
    </NavContainer>
  );
}

export default QuestionNav;