startGazemo("65e680c9468da398da6e8f8e", 1, googleDriveKey);

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", function () {
  stopGazemo();
});
