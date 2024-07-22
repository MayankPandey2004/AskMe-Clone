import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questions }) => (
  <>
    {questions.map((question, index) => (
      <div className="question-card">
        <div className="user-avatar">
          {/* Add user avatar image here */}
        </div>
        <div className="question-content">
          <div key={index}>
            <h2>{question.question}</h2>
            <p>{question.discription}</p>
            <div className="question-meta">
              {/* {question.type === 'question' && <span className="status">in progress</span>}
            <span className="stars">{tags.stars}</span>
            <span className="category">{tags.category}</span>
            <span className="duration">{tags.duration}</span>
            <span className="answers">{stats.answers} Answers</span>
            <span className="views">{stats.views} views</span>
            <span className="explainer">Explainer</span> */}
            </div>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="question-type">
            {questions[0].type === 'question' ? (
              <button className="question-button">Question</button>
            ) : (
              <button className="poll-button">Poll</button>
            )}
          </div>
        )}
        <button className="report-button">Report</button>
      </div>
    ))}
  </>
);

export default QuestionCard;
