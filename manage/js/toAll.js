// Notification Sound
const notificationSound = new Audio("./assets/soundEffects/neworder.mp3");
// Function to get the current date and time in "DD/MM/YYYY HH:MM AM/PM" format
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
function cantdonethis() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "info",
    title: "Can't do this operation",
    text: "You must reload the page first.",
    showConfirmButton: true,
    confirmButtonText: "Reload",
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload(); // Reloads the page when the button is clicked
    }
  });
}

// External function to play notification sound
function playNotificationSound() {
  notificationSound.currentTime = 0; // Reset sound to start
  notificationSound
    .play()
    .catch((err) => console.error("Audio play failed:", err));
}
