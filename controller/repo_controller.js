const mongo = require("../config/db");

const getTags = async (_, res) => {
  let tags = await mongo.repo
    .aggregate([
      { $group: { _id: "$language", count: { $sum: 1 } } },
      { $project: { _id: 0, language: "$_id", count: 1 } },
    ])
    .toArray();
  res.json(tags);
};

const getRepo = async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    let repos = await (await mongo.repo.find().toArray()).slice(0, 30);
    res.status(200).send(repos);
  } else {
    var queryMap = {};
    queryMap["$and"] = [];

    for (let key in req.query) {
      console.log(key, req.query[key]);

      if (
        key === "stargazers_count" ||
        key === "forks_count" ||
        key === "watchers_count" ||
        key === "open_issues_count"
      ) {
        values = req.query[key].split("-");

        values = values.map((a) => parseInt(a));

        queryMap["$and"].push({ [key]: { $lt: values[1], $gte: values[0] } });
      } else if (key === "license") {
        queryMap["$and"].push({
          "license.key": { $in: req.query[key].split("-") },
        });
      } else if (key === "has_wiki") {
        if (req.query[key] === "true") queryMap["$and"].push({ [key]: true });
        else queryMap["$and"].push({ [key]: false });
      } else {
        queryMap["$and"].push({ [key]: { $in: req.query[key].split(",") } });
      }
    }
    let repos = await mongo.repo.find(queryMap).toArray();
    res.status(200).json(repos);
  }
};

module.exports = { getRepo, getTags };
