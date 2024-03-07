import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../shared/Shared";
import { assetsBackgrounds } from "../configs/configs";
import engaged1 from "../assets/backgrounds/bg1.jpg";
import romanceAndFinance from "../assets/backgrounds/lovers.jpeg";
import betweenTheSheets1 from "../assets/backgrounds/between-sheets.jpg";
import betweenTheSheets2 from "../assets/backgrounds/sheets2.jpg";
import engaged2 from "../assets/backgrounds/engaged2.jpg";
import married from "../assets/backgrounds/bg2.jpg";
import backPhoto from "../assets/graphics/back.jpg";

function CategorySelection() {
  const [categoryData, setCategoryData] = useState();
  const location = useLocation();
  const { selectedGameMode } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = {
          where_: { where_: "uid > 0 and status = 1" },
          limit_: { limit_: "50" },
        };
        const response = await fetchDataFromAPI("/decks_read.php", requestData);
        setCategoryData(JSON.parse(response));
      } catch (error) {
        console.log("error", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = (uid) => {
    navigate("/profileSetup", {
      state: { selectedGameMode: selectedGameMode, uid: uid },
    });
  };

  const getImageBackground = (img) => {
    if (img === "bg2.jpg") {
      return married;
    }
    if (img === "engaged2.jpg") {
      return engaged2;
    }
    if (img === "sheets2.jpg") {
      return betweenTheSheets2;
    }
    if (img === "between-sheets.jpg") {
      return betweenTheSheets1;
    }
    if (img === "lovers.jpeg") {
      return romanceAndFinance;
    }
    if (img === "bg1.jpg") {
      return engaged2;
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backPhoto})` }}>
      <Container>
        <Row>
          <Col sm={12}>
            <h1>SELECT CATEGORY</h1>
            {categoryData && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {categoryData.details_.map((item) => (
                  <div
                    key={item.uid}
                    onClick={() => handleClick(item.uid)}
                    style={{
                      marginBottom: 30,
                      width: "calc(50% - 20px)", // Adjust width for two columns
                      textAlign: "center",
                      justifyContent: "center",
                      border: "1px solid black",
                      padding: 3,
                      boxSizing: "border-box", // Ensure padding and border are included in the width calculation
                    }}
                  >
                    <img
                      src={getImageBackground(item.image)}
                      alt={item.image}
                      style={{
                        height: "250px",
                        width: "100%", // Ensure image fills the container
                        borderRadius: "10px",
                      }}
                    />
                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CategorySelection;
