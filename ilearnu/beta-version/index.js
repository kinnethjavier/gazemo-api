let gazeTracking = false;
let pageVisibility = false;

// Start gazemo API
function startGazemo(luConfigToken, examineeId) {
  axios
    .get("https://gazemo-api.onrender.com/api/luConfig/" + luConfigToken)
    .then((response) => {
      gazeTracking = response.data.items.gazeStatus;
      pageVisibility = response.data.items.pageVisibilityStatus;

      addExamUser(luConfigToken, examineeId);

      if (gazeTracking && pageVisibility) {
        startGazeTracking();
        btnOk1.addEventListener("click", function () {
          container1.style.display = "none";
          startPageVisibility();
        });
      } else if (gazeTracking) {
        startGazeTracking();
        btnOk1.addEventListener("click", function () {
          container1.style.display = "none";
        });
      } else if (pageVisibility) {
        startPageVisibility();
      } else {
        console.log("Gazemo features is not enabled");
      }
    })
    .catch((error) => console.error(error));
}

// Stop gazemo API
function stopGazemo() {
  if (gazeTracking && pageVisibility) {
    stopPageVisibility();
    stopGazeTracking();
    removeCookie("examinee");
  } else if (gazeTracking) {
    stopGazeTracking();
    removeCookie("examinee");
  } else if (pageVisibility) {
    stopPageVisibility();
    removeCookie("examinee");
  }
}

// Add user when no user was found
function addExamUser(luConfigToken, examineeId) {
  let takenToken = getCookie("examinee");
  let randomCharacter = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++) {
    randomCharacter += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  if (takenToken == "") {
    axios
      .post(
        "https://gazemo-api.onrender.com/api/luData/",
        {
          configId: luConfigToken,
          examinee: examineeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (!response.data.error) {
          const examTakenToken = response.data.item._id;
          setCookie("examinee", examTakenToken);
          console.log("Temporary examinee token created.");
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch((error) => console.error(error));
  }
}

// Cookies
function setCookie(name, value) {
  const date = new Date();
  date.setHours(date.getHours() + 2);
  let expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function removeCookie(cookieName) {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function for disabling scroll
function disableScroll() {
  window.onscroll = function () {
    window.scrollTo(0, 0);
  };
}

// Function for enabling scroll
function enableScroll() {
  window.onscroll = function () {};
}
