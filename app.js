var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    socket = require("socket.io");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var user = 0;

var server = app.listen(process.env.PORT, process.env.IP, function(req, res) {
    console.log("The Talk App has started!!!!!");
});

var io = socket(server);

app.get("/", function(req, res) {
    res.render("index", {user: user});
});

io.on("connection", function(socket) {
    console.log("Made the socket connection in the user number: ", user);
    user += 1;
    
    socket.on("chat", function(data) {
        io.sockets.emit("chat", data);
    });
    
    socket.on("disconnect", function() {
        user -= 1;
        console.log("The user disconnected");
    });
    
    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });
});