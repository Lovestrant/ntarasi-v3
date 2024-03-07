import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation } from "react-router-dom";
import { fetchDataFromAPI, postDataToAPI } from "../shared/Shared";
import backgroundPhoto from "../assets/backgrounds/b3.jpg";

function PlayGround() {
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
  const [viewedCards, setViewedCards] = useState([]);
  const [cardsCount, setCardsCount] = useState(1);
  const [questionid, setQuestionid] = useState([]);
  const [turn, setTurn] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [myTurn, setMyTurn] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [messageFeedback, setMessageFeedback] = useState([]);
  const [currentMessageNumber, setCurrentMessageNumber] = useState();

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
    if (currentMessageNumber && viewedCards.length === 0) {
      if (cards.length > 0) {
        let i;
        for (i = 0; i <= currentMessageNumber; i++) {
          const initialCard = cards[i];
          setViewedCards((viewedCards) => [...viewedCards, initialCard]);
        }
      }
    }
  }, [currentMessageNumber]);

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

          // Initialize 2-dimensional array
          const messages = [];

          // Loop through each item in details array
          details.forEach((item) => {
            // Extract feedback and question values and push them as an array
            const feedback = item.feedback;
            const question = item.question;
            const commentedPlayer = item.player;
            messages.push([question, feedback, commentedPlayer]);
          });

          // Now messages is a 2-dimensional array containing feedback and question pairs
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
      formData.append("questionid", questionid[viewedCards.length]);
      formData.append("feedback", message);
      formData.append("its_personal", "For both of you");
      formData.append("question", cards[cardsCount]);

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
      formData.append("current_card", cardsCount);
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
          const newCard = cards[cardsCount];
          if (newCard) {
            setViewedCards((viewedCards) => [...viewedCards, newCard]);
            setCardsCount(cardsCount + 1);
          }
        }
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    } else {
      const newCard = cards[cardsCount];
      if (newCard) {
        setViewedCards((viewedCards) => [...viewedCards, newCard]);
        setCurrentMessageNumber(cardsCount);
        setCardsCount(cardsCount + 1);
      }
    }
  };

  const handleTextMessageChange = (event) => {
    setTypedText(event.target.value);
  };
  return (
    <div style={{ backgroundImage: `url(${backgroundPhoto})` }}>
      <Container>
        <Row style={{ backgroundColor: "whitesmoke" }}>
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
              <h3>Play Ground</h3>
              <div
                style={{
                  overflowY: "scroll",
                  height: "320px",
                  border: "1px solid #9A000F",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {viewedCards.map((card, outerIndex) => (
                  <div key={outerIndex}>
                    {card && (
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
                          fontSize: "21px",
                          minHeight: "30px",
                          margin: "14px 15px 10px 5px",
                        }}
                      >
                        <p
                          style={{
                            margin: "0",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {card}
                        </p>
                      </div>
                    )}
                    {messageFeedback.map((message, innerIndex) => {
                      if (message[0] === card) {
                        // If match is found, render the message
                        return (
                          <div key={innerIndex}>
                            <div>
                              {message[2] === "1" && (
                                <div
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
                                    {message[1]}
                                  </div>
                                </div>
                              )}
                              {message[2] === "2" && (
                                <div
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
                                    {message[1]}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))}
              </div>
              {selectedGameMode === "online" && (
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <input
                    style={{ width: "300px", height: "30px" }}
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
        <Row style={{ marginTop: 10 }}>
          <Col sm={3}>
            <div
              style={{
                backgroundColor: "whitesmoke",
                padding: 10,
                borderRadius: 10,
                width: "auto",
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
          <Col sm={6}>
            {selectedGameMode === "online" && myTurn && (
              <button
                style={{
                  height: 60,
                  marginTop: 20,
                  backgroundColor: "rgb(81,180,8)",
                  borderRadius: 10,
                  width: 100,
                }}
                onClick={() => handlePlayClick()}
              >
                Play
              </button>
            )}
            {selectedGameMode === "online" && !myTurn && (
              <p style={{ color: "green" }}>Wait for your turn</p>
            )}

            {selectedGameMode === "offline" && (
              <button
                style={{
                  height: 60,
                  marginTop: 20,
                  backgroundColor: "rgb(81,180,8)",
                }}
                onClick={() => handlePlayClick()}
              >
                Play
              </button>
            )}
          </Col>
          <Col sm={3}>
            <div
              style={{
                backgroundColor: "whitesmoke",
                padding: 10,
                borderRadius: 10,
                width: "auto",
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
