const cron = require("node-cron");
const Properties = require("../models/Properties");

const cronJob = async () => {
  cron.schedule("0 0 * * * *", async () => {
    console.log("CRON RUNNING AFTER 1 Hour!");
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
