import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/courses/home";
import Module from "./pages/module_page/module";
import React, { Suspense } from "react";
import { ModalContext } from "./contexts/modal-context";
import Quiz from "./pages/quiz/quiz";
import { TrackingContext } from "./contexts/tracking-context";
import Download from "./components/dowloadable/download";
import { CertContext } from "./contexts/certificate";

function Routing() {
  return (
    <CertContext>
    <ModalContext>
      <TrackingContext>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/modules" element={<Module />} />
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/test" element={ < Download />} />
            </Routes>
          </Suspense>
        </Router>
      </TrackingContext>
    </ModalContext>
    </CertContext>
  );
}

export default Routing;
