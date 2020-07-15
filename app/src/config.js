const dev = {
  s3: {
    REGION: "us-east-2",
    BUCKET: "cihackathon-algorithm-uploads",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://iyfp4i0lad.execute-api.us-east-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_CqPRRaFmB",
    APP_CLIENT_ID: "5kmoegbeh8porgj9jo21cnvkmu",
    IDENTITY_POOL_ID: "us-east-2:1b9706cc-28ce-478e-ac59-66cb1bf9ee49",
  },
};

const prod = {
  s3: {
    REGION: "us-east-2",
    BUCKET: "cihackathon-algorithm-uploads",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://iyfp4i0lad.execute-api.us-east-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_CqPRRaFmB",
    APP_CLIENT_ID: "5kmoegbeh8porgj9jo21cnvkmu",
    IDENTITY_POOL_ID: "us-east-2:1b9706cc-28ce-478e-ac59-66cb1bf9ee49",
  },
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
