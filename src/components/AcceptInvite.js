import React, { useEffect, useState } from "react";
import { fetchDataFromAPI, postDataToAPI } from "../shared/Shared";
import { Col, Container, Row } from "react-grid-system";

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
import { useNavigate } from "react-router-dom";

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

function AcceptInvite() {
  const [inviteCode, setInviteCode] = useState("");
  const [deck, setDeck] = useState();
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerOneGender, setPlayerOneGender] = useState("");
  const [playerOneAvator, setPlayerOneAvator] = useState("");
  const [enableProfileSetup, setEnableProfileSetup] = useState(false);

  const [selectedGender, setSelectedGender] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handlegenderSelectedChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handlePlayer1NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const validate = () => {
    if (!selectedGender) {
      setErrorMessage("Select your gender");
      return false;
    }
    if (!player2Name) {
      setErrorMessage("Input your name");
      return false;
    }
    if (!selectedAvatar) {
      setErrorMessage("Select your avator");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const getInviteCodeFromURL = () => {
      const currentPageURL = window.location.href;
      const queryParams = currentPageURL.split("?")[1];

      if (queryParams) {
        const paramsArray = queryParams.split("&");
        for (const param of paramsArray) {
          const [key, value] = param.split("=");
          if (key === "inv") {
            return value;
          }
        }
      }
    };
    //scan code and set it to state
    setInviteCode(getInviteCodeFromURL());
  }, []);

  useEffect(() => {
    const checkInvite = async () => {
      const formData = new FormData();
      formData.append("inv", inviteCode);
      try {
        const response = await postDataToAPI("/check_invite.php", formData);
        if (response.details_) {
          setPlayerOneName(response.details_.profile.Name);
          setPlayerOneGender(response.details_.profile.Gender);
          setPlayerOneAvator(response.details_.profile.Avatar);
        } else {
          console.log("Invalid response format or missing profile data");
        }
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    };

    if (inviteCode) {
      checkInvite();
    }
  }, [inviteCode]);

  const handleStartPlay = () => {
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const playerTwoData = {
      profile: {
        Name: player2Name,
        Gender: selectedGender,
        Avatar: selectedAvatar,
      },
    };
    if (playerTwoData && inviteCode) {
      const formData = new FormData();
      formData.append("prof", JSON.stringify(playerTwoData));
      formData.append("inv", inviteCode);

      const completeAcceptInvite = async () => {
        try {
          const response = await postDataToAPI("/accept_invite.php", formData);
          console.log("resReturned.....", response);
          //redirect user to playground
          if (response === "1") {
            navigate("/PlayGround", {
              state: {
                selectedGameMode: "online",
                uid: deck,
                playerOneGender: playerOneGender,
                playerOneName: playerOneName,
                playerOneAvator: playerOneAvator,
                playerTwoGender: selectedGender,
                playerTwoName: player2Name,
                playerTwoAvator: selectedAvatar,
              },
            });
          }
        } catch (error) {
          console.log("error", error);
          // Handle error
        }
      };

      completeAcceptInvite();
    }
  };

  const acceptInvite = () => {
    setEnableProfileSetup(true);
  };

  const avatorStyle = {
    width: 50,
  };
  return (
    <div>
      <p>Accept Invite</p>
      <Container>
        <Row>
          <Col sm={12}>
            <h4>{playerOneName} has invited you to play Ntarasi</h4>
            {!enableProfileSetup && (
              <div>
                <button onClick={() => acceptInvite()}>Accept</button>
                <button>Reject</button>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {enableProfileSetup && (
              <Row>
                <Col sm={12}>
                  <h4>Player 2</h4>
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
                      value={player2Name}
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

export default AcceptInvite;
