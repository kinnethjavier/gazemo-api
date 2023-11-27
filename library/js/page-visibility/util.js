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

var axiosCDN = document.createElement("script");
axiosCDN.setAttribute("src", "https://unpkg.com/axios/dist/axios.min.js");
document.head.appendChild(axiosCDN);

// const getUsers = () => {
//   axios
//     .get("https://reqres.in/api/users")
//     .then((response) => {
//       const users = response.data.data;
//       console.log(`GET users`, users);
//     })
//     .catch((error) => console.error(error));
// };

let isShared = false;

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

function showScreenModal() {
  checkScreenStatus();
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
  btnShare.style.padding = "15px 60px";
  btnShare.style.cursor = "pointer";
  btnShare.style.fontWeight = "600";
  btnShare.style.color = "#275907";
  btnShare.addEventListener("mouseover", function () {
    btnShare.style.backgroundColor = "#ebebeb";
  });
  btnShare.addEventListener("mouseout", function () {
    btnShare.style.backgroundColor = "#fff";
  });
  btnShare.addEventListener("click", function () {
    shareScreen();
  });
  btnContainer.appendChild(btnShare);

  btnOk.textContent = "I understand";
  btnOk.style.fontWeight = "600";
  btnOk.style.backgroundColor = "#1C7B30";
  btnOk.style.border = "1px solid #1C7B30";
  btnOk.style.borderRadius = "8px";
  btnOk.style.textDecoration = "none";
  btnOk.style.padding = "15px 60px";
  btnOk.style.fontWeight = "600";
  btnOk.style.color = "#fff";
  btnOk.addEventListener("click", function () {
    container.style.display = "none";
  });
  btnContainer.appendChild(btnOk);

  document.body.appendChild(container);
}

function shareScreen() {
  const options = {
    audio: false,
    video: true,
    video: { displaySurface: "monitor" },
  };
  navigator.mediaDevices
    .getDisplayMedia(options)
    .then(handleSuccess, handleError);
}

function checkScreenStatus() {
  if (!isShared) {
    btnOk.disabled = true;
    btnOk.style.opacity = "0.8";
    btnOk.style.cursor = "default";
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
  }
}

function handleSuccess(stream) {
  video.srcObject = stream;
  video.autoplay = true;
  video.height = 280; // in px
  video.width = 500; // in px
  previewContainer.appendChild(video);

  isShared = true;
  checkScreenStatus();

  stream.getVideoTracks()[0].addEventListener("ended", () => {
    console.log("The user has ended sharing the screen");
  });
}

function handleError(error) {
  console.log(`getDisplayMedia error: ${error.name}`, error);
}
