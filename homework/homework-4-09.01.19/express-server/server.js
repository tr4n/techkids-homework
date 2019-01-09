const express = require("express");
const app = express();

app.use(express.static("html-css"));

app.get("/" ,(request, response) => {
    response.sendFile(__dirname + "/html-css/index.html")
});

app.listen("1111", (error) => {
    console.log(error || "Server start success at port: 1111");
});