let gazeTracking = false;
let pageVisibility = false;

// Start gazemo API
function startGazemo(luConfigToken, examineeId, googleDriveKey) {
  axios
    .get("https://gazemo-api.onrender.com/api/luConfig/" + luConfigToken)
    .then((response) => {
      gazeTracking = response.data.items.gazeStatus;
      pageVisibility = response.data.items.pageVisibilityStatus;

      saveGoogleDriveKey(googleDriveKey)
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

function saveGoogleDriveKey(googleDriveKey) {
  setCookie("g_type", googleDriveKey.type);
  setCookie("g_project_id", googleDriveKey.project_id);
  setCookie("g_private_key_id", googleDriveKey.private_key_id);
  setCookie("g_client_email", googleDriveKey.client_email);
  setCookie("g_client_id", googleDriveKey.client_id);
  setCookie("g_auth_uri", googleDriveKey.auth_uri);
  setCookie("g_token_uri", googleDriveKey.token_uri);
  setCookie("g_auth_provider", googleDriveKey.auth_provider_x509_cert_url);
  setCookie("g_client_cert", googleDriveKey.client_x509_cert_url);
  setCookie("g_universe_domain", googleDriveKey.universe_domain);
  setCookie("g_face_path", googleDriveKey.face_path_folder_id);
  setCookie("g_screen_path", googleDriveKey.screen_path_folder_id);

  const p = document.createElement('p');
  p.setAttribute("id", "g_key");
  p.setAttribute("data-key", googleDriveKey.private_key)
  p.style.display = "none";
  document.body.appendChild(p);
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
