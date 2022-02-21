const cron = require("node-cron");
const User = require("../models/User");
const Properties = require("../models/Properties");

const cronJob = async () => {
  cron.schedule("0 */2 * * * *", async () => {
    console.log("CRON RUNNING AFTER 2 MINUTES!");
    var d = new Date(Date.now());

    let query = {
      expiryDate: { $lt: d },
    };
    await Properties.updateMany(
      query,
      { $set: { expiryDate: null } },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
  });
};
module.exports = cronJob;
