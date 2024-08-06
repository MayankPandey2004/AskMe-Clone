import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

function QuestionLikeButton({ question }) {
  const [likedAnswers, setLikedAnswers] = useState([]);
  const { auth } = useAuth();
  const [color, setColor] = useState(question.voted!=='none'?"#6AC3F0" : "gray");
  const handleLike = async (question_id) => {
    try {
      const response = await fetch(`http://localhost:8080/vote?user_id=${auth.user_id}&question_id=${question_id}&vote_type=like`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setLikedAnswers((prevLikedAnswers) =>
        prevLikedAnswers.includes(question_id)
          ? prevLikedAnswers.filter((id) => id !== question_id)
          : [...prevLikedAnswers, question_id]
      );

      setColor(color==="gray"?"#6AC3F0":"gray")
      console.log("Vote registered successfully");
    } catch (e) {
      console.error("An error occurred while voting: ", e);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <FaThumbsUp
        style={{ marginRight: 5, marginTop: 3, cursor: "pointer" }}
        color= {color}
        onClick={() => handleLike(question.question_id)}
      />
      <p style={{ color: "gray", fontSize: 16 }}>
        {likedAnswers.includes(question.question_id)
          ? question.voted!=='none'?question.no_likes - 1: question.no_likes + 1
          : question.no_likes}
      </p>
      <FaThumbsDown
        style={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 5,
          cursor: "pointer",
        }}
        color="gray"
      />
      <p style={{ color: "gray", fontSize: 16 }}>{question.no_dislikes}</p>
    </div>
  );
}

export default QuestionLikeButton;
