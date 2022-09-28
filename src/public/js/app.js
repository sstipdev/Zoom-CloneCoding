const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const camera = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;

const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((devices) => devices.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
};

const getMedia = async (deviceId) => {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: {
      deviceId: {
        exact: deviceId,
      },
    },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstrains);
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
};

getMedia();

const handleMuteClick = () => {
  myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));

  if (!muted) {
    muteBtn.innerText = "음소거 해제";
    muted = true;
  } else {
    muteBtn.innerText = "음소거";
    muted = false;
  }
};

const handleCameraClick = () => {
  myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    camera.innerText = " 카메라 종료";
    cameraOff = false;
  } else {
    camera.innerText = " 카메라 켜기";
    cameraOff = true;
  }
};

const handleCameraChange = async () => {
  const cameraId = camerasSelect.value;
  await getMedia(cameraId);
};

muteBtn.addEventListener("click", handleMuteClick);
camera.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);
