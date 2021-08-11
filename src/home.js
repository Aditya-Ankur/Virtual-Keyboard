import React, { useState } from "react";
import TypingAnimation from "typewriter-effect";
import { useHistory } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function Typewriter() {
  return (
    <>
      <TypingAnimation
        onInit={(typewriter) => {
          typewriter
            .typeString("On Screen Keyboard")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Made with React")
            .pauseFor(2000)
            .deleteAll()
            .typeString("With Dark mode")
            .pauseFor(2000)
            .deleteChars(9)
            .typeString("Light mode")
            .pauseFor(2000)
            .start();
        }}
        options={{ loop: true }}
      />
    </>
  );
}

function Home() {
  document.body.style.background =
    "linear-gradient(90deg, rgba(57,57,167,1) 0%, rgba(0,209,251,1) 100%)";
  document.body.style.color = "white";

  const [progress, setProgress] = useState(100);
  const { push } = useHistory();
  return (
    <>
      <LoadingBar
        color="#e61b1b"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={false}
      />
      <div className="typewriter">
        <Typewriter />
      </div>
      <div style={{ display: "flex", marginTop: "15vh" }}>
        <button
          type="button"
          className="light-mode-page-btn"
          onMouseOver={() => {
            document.body.style.background = "white";
            document.body.style.color = "black";
          }}
          onMouseOut={() => {
            document.body.style.background =
              "linear-gradient(90deg, rgba(57,57,167,1) 0%, rgba(0,209,251,1) 100%)";
            document.body.style.color = "white";
          }}
          onClick={() => push("/light")}
        >
          Light Mode
        </button>
        <button
          type="button"
          className="dark-mode-page-btn"
          onMouseOver={() => {
            document.body.style.background = "rgb(0, 0, 0, 0.93)";
          }}
          onMouseOut={() => {
            document.body.style.background =
              "linear-gradient(90deg, rgba(57,57,167,1) 0%, rgba(0,209,251,1) 100%)";
          }}
          onClick={() => push("/dark")}
        >
          Dark Mode
        </button>
      </div>
    </>
  );
}

export default Home;
