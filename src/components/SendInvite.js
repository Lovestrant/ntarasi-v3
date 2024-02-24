import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataFromAPI, postDataToAPI } from "../shared/Shared";
import { inviteUrl, server } from "../configs/configs";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-grid-system";
import whatsappImg from "../assets/graphics/whatsapp.png";

function SendInvite() {
  const location = useLocation();
  const { selectedGameMode } = location.state;
  const { uid } = location.state;
  const { playerOneGender, playerOneName, playerOneAvator } = location.state;
  const [responseData, setResponseData] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [successMessage, setSuccessMessage] = useState();

  const playerOneData = {
    profile: {
      Name: playerOneName,
      Gender: playerOneGender,
      Avatar: playerOneAvator,
    },
  };

  const generateRandomAlphaNum = (length) => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  //UseEffect to generate Invite and save the invite on mounting
  useEffect(() => {
    const theInviteCode = generateRandomAlphaNum(5);
    setInviteCode(theInviteCode);

    const formData = new FormData();
    formData.append("rand", theInviteCode);
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
          const player2Name = response.result_.profile.Name;
          const player2Gender = response.result_.profile.Gender;
          const player2Avatar = response.result_.profile.Avatar;

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

  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
            <p>Send Invite</p>
            <div>
              <p style={{ color: "green" }}>{successMessage}</p>
              <input
                onClick={() => copyToClipboard()}
                value={inviteCode}
                readOnly
              />
            </div>
            <div>
              <p>Share Invite on WhatsApp: Click the button</p>
              <a
                href={`whatsapp://send?text=Please play Ntarasi Game with me. Click this link: ${inviteUrl}/AcceptInvite?inv=${inviteCode}data-action=share/whatsapp/share`}
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
