// IMPORTS
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
var urlencodedParser = bodyParser.urlencoded({ extended: true })

//VIEW ENGINE AND STATICS
app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));// Set the views directory
app.use("/static", express.static("./static"));
app.use("/peerjs", peerServer);
app.use(express.json());

// GET REQUESTS
app.get('/',(req,res)=>{
  res.render("menuindex");
})
app.get("/new", (req, res) => {
  const id=uuidv4();
  console.log(id);
  res.redirect(`/${id}`);

});
app.post("/join",urlencodedParser,(req,res)=>{
  // console.log("Hffhfhf");
  console.log(req.body.roomid);
  res.redirect(`/${req.body.roomid}`);
  // res.redirect('/end');
  // res.render("index", {roomId: req.body.room_id});
  
})
app.get("/end", (req, res) => {
  // res.sendFile(path.join(__dirname),"./views/ending");
  res.render("ending.ejs");
});
// app.post("/end", (req, res) => {
//   // res.sendFile(path.join(__dirname),"./views/ending");
//   res.render("ending.ejs");
// });
app.get("/:room", (req, res) => {
  res.render("index", { roomId: req.params.room });
});


// ROOM JOINING REQUEST
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userid) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userid);
    console.log("Joined room");

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message,userid);
    });
    socket.on("leaveRoom", () => {
      socket.leave(roomId);
      socket.to(roomId).emit("user-disconnected", userid);

      // socket.on("disconnect", () => {
      // });
    });
  });
});

server.listen(3030);
