var googleFontAPI = document.createElement("link");
googleFontAPI.href = "https://fonts.googleapis.com";
googleFontAPI.rel = "preconnect";
document.head.appendChild(googleFontAPI);

var googleStatic = document.createElement("link");
googleStatic.href = "https://fonts.gstatic.com";
googleStatic.rel = "preconnect";
googleStatic.crossOrigin;
document.head.appendChild(googleStatic);

var interFont = document.createElement("link");
interFont.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap";
interFont.rel = "stylesheet";
document.head.appendChild(interFont);

let isFaceVisible = false;
let context;
let videoWidth, videoHeight;
let startTime = 0;

const container1 = document.createElement("div");
const content1 = document.createElement("div");
const title1 = document.createElement("h4");
const message1 = document.createElement("p");
const video1 = document.createElement("video");
const canvas1 = document.createElement("canvas");
const previewContainer1 = document.createElement("div");
const textPreview1 = document.createElement("p");
const btnContainer1 = document.createElement("div");
const btnRefresh = document.createElement("button");
const btnOk1 = document.createElement("button");

function startGazeTracking() {
  checkState1();
}

function stopGazeTracking() {
  stopSharing(video1.srcObject);
}

function showScreenModal1() {
  // styling UI
  container1.style.position = "absolute";
  container1.style.top = "0";
  container1.style.left = "0";
  container1.style.right = "0";
  container1.style.bottom = "0";
  container1.style.height = "100vh";
  container1.style.width = "100%";
  container1.style.backgroundColor = "rgba(117,117,117,0.8)";
  container1.style.display = "flex";
  container1.style.justifyContent = "center";
  container1.style.alignItems = "center";
  container1.style.fontFamily = "Inter,sans-serif";

  content1.style.height = "auto";
  content1.style.width = "50%";
  content1.style.backgroundColor = "#fff";
  content1.style.borderRadius = "8px";
  content1.style.padding = "18px 15px";
  container1.appendChild(content1);

  title1.textContent = "Camera Permission";
  title1.style.color = "rgb(31, 41, 55)";
  title1.style.margin = "0";
  title1.style.padding = "0";
  content1.appendChild(title1);

  message1.innerHTML =
    "To enable a secured examination, this form require you to open your <b>camera.</b>";
  message1.style.fontSize = "14px";
  message1.style.color = "rgb(55 65 81)";
  message1.style.margin = "12px 0 0";
  message1.style.padding = "0";
  content1.appendChild(message1);

  textPreview1.textContent = "Preview:";
  textPreview1.style.fontSize = "14px";
  textPreview1.style.color = "rgb(55 65 81)";
  content1.appendChild(textPreview1);

  previewContainer1.style.height = "260px";
  previewContainer1.style.width = "70%";
  previewContainer1.style.backgroundColor = "#fff";
  previewContainer1.style.marginLeft = "auto";
  previewContainer1.style.marginRight = "auto";
  previewContainer1.style.display = "flex";
  previewContainer1.style.justifyContent = "center";
  previewContainer1.style.marginBottom = "20px";
  content1.appendChild(previewContainer1);

  btnContainer1.style.display = "flex";
  btnContainer1.style.justifyContent = "space-between";
  content1.appendChild(btnContainer1);

  btnRefresh.textContent = "Refresh";
  btnRefresh.style.fontWeight = "600";
  btnRefresh.style.backgroundColor = "#fff";
  btnRefresh.style.border = "1px solid #bababa";
  btnRefresh.style.borderRadius = "8px";
  btnRefresh.style.textDecoration = "none";
  btnRefresh.style.width = "40%";
  btnRefresh.style.padding = "15px 0 15px 0";
  btnRefresh.style.fontWeight = "600";
  btnRefresh.style.color = "#275907";
  btnRefresh.style.cursor = "pointer";
  btnRefresh.addEventListener("mouseover", function () {
    btnRefresh.style.backgroundColor = "#ebebeb";
  });
  btnRefresh.addEventListener("mouseout", function () {
    btnRefresh.style.backgroundColor = "#fff";
  });
  btnContainer1.appendChild(btnRefresh);

  btnOk1.textContent = "I understand";
  btnOk1.style.fontWeight = "600";
  btnOk1.style.backgroundColor = "#1C7B30";
  btnOk1.style.border = "1px solid #1C7B30";
  btnOk1.style.borderRadius = "8px";
  btnOk1.style.textDecoration = "none";
  btnOk1.style.width = "40%";
  btnOk1.style.padding = "15px 0 15px 0";
  btnOk1.style.fontWeight = "600";
  btnOk1.style.color = "#fff";
  btnContainer1.appendChild(btnOk1);

  video1.style.width = "70%";
  video1.style.height = "auto";

  document.body.appendChild(container1);
  disableScroll();
}

function checkButtonStatus1() {
  if (!isFaceVisible) {
    btnOk1.disabled = true;
    btnOk1.style.opacity = "0.8";
    btnOk1.style.cursor = "default";
    btnOk1.addEventListener("mouseover", function () {
      btnOk1.style.opacity = "0.8";
    });
    btnOk1.addEventListener("mouseout", function () {
      btnOk1.style.opacity = "0.8";
    });
  } else {
    btnOk1.disabled = false;
    btnOk1.style.opacity = "1";
    btnOk1.style.cursor = "pointer";
    btnOk1.addEventListener("mouseover", function () {
      btnOk1.style.opacity = "0.9";
    });
    btnOk1.addEventListener("mouseout", function () {
      btnOk1.style.opacity = "1";
    });
  }
}

function checkState1() {
  checkButtonStatus1();

  if (!isFaceVisible) {
    showScreenModal1();

    setupCamera()
      .then(() => {
        // load the model
        return loadFaceLandmarkDetectionModel();
      })
      .then((loadedModel) => {
        model = loadedModel;

        // render Face Mesh Prediction
        renderPrediction();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function setupCamera() {
  return new Promise(function (resolve, reject) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video1.srcObject = stream;
        video1.autoplay = true;
        video1.onloadedmetadata = () => {
          videoWidth = video1.videoWidth;
          videoHeight = video1.videoHeight;
          video1.width = videoWidth;
          video1.height = videoHeight;
          resolve(video1);
          previewContainer1.appendChild(video1);
          isFaceVisible = true;
          checkButtonStatus1();
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function loadFaceLandmarkDetectionModel() {
  return faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    { maxFaces: 1 }
  );
}

function renderPrediction() {
  model
    .estimateFaces({ input: video1 })
    .then((predictions) => {
      displayIrisPosition(predictions);

      window.requestAnimationFrame(renderPrediction);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayIrisPosition(predictions) {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;

      if (keypoints.length == 478) {
        // detect if user is looking center, left, or right
        const rightIris = keypoints[471];
        const rightEyeRightCorner = keypoints[263];
        const rightEyeLeftCorner = keypoints[362];

        const gazeDirection = estimateGazeDirection(
          rightIris,
          rightEyeRightCorner,
          rightEyeLeftCorner
        );

        checkGazeDirection(gazeDirection);
      }
    });
  }
}

function estimateGazeDirection(irisCenter, rightPoint, leftPoint) {
  const centerToRightDist = euclideanDistance(irisCenter, rightPoint);
  const totalDistance = euclideanDistance(rightPoint, leftPoint);
  const ratio = centerToRightDist / totalDistance;
  let gazeDirection = "";

  if (ratio > 0.37) {
    gazeDirection = "right";
  } else if (ratio > 0.18 && ratio < 0.37) {
    gazeDirection = "center";
  } else {
    gazeDirection = "left";
  }

  return gazeDirection;
}

// Get eye keypoints distance
function euclideanDistance(point1, point2) {
  const x1 = point1[0];
  const y1 = point1[1];
  const x2 = point2[0];
  const y2 = point2[1];
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function checkGazeDirection(gazeDirection) {
  const currentTime = new Date().getTime();

  if (gazeDirection !== "center") {
    if (startTime === 0) {
      startTime = currentTime;
    } else {
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= 2000) {
        // User has been looking left or right for 2 seconds
        captureFace();
        startTime = 0; // Reset the start time
      }
    }
  } else {
    startTime = 0; // Reset the start time if the user looks to the center
  }
}

function captureFace() {
  canvas1.height = videoHeight;
  canvas1.width = videoWidth;
  canvas1.getContext("2d").drawImage(video1, 0, 0, videoWidth, videoHeight);
  const screenshotURL = canvas1.toDataURL("image/jpeg", 1.0);
  uploadFace(screenshotURL);
}

// Upload image
function uploadFace(image) {
  const file = new Blob([image], { type: "image/png" });

  var data = new FormData();
  data.append("examTakenId", getCookie("examinee"));
  data.append("image", file);

  axios
    .post("https://gazemo-api.onrender.com/api/upload/face", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {})
    .catch((error) => console.error(error));
}

// Button event listeners
btnRefresh.addEventListener("click", function () {
  location.reload();
});

btnOk1.addEventListener("click", function () {
  container1.style.display = "none";
});
