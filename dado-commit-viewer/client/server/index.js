// server/index.js
const express = require("express");
const axios =  require("axios");
const stringify = require('json-stringify-safe');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());;

const PORT = 3001;
const GITHUB_API_URL = "https://api.github.com/search/repositories?q=stars:>100000";

app.get("/getRepos", (req, res) => {
  axios.get(GITHUB_API_URL).then( response => {
    var circularObj = {};
    circularObj.circularRef = response;
    circularObj.list = [ circularObj, circularObj ];
    res.send({data: JSON.parse(stringify(circularObj.circularRef.data, null, 2))});
  }).catch(e=> {
      console.log("error",e)
      this.onError(e.toString());
  })
});


app.post("/getCommits", (req, res) => {
    var obj = JSON.parse(req.body.data)
    axios.get("https://api.github.com/repos/" + obj.owner + "/" + obj.name + "/commits?sha=" + obj.branch).then( response => {
      var circularObj = {};
      circularObj.circularRef = response;
      circularObj.list = [ circularObj, circularObj ];
      res.send({data: JSON.parse(stringify(circularObj.circularRef.data, null, 2))});
    }).catch(e=> {
        console.log("get commits",e)
        this.onError(e.toString());
    })
  });


  app.post("/findRepo", (req, res) => {
    var obj = JSON.parse(req.body.data)
    axios.get("https://api.github.com/users/" + obj.username + "/repos?").then( response => {
      var circularObj = {};
      circularObj.circularRef = response;
      circularObj.list = [ circularObj, circularObj ];
      res.send({data: JSON.parse(stringify(circularObj.circularRef.data, null, 2))});
    }).catch(e=> {
        console.log("error",e)
        this.onError(e.toString());
    })
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});