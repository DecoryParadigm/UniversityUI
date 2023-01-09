import "./btn.scss";
import { useContext } from "react";
import MyVerticallyCenteredModal from "../modal/modal";
import { UseModalContext } from "../../contexts/modal-context";
import { CreateTrackContext } from "../../contexts/tracking-context";
const Btn = (props) => {
  const [_, dispatch] = useContext(UseModalContext);
  const [__, tracking_dispatch] = useContext(CreateTrackContext);

  const handleShow = () => {
    const openModal = () => dispatch({ type: "setModal", link: props.data.link, id: props.data.id });
    tracking_dispatch({ type: "updated_module_id", module_id: props.data.id });
    openModal();
  };

  if(props.completed){
    return (
      <>
        <MyVerticallyCenteredModal id={props.data.id} />
        <button className="global-btn" style={{backgroundColor: 'green'}} >
          Completed!
        </button>
      </>
    );
  }else{ 
    return (
      <>
        <MyVerticallyCenteredModal id={props.data.id} />
        <button className="global-btn" onClick={handleShow}>
          Begin Module
        </button>
      </>
    );
  }

};

export default Btn;
