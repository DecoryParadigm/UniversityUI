import html2canvas from "html2canvas";



const Download = () => {
    const handleImageDownload = async () => { 
        const element = document.getElementById("print"),
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/jpg'), 
        link = document.createElement('a');

        link.href = data;
        link.download = 'download-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }
  return (
    <>
      <button type="button" onClick={handleImageDownload}>Download</button>
      <div id="print"> 
        <h1>Hello World</h1>
        <p>Create with canvas</p>
    </div>
    </>
  );
};

export default Download;
