const container1 = document.createElement("div");
const content1 = document.createElement("div");
const title1 = document.createElement("h4");
const message1 = document.createElement("p");
const video1 = document.createElement("video");
const canvas1 = document.createElement("canvas");
const previewContainer1 = document.createElement("div");
const textPreview1 = document.createElement("p");
const btnContainer1 = document.createElement("div");
const btnShare1 = document.createElement("button");
const btnOk1 = document.createElement("button");

function startGazeTracking() {
  showScreenModal1();
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
    "To enable a secured examination, this form require you to share your <b>entire screen.</b>";
  message1.style.fontSize = "14px";
  message1.style.color = "rgb(55 65 81)";
  message1.style.margin = "12px 0 0";
  message1.style.padding = "0";
  content1.appendChild(message1);

  textPreview1.textContent = "Preview:";
  textPreview1.style.fontSize = "14px";
  textPreview1.style.color = "rgb(55 65 81)";
  content1.appendChild(textPreview1);

  previewContainer1.style.height = "300px";
  previewContainer1.style.width = "70%";
  previewContainer1.style.backgroundColor = "#fff";
  previewContainer1.style.marginLeft = "auto";
  previewContainer1.style.marginRight = "auto";
  content1.appendChild(previewContainer1);

  btnContainer1.style.display = "flex";
  btnContainer1.style.justifyContent = "space-between";
  content1.appendChild(btnContainer1);

  btnShare1.textContent = "Share screen";
  btnShare1.style.fontWeight = "600";
  btnShare1.style.backgroundColor = "#fff";
  btnShare1.style.border = "1px solid #bababa";
  btnShare1.style.borderRadius = "8px";
  btnShare1.style.textDecoration = "none";
  btnShare1.style.width = "40%";
  btnShare1.style.padding = "15px 0 15px 0";
  btnShare1.style.fontWeight = "600";
  btnShare1.style.color = "#275907";
  btnContainer1.appendChild(btnShare1);

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

  document.body.appendChild(container1);
  disableScroll();
}
