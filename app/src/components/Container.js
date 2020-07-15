import React from "react";


const Container = (props) => {
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
