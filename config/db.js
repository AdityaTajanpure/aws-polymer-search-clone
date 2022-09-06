const { MongoClient } = require("mongodb");

class MongoConnection {
  static async connect() {
    if (this.connection) return this.connection;
    try {
      this.connection = new MongoClient(process.env.MONGO_URI);
      this.db = this.connection.db(process.env.DB_NAME);
      this.connection
        .connect()
        .then((value) => {
          this.repo = this.db.collection("repo");
          console.log("Connected to MongoClient");
        })
        .catch((error) => {
          console.log("Error connecting to MongoClient: " + error);
        });
    } catch (err) {
      //   "No point in going ahead"
      console.error(err);
      process.exit(1);
    }
    return this.connection;
  }
}

module.exports = MongoConnection;
