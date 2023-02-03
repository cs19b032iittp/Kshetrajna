const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
require('dotenv').config({path: "./config.env"});

//connect DB
connectDB();

const app = express();

app.use(fileUpload())
app.use(express.json());


//routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler (last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
