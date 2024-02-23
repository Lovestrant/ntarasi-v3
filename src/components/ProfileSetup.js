import React, { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// Import avatar images
import m1 from "../assets/graphics/m1.png";
import m2 from "../assets/graphics/m2.png";
import m3 from "../assets/graphics/m3.png";
import m4 from "../assets/graphics/m4.png";
import m5 from "../assets/graphics/m5.png";
import m6 from "../assets/graphics/m6.png";
import m7 from "../assets/graphics/m7.png";
import m8 from "../assets/graphics/m8.png";
import m9 from "../assets/graphics/m9.png";
import m10 from "../assets/graphics/m10.png";
import m11 from "../assets/graphics/m11.png";
import m12 from "../assets/graphics/m12.png";
import m13 from "../assets/graphics/m13.png";
import m14 from "../assets/graphics/m14.png";
import m15 from "../assets/graphics/m15.png";

import w1 from "../assets/graphics/w1.png";
import w2 from "../assets/graphics/w2.png";
import w3 from "../assets/graphics/w3.png";
import w4 from "../assets/graphics/w4.png";
import w5 from "../assets/graphics/w5.png";
import w6 from "../assets/graphics/w6.png";
import w7 from "../assets/graphics/w7.png";
import w8 from "../assets/graphics/w8.png";
import w9 from "../assets/graphics/w9.png";
import w10 from "../assets/graphics/w10.png";
import w11 from "../assets/graphics/w11.png";
import w12 from "../assets/graphics/w12.png";
import w13 from "../assets/graphics/w13.png";
import w14 from "../assets/graphics/w14.png";
import w15 from "../assets/graphics/w15.png";

// Store the imported image paths in an array
const maleAvatars = [
  m1,
  m2,
  m3,
  m4,
  m5,
  m6,
  m7,
  m8,
  m9,
  m10,
  m11,
  m12,
  m13,
  m14,
  m15,
];
const femaleAvatars = [
  w1,
  w2,
  w3,
  w4,
  w5,
  w6,
  w7,
  w8,
  w9,
  w10,
  w11,
  w12,
  w13,
  w14,
  w15,
];
const allAvators = [...maleAvatars, ...femaleAvatars];

function ProfileSetup() {
  const location = useLocation();
  const { selectedGameMode } = location.state;
  const { uid } = location.state;

  const [selectedGender, setSelectedGender] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const [selectedPlayer2Gender, setSelectedPlayer2Gender] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [selectedPlayer2Avatar, setSelectedPlayer2Avatar] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlegenderSelectedChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handlePlayer2GenderSelectedChange = (event) => {
    setSelectedPlayer2Gender(event.target.value);
  };
  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };
  const handlePlayer2AvatarSelect = (avatar) => {
    setSelectedPlayer2Avatar(avatar);
  };

  const validateProfiles = (mode) => {
    if (mode === "online") {
    }
    if (mode === "offline") {
      if (!selectedGender) {
        setErrorMessage("Select Player 1's gender");
        return false;
      }
      if (!player1Name) {
        setErrorMessage("Input player 1's name");
        return false;
      }
      if (!selectedAvatar) {
        setErrorMessage("Select player 1 avator");
        return false;
      }
      if (!selectedPlayer2Gender) {
        setErrorMessage("Select Player 2's gender");
        return false;
      }
      if (!player2Name) {
        setErrorMessage("Input player 2's name");
        return false;
      }
      if (!selectedPlayer2Avatar) {
        setErrorMessage("Select player 2 avator");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const navigate = useNavigate();

  const handleStartPlay = () => {
    const valid = validateProfiles(selectedGameMode);
    if (valid) {
      if (selectedGameMode === "online") {
      } else {
        let playerOneData = [selectedGender, player1Name, selectedAvatar];
        let playerTwoData = {
          selectedPlayer2Gender,
          player2Name,
          selectedPlayer2Avatar,
        };
        navigate("/PlayGround", {
          state: {
            selectedGameMode: selectedGameMode,
            uid: uid,
            playerOneGender: selectedGender,
            playerOneName: player1Name,
            playerOneAvator: selectedAvatar,
            playerTwoGender: selectedPlayer2Gender,
            playerTwoName: player2Name,
            playerTwoAvator: selectedPlayer2Avatar,
          },
        });
      }
    }
  };

  const avatorStyle = {
    width: 50,
  };
  return (
    <div>
      <Container>
        <h3>Set Your Profile</h3>
        <Row>
          <Col sm={12}>
            {selectedGameMode === "offline" && (
              <div>
                <Row>
                  <Col sm={6}>
                    <h4>Player 1</h4>
                    <select
                      value={selectedGender}
                      onChange={handlegenderSelectedChange}
                    >
                      <option value="">Select an option...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <br></br>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={player1Name}
                        onChange={handlePlayer1NameChange}
                      />
                    </label>
                    <br></br>
                    <h2>Avatar Selector</h2>
                    <div className="avatar-grid">
                      {selectedGender === "Male" &&
                        maleAvatars.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedAvatar === avatar ? "selected" : ""
                            }
                            onClick={() => handleAvatarSelect(avatar)}
                          />
                        ))}
                      {selectedGender === "Female" &&
                        femaleAvatars.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedAvatar === avatar ? "selected" : ""
                            }
                            onClick={() => handleAvatarSelect(avatar)}
                          />
                        ))}

                      {selectedGender === "" &&
                        allAvators.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedAvatar === avatar ? "selected" : ""
                            }
                            onClick={() => handleAvatarSelect(avatar)}
                          />
                        ))}
                      {selectedGender === "Other" &&
                        allAvators.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedAvatar === avatar ? "selected" : ""
                            }
                            onClick={() => handleAvatarSelect(avatar)}
                          />
                        ))}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <h4>Player 2</h4>
                    <select
                      value={selectedPlayer2Gender}
                      onChange={handlePlayer2GenderSelectedChange}
                    >
                      <option value="">Select an option...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <br></br>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={player2Name}
                        onChange={handlePlayer2NameChange}
                      />
                    </label>
                    <br></br>
                    <h2>Avatar Selector</h2>
                    <div className="avatar-grid">
                      {selectedPlayer2Gender === "Male" &&
                        maleAvatars.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedPlayer2Avatar === avatar ? "selected" : ""
                            }
                            onClick={() => handlePlayer2AvatarSelect(avatar)}
                          />
                        ))}
                      {selectedPlayer2Gender === "Female" &&
                        femaleAvatars.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedPlayer2Avatar === avatar ? "selected" : ""
                            }
                            onClick={() => handlePlayer2AvatarSelect(avatar)}
                          />
                        ))}

                      {selectedPlayer2Gender === "" &&
                        allAvators.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedPlayer2Avatar === avatar ? "selected" : ""
                            }
                            onClick={() => handlePlayer2AvatarSelect(avatar)}
                          />
                        ))}
                      {selectedPlayer2Gender === "Other" &&
                        allAvators.map((avatar, index) => (
                          <img
                            style={avatorStyle}
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={
                              selectedPlayer2Avatar === avatar ? "selected" : ""
                            }
                            onClick={() => handlePlayer2AvatarSelect(avatar)}
                          />
                        ))}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <h4 style={{ color: "red" }}>{errorMessage}</h4>
                    <h4 style={{ color: "green" }}>{successMessage}</h4>
                    <button
                      style={{
                        height: 60,
                        marginTop: 20,
                        backgroundColor: "rgb(81,180,8)",
                      }}
                      onClick={() => handleStartPlay()}
                    >
                      Start GamePlay
                    </button>
                  </Col>
                </Row>
              </div>
            )}
            {selectedGameMode === "online" && (
              <Row>
                <Col sm={12}>
                  <h4>Player 1</h4>
                  <select
                    value={selectedGender}
                    onChange={handlegenderSelectedChange}
                  >
                    <option value="">Select an option...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <br></br>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={player1Name}
                      onChange={handlePlayer1NameChange}
                    />
                  </label>
                  <br></br>
                  <h2>Avatar Selector</h2>
                  <div className="avatar-grid">
                    {selectedGender === "Male" &&
                      maleAvatars.map((avatar, index) => (
                        <img
                          style={avatorStyle}
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={
                            selectedAvatar === avatar ? "selected" : ""
                          }
                          onClick={() => handleAvatarSelect(avatar)}
                        />
                      ))}
                    {selectedGender === "Female" &&
                      femaleAvatars.map((avatar, index) => (
                        <img
                          style={avatorStyle}
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={
                            selectedAvatar === avatar ? "selected" : ""
                          }
                          onClick={() => handleAvatarSelect(avatar)}
                        />
                      ))}

                    {selectedGender === "" &&
                      allAvators.map((avatar, index) => (
                        <img
                          style={avatorStyle}
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={
                            selectedAvatar === avatar ? "selected" : ""
                          }
                          onClick={() => handleAvatarSelect(avatar)}
                        />
                      ))}
                    {selectedGender === "Other" &&
                      allAvators.map((avatar, index) => (
                        <img
                          style={avatorStyle}
                          key={index}
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={
                            selectedAvatar === avatar ? "selected" : ""
                          }
                          onClick={() => handleAvatarSelect(avatar)}
                        />
                      ))}
                  </div>
                </Col>
                <Row>
                  <Col sm={12}>
                    <h4 style={{ color: "red" }}>{errorMessage}</h4>
                    <h4 style={{ color: "green" }}>{successMessage}</h4>
                    <button
                      style={{
                        height: 60,
                        marginTop: 20,
                        backgroundColor: "rgb(81,180,8)",
                      }}
                      onClick={() => handleStartPlay()}
                    >
                      Start GamePlay
                    </button>
                  </Col>
                </Row>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileSetup;
