import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { useFavorites } from "../../Context/FavoritesContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./ProgramList.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
// import { FaAngleLeft } from "react-icons/fa";
// import { FaAngleRight } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5024/api/program1");
        const programsData = response.data?.$values || [];
        setPrograms(programsData);
      } catch (err) {
        setError("Failed to fetch programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const toggleFavorite = (program) => {
    if (favorites.some((fav) => fav.programId === program.programId)) {
      removeFromFavorites(program.programId);
    } else {
      addToFavorites(program);
    }
  };

  const handleDonateClick = (programId) => {
    navigate(`/donate/${programId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.name &&
      program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header />
      <div className="program-header">
        <div className="program-list1">
          <div className="program-list">
            <h1 className="program-h1">PROGRAM LIST</h1>
          </div>

          <div className="program-to">
            <div className="program-to2">
              <div className="program-to3">
                <div className="program-sidebar">
                  <div className="search-bar3">
                    <div className="program-container">
                      <div className="program-content">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <button className="program-btn1">
                          <FaSearch className="program-fa" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <h1 className="program-title">Charity</h1>
                  <div className="program-border"></div>
                  <ul className="program-categor">
                    <li className="program-li">
                      <a href="#">Child support charity</a>
                    </li>
                    <li className="program-li">
                      <a href="#">Education charity</a>
                    </li>
                  </ul>
                </div>
                <div className="program-col">
                  <div class="bwp-top-bar top clearfix">
                    <div class="woocommerce-notices-wrapper"></div>
                    <ul class="display hidden-sm hidden-xs pull-left">
                      <li>
                        <a
                          data-col="col-lg-6 col-md-4 col-sm-6"
                          class="view-grid two"
                          href=""
                        >
                          <span class="icon-column">
                            <span class="layer first">
                              <span></span>
                              <span></span>
                            </span>
                            <span class="layer middle">
                              <span></span>
                              <span></span>
                            </span>
                            <span class="layer last">
                              <span></span>
                              <span></span>
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          data-col="col-lg-4 col-md-4 col-sm-6"
                          class="view-grid three"
                          href="/product-category/classic/?category-view-mode=grid&amp;product_col_large=3"
                        >
                          <span class="icon-column">
                            <span class="layer first">
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                            <span class="layer middle">
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                            <span class="layer last">
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          data-col="col-lg-3 col-md-4 col-sm-6"
                          class="view-grid four active"
                          href="/product-category/classic/?category-view-mode=grid&amp;product_col_large=4"
                        >
                          <span class="icon-column">
                            <span class="layer first">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                            <span class="layer middle">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                            <span class="layer last">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="program-grid">
                    {programs.length === 0 ? (
                      <p>No programs available.</p>
                    ) : (
                      programs.map((program) => (
                        <div key={program.programId} className="program-card">
                          <div className="program-image">
                            <img
                              src={program.image || "default-image.jpg"}
                              alt={program.name}
                            />
                          </div>
                          <div className="program-details">
                            <h2>{program.name}</h2>
                            <p>{program.description}</p>
                            <p>
                              <strong>Start date:</strong>{" "}
                              {new Date(program.startDate).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>End date:</strong>{" "}
                              {new Date(program.endDate).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Is about to happen:</strong>{" "}
                              {program.isUpcoming ? "Yes" : "No"}
                            </p>
                            <div className="program-ci">
                              <CiHeart
                                className={`program-heart ${
                                  favorites.some(
                                    (fav) => fav.programId === program.programId
                                  )
                                    ? "favorite"
                                    : ""
                                }`}
                                onClick={() => toggleFavorite(program)}
                                aria-label="Toggle favorite"
                              />
                              <button
                                className="program-donate-btn"
                                onClick={() =>
                                  handleDonateClick(program.programId)
                                }
                                aria-label="Donate to program"
                              >
                                Donate
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <ul class="pagination program-grid__pagination">
                    <li class="pagination-item">
                      <a href="" className="pagination-item__link">
                        {/* <i className="pagination-item__icon FaAngleLeft "></i> */}
                        <MdKeyboardArrowLeft className="program-left" />
                      </a>
                    </li>

                    <li class="pagination-item pagination-item--active">
                      <a href="" className="pagination-item__link">
                        1
                      </a>
                    </li>
                    <li class="pagination-item">
                      <a href="" className="pagination-item__link">
                        2
                      </a>
                    </li>
                    <li class="pagination-item">
                      <a href="" className="pagination-item__link">
                        3
                      </a>
                    </li>
                    <li class="pagination-item">
                      <a href="" className="pagination-item__link">
                        ...
                      </a>
                    </li>
                    <li class="pagination-item">
                      <a href="" className="pagination-item__link">
                        6
                      </a>
                    </li>

                    <li class="pagination-item">
                      <a href="" className="pagination-item__link">
                        <i className="pagination-iitem__icon FaAnglerigth "></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <ul class="pagination">
                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">
                        <i className="pagination-iitem__icon FaAngleLeft "></i>
                    </a>
                  </li>

                  
                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">1</a>
                  </li>
                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">2</a>
                  </li>
                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">3</a>
                  </li>
                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">...</a>
                  </li>
                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">6</a>
                  </li>

                  <li class="pagination-item">
                    <a href="" className="pagination-item__link">
                        <i className="pagination-iitem__icon FaAnglerigth "></i>
                    </a>
                  </li>
                </ul>  */}
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  );
};

export default ProgramList;
