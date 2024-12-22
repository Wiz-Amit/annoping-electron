let intervalId;
let isRunning = false;

document.getElementById("start-stop-button").addEventListener("click", () => {
  const button = document.getElementById("start-stop-button");
  const messages = document.getElementById("messages").value.split(",");
  const interval = parseInt(document.getElementById("interval").value) * 1000;

  if (isRunning) {
    clearInterval(intervalId);
    button.innerText = "Start";
    button.style.backgroundColor = "";
    isRunning = false;
  } else {
    if (messages.length === 0 || isNaN(interval) || interval <= 0) {
      alert("Please enter valid messages and interval.");
      return;
    }

    intervalId = setInterval(() => {
      const message =
        messages[Math.floor(Math.random() * messages.length)].trim();
      new Notification("Notification", { body: message });
    }, interval);

    button.innerText = "Stop";
    button.style.backgroundColor = "red";
    isRunning = true;
  }
});