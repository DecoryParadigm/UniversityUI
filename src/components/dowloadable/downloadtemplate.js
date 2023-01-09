import html2canvas from "html2canvas";
import { useEffect } from "react";
import Home from "../../pages/courses/home";

export const downloadTemplate = async () => {

  const element = document.getElementById("title-holder"),
    canvas = await html2canvas(element),
    data = canvas.toDataURL("image/jpg"),
    link = document.createElement("a");

  link.href = data;
  link.download = "download-image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return (
    <>
        <Home />
    </>
  );
};
