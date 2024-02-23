import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../shared/Shared";
import { assetsBackgrounds } from "../configs/configs";
import lovers from "../assets/backgrounds/lovers.jpeg";

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

  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
            <h1>SELECT CATEGORY</h1>
            {categoryData && (
              <div>
                {categoryData.details_.map((item) => (
                  <div
                    key={item.uid}
                    onClick={() => handleClick(item.uid)}
                    style={{
                      marginBottom: 30,
                      width: "auto",
                      textAlign: "center",
                      justifyContent: "center",
                      border: "1px solid black",
                      padding: 3,
                    }}
                  >
                    <img
                      src={lovers}
                      alt={item.image}
                      style={{
                        height: "250px",
                        width: "200px",
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
