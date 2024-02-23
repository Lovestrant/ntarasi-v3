import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation } from "react-router-dom";
import { fetchDataFromAPI } from "../shared/Shared";

function PlayGround() {
  const location = useLocation();
  const { selectedGameMode } = location.state;
  const { uid } = location.state;
  const { playerOneGender } = location.state;
  const { playerOneName } = location.state;
  const { playerOneAvator } = location.state;
  const { playerTwoGender } = location.state;
  const { playerTwoName } = location.state;
  const { playerTwoAvator } = location.state;
  const [cards, setCards] = useState([]);
  const [viewedCards, setViewedCards] = useState([]);
  const [cardsCount, setCardsCount] = useState(0);

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
        });
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handlePlayClick = () => {
    const newCard = cards[cardsCount];
    if (newCard) {
      setViewedCards((viewedCards) => [...viewedCards, newCard]);
      setCardsCount(cardsCount + 1);
    }
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
                position: "flex",
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
                {viewedCards &&
                  viewedCards.map((card, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        backgroundColor:
                          index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
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
                  ))}
              </div>
            </Col>
          </Col>
        </Row>
        <Row style={{ marginTop: 10, position: "flex" }}>
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
          </Col>
          <Col sm={3}>
            <div>Player 2</div>
            <div>
              <img
                style={{ height: "60px" }}
                src={playerTwoAvator}
                alt="profile1"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlayGround;
