const socket = io("/");

let myVideoStream;
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
const peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
});

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      setTimeout(() => {
        // user joined
        connectToNewUser(userId, stream);
      }, 500);
    });
  });
peer.on("open", (id) => {
  // console.log(id);
  socket.emit("join-room", room_ID, id);
});

// socket.emit('join-room',room_ID);

const connectToNewUser = (userId, stream) => {
  console.log("New user connected-->", userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
  // console.log(call.peer);
};
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  document.getElementById("video-grid").append(video);
};

socket.on("user-disconnected", (userId) => {
  console.log("user disconnected");
  if (peers[userId]) {
    peers[userId].close();
  }
  for (id in peers) {
    if (id != userId) {
      location.reload(true);
    }
  }
  window.close();
});

// let text=document.getElementsByTagName("input")[0];
let text = $("input");
console.log(text);

$("html").keydown((e) => {
  if (e.which == 13 && text.val().length != 0) {
    // console.log(text.val());
    socket.emit("message", text.val());
    text.val("");
  }
});

socket.on("createMessage", (message, user) => {
  // console.log(message,"this is coming from server");

  // console.log(message);

  // for (p in peers) {
  //   console.log(p);
  //   if (p== user) {
  //     console.log(message);
  $("ul").append(`<li class='message'><b>${user}</b><br/>${message}</li>`);
  //     }
  //   }
});

const scrollToBottom = () => {
  let d = $(".main__chat_window");
  d.scrollTop(d.prop("scrollHeight"));
};

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    setMuteButton();
  }
};

const setMuteButton = () => {
  const html = `<i class="fas fa-microphone"></i>
  <span>Mute</span>`;

  document.querySelector(".main__mute_button").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `<i class="unmute fas fa-microphone-slash"></i>
  <span>Unmute</span>`;

  document.querySelector(".main__mute_button").innerHTML = html;
};

const playStop = () => {
  console.log("object");
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  console.log(enabled);
  if (enabled) {
    // console.log(myVideoStream.getVideoTracks()[0].stop());
    myVideoStream.getVideoTracks()[0].enabled= false;

    // myVideoStream.setVideoTracks()[0]=false;
    // myVideoStream.setVideoTracks()[0]=false;
    setPlayVideo();
  } else {
    setStopVideo();
    myVideoStream.getVideoTracks()[0].enabled= true;
    // myVideoStream.setVideoTracks()[0]=true;
  }
};

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `;
  document.querySelector(".main__video_button").innerHTML = html;
};

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `;
  document.querySelector(".main__video_button").innerHTML = html;
};

document.querySelector(".leave_meeting").addEventListener("click", () => {
  socket.emit("leaveRoom");
});

const chat = () => {
  if ($(".main__right")[0].style.display != "none") {
    $(".main__right")[0].style.display = "none";
    $(".main__right")[0].style.flex = 0;
    $(".main__left")[0].style.flex = 1;
  } else {
    $(".main__right")[0].style.display = "flex";
    $(".main__right")[0].style.flex = 0.2;
    $(".main__left")[0].style.flex = 0.8;
  }
};
