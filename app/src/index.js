import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import Amplify from "aws-amplify";
import config from './config';
import "./index.css";


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "algorithms",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(
  <Router />,
document.getElementById("root"));
