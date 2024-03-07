import React from "react";
import { Container, Row, Col } from "react-grid-system";
import couples from "../assets/graphics/couple.png";
import smartphone from "../assets/graphics/smartphone.png";
import back from "../assets/graphics/back.jpg";
import { Link, useNavigate } from "react-router-dom";
import backPhoto from "../assets/graphics/back.jpg";

function GameModeChoice() {
  const backgroundStyle = {
    backgroundImage: `url(${backPhoto})`,
    display: "flex",
    backgroundSize: "cover",
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
  };
  const btnOnlineStyle = {
    backgroundColor: "rgb(178 2 36 / 92%)",
    marginLeft: 15,
    padding: 10,
    borderRadius: 10,
  };
  const btnOfflineStyle = {
    backgroundColor: "rgb(113 12 46 / 92%)",
    marginLeft: 15,
    padding: 10,
    borderRadius: 10,
  };
  const imgStyle = {
    height: "200px",
  };
  const navigate = useNavigate();
  const handleClick = (mode) => {
    navigate("/CategorySelection", { state: { selectedGameMode: mode } });
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row>
          <Col sm={6}>
            <button
              style={btnOfflineStyle}
              onClick={() => handleClick("offline")}
            >
              <img src={couples} alt="couples" style={imgStyle} />
              <p style={{ color: "white" }}>PLAY ON THIS GADGET</p>
            </button>
          </Col>
          <Col sm={6}>
            <button
              style={btnOnlineStyle}
              onClick={() => handleClick("online")}
            >
              <img src={smartphone} alt="smartphone" style={imgStyle} />
              <p style={{ color: "white" }}>PLAY WITH PARTNER ONLINE</p>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GameModeChoice;
