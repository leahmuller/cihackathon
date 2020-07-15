import React, { useState, useEffect } from "react";


const Container = (props) => {
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
    <>
      <div style={styles.container}>{props.children}</div>
    </>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: "50px 100px",
  },
};

export default Container;
