const video = document.getElementById("video");
const button = document.getElementById("button");

let captureStream;
async function startCapture() {
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = captureStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (err) {
    document.body.innerHTML = ` <p>if you want to share screen please refresh the site</p>`;
    console.error(`Error: ${err}`);
  }
}
startCapture();

button.addEventListener("click", async () => {
  button.disabled = true;
  video.hidden = true;

  await video.requestPictureInPicture();
  button.disabled = false;
});

video.addEventListener("leavepictureinpicture", () => {
    // თუ გვინდა სტრიმი გაითიშოს მაშინვე, როგორც კი დაიხურება ფანჯარა. ეს არის რესურსების 
    // captureStream.getTracks().forEach((track) => track.stop());
    // // 2. ვიდეო ელემენტის გასუფთავება
    // video.srcObject = null;
  video.hidden = false;
});
