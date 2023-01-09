import { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { createBrowserHistory } from "history";
import { CertificateContext } from "../../contexts/certificate.js";
import html2canvas from "html2canvas";
import "./modal.scss";

function CertificateModal(props) {




  const downloadTemplate = async () => {
    const element = document.getElementById("download-content"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "download-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  let history = createBrowserHistory();
  let [state, certdispatch] = useContext(CertificateContext);

  let unlisten = history.listen(({ location, action }) => {
    if (action == "POP") {
      certdispatch({ type: "setCert", bol: false, name: "Decory Herbert" });
    }
  });
  useEffect(() => {}, [state, props]);

  return (
    <>
      <Modal
        show={state.active}
        onHide={state.active}
        animation={true}
        id="modal-body"
      >
        <button
          className="close-btn"
          onClick={() =>
            certdispatch({
              type: "setCert",
              bol: false,
              name: "Decory Herbert",
            })
          }
        >
          X
        </button>
        <Modal.Body className="modal-body" id='download-content'>
          <h1>Download Content</h1>
          <p>This is about to be downloaded</p>



        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button onClick={downloadTemplate} className="global-btn iframe-btn">
            Download
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CertificateModal;
