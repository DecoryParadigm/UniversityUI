import "./btn.scss";
import { useContext } from "react";
import CertificateModal from "../Cetificate/certModal";
import { CertificateContext } from "../../contexts/certificate";

const CertificateBtn = () => {
  const [state, certdispatch] = useContext(CertificateContext);


  const CertificateShow = () => {
    const openModal = () => certdispatch({ type: "setCert", bol: true, name: "Decory Herbert" });
    openModal();
    console.log(state)
  };

    return (
      <>
        <CertificateModal id="certBtn" />
        <button className="global-btn" onClick={CertificateShow} >
          Download Certificate
        </button>
      </>
    );
};

export default CertificateBtn;
