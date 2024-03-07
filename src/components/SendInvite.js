import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataFromAPI, postDataToAPI } from "../shared/Shared";
import { inviteUrl, server } from "../configs/configs";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-grid-system";
import whatsappImg from "../assets/graphics/whatsapp.png";
import backPhoto from "../assets/graphics/back.jpg";

function SendInvite() {
  const location = useLocation();
  const { selectedGameMode } = location.state;
  const { uid } = location.state;
  const { playerOneGender, playerOneName, playerOneAvator, createdInviteCode } =
    location.state;
  const [responseData, setResponseData] = useState("");
  const [inviteCode, setInviteCode] = useState(createdInviteCode);
  const [successMessage, setSuccessMessage] = useState();

  const playerOneData = {
    profile: {
      Name: playerOneName,
      Gender: playerOneGender,
      Avatar: playerOneAvator,
    },
  };

  //UseEffect to generate Invite and save the invite on mounting
  useEffect(() => {
    const formData = new FormData();
    formData.append("rand", inviteCode);
    formData.append("player1", JSON.stringify(playerOneData));
    formData.append("deck", uid);

    const saveInvite = async () => {
      try {
        const response = await postDataToAPI("/save_invite.php", formData);
        setResponseData(response);
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    };

    saveInvite();
  }, []);

  //UseEffect to run continuously checking the invite status
  //If status is Ok, redirect to playground with details of player 2
  const navigate = useNavigate();
  useEffect(() => {
    const checkInviteStatus = async () => {
      const formData = new FormData();
      formData.append("inv", inviteCode);

      try {
        const response = await postDataToAPI(
          "/check_invite_status.php",
          formData
        );
        if (response.result_ === 1) {
          console.log("Accepted...");
          const player2Name = response.details_.profile.Name;
          const player2Gender = response.details_.profile.Gender;
          const player2Avatar = response.details_.profile.Avatar;

          navigate("/PlayGround", {
            state: {
              selectedGameMode: selectedGameMode,
              uid: uid,
              playerOneGender: playerOneGender,
              playerOneName: playerOneName,
              playerOneAvator: playerOneAvator,
              playerTwoGender: player2Gender,
              playerTwoName: player2Name,
              playerTwoAvator: player2Avatar,
              inviteCode: inviteCode,
              playerNumber: 1,
            },
          });
        } else {
          console.log("Not yet Accepted...");
        }

        if (response.result_ !== 1) {
          // Call checkInviteStatus again after 200 microseconds
          setTimeout(checkInviteStatus, 200);
        }
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    };

    checkInviteStatus();
  }, [responseData, inviteCode]);

  const copyToClipboard = async () => {
    const tempInput = `${playerOneName} has invited you to play NtarasiPlay with them. You can play online or download the app ${inviteUrl}/AcceptInvite?inv=${inviteCode}`;
    try {
      await navigator.clipboard.writeText(tempInput);
      setSuccessMessage("Copied to Clipboard!");
    } catch (error) {
      console.error("Unable to copy:", error);
    }
  };

  const inputTextStyle = { width: "250px", height: "30px" };

  return (
    <div style={{ backgroundImage: `url(${backPhoto})`, height: "100vh" }}>
      <Container>
        <Row>
          <Col sm={12}>
            <h2>Send Invite</h2>
            <p>Click the Input Box to copy Invite.</p>
            <div>
              <p style={{ color: "green" }}>{successMessage}</p>
              <input
                style={inputTextStyle}
                onClick={() => copyToClipboard()}
                value={inviteCode}
                readOnly
              />
            </div>
            <div>
              <p>Share Invite on WhatsApp: Click the Icon</p>
              <a
                href={`whatsapp://send?text=Please play Ntarasi Game with me. Click this link: ${inviteUrl}/AcceptInvite?inv=${inviteCode}`}
              >
                <img
                  src={whatsappImg}
                  alt={"whatsappImg"}
                  style={{
                    height: "30px",
                    borderRadius: "10px",
                  }}
                />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SendInvite;
