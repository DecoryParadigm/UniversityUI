import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";
import { UseModalContext } from "../../contexts/modal-context.js";
import "./modal.scss";
import { CreateTrackContext } from "../../contexts/tracking-context.js";



function MyVerticallyCenteredModal(props) {
  let history = createBrowserHistory();
  let [state, dispatch] = useContext(UseModalContext);
  const [tracking_state, __] = useContext(CreateTrackContext);
  let unlisten = history.listen(({ location, action }) => {
    if (action == "POP") {
      dispatch({ type: "clear_state", link: "#", id: 0 });
    }
  });
  useEffect(() => {}, [state, props]);

  return (
    <>
      <Modal show={state.active} onHide={state.active} animation={true} id="modal-body">
        <button
          className="close-btn"
          onClick={() => dispatch({ type: "clear_state", link: "#", id: 0 })}
        >
          X
        </button>
        <Modal.Body className="modal-body">
          <embed className="info-feed" src={state.link}></embed>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <NavLink to={`/quiz/${state.id}`} className="global-btn iframe-btn">
            Take Quiz
          </NavLink>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MyVerticallyCenteredModal;
