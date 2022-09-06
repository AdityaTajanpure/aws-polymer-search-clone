const express = require("express");
const cors = require("cors");
const MongoConnection = require("./config/db");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

(async () => {
  //Created a singleton for later access
  await MongoConnection.connect();

  //Routes
  app.use("/", require("./routes/repo"));

  //Serve static assets in production
  if (process.env.NODE_ENV === "production") {
    //Set a static folder
    app.use(express.static("client/build"));

    app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
})();
