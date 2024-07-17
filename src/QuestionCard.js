import React from 'react';
import './QuestionCard.css';


const QuestionCard = ({ question, description, tags, stats, type }) => (
  <div className="question-card">
    <div className="user-avatar">
      {/* Add user avatar image here */}
    </div>
    <div className="question-content">
      <h2>{question}</h2>
      <p>{description}</p>
      <div className="question-meta">
        {type === 'question' && <span className="status">in progress</span>}
        <span className="stars">{tags.stars}</span>
        <span className="category">{tags.category}</span>
        <span className="duration">{tags.duration}</span>
        <span className="answers">{stats.answers} Answers</span>
        <span className="views">{stats.views} views</span>
        <span className="explainer">Explainer</span>
      </div>
    </div>
    <div className="question-type">
      {type === 'question' ? (
        <button className="question-button">Question</button>
      ) : (
        <button className="poll-button">Poll</button>
      )}
    </div>
    <button className="report-button">Report</button>
  </div>
);

const App = () => (
  <div>
    <QuestionCard
      question="How do I make the most out of a MS in Business Analytics?"
      description="I will be studying full-time for a 1-year MS in Business Analytics. What advise would you give to a person in this situation so that he can make the most out of his time out from work and get the ..."
      tags={{ stars: 42, category: 'Analytics', duration: '12 months' }}
      stats={{ answers: 2, views: 34615 }}
      type="question"
    />
    <QuestionCard
      question="Do I need to have a undergrad percentage of 70% to do my masters in Germany?"
      description="Participate in the referendum, Please."
      tags={{ stars: 25, category: 'Language', duration: '7 months' }}
      stats={{ answers: 0, views: 14909 }}
      type="poll"
    />
  </div>
);

export default App;