/* Amplify Params - DO NOT EDIT
	AUTH_CIHACKATHON9EFA86CB_USERPOOLID
	STORAGE_ALGORITHMBUCKET_BUCKETNAME
	STORAGE_ALGORITHMDB_ARN
	STORAGE_ALGORITHMDB_NAME
Amplify Params - DO NOT EDIT */

var AWS = require("aws-sdk");
var uuid = require("uuid");
var region = process.env.REGION;
var ddb_table_name = process.env.STORAGE_ALGORITHMDB_NAME;
AWS.config.update({ region: region });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
var ddb_primary_key = "algorithmId";

//eslint-disable-line
exports.handler = function (event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: ddb_table_name,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'algorithmId': a unique uuid
    // - 'label': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: {
        S: event.requestContext.identity.cognitoIdentityId,
      },
      algorithmId: {
        S: uuid.v1(),
      },
      label: {
        S: data.label,
      },
      attachment: {
        S: data.attachment,
      },
      createdAt: {
        N: Date.now().toString(),
      }
    },
  };

  ddb.putItem(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };

    // Return status code 500 on error
    if (error) {
      console.log("Error", error);
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false }),
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    console.log("Success", data);
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
