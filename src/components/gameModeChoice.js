import React from "react";
import { Container, Row, Col } from "react-grid-system";
import couples from "../assets/graphics/couple.png";
import smartphone from "../assets/graphics/smartphone.png";
import backPhoto from "../assets/graphics/back.jpg";
import { Link, useNavigate } from "react-router-dom";

function GameModeChoice() {
  const backgroundStyle = {
    backgroundImage: `url(${backPhoto})`,
    display: "flex",
    backgroundSize: "cover",
    justifyContent: "center",
    minHeight: "100vh",
    alignItems: "center",
  };

  const btnStyle = {
    padding: "10px",
    borderRadius: "10px",
    margin: "10px",
    textAlign: "center",
  };

  const imgStyle = {
    height: "60%",
  };

  const navigate = useNavigate();

  const handleClick = (mode) => {
    navigate("/CategorySelection", { state: { selectedGameMode: mode } });
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row>
          <Col xs={12}>
            <h2>Welcome To Ntarasi</h2>
            <p>Choose mode below to continue:</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <button
              style={{ ...btnStyle, backgroundColor: "rgb(113 12 46 / 92%)" }}
              onClick={() => handleClick("offline")}
            >
              <img src={couples} alt="couples" style={imgStyle} />
              <p style={{ color: "white" }}>PLAY WITH PARTNER OFFLINE</p>
              <p style={{ color: "white" }}>(On this Gadget)</p>
            </button>
          </Col>
          <Col xs={12} sm={6}>
            <button
              style={{ ...btnStyle, backgroundColor: "rgb(178 2 36 / 92%)" }}
              onClick={() => handleClick("online")}
            >
              <img src={smartphone} alt="smartphone" style={imgStyle} />
              <p style={{ color: "white" }}>PLAY WITH PARTNER ONLINE</p>
              <p style={{ color: "white" }}>(On separate Gadgets)</p>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GameModeChoice;
