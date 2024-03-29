import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataFromAPI, postDataToAPI } from "../shared/Shared";
import NtarasiIcon from "../assets/graphics/Untitled-1.png";
import {
  endLevel10Gifts,
  endLevel11Gifts,
  endLevel12Gifts,
  endLevel13Gifts,
  endLevel14Gifts,
  endLevel15Gifts,
  endLevel1Gifts,
  endLevel2Gifts,
  endLevel3Gifts,
  endLevel4Gifts,
  endLevel5Gifts,
  endLevel6Gifts,
  endLevel7Gifts,
  endLevel8Gifts,
  endLevel9Gifts,
} from "../shared/GiftsList";

import b2 from "../assets/backgrounds/b2.jpg";
import b3 from "../assets/backgrounds/b3.jpg";
import b4 from "../assets/backgrounds/b4.jpg";
import b5 from "../assets/backgrounds/b5.jpg";
import b6 from "../assets/backgrounds/b6.jpg";
import b7 from "../assets/backgrounds/b7.jpg";
import b8 from "../assets/backgrounds/b8.jpg";
import b9 from "../assets/backgrounds/b9.jpg";
import b10 from "../assets/backgrounds/b10.jpg";
import b11 from "../assets/backgrounds/b11.jpg";
import b12 from "../assets/backgrounds/b12.jpg";
import b13 from "../assets/backgrounds/b13.jpg";
import b14 from "../assets/backgrounds/b14.jpg";
import b15 from "../assets/backgrounds/b15.jpg";
import defaultPic from "../assets/backgrounds/default.jpg";
import {
  initializeReactGA,
  startTimer,
  trackTimeSpent,
} from "../shared/analyticsUtils";

function PlayGround() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedGameMode,
    inviteCode,
    playerNumber,
    playerTwoAvator,
    playerTwoName,
    playerTwoGender,
    playerOneAvator,
    playerOneName,
    playerOneGender,
    uid,
  } = location.state;

  const [cards, setCards] = useState([]);
  const [viewedCards, setViewedCards] = useState(() => {
    const storedViewedCards = localStorage.getItem("viewedCards");
    return storedViewedCards ? JSON.parse(storedViewedCards) : [];
  });
  const [cardsCount, setCardsCount] = useState(1);
  const [questionid, setQuestionid] = useState([]);
  const [turn, setTurn] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [myTurn, setMyTurn] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [messageFeedback, setMessageFeedback] = useState([]);
  const [currentMessageNumber, setCurrentMessageNumber] = useState();
  const [gameLevel, setGameLevel] = useState(1);
  const [gifts, setGifts] = useState(() => {
    const storedGifts = localStorage.getItem("gifts");
    return storedGifts ? JSON.parse(storedGifts) : [];
  });
  const [backgroundPhoto, setBackgroundPhoto] = useState(defaultPic);
  const chatContainerRef = useRef(null);

  //Send To Google Analytics
  useEffect(() => {
    initializeReactGA();
    startTimer();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        trackTimeSpent();
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      trackTimeSpent(); // Track time when component unmounts
    };
  }, []);

  //Increment game Category as required and assign Gifts
  useEffect(() => {
    if (!viewedCards.length) {
      return;
    }

    if (viewedCards.length === 8) {
      setGameLevel(2);
      setBackgroundPhoto(b2);
      setGifts((gifts) => [...gifts, [endLevel1Gifts, "8"]]);
    }
    if (viewedCards.length === 16) {
      setGameLevel(3);
      setBackgroundPhoto(b3);
      setGifts((gifts) => [...gifts, [endLevel2Gifts, "16"]]);
    }
    if (viewedCards.length === 24) {
      setGameLevel(4);
      setBackgroundPhoto(b4);
      setGifts((gifts) => [...gifts, [endLevel3Gifts, "24"]]);
    }
    if (viewedCards.length === 32) {
      setGameLevel(5);
      setBackgroundPhoto(b5);
      setGifts((gifts) => [...gifts, [endLevel4Gifts, "32"]]);
    }
    if (viewedCards.length === 40) {
      setGameLevel(6);
      setBackgroundPhoto(b6);
      setGifts((gifts) => [...gifts, [endLevel5Gifts, "40"]]);
    }
    if (viewedCards.length === 48) {
      setGameLevel(7);
      setBackgroundPhoto(b7);
      setGifts((gifts) => [...gifts, [endLevel6Gifts, "48"]]);
    }
    if (viewedCards.length === 56) {
      setGameLevel(8);
      setBackgroundPhoto(b8);
      setGifts((gifts) => [...gifts, [endLevel7Gifts, "56"]]);
    }
    if (viewedCards.length === 64) {
      setGameLevel(9);
      setBackgroundPhoto(b9);
      setGifts((gifts) => [...gifts, [endLevel8Gifts, "64"]]);
    }
    if (viewedCards.length === 72) {
      setGameLevel(10);
      setBackgroundPhoto(b10);
      setGifts((gifts) => [...gifts, [endLevel9Gifts, "72"]]);
    }
    if (viewedCards.length === 80) {
      setGameLevel(11);
      setBackgroundPhoto(b11);
      setGifts((gifts) => [...gifts, [endLevel10Gifts, "80"]]);
    }
    if (viewedCards.length === 88) {
      setGameLevel(12);
      setBackgroundPhoto(b12);
      setGifts((gifts) => [...gifts, [endLevel11Gifts, "88"]]);
    }
    if (viewedCards.length === 96) {
      setGameLevel(13);
      setBackgroundPhoto(b13);
      setGifts((gifts) => [...gifts, [endLevel12Gifts, "96"]]);
    }
    if (viewedCards.length === 104) {
      setGameLevel(14);
      setBackgroundPhoto(b14);
      setGifts((gifts) => [...gifts, [endLevel13Gifts, "104"]]);
    }
    if (viewedCards.length === 112) {
      setGameLevel(15);
      setBackgroundPhoto(b15);
      setGifts((gifts) => [...gifts, [endLevel14Gifts, "104"]]);
    }
    if (viewedCards.length === cards.length && cards.length !== 0) {
      //Signify End of Level
      setGameLevel(16);
      setBackgroundPhoto(defaultPic);
      setGifts((gifts) => [...gifts, [endLevel15Gifts, "finalGift"]]);
    }
  }, [viewedCards.length]);

  useEffect(() => {
    localStorage.setItem("viewedCards", JSON.stringify(viewedCards));
    setViewedCards(JSON.parse(localStorage.getItem("viewedCards")));
  }, [viewedCards.length]);

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
    setGifts(JSON.parse(localStorage.getItem("gifts")));
  }, [gifts.length]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [viewedCards]); // Trigger effect whenever messages change

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = {
          where_: { where_: "deck=" + uid },
          limit_: { limit_: "200" },
        };
        const response = await fetchDataFromAPI("/cards_read.php", requestData);
        const parsedRes = JSON.parse(response);

        parsedRes.details_.forEach((item) => {
          setCards((cards) => [...cards, item.content]);
          setQuestionid((questionid) => [...questionid, item.uid]);
        });
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  //Set one Card to ViewedCards on Initial Reload
  useEffect(() => {
    if (cards.length > 0 && viewedCards.length === 0) {
      const initialCard = cards[0];
      setViewedCards((viewedCards) => [...viewedCards, initialCard]);
    }
  }, [cards, viewedCards]);

  //Load Messages as soon as a player clicks next
  useEffect(() => {
    if (currentMessageNumber > 0) {
      if (cards.length > 0) {
        let i;
        if (
          viewedCards.length > 0 &&
          currentMessageNumber >= viewedCards.length
        ) {
          for (i = viewedCards.length; i < currentMessageNumber + 1; i++) {
            const initialCard = cards[i];
            setViewedCards((viewedCards) => [...viewedCards, initialCard]);
          }
        }
      }
    }
  }, [currentMessageNumber, cards, viewedCards]);

  //check Player status
  useEffect(() => {
    if (!inviteCode && selectedGameMode !== "online") {
      return;
    }

    const fetchData = async () => {
      try {
        const requestData = {
          where_: {
            where_: "sessionid='" + inviteCode + "'",
          },
          limit_: {
            limit_: "0,1",
          },
        };

        const response = await fetchDataFromAPI(
          "/n_play_status_check.php",
          requestData
        );

        if (response) {
          const details = JSON.parse(response.details_)[0];
          setTurn(details ? parseInt(details.turn) : null);
          setCurrentMessageNumber(details ? parseInt(details.card) : null);
          setMyTurn(details && parseInt(details.turn) === playerNumber);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        // Schedule next fetch
        setTimeoutId(setTimeout(fetchData, 200));
      }
    };

    // Initial fetch
    fetchData();

    return () => {
      // Clear timeout on component unmount or dependency change
      clearTimeout(timeoutId);
    };
  }, []);

  //Fetch Messages
  useEffect(() => {
    if (!inviteCode && selectedGameMode !== "online") {
      return;
    }

    const fetchMessages = async () => {
      try {
        const requestData = {
          where_: {
            where_: "sessionid='" + inviteCode + "'",
          },
          limit_: {
            limit_: "10000",
          },
        };

        const response = await fetchDataFromAPI("/chat.php", requestData);
        if (response) {
          const details = JSON.parse(response).details_;

          const messages = [];

          // Loop through each item in details array
          details.forEach((item) => {
            const feedback = item.feedback;
            const question = item.question;
            const commentedPlayer = item.player;
            messages.push([question, feedback, commentedPlayer]);
          });

          setMessageFeedback(messages);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        // Schedule next fetch
        setTimeoutId(setTimeout(fetchMessages, 200));
      }
    };

    // Initial fetch
    fetchMessages();

    return () => {
      // Clear timeout on component unmount or dependency change
      clearTimeout(timeoutId);
    };
  }, []);

  //send new message
  const sendMessage = async (message) => {
    if (message !== "" && message != null) {
      const formData = new FormData();
      formData.append("session_id", inviteCode);
      formData.append("player", playerNumber);
      formData.append("deck", uid);
      formData.append("questionid", viewedCards.length);
      formData.append("feedback", message);
      formData.append("its_personal", "For both of you");
      formData.append("question", cards[currentMessageNumber]);

      try {
        const response = await postDataToAPI("/chat_new.php", formData);
        if (response) {
          if (response === 1) {
            setTypedText("");
          }
        }
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    }
  };

  //count messages
  // useEffect(() => {
  //   const countMessageNo = async () => {
  //     try {
  //       const requestData = {
  //         where_: { where_: "sessionid='" + inviteCode + "' AND status = 1" },
  //         limit_: { limit_: "0,10" },
  //       };
  //       const response = await fetchDataFromAPI("/chat_count.php", requestData);
  //       console.log("Count..." + response);
  //       //Set Count Message Number to state
  //     } catch (error) {
  //       console.log("error", error);
  //       // Handle error
  //     }
  //   };

  //   setTimeout(countMessageNo, 200);
  // }, []);

  const handlePlayClick = async () => {
    //update status -> to be called in function after user palyed
    if (selectedGameMode === "online") {
      const formData = new FormData();
      formData.append("local_player", playerNumber);
      formData.append("sessionid", inviteCode);
      formData.append("current_player_pos", "0");
      formData.append("die_number", "0");
      formData.append("current_card", currentMessageNumber + 1);
      formData.append("current_player_points", "0");
      formData.append("bg", "bg.png");
      formData.append("level", "0");
      formData.append("music", "default");
      formData.append("gonext", turn);

      try {
        const response = await postDataToAPI(
          "/n_play_status_update.php",
          formData
        );
        console.log("UpdateRes" + response);
        if (response) {
          const newCard = cards[currentMessageNumber + 1];
          if (newCard && currentMessageNumber !== cards.length) {
            setViewedCards((viewedCards) => [...viewedCards, newCard]);
            setCardsCount(currentMessageNumber + 1);
          }
        }
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    } else {
      const newCard = cards[cardsCount];
      if (newCard && cardsCount !== cards.length) {
        setViewedCards((viewedCards) => [...viewedCards, newCard]);
        setCurrentMessageNumber(cardsCount);
        setCardsCount(cardsCount + 1);
      }
    }
  };

  const handleTextMessageChange = (event) => {
    setTypedText(event.target.value);
  };

  const handleClearGame = () => {
    localStorage.clear("viewedCards");
    localStorage.clear("gifts");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row style={{ backgroundColor: "whitesmoke", opacity: 0.8 }}>
          <Col sm={12}>
            <Col
              lg={12}
              sm={12}
              style={{
                marginTop: 10,
                justifyContent: "center",
                textAlign: "center",
                height: "80vh",
                border: "1px solid #9A000F",
              }}
            >
              <div>
                <img
                  src={NtarasiIcon}
                  alt="NtarasiIcon"
                  style={{ height: "30px" }}
                  onClick={() => handleClearGame()}
                />
              </div>
              <div
                style={{
                  marginTop: 0,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {/* Level and Exit game button */}
                <div style={{ flexGrow: 1 }}>
                  <p style={{ fontWeight: "bold" }}>
                    Level: <span style={{ color: "red" }}>{gameLevel}</span>
                  </p>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <p style={{ fontWeight: "bold" }}>Play Ground</p>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <button
                    style={{
                      backgroundColor: "brown",
                      color: "white",
                      borderRadius: 5,
                    }}
                    onClick={() => handleClearGame()}
                  >
                    Exit game
                  </button>
                </div>
              </div>

              {/* Chat container */}
              <div
                ref={chatContainerRef}
                style={{
                  overflowY: "scroll",
                  height: "45vh",
                  border: "1px solid #9A000F",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {/* Mapping viewed cards and messages */}
                {viewedCards.map((card, outerIndex) => {
                  let foundMatch = false;
                  let message = [];
                  let theMessageFeedbacks = [];
                  for (
                    let innerIndex = 0;
                    innerIndex < messageFeedback.length;
                    innerIndex++
                  ) {
                    const messageFed = messageFeedback[innerIndex];
                    if (card === messageFed[0]) {
                      foundMatch = true;
                      message = messageFed;
                      theMessageFeedbacks.push([messageFed[1], messageFed[2]]);
                    }
                  }
                  return (
                    <div key={outerIndex}>
                      <div
                        style={{
                          float: "left",
                          background:
                            "linear-gradient(45deg, #2196F3, #0c54c6)",
                          color: "#ffffff",
                          width: "70%",
                          boxShadow: "2px 5px 2px rgb(0 0 0 / 50%)",
                          border: "2px solid #34a5ff",
                          textShadow: "2px 2px #004175",
                          borderRadius: "13px",
                          padding: "10px 15px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          minHeight: "30px",
                          margin: "14px 15px 10px 5px",
                        }}
                      >
                        <p>{card}</p>
                        {selectedGameMode === "offline" && (
                          <span style={{ color: "pink" }}>
                            Please give a verbal Response.
                          </span>
                        )}
                      </div>
                      {foundMatch ? (
                        <div>
                          {theMessageFeedbacks
                            .slice()
                            .reverse()
                            .map((messageFed, index) => {
                              if (messageFed[1] === "1") {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      margin: "5px 0px 5px 0px",
                                      float: "left",
                                      border: "2px solid #d2d2d2",
                                      padding: "7px",
                                      width: "70%",
                                      borderRadius: 10,
                                      backgroundColor: "#FFDEAD",
                                    }}
                                  >
                                    <div
                                      style={{
                                        background: "white",
                                        width: "40px",
                                        borderRadius: 20,
                                      }}
                                    >
                                      <img
                                        style={{ height: "40px" }}
                                        src={playerOneAvator}
                                        alt="profile1"
                                      />
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      {messageFed[0]}
                                    </div>
                                  </div>
                                );
                              } else if (messageFed[1] === "2") {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      margin: "5px 0px 5px 0px",
                                      float: "right",
                                      border: "2px solid #d2d2d2",
                                      padding: "7px",
                                      width: "70%",
                                      borderRadius: 10,
                                      backgroundColor: "#F8F8FF",
                                    }}
                                  >
                                    <div
                                      style={{
                                        background: "grey",
                                        width: "40px",
                                        borderRadius: 20,
                                      }}
                                    >
                                      <img
                                        style={{
                                          height: "40px",
                                          justifyContent: "center",
                                        }}
                                        src={playerTwoAvator}
                                        alt="profile2"
                                      />
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      {messageFed[0]}
                                    </div>
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            })}
                        </div>
                      ) : (
                        <p style={{ marginLeft: "10px" }}></p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Input and send button for online mode */}
              {selectedGameMode === "online" && (
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <input
                    style={{ width: "70%", height: "30px" }}
                    type="text"
                    value={typedText}
                    placeholder="Type Reply..."
                    onChange={handleTextMessageChange}
                  />
                  <button
                    style={{ height: "30px", marginLeft: "10px" }}
                    onClick={() => sendMessage(typedText)}
                  >
                    Send
                  </button>
                </div>
              )}
            </Col>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 20,
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Player 1 Info */}
          <Col sm={12} md={3}>
            <div
              style={{
                backgroundColor: "whitesmoke",
                padding: 4,
                borderRadius: 10,
                width: "100%",
                maxWidth: "300px",
                margin: "auto",
              }}
            >
              <div>
                <span style={{ color: "#DC3545" }}>Player 1:</span>
                <span style={{ color: "#7E1A8E", textSize: 2 }}>
                  {playerOneName}
                </span>
              </div>
              <img
                style={{ height: "40px" }}
                src={playerOneAvator}
                alt="profile1"
              />
            </div>
          </Col>

          {/* Play button or Wait message */}
          <Col
            sm={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {selectedGameMode === "online" && myTurn && (
              <button
                style={{
                  height: 60,
                  marginTop: 20,
                  backgroundColor: "rgb(81, 180, 8)",
                  borderRadius: 10,
                  width: 100,
                }}
                onClick={() => handlePlayClick()}
              >
                Play
              </button>
            )}
            {selectedGameMode === "online" && !myTurn && (
              <p style={{ color: "red" }}>Wait for your turn</p>
            )}
            {selectedGameMode === "offline" && (
              <button
                style={{
                  height: 60,
                  marginTop: 20,
                  backgroundColor: "rgb(81, 180, 8)",
                  borderRadius: 10,
                  width: 100,
                }}
                onClick={() => handlePlayClick()}
              >
                Play
              </button>
            )}
          </Col>

          {/* Player 2 Info */}
          <Col sm={12} md={3}>
            <div
              style={{
                backgroundColor: "whitesmoke",
                padding: 1,
                borderRadius: 10,
                width: "100%",
                maxWidth: "300px",
                margin: "auto",
              }}
            >
              <div>
                <span style={{ color: "#DC3545" }}>Player 2:</span>
                <span style={{ color: "#7E1A8E", textSize: 2 }}>
                  {playerTwoName}
                </span>
              </div>
              <img
                style={{ height: "40px" }}
                src={playerTwoAvator}
                alt="profile2"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlayGround;
