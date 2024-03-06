import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation } from "react-router-dom";
import { fetchDataFromAPI, postDataToAPI } from "../shared/Shared";

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
    if (cards.length > 0 && viewedCards.length < 1) {
      const initialCard = cards[0];
      setViewedCards((viewedCards) => [...viewedCards, initialCard]);
    }
  }, [cards]);

  //check Player status
  useEffect(() => {
    if (!inviteCode) {
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
          //setCardsCount(details ? parseInt(details.card) : null);
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
    if (!inviteCode) {
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
    //send message
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
      console.log("Ready to get started....");
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
        setCardsCount(cardsCount + 1);
      }
    }
  };

  const handleTextMessageChange = (event) => {
    setTypedText(event.target.value);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
            <Col
              lg={12}
              sm={12}
              style={{
                marginTop: 10,
                justifyContent: "center",
                textAlign: "center",
                height: "80vh",
                border: "1px solid red",
              }}
            >
              <h3>Play Ground</h3>
              <div
                style={{
                  overflowY: "scroll",
                  height: "340px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {viewedCards.map((card, outerIndex) => (
                  <div key={outerIndex}>
                    {card && (
                      <div
                        style={{
                          marginBottom: "10px",
                          padding: "5px",
                          backgroundColor:
                            outerIndex % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                          borderRadius: "5px",
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
                          <div
                            key={innerIndex}
                            style={{
                              marginBottom: "10px",
                              padding: "5px",
                              backgroundColor:
                                innerIndex % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                              borderRadius: "5px",
                            }}
                          >
                            <p style={{ color: "red" }}>{message[1]}</p>
                            {message[2] === "1" && (
                              <img
                                style={{ height: "40px" }}
                                src={playerOneAvator}
                                alt="profile1"
                              />
                            )}
                            {message[2] === "2" && (
                              <img
                                style={{ height: "40px" }}
                                src={playerTwoAvator}
                                alt="profile2"
                              />
                            )}
                            <p>{message[3]}</p>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))}
              </div>
              {selectedGameMode === "online" && (
                <div>
                  <input
                    type="text"
                    value={typedText}
                    onChange={handleTextMessageChange}
                  />
                  <button onClick={() => sendMessage(typedText)}>Send</button>
                </div>
              )}
            </Col>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col sm={3}>
            <div>Player 1</div>
            <div>
              <img
                style={{ height: "60px" }}
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
            <div>Player 2</div>
            <div>
              <img
                style={{ height: "60px" }}
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
