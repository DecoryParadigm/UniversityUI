import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { CreateTrackContext } from "../../contexts/tracking-context";
import axios from "axios";
import "./module.scss";
import Card from "../../components/Cards/card";
import CertificateBtn from "../../components/buttons/certificateBtn";
import { createBrowserHistory } from "history";
import { CertificateContext } from "../../contexts/certificate";
import { courseValidation } from "../../actions/actions";


const Module = () => {
  let history = createBrowserHistory();
  const [state, certdispatch] = useContext(CertificateContext)
  const [courseCompleted, setCourseCompletion] = useState(false)

  let unlisten = history.listen(({ location, action }) => {
    console.log(action)
    if (action == "POP") {
      certdispatch({ type: "setCert", bol: false,  name: "Decory Herbert" });
    }
  });

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const [rawModules, setRawModules] = useState([]);
  const module_ls = rawModules.map((data) => (    
    <li key={data.id}>
      <Card
        title={data.title}
        duration={data.duration}
        about=""
        data={{
          id: data.id,
          type: "module",
          module: true,
          completed: data.completed,
          link: data.video_url,
        }}
      />
    </li>
  ));
  const [tracking_state, tracking_dispatch] = useContext(CreateTrackContext);



  useEffect(() => {
    const lsAccess = localStorage.getItem('xaccess')
    const token = tracking_state.token?String(tracking_state.token):String(lsAccess)


    const url = "http://127.0.0.1:8000/public/courses";
    const getCourses = async () => {
      try {
        await axios.get(url,                       
          {
          headers: {
            xaccess: token,
          },
        }).then((response) => {
          if (response.status == 200) {
            console.log(response.data)
            const cv = courseValidation(response.data, id)
            setCourseCompletion(cv)
          }
        });
      } catch (error) {

      }
    };

    getCourses()


    tracking_dispatch({ type: "updated_course_id", course_id: `${id}` });
    const getModules = async () => {
      await axios
        .post(`http://127.0.0.1:8000/public/modules:id=${id}`,
        {}, 
        {
          headers: {
            xaccess:token,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {

            setRawModules(resp.data);
          } else {
          }
        });
    };

    getModules();
  }, []);



  return (
    <>
      <Header />
      <section className="modules-wrapper">
        <div id="title-holder">
          <h1>Begin Your Modules</h1>
        </div>
        <div className="dl-cert">
          <div className="dl-container">
           { 
           courseCompleted
           ?
            <CertificateBtn />
            :
            ""
            }
          </div>
        </div>

        <div id="Modules">
          <ul>{module_ls}</ul>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Module;
