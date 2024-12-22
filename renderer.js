let intervalId;
let isRunning = false;
let notificationCount = 0;
let progressIntervalId;

document.getElementById("start-stop-button").addEventListener("click", () => {
  const button = document.getElementById("start-stop-button");
  const messages = document
    .getElementById("messages")
    .value.split(",")
    .map((msg) => msg.trim())
    .filter((msg) => msg.length > 0);
  const userInterval =
    parseInt(document.getElementById("interval").value) * 1000;
  const notificationCountElement =
    document.getElementById("notification-count");
  const progressElement = document.getElementById("progress");

  if (isRunning) {
    clearInterval(intervalId);
    clearInterval(progressIntervalId);
    button.innerText = "Start";
    button.style.backgroundColor = "";
    isRunning = false;
    progressElement.style.width = "0";
  } else {
    if (messages.length === 0 || isNaN(userInterval) || userInterval <= 0) {
      return;
    }

    notificationCount = 0;
    notificationCountElement.innerText = `Notifications fired: ${notificationCount}`;

    intervalId = setInterval(() => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      new Notification(`Notification: ${notificationCount + 1}`, {
        body: message,
        icon: "icon.ico",
      });
      notificationCount++;
      notificationCountElement.innerText = `Notifications fired: ${notificationCount}`;
      progressElement.style.width = "0";
    }, userInterval);

    progressIntervalId = setInterval(() => {
      const progressWidth = parseFloat(progressElement.style.width) || 0;
      progressElement.style.width = `${progressWidth + 1}%`;
    }, userInterval / 100);

    button.innerText = "Stop";
    button.style.backgroundColor = "red";
    isRunning = true;
  }
});
