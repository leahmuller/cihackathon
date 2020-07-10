import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NavMenu from "./components/NavMenu";
import Public from "./containers/Public";
import Profile from "./containers/Profile";
import Protected from "./containers/Protected";

const Router = () => {
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    setRoute();
    window.addEventListener("hashchange", setRoute);
    return () => window.removeEventListener("hashchange", setRoute);
  }, []);

  function setRoute() {
    const location = window.location.href.split("/");
    const pathname = location[location.length - 1];
    setCurrent(pathname ? pathname : "home");
  }

  return (
    <BrowserRouter>
      <Layout>
        <NavMenu current={current} />
        <Switch>
          <Route exact path="/" component={Public} />
          <Route exact path="/protected" component={Protected} />
          <Route exact path="/profile" component={Profile} />
          <Route component={Public} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
