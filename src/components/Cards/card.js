import "./card.scss";
import Btn from "../buttons/btn";
import ModuleBtn from "../buttons/module_btn";
const Card = (props) => {

  const btn = props.data.module ? (
    <Btn data={props.data} completed={props.data.completed} />
  ) : (
    <ModuleBtn data={props.data} />
  );

  return (
    <>
      <div className="card_body">
        <h1>{props.title}</h1>
        <p>{props.duration}</p>
        <p>{props.about}</p>
        {btn}

        {/* <p>5+ people has completed this course.</p> */}
      </div>
    </>
  );
};

export default Card;
