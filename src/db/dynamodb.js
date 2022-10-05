// Create service client module using ES6 syntax.
const AWS = require("aws-sdk");

console.log("test", process.env.AWS_ACCESS_KEY_ID)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

let dotClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
});

module.exports = dotClient;
