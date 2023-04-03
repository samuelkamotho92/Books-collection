const express = require('express');
const schema = require('./Schema/Schema')
const app = express();
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
//connecting to our schema
app.use(
    "/graphql",
    cors({origin:[`http://localhost:5173`,`http://localhost:3000`]}),
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
module.exports = app