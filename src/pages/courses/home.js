import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { CreateTrackContext } from "../../contexts/tracking-context";
import "./home.scss";
import Card from "../../components/Cards/card";
import { useEffect, useState, useContext } from "react";
import axios from "axios";



function Home() {

  const [courses, setCourses] = useState([]);
  const [tracking_state, tracking_dispatch] = useContext(CreateTrackContext);
  const couses_ls = courses.map((data) => (
    <li key={data.id}>
      <Card
        title={data.title}
        duration={data.duration}
        about={data.about}
        data={{
          id: data.id,
          type: "module",
          module: false,
          completed: data.completed
        }}
      />
    </li>
  ));

  useEffect(() => {

  }, []);

  useEffect(() => {
    const getToken = async () => {
      await axios
        .post("http://127.0.0.1:8000/public/authenticate", {
          name: "Decory",
          location: "001",
          email: "dherbert@paradigm.com",
        })
        .then((data) => {
          tracking_dispatch({ type: "setToken", token: data.data });
          localStorage.setItem('xaccess', data.data )

          const url = "http://127.0.0.1:8000/public/courses";
          const getCourses = async () => {
            try {
              await axios.get(url,                       
                {
                headers: {
                  xaccess: String(data.data),
                },
              }).then((response) => {
                if (response.status == 200) {
                  setCourses(response.data);
                }
              });
            } catch (error) {
              console.log(error.response.data);
            }
          };
      
          getCourses();
        });
    };
    getToken();
  }, []);

  return (
    <>
      <Header />
      <section id="intro-container">
        <div id="written-intro">
          <h1 id="intro-name">Hi John!</h1>
          <p id="intro-txt">
            Jasper is a ghost a ghost that is not casper. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged.
          </p>
        </div>
        <div id="video-intro">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YYzGKrjHK9o"
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            // allowfullscreen
          ></iframe>
        </div>
      </section>

      <div id="separator-holder">
        <hr id="separator" />
      </div>
      <section id="courses_anchor">
        <div className="courses-title-wrapper">
          <h1>2023 Courses</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and <br />{" "}
            typesetting industry. Lorem Ipsum has been the.
          </p>
        </div>

        <div className="card-holder">
          <div id="card-container">
            <div id="ls_container">
              <ul>{couses_ls}</ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
