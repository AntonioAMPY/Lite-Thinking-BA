// Create service client module using ES6 syntax.
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
});

let dotClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
});

module.exports = dotClient;
