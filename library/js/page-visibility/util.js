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

let isShared = false;
let deviceNotSupported = false;
let switchCounter = 0;

const container = document.createElement("div");
const content = document.createElement("div");
const title = document.createElement("h4");
const message = document.createElement("p");
const video = document.createElement("video");
const canvas = document.createElement("canvas");
const previewContainer = document.createElement("div");
const textPreview = document.createElement("p");
const btnContainer = document.createElement("div");
const btnShare = document.createElement("button");
const btnOk = document.createElement("button");

// Start page visibility
function startPageVisibility() {
  if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
    checkState();
  } else {
    deviceNotSupported = true;
  }
}

// Stop page visibility
function stopPageVisibility() {
  stopSharing(video.srcObject);
  updateTabCounter(getCookie("examinee"));
}

// Display modal function
function showScreenModal() {
  // styling UI
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  container.style.right = "0";
  container.style.bottom = "0";
  container.style.height = "100vh";
  container.style.width = "100%";
  container.style.backgroundColor = "rgba(117,117,117,0.8)";
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.fontFamily = "Inter,sans-serif";

  content.style.height = "auto";
  content.style.width = "50%";
  content.style.backgroundColor = "#fff";
  content.style.borderRadius = "8px";
  content.style.padding = "18px 15px";
  container.appendChild(content);

  title.textContent = "Screen Permission";
  title.style.color = "rgb(31, 41, 55)";
  title.style.margin = "0";
  title.style.padding = "0";
  content.appendChild(title);

  message.innerHTML =
    "To enable a secured examination, this form require you to share your <b>entire screen.</b>";
  message.style.fontSize = "14px";
  message.style.color = "rgb(55 65 81)";
  message.style.margin = "12px 0 0";
  message.style.padding = "0";
  content.appendChild(message);

  textPreview.textContent = "Preview:";
  textPreview.style.fontSize = "14px";
  textPreview.style.color = "rgb(55 65 81)";
  content.appendChild(textPreview);

  previewContainer.style.height = "300px";
  previewContainer.style.width = "70%";
  previewContainer.style.backgroundColor = "#fff";
  previewContainer.style.marginLeft = "auto";
  previewContainer.style.marginRight = "auto";
  content.appendChild(previewContainer);

  btnContainer.style.display = "flex";
  btnContainer.style.justifyContent = "space-between";
  content.appendChild(btnContainer);

  btnShare.textContent = "Share screen";
  btnShare.style.fontWeight = "600";
  btnShare.style.backgroundColor = "#fff";
  btnShare.style.border = "1px solid #bababa";
  btnShare.style.borderRadius = "8px";
  btnShare.style.textDecoration = "none";
  btnShare.style.width = "40%";
  btnShare.style.padding = "15px 0 15px 0";
  btnShare.style.fontWeight = "600";
  btnShare.style.color = "#275907";
  btnContainer.appendChild(btnShare);

  btnOk.textContent = "I understand";
  btnOk.style.fontWeight = "600";
  btnOk.style.backgroundColor = "#1C7B30";
  btnOk.style.border = "1px solid #1C7B30";
  btnOk.style.borderRadius = "8px";
  btnOk.style.textDecoration = "none";
  btnOk.style.width = "40%";
  btnOk.style.padding = "15px 0 15px 0";
  btnOk.style.fontWeight = "600";
  btnOk.style.color = "#fff";
  btnContainer.appendChild(btnOk);

  document.body.appendChild(container);
  disableScroll();
}

// Start sharing screen function
function startSharing() {
  const options = {
    audio: false,
    video: true,
    video: { displaySurface: "monitor" },
  };
  navigator.mediaDevices
    .getDisplayMedia(options)
    .then(handleSuccess, handleError);
}

// Stop sharing screen function
function stopSharing(stream) {
  stream.getTracks().forEach((track) => track.stop());
  isShared = false;
}

// Check if buttons in modal is enabled or disabled
function checkButtonStatus() {
  if (!isShared) {
    btnOk.disabled = true;
    btnOk.style.opacity = "0.8";
    btnOk.style.cursor = "default";
    btnOk.addEventListener("mouseover", function () {
      btnOk.style.opacity = "0.8";
    });
    btnOk.addEventListener("mouseout", function () {
      btnOk.style.opacity = "0.8";
    });

    btnShare.disabled = false;
    btnShare.style.opacity = "1";
    btnShare.style.cursor = "pointer";
    btnShare.addEventListener("mouseover", function () {
      btnShare.style.backgroundColor = "#ebebeb";
    });
    btnShare.addEventListener("mouseout", function () {
      btnShare.style.backgroundColor = "#fff";
    });
  } else {
    btnOk.disabled = false;
    btnOk.style.opacity = "1";
    btnOk.style.cursor = "pointer";
    btnOk.addEventListener("mouseover", function () {
      btnOk.style.opacity = "0.9";
    });
    btnOk.addEventListener("mouseout", function () {
      btnOk.style.opacity = "1";
    });

    btnShare.disabled = true;
    btnShare.style.opacity = "0.8";
    btnShare.style.cursor = "default";
    btnShare.addEventListener("mouseover", function () {
      btnShare.style.backgroundColor = "#ebebeb";
    });
    btnShare.addEventListener("mouseout", function () {
      btnShare.style.backgroundColor = "#ebebeb";
    });
  }
}

// Handler to check if screen is successfully shared
function handleSuccess(stream) {
  const displaySurface = stream
    .getVideoTracks()[0]
    .getSettings().displaySurface;

  if (displaySurface !== "monitor") {
    stopSharing(stream);
    checkButtonStatus();
  } else {
    video.srcObject = stream;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = "auto";
    previewContainer.appendChild(video);

    isShared = true;
    checkState();

    stream.getVideoTracks()[0].addEventListener("ended", () => {
      isShared = false;
      checkState();
    });
  }
}

// Handler to check if screen failed to share
function handleError(error) {
  console.log(`getDisplayMedia error: ${error.name}`, error);
}

// Check page visibility state
function checkState() {
  checkButtonStatus();

  if (!isShared) {
    showScreenModal();
  }
}

// Function for capturing screen image
function takeScreenShot() {
  canvas.height = 720;
  canvas.width = 1280;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const screenshotURL = canvas.toDataURL("image/jpeg", 1.0);
  uploadImage(screenshotURL);
}

// Random timer screenshot
function randomizer() {
  let randomValue = Math.random() * 3 + 0.5;
  let timer = Math.round(randomValue * 2) / 2;

  if (isShared) {
    takeScreenShot();
  }
  setTimeout(randomizer, timer * 60000);
}

// Upload image
function uploadImage(image) {
  const file = new Blob([image], { type: "image/png" });

  var data = new FormData();
  data.append("examTakenId", getCookie("examinee"));
  data.append("image", file);

  axios
    .post("https://gazemo-api.onrender.com/api/upload/screen", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.error(error));
}

// Update switch tab counter
function updateTabCounter(takenId) {
  axios
    .post(
      "https://gazemo-api.onrender.com/api/examTaken/update/" + takenId,
      { switchTabCounter: switchCounter },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (!response.data.error) {
        console.log("Switch tab counter updated");
      }
    })
    .catch((error) => console.error(error));
}

// Button event listeners
btnShare.addEventListener("click", function () {
  startSharing();
});

btnOk.addEventListener("click", function () {
  container.style.display = "none";
  enableScroll();
});

document.addEventListener("visibilitychange", () => {
  if (isShared) {
    if (document.hidden) {
      switchCounter += 1;
      setTimeout(() => takeScreenShot(), 300);
    }
  } else if (deviceNotSupported) {
    if (document.hidden) {
      switchCounter += 1;
    }
  }
});

randomizer(); // for random screen shot
