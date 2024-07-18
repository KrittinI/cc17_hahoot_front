import html2canvas from "html2canvas";
import playApi from "../api/play";

export const screenShot = async (element, user) => {
  html2canvas(element, { allowTaint: false }).then(async (canvas) => {
    const image = canvas.toDataURL("png");
    const formData = new FormData();
    formData.append("scoreImage", image);
    formData.append("email", user);
    await playApi.sendmailMultiplayer(formData);
  });
};
