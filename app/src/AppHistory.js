import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import NavMenu from "./components/NavMenu";
import Layout from "./components/Layout";
import Public from "./containers/Public";
import Logout from "./containers/Logout";
import Profile from "./containers/Profile";
import Protected from "./containers/Protected";
import AlgorithmList from "./containers/AlgorithmList";
import { Auth, Logger } from "aws-amplify";

const logger = new Logger("App History", "DEBUG");

const AppHistory = () => {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    onLoad();
    setRoute();
    window.addEventListener("hashchange", setRoute);
    return () => window.removeEventListener("hashchange", setRoute);
  }, [isAuthenticating]);

  function setRoute() {
    const location = window.location.href.split("/");
    const pathname = location[location.length - 1];
    setCurrent(pathname ? pathname : "home");
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        logger.debug(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    <>
      <Layout>
        <AppContext.Provider 
            value={{ 
                isAuthenticated: isAuthenticated,
                isAuthenticating: isAuthenticating,
                setIsAuthenticating: setIsAuthenticating,
                userHasAuthenticated: userHasAuthenticated
            }}
        >
        <NavMenu current={current} />
          <BrowserRouter>
            <h1>App History Experiment</h1>
            <Switch>
              <Route exact path="/" component={Public} />
              <Route exact path="/protected" component={Protected} />
              <Route exact path="/algorithms" component={AlgorithmList} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      </Layout>
    </>
  );
};

export default AppHistory;
