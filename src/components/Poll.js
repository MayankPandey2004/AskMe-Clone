import React, { useState } from "react";

const Poll = ( {question} ) => {

  const [options, setOptions] = useState([
    { id: 1, text: "Option 1", votes: 0 },
    { id: 2, text: "Option 2", votes: 0 },
    { id: 3, text: "Option 3", votes: 0 },
  ]);

  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption === null) return;
    const updatedOptions = options.map((option) =>
      option.id === selectedOption ? { ...option, votes: option.votes + 1 } : option
    );
    setOptions(updatedOptions);
    setVoted(true);
  };

  const getTotalVotes = () => {
    return options.reduce((acc, option) => acc + option.votes, 0);
  };

  return (
    <div style={styles.pollContainer}>
      <h2 style={styles.heading}>{question}</h2>

      {!voted ? (
        <>
          <div style={styles.optionContainer}>
            {options.map((option) => (
              <div key={option.id} style={styles.option}>
                <label>
                  <input
                    type="radio"
                    name="poll"
                    value={option.id}
                    onChange={() => setSelectedOption(option.id)}
                    style={styles.radioInput}
                  />
                  <span style={styles.optionText}>{option.text}</span>
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleVote} style={styles.voteButton} disabled={selectedOption === null}>
            Vote
          </button>
        </>
      ) : (
        <div>
          {options.map((option) => (
            <div key={option.id} style={styles.resultBarContainer}>
              <span style={styles.resultText}>{option.text}</span>
              <div style={styles.resultBarWrapper}>
                <div
                  style={{
                    ...styles.resultBar,
                    width: `${(option.votes / getTotalVotes()) * 100}%`,
                  }}
                />
                <span style={styles.percentageText}>
                  {((option.votes / getTotalVotes()) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  pollContainer: {
    marginTop: "10px",
    width: "100%",
  },
  heading: {
    color: "#131d52",
    marginBottom: "20px",
    fontSize: 18,
    fontWeight: "600",
  },
  optionContainer: {
    marginBottom: "20px",
  },
  option: {
    marginBottom: "10px",
  },
  optionText: {
    fontSize: "16px",
    color: "#131d52",
    marginLeft: "8px",
  },
  radioInput: {
    marginRight: "10px",
  },
  voteButton: {
    display: "block",
    width: "50%",
    padding: "10px",
    backgroundColor: "#131d52",
    color: "#fff",
    border: "none",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  resultHeading: {
    color: "#131d52",
    textAlign: "center",
  },
  resultBarContainer: {
  },
  resultText: {
    color: "#131d52",
    fontWeight: "bold",
  },
  resultBarWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px",
  },
  resultBar: {
    height: "12px",
    backgroundColor: "#131d52",
    borderRadius: "5px",
    transition: "width 0.5s",
    flex: 1,
  },
  percentageText: {
    fontSize: "14px",
    color: "#131d52",
  },
};

export default Poll;
