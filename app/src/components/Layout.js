import React from "react";
import Helmet from "react-helmet";
//import favicon from "favicon.ico";
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-W4Q5DX8',
};

TagManager.initialize(tagManagerArgs);

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://bootswatch.com/4/cosmo/bootstrap.min.css"
        ></link>
        <title>CI Hackathon</title>
      </Helmet>
      <div style={{ height: "calc(100vh - 56px)" }}>{children}</div>
    </>
  );
}