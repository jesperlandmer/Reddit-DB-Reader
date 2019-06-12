
"use strict";

let exphbs = require("express-handlebars");
let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let MySQLStore = require("express-mysql-session")(session);
let dbHelper = require("./server/libs/dbHelper");
let passport = require("passport");
let activitiesDB = require("./server/Model/Events");
let messageDB = require("./server/Model/Message");
let methodOverride = require("method-override");
let GetChatResource = require("./server/routes/resources/chat/GetChatResource");
let GetMessagesResource = require("./server/routes/resources/chat/GetMessagesResource");
let GetProfileResource = require("./server/routes/resources/profile/GetProfileResource");

// Setup ------------------------------------------------------

let app = express();
let server = require("http").createServer(app);
let port = process.env.PORT || 8000;
let sessionStore = new MySQLStore({}, dbHelper.connection);

// Listen ------------------------------------------------------

server.listen(port, function() {

    console.log("Listening on port " + port);
});

// Start Web Socket
var io = require("socket.io")(server);
module.exports.io = io;

// Config ------------------------------------------------------

// Open connection to Socket.io
io.on("connection", (socket) => {

    activitiesDB.findAll({}, function(err, result) {
        if (err) {
            throw err
        }

        socket.emit("activities", result);
    });

    socket.on("chatRoom", (data) => {

        socket.join(data.room);

        GetChatResource(data.room)
            .then(chat => GetMessagesResource(chat))
            .then(messages => {io.sockets.in(data.room).emit("chatHistory", messages)})
            .catch(err => {throw err});
    });

    socket.on("newMessage", (data) => {

        messageDB.addOne(data.message, function(err, result) {
            if (err) {
                throw err
            }

        });

        io.sockets.in(data.message.message_chat_id).emit("newMessage", data);
    });
});

// Set engine handlebars
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

passport.serializeUser(function(user, done) {
    done(null, user._json);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Start Passport Session
app.use(session({
    key: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());

app.use(passport.session());

// Parse the URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

// Set static files
app.use(express.static(__dirname + "/client"));

// Use routes from /server/routes-directory
app.use("/", require("./server/routes/routes"));

// Error handling ------------------------------------------------------

// Send status 404 if page not found
app.use(function(req, res, next) {
    res.status(404).send("error/404");
});

// Send status 500 if page was broken
app.use(function(err, req, res, next) {
    res.status(500).send("error/500");
});

module.exports = app;
