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

const container = document.createElement("div");
const content = document.createElement("div");
const title = document.createElement("h4");
const message = document.createElement("p");
const video = document.createElement("video");
const canvas = document.createElement("canvas");
const previewContainer = document.createElement("div");
const textPreview = document.createElement("p");
const note = document.createElement("p");
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
  if (!deviceNotSupported) {
    stopSharing(video.srcObject);
  }
}

// Display modal function
function showScreenModal() {
  // styling UI
  container.style.position = "fixed";
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
  container.style.zIndex = "1001";

  content.style.height = "auto";
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

  previewContainer.style.backgroundColor = "#fff";
  previewContainer.style.marginLeft = "auto";
  previewContainer.style.marginRight = "auto";
  content.appendChild(previewContainer);

  note.innerHTML =
    "<b>Note:</b> To share your screen, please click the <b>share screen</b> button below.";
  note.style.fontSize = "14px";
  note.style.color = "rgb(55 65 81)";
  note.style.marginBottom = "18px";
  content.appendChild(note);
  content.appendChild(btnContainer);

  btnShare.textContent = "Share screen";
  btnShare.style.fontWeight = "600";
  btnShare.style.backgroundColor = "#fff";
  btnShare.style.border = "1px solid #bababa";
  btnShare.style.borderRadius = "8px";
  btnShare.style.textDecoration = "none";
  btnShare.style.padding = "15px 0 15px 0";
  btnShare.style.color = "#275907";
  btnContainer.appendChild(btnShare);

  btnOk.textContent = "I understand";
  btnOk.style.fontWeight = "600";
  btnOk.style.backgroundColor = "#1C7B30";
  btnOk.style.border = "1px solid #1C7B30";
  btnOk.style.borderRadius = "8px";
  btnOk.style.textDecoration = "none";
  btnOk.style.padding = "15px 0 15px 0";
  btnOk.style.fontWeight = "600";
  btnOk.style.color = "#fff";
  btnContainer.appendChild(btnOk);

  mediaQuery1();
  document.body.appendChild(container);
  disableScroll();
}

// Media query
function mediaQuery1() {
  if (window.innerWidth < 768) {
    // mobile
    content.style.width = "85%";

    previewContainer.style.height = "230px";
    previewContainer.style.width = "100%";

    video.style.width = "85%";
    video.style.height = "auto";

    btnShare.style.width = "100%";
    btnOk.style.width = "100%";
    btnOk.style.marginTop = "16px";
  } else {
    // bigger screen
    content.style.width = "50%";

    previewContainer.style.height = "260px";
    previewContainer.style.width = "70%";

    video.style.width = "70%";
    video.style.height = "auto";

    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "space-between";

    btnShare.style.width = "40%";
    btnOk.style.width = "40%";
  }
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
    btnOk.style.opacity = "0.3";
    btnOk.style.cursor = "default";
    btnOk.addEventListener("mouseover", function () {
      btnOk.style.opacity = "0.3";
    });
    btnOk.addEventListener("mouseout", function () {
      btnOk.style.opacity = "0.3";
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
    btnShare.style.opacity = "0.3";
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
  var googleKeyCon = document.getElementById("g_key");
  var privateKey = googleKeyCon.getAttribute("data-key");

  var data = new FormData();
  data.append("luDataId", getCookie("examinee"));
  data.append("image", image);
  data.append("type", getCookie("g_type"));
  data.append("project_id", getCookie("g_project_id"));
  data.append("private_key_id", getCookie("g_private_key_id"));
  data.append("private_key", privateKey);
  data.append("client_email", getCookie("g_client_email"));
  data.append("client_id", getCookie("g_client_id"));
  data.append("auth_uri", getCookie("g_auth_uri"));
  data.append("token_uri", getCookie("g_token_uri"));
  data.append("auth_provider_x509_cert_url", getCookie("g_auth_provider"));
  data.append("client_x509_cert_url", getCookie("g_client_cert"));
  data.append("universe_domain", getCookie("g_universe_domain"));
  data.append("face_path_folder_id", getCookie("g_face_path"));
  data.append("screen_path_folder_id", getCookie("g_screen_path"));

  axios
    .post("https://gazemo-api.onrender.com/api/google/upload/screen", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {})
    .catch((error) => console.error(error));
}

// Update switch tab counter
function updateTabCounter(takenId) {
  axios
    .post(
      "https://gazemo-api.onrender.com/api/luData/updateSwitchTab/" + takenId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {})
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
      setTimeout(() => takeScreenShot(), 300);
      updateTabCounter(getCookie("examinee"));
    }
  } else if (deviceNotSupported) {
    if (document.hidden) {
      updateTabCounter(getCookie("examinee"));
    }
  }
});

randomizer(); // for random screen shot