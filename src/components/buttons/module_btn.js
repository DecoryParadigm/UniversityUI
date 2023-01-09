import "./btn.scss";
import { NavLink } from "react-router-dom";

const ModuleBtn = (props) => {

  if(props.data.completed){ 
    
    return (
      <>
        <NavLink to={`/modules?id=${props.data.id}`} style={{backgroundColor: 'green'}} className="global-btn">
          Completed
        </NavLink>
      </>
    );
  }else{ 
    return (
      <>
        <NavLink to={`/modules?id=${props.data.id}`} className="global-btn">
          Begin Course
        </NavLink>
      </>
    );
  };
}



export default ModuleBtn;
