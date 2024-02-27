startGazemo("65dad0d9b538f5d48727d83e", 1, googleDriveKey);

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", function () {
  stopGazemo();
});
