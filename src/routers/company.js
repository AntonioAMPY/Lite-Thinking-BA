const express = require("express");
const { v4: uuidv4 } = require("uuid");
const dotClient = require("../db/dynamodb");
const router = new express.Router();
const axios = require("axios");

router.post("/company", async (req, res) => {
  const params = {
    TableName: "lite-thinking-companies-dev",
    Item: {
      id: uuidv4(),
      ...req.body,
    }
  }
  dotClient.put(params, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(201).send(data);
    }
  });
});

router.delete("/company/:id", async (req, res) => {
  const params = {
    TableName: "lite-thinking-companies-dev",
    Key: {
      id: req.params.id,
    }
  }
  dotClient.delete(params, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(204).send();
    }
  });
});

router.patch("/company/:id", async (req, res) => {

  let updateExpression = "set";
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};
  for (const property in req.body) {
    updateExpression += ` #${property} = :${property} ,`;
    ExpressionAttributeNames["#" + property] = property;
    ExpressionAttributeValues[":" + property] = req.body[property];
  }

  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: "lite-thinking-companies-dev",
    Key: {
      id: req.params.id,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: ExpressionAttributeNames,
    ExpressionAttributeValues: ExpressionAttributeValues
  }

  dotClient.update(params, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(204).send();
    }
  });
});

router.get("/companies", async (req, res) => {
  const getCompanies = await axios.get(process.env.CLOUD_FUNCTION_AWS)
  res.status(200).send(getCompanies.data.body.Items);
});

module.exports = router;
