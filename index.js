let googleDriveKey = {
  "type": "service_account",
  "project_id": "gazemo-drive",
  "private_key_id": "69bb70a4e3c80c37da3587caa66bccc0a04e4dea",
  "private_key": `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjH4ApFB4X2/1j\ntqVIZEQCI8mIY0m0MeqRnpJ5swZgTuDX1ahUmzqopzmS2ic3ODdCujJV/bFcnkr0\nKD5ArdISjFayNCkGzG6PFOYEDsTD8BC+W+XENK3xoq6IKuxn6ns2u9cnrS3aI6mV\nBYJQlUlOqnyQqvWzcvD7j8KTuC+zuWyjERa39fMM39NjdA8pHG2HvbtN8WUx44mY\nBWWGC4bnE+fn2A+darWi9Pw2FBznk4Ol19r22XNOOXgI6EOFDYyYhbAO043dygLf\n6uDm0QQmfHvlNNRlrxcpKrdigSRd43mCyKEKaBbRBhe+9ECpE+Y+gYMb3/BuWUY9\nenNQVOkxAgMBAAECggEAFRppq6bRH9gTh3dlGaDzFW3I0E68BcZhaNZhb8Ij5Ii/\n2Nxoyw1MAO6laaS0ZxXsPEM3aN2JuQg3fS/Jofd60nB6dNJ/rkP7V6JmAYdhmFGx\n8NaVupTwHe8kcjRPYkA5EYMqmhTy9iIf+cn9Kmytz7IJrHOZls4bdAgMrayp6y+w\niGzuLaO1g4+wXDAmGUN+BXp8Jo09F2dCXTt3K4DvOZWTt7pVg+4G0farDq/6lsgP\noo3IzcWLfstFSUPq7mm+ZiJpzccfsQcyeB1JHZrUQChJN4vP7mtJYrkAkswhyJTt\nkUxTQunH4QHiza+vPQFEgzBj+W+3N4iWnJnd779XUwKBgQDOC+aw2ITJq2M88AHB\nCq+YNhyg2HsNs88YTBUu/yc8iS76Hc+0ivxKHbIhVAb4aCqrXsdm5gYr7a8zVE0i\nTdpg4aMrMWnGL4FCk5dOsLHaqppyzMrkph6RVhq9VyVVfKL1wArKXVrZCGxiiiFE\nquB9ABUPVq5Eg1sWFgm9wwUOOwKBgQDKq5fNhtsu7agCUqPzV9n2ATjx97FC1eN5\nke7nCsatqMQsoPt4fPReRAMhQSlSAd+V2Odg84Lwh2RMBsXZLYR1b9BUN3BZHu0k\ngLC2dm/I0XOiiAZuzDlvGmoNOT9RT8VVa9DzGLEvoQXtzYfhBiREriEc+5kQ/CJH\n2cRM2czTgwKBgQCO3k2tHdSlCUOcQ0bUFZa/0fVzyec5Dw5v6IFfvufz36NFJlqY\n8y4QLhsPZPYYVBISFXvp62EoIHy0+KUrPhRHzOyYzIBtPQ9BnJjzpS0NU/IX28xr\nUowrdirAUqa+adeM0wYoXybZCjAs+14qANn7ko0Hv7DCLNqBq/JBM/JTdQKBgA4q\nomjOZWHJYPYQmr82w9iLS1S2kKBwXP8xcTabLToUUuofspRAf8BbFrDrYh0GXn+V\n8s53Fw8DF8KssoW0xc6Dq1dHrMW+AKuNh0ypyLSL135j7bcu9VDL0t/rwX5Iii2n\nZKqpbjE7GzP9KuNSz5Qxa8Uf3Rov1aGaGjuY+dVLAoGAcX7Pj5JsEf1r1RZwTLE4\nmRX52eoCOhH5k6UaA6cmwyURn/O6ij7ZQVpfNzjpPSn2mr4HMLZUDdZ2+bfRz8K/\n70jMoiiQUb8WWjAKk0jipNMjrq32AU9oh07Aw9xxJ7aVJBEq/2fEpVidjgLKcaGe\nEclyaO8HTTL97JhBugOz4XY=\n-----END PRIVATE KEY-----\n`,
  "client_email": "gazemo-drive@gazemo-drive.iam.gserviceaccount.com",
  "client_id": "116208028797023172096",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/gazemo-drive%40gazemo-drive.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
  "face_path_folder_id": "1Bw-8pT3HuRLuHPi60BKnRqCN5iZ7nTNN",
  "screen_path_folder_id": "1KTZFhdRZYGLB4regN2Kynkc-uXmI25nD"
}

startGazemo("65dad0d9b538f5d48727d83e", 1, googleDriveKey);

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", function () {
  stopGazemo();
});
