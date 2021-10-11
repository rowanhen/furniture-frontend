import React from "react";
import BarcelonaChairScene from "./ModelFiles/ModelBarcelonaChair";
import "../styles.css";
import { Link, Route, Switch } from "react-router-dom";
import EarnesChairScene from "./ModelFiles/ModelEarnesChair";
import HomePage from "./HomePage";
import "../styles/homepage.css"

export default function MainContent() {

  return (
    <>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route exact path="/All Products">
          <div className="home__page__container">
            <div className="home__page__links">
              <Link to="/">Home</Link>
            </div>
            <div className="home__page__links">
              <Link to="/Barcelona Chair">Barcelona Chair</Link>
            </div>
            <div className="home__page__links">
              <Link to="/Earnes Chair">Earnes Chair</Link>
            </div>
          </div>
        </Route>
        <Route exact path="/Barcelona Chair"><BarcelonaChairScene /></Route>
        <Route exact path="/Earnes Chair"><EarnesChairScene /></Route>
      </Switch>
    </>
  );
};