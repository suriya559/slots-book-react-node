const express = require("express");
const cors = require("cors");
const moment = require("moment");
const app = express();
const axios = require("axios");
const constants = require("./constants");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: true }));

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
    res.send("Server is Wokrking!!");
  });

app.post("/bookSlot", (req,res) => {
    let range = req.body.range === "15" ? "fifteenMinSlot" : req.body.range === "30" ? "thirtyMinSlot" : req.body.range === "60" ? "sixtyMinSlot" : "";
    axios.get(`${constants.SERVER_URL}/${range}.json?print=pretty`)
      .then(response => {
          let obj = {...response.data}
          obj[req.body.appDate] = req.body.data;

        axios.put(`${constants.SERVER_URL}/${range}.json`, obj)
        .then(result => {
            res.send(result.data)
        }).catch(err => console.log(err));
      })
      .catch(err => console.log("5555555", err))
})

app.post("/getFreeSlots", (req, res) => {
    axios.get(`${constants.SERVER_URL}/${req.body.range}.json?print=pretty`)
      .then(response => {
          res.send(response.data)
      })
      .catch(err => console.log("5555555", err))
});
app.get("/getFreeSlots/:timeRange", (req, res) => {
    let fromTime = "11:00 AM";
    let toTime = "5:00 PM";
    let data = [];
    let x = ""
    while(x !== toTime) {
        let range = "";
        let fromMoment = moment(fromTime, 'LT');
        range = range + fromMoment.format("LT") + " - "
        let time = fromMoment.add(req.params.timeRange, "minutes").format("LT")
        range = range + time;
        data.push(range);
        x = time;
        fromTime = time;
    }
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});