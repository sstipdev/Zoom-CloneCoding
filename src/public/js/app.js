const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const camera = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

const getMedia = async () => {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
};

getMedia();

const handleMuteClick = () => {
  if (!muted) {
    muteBtn.innerText = "음소거 해제";
    muted = true;
  } else {
    muteBtn.innerText = "음소거";
    muted = false;
  }
};

const handleCameraClick = () => {
  if (cameraOff) {
    camera.innerText = " 카메라 종료";
    cameraOff = false;
  } else {
    camera.innerText = " 카메라 켜기";
    cameraOff = true;
  }
};

muteBtn.addEventListener("click", handleMuteClick);
camera.addEventListener("click", handleCameraClick);
