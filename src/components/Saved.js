import React, { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoMdBookmark } from "react-icons/io";

function SaveButton({ question }) {
  const [save, setSave] = useState(question.voted === 'save');
  const [unsave, setUnsave] = useState(question.voted === 'unsave');
  const [saves, setSaves] = useState(question.no_save);
  const [unsaves, setUnsaves] = useState(question.no_unsave);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSave(question.voted === 'save');
    setUnsave(question.voted === 'unsave');
  }, [question]);

  const handleVote = async (question_id, vote_type) => {
    if (!auth){
      navigate('/login');
    }
    try {
      const response = await fetch(`http://localhost:8080/question_save?user_id=${auth.user_id}&question_id=${question_id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (vote_type === 'save') {
        if (save) {
          setSave(false);
          setSaves(saves - 1);
        } else {
          setSave(true);
          setUnsave(false);
          setSaves(saves + 1);
          if (unsave) setUnsaves(unsaves - 1);
        }
      } else if (vote_type === 'unsave') {
        if (unsave) {
          setUnsave(false);
          setUnsaves(unsaves - 1);
        } else {
          setUnsave(true);
          setSave(false);
          setUnsaves(unsaves + 1);
          if (save) setSaves(saves - 1);
        }
      }

      console.log("Vote registered successfully");
    } catch (e) {
      console.error("An error occurred while voting: ", e);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <IoMdBookmark
        style={{ marginRight: 5, marginTop: 3, cursor: "pointer" }}
        color={save ? "#98c4e3" : "gray"}
        size={18}
        onClick={() => handleVote(question.question_id, 'save')}
      />
      <p style={{ color: "gray", fontSize: 16 }}>
        {saves}
      </p>
    </div>
  );
}

export default SaveButton;
