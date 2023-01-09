import "./quiz.scss";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CreateTrackContext } from "../../contexts/tracking-context";
import { UseModalContext } from "../../contexts/modal-context";

const Quiz = () => {
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [endOfQuiz, setEndOfQuiz] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);
  const styles = {
    listStyleType: "none",
    fontSize: "x-large",
    margin: "12px 0 12px 0",
    backgroundColor: "rgb(233, 233, 233)",
    border: "1px solid black",
    color: "black",
    borderRadius: "5px",
  };
  const [tracking_state, tracking_dispatch] = useContext(CreateTrackContext);
  let [state, dispatch] = useContext(UseModalContext);
  const [totalCalc, setTotalCalc] = useState(0);
  let quiz;

const gotocourses = () => { 
  dispatch({ type: "clear_state", link: "#", id: 0 });
  window.location.replace("http://localhost:3000/")
}

const lsAccess = localStorage.getItem('xaccess')
const token = tracking_state.token?String(tracking_state.token):String(lsAccess) 


  useEffect(() => {
    const getQuestions = async () => {
      await axios
        .post(`http://127.0.0.1:8000/public/questions`,
          {
            quiz_id: tracking_state.course_id,
            module_id: tracking_state.module_id,
          },
          {
            headers: {
              xaccess: token,
            },
          }
        )
        .then((resp) => {
          if (resp.status == 200) {
            setTotalCalc(resp.data[resp.data.length - 2]["count"]);
            const server_tracked_data = resp.data[resp.data.length - 1]["submitted"];
             
            if(resp.data[resp.data.length - 3] == undefined ){
              setEndOfQuiz(true)
              setLoaded(true);
              setSubmittedData(server_tracked_data);
            }else{
              setSubmittedData(server_tracked_data);
              setProgress(server_tracked_data.length);
  
            if (questions != []) {
                    setQuestions([]);
                    setQuestions(resp.data);
                  } else {
                    setQuestions(resp.data);
                  }
  
              setLoaded(true);
            }


          } 

        });
    };
    getQuestions();
  }, [score]);

  useEffect(() => {
    const submitModule = async (fs) => { 
      await axios.post('http://127.0.0.1:8000/public/module-submission', 

      {
        quiz_id: tracking_state.course_id,
        module_id: tracking_state.module_id,
        score: fs
      },
      {
        headers: {
          xaccess: token,
        },
      }
    ).then((resp) => {
        console.log(resp)
      });
      
    }
    var sc = 0

    if (endOfQuiz) {
      for(var i=0; i < submittedData.length; i++){
        sc = sc + submittedData[i][i+1]
      }
      const fs = parseInt(((sc / totalCalc) * 100).toFixed(2));
      setFinalScore(fs);

      submitModule(fs)
    }
  }, [endOfQuiz]);

  if (loaded) {

    const submitQuestion = (id, val) => {


        const submitQuestions = async () => {
          await axios
            .post(
              "http://127.0.0.1:8000/public/module-tracking",
              {
                quiz_id: tracking_state.course_id,
                module_id: tracking_state.module_id,
                question_id: String(id),
                ans_value: parseInt(val),
              },
              {
                headers: {
                  xaccess: token,
                },
              }
            )
            .then((promise) => {
              if (promise.status == 200 && progress < totalCalc) {
                setProgress(progress + 1);
                setQuestions(questions);
  
                const getQuestions = async () => {
                  await axios
                    .post(
                      `http://127.0.0.1:8000/public/questions`,
                      {
                        quiz_id: tracking_state.course_id,
                        module_id: tracking_state.module_id,
                      },
                      {
                        headers: {
                          xaccess: token,
                        },
                      }
                    )
                    .then((resp) => {
                      if (resp.status == 200) {
                    const server_tracked_data = resp.data[resp.data.length - 1]["submitted"];      
                     if(resp.data[resp.data.length - 3] == undefined ){
                     setEndOfQuiz(true)
                     setLoaded(true);
                     setSubmittedData(server_tracked_data);
                     }else{
                      setQuestions(resp.data);
                      console.log(resp);
                     }

                      }
                    });
                };
                getQuestions();
              }
            });
        };
        submitQuestions()
     



      var n = parseInt(val, 2);
      if (n == 1) {
        setScore(score + n);
      }
    };

    if (endOfQuiz == false) {
      let question = loaded && questions != undefined ? questions[0].questions : "Loading";
      let question_id = loaded && questions != undefined  ? questions[0].id : "Loading";
      quiz = questions[0].answers.map((data) => (
        <li
          style={styles}
          key={data.id}
          onClick={() => submitQuestion(question_id, data.Status)}
        >
          <div className="options">
            <p id="quiz_number">{data.id}.</p>
            {data.answer}
          </div>
        </li>
      ));

      return (
        <>
          <Header />
          <div className="quiz-content-wrapper">
            <div id="question_container">
              <p>
                {progress}/{totalCalc}
              </p>
              <h1 id="title">{question}</h1>
            </div>
            <ul>{quiz}</ul>
          </div>
          <Footer />
        </>
      );
    } else {

      return (
        <>
          <Header />
          <div className="quiz-content-wrapper">
            <div id="question_container">
              {finalScore >= 50 ? (
                <h1 className="title">
                  Congratulations! <br />
                  You've passed this module!"
                </h1>
              ) : (
                <h1 className="title">
                  Unfortunately failed this module, <br />
                  please try again.
                </h1>
              )}
            </div>
            <h1 id="score">You've scored: {finalScore}%</h1>
            <div className="navigation_link">
    
              <button className="global-btn resultBtn" onClick={gotocourses}>
                Back to Courses
              </button>
            </div>
          </div>
          <Footer />
        </>
      );
    }
  }
};

export default Quiz;
