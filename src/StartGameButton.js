// src/StartGameButton.js
import React from "react";
import axios from "axios";

const StartGameButton = ({ onGameStart }) => {
  const startGame = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/game/start", {
        name: "Player1", // You can dynamically set this based on your requirements
      });
      const card = response.data;
      onGameStart(card); // Assuming you pass the card data to the parent component
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  return (
    <button onClick={startGame}>Start Game</button>
  );
};

export default StartGameButton;
