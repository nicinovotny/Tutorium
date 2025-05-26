const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("canvas");
const canvasCtx = canvasElement.getContext("2d");

const hatImage = new Image();
hatImage.src = "hut.png";

canvasElement.width = 640;
canvasElement.height = 480;

const faceMesh = new FaceMesh({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

faceMesh.onResults((results) => {
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  if (results.multiFaceLandmarks.length > 0) {
    const landmarks = results.multiFaceLandmarks[0];

    const forehead = landmarks[10];
    const chin = landmarks[152];

    const dx = (forehead.x - chin.x) * canvasElement.width;
    const dy = (forehead.y - chin.y) * canvasElement.height;
    const headHeight = Math.sqrt(dx * dx + dy * dy);

    const hatWidth = headHeight * 1.5;
    const hatHeight = headHeight * 0.8;

    const x = forehead.x * canvasElement.width - hatWidth / 2;
    const y = forehead.y * canvasElement.height - hatHeight * 1.2;

    canvasCtx.drawImage(hatImage, x, y, hatWidth, hatHeight);
  }
});

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 640,
  height: 480,
});
camera.start();
