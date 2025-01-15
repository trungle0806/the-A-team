import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Promotions.css";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://charitynavigator-hma3agega6fwfgb2.canadacentral-01.azurewebsites.net/api/program1"
        );
        const promotionsData = response.data?.$values || [];
        setPromotions(promotionsData.slice(0, 6)); // Limit to 6 items
      } catch (err) {
        setError("Failed to fetch promotions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) return <div>Loading promotions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="promo-div">
      <div className="promo-aem">
        <div className="promo-list">
          <div className="promo-card">
            <div className="promo-warp">
              <div className="promo-header">
                <div className="promo-title">Promotions</div>
                <div className="promo-button">
                  <a className="promo-a" href="/program">
                    View all
                  </a>
                </div>
              </div>
              <div className="promo-cards">
                <ul className="promo-active">
                  {promotions.map((promo, index) => (
                    <li key={index} className="promo-Item">
                      <div className="promo-content">
                        <a
                          className="promo-discover"
                          href={`/promotions/${promo.id}`}
                        ></a>
                        <div className="promo-image">
                          <picture>
                            <img
                              className="promo-anh"
                              src={promo.image || "default-image.jpg"}
                              alt={promo.name}
                            />
                          </picture>
                        </div>
                        <div className="promo-description">
                          <div className="promp-ton">{promo.name}</div>
                          <div className="promo-date">{promo.description}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
