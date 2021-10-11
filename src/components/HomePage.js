import React from "react";
import "../styles/homepage.css"
import { Link } from "react-router-dom";

export default function HomePage() {

  const linkList = () => {
    return(
      <div className="home__page__links">
          <Link to="/All Products">{"All Products"}</Link>
      </div>
    )
  }

  return (
    <>
      <div className="home__page__container">
        <div className="home__page__title">{"Product Designer"}</div>
        {linkList()}
      </div>
    </>
  );
};