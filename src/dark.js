import React, { useState } from "react";
import { useHistory } from "react-router";
import LoadingBar from "react-top-loading-bar";
import { Howl } from "howler";
import Swal from "sweetalert2";
import audio from "./assets/keypress.mp3";

const KeyPressAudio = new Howl({
  src: [audio],
});

const copy = async (clipboardText) => {
  await navigator.clipboard.writeText(clipboardText);
  Swal.fire({
    toast: true,
    title: "Copied Successfully",
    icon: "success",
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    position: "top-right",
  });
};

function Header() {
  const { push } = useHistory();
  const [progress, setProgress] = useState(100);

  return (
    <>
      <LoadingBar
        color="#e61b1b"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={false}
      />
      <div className="btn-dark">
        <button
          id="dark-to-home"
          type="button"
          onClick={() => push("/")}
          title="Home"
        >
          <i className="fas fa-home"></i>
        </button>
      </div>
      <div className="btn-dark">
        <button
          id="to-light"
          type="button"
          onClick={() => push("/light")}
          title="Light Mode"
        >
          <i className="fas fa-sun"></i>
        </button>
      </div>
    </>
  );
}

function Keys(props) {
  const { keyPressed, capsLock } = props;
  if (capsLock) {
    return <>{keyPressed.toUpperCase()}</>;
  } else {
    return <>{keyPressed}</>;
  }
}

function ShiftableKeys(props) {
  const { defaultKey, altKey, shift } = props;
  if (shift) {
    return <>{altKey}</>;
  } else {
    return <>{defaultKey}</>;
  }
}

function Content() {
  const [text, setText] = useState("Type Something");
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);
  const [ctrl, setCtrl] = useState(false);
  const [audio, setAudio] = useState(true);

  document.body.style.background = "rgb(0, 0, 0, 0.93)";
  document.body.style.color = "white";
  const miscKeyStyles = { fontSize: "1vw", fontWeight: "bold" };
  const shiftTd = document.querySelectorAll(".shiftTd");

  const paste = async () => {
    await navigator.clipboard.readText().then((clipText) => {
      setText(text + clipText);
    });
    Swal.fire({
      toast: true,
      title: "Pasted Successfully",
      icon: "success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-right",
    });
  };

  const addText = (inputText) => {
    audioState(audio);
    if (ctrl && inputText.toLowerCase() === "c") {
      copy(text);
    } else if (ctrl && inputText.toLowerCase() === "v") {
      paste();
    } else if (capsLock) {
      setText(text + inputText.toUpperCase());
    } else {
      setText(text + inputText);
    }
  };

  const backspace = () => {
    audioState(audio);
    setText(text.slice(0, text.length - 1));
  };

  const shiftKey = () => {
    audioState(audio);
    if (shift) {
      setShift(false);
      shiftTd.forEach((element) => {
        element.innerHTML = "Shift";
      });
    } else {
      setShift(true);
      shiftTd.forEach((element) => {
        element.innerHTML = "Shift On";
      });
    }
  };

  const addShiftText = (defaultKey, altKey) => {
    if (shift) {
      addText(altKey);
    } else {
      addText(defaultKey);
    }
  };

  const capsLockKey = () => {
    audioState(audio);
    if (capsLock) {
      setCapsLock(false);
      document.getElementById("capsLockTd").innerHTML = "Capslock";
    } else {
      setCapsLock(true);
      document.getElementById("capsLockTd").innerHTML = "Capslock On";
    }
  };

  const enterKey = () => {
    audioState(audio);
    setText(text + "\n");
  };

  const ctrlKey = () => {
    audioState(audio);
    if (ctrl) {
      setCtrl(false);
      document.querySelectorAll(".ctrlTd").forEach((element) => {
        element.innerHTML = "Ctrl";
        element.style.fontSize = "1.3vw";
      });
    } else {
      setCtrl(true);
      document.querySelectorAll(".ctrlTd").forEach((element) => {
        element.innerHTML = "Ctrl On";
        element.style.fontSize = "1.1vw";
      });
    }
  };

  return (
    <>
      <Header />
      <div className="text">
        <pre className="text-dark">{text}</pre>
      </div>
      <div
        className="keyboard-div"
        style={{ display: "flex", marginTop: "10vh" }}
      >
        <table className="keyboard-dark" cellSpacing="12" cellPadding="0">
          <tr className="numbers">
            <td onClick={() => addShiftText("`", "~")}>
              <ShiftableKeys defaultKey="`" altKey="~" shift={shift} />
            </td>
            <td onClick={() => addShiftText("1", "!")}>
              <ShiftableKeys defaultKey="1" altKey="!" shift={shift} />
            </td>
            <td onClick={() => addShiftText("2", "@")}>
              <ShiftableKeys defaultKey="2" altKey="@" shift={shift} />
            </td>
            <td onClick={() => addShiftText("3", "#")}>
              <ShiftableKeys defaultKey="3" altKey="#" shift={shift} />
            </td>
            <td onClick={() => addShiftText("4", "$")}>
              <ShiftableKeys defaultKey="4" altKey="$" shift={shift} />
            </td>
            <td onClick={() => addShiftText("5", "%")}>
              <ShiftableKeys defaultKey="5" altKey="%" shift={shift} />
            </td>
            <td onClick={() => addShiftText("6", "^")}>
              <ShiftableKeys defaultKey="6" altKey="^" shift={shift} />
            </td>
            <td onClick={() => addShiftText("7", "&")}>
              <ShiftableKeys defaultKey="7" altKey="&" shift={shift} />
            </td>
            <td onClick={() => addShiftText("8", "*")}>
              <ShiftableKeys defaultKey="8" altKey="*" shift={shift} />
            </td>
            <td onClick={() => addShiftText("9", "(")}>
              <ShiftableKeys defaultKey="9" altKey="(" shift={shift} />
            </td>
            <td onClick={() => addShiftText("0", ")")}>
              <ShiftableKeys defaultKey="0" altKey=")" shift={shift} />
            </td>
            <td
              onClick={backspace}
              style={{ fontSize: "0.9vw", fontWeight: "bold" }}
            >
              Backspace
            </td>
            <td
              onClick={backspace}
              style={miscKeyStyles}
              colSpan="2"
              onClick={() => {
                audioState(audio);
                setText("");
                Swal.fire({
                  toast: true,
                  title: "Pasted Successfully",
                  icon: "success",
                  timer: 1500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  position: "top-right",
                });
              }}
            >
              Clear All
            </td>
          </tr>
          <tr>
            <td style={miscKeyStyles} onClick={() => addText("    ")}>
              Tab
            </td>
            <td onClick={() => addText("q")}>
              <Keys keyPressed="q" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("w")}>
              <Keys keyPressed="w" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("e")}>
              <Keys keyPressed="e" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("r")}>
              <Keys keyPressed="r" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("t")}>
              <Keys keyPressed="t" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("y")}>
              <Keys keyPressed="y" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("u")}>
              <Keys keyPressed="u" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("i")}>
              <Keys keyPressed="i" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("o")}>
              <Keys keyPressed="o" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("p")}>
              <Keys keyPressed="p" capsLock={capsLock} />
            </td>
            <td onClick={() => addShiftText("[", "{")}>
              <ShiftableKeys defaultKey="[" altKey="{" shift={shift} />
            </td>
            <td onClick={() => addShiftText("]", "}")}>
              <ShiftableKeys defaultKey="]" altKey="}" shift={shift} />
            </td>
            <td onClick={() => addShiftText("\\", "|")}>
              <ShiftableKeys defaultKey="\" altKey="|" shift={shift} />
            </td>
          </tr>
          <tr>
            <td
              colSpan="1.5"
              style={miscKeyStyles}
              onClick={capsLockKey}
              id="capsLockTd"
            >
              CapsLock
            </td>
            <td onClick={() => addText("a")}>
              <Keys keyPressed="a" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("s")}>
              <Keys keyPressed="s" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("d")}>
              <Keys keyPressed="d" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("f")}>
              <Keys keyPressed="f" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("g")}>
              <Keys keyPressed="g" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("h")}>
              <Keys keyPressed="h" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("j")}>
              <Keys keyPressed="j" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("k")}>
              <Keys keyPressed="k" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("l")}>
              <Keys keyPressed="l" capsLock={capsLock} />
            </td>
            <td onClick={() => addShiftText(";", ":")}>
              <ShiftableKeys defaultKey=";" altKey=":" shift={shift} />
            </td>
            <td onClick={() => addShiftText("'", '"')}>
              <ShiftableKeys defaultKey="'" altKey='"' shift={shift} />
            </td>
            <td onClick={enterKey} colSpan="2" style={{ fontSize: "1.5vw" }}>
              Enter
            </td>
          </tr>

          <tr>
            <td
              colSpan="2"
              style={{ fontSize: "1.5vw" }}
              onClick={shiftKey}
              className="shiftTd"
            >
              Shift
            </td>
            <td onClick={() => addText("z")}>
              <Keys keyPressed="z" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("x")}>
              <Keys keyPressed="x" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("c")}>
              <Keys keyPressed="c" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("v")}>
              <Keys keyPressed="v" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("b")}>
              <Keys keyPressed="b" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("n")}>
              <Keys keyPressed="n" capsLock={capsLock} />
            </td>
            <td onClick={() => addText("m")}>
              <Keys keyPressed="m" capsLock={capsLock} />
            </td>
            <td onClick={() => addShiftText(",", "<")}>
              <ShiftableKeys defaultKey="," altKey="<" shift={shift} />
            </td>
            <td onClick={() => addShiftText(".", ">")}>
              <ShiftableKeys defaultKey="." altKey=">" shift={shift} />
            </td>
            <td onClick={() => addShiftText("/", "?")}>
              <ShiftableKeys defaultKey="/" altKey="?" shift={shift} />
            </td>
            <td
              colSpan="2"
              style={{ fontSize: "1.5vw" }}
              onClick={shiftKey}
              className="shiftTd"
            >
              Shift
            </td>
          </tr>

          <tr>
            <td
              className="ctrlTd"
              style={{ fontSize: "1.3vw" }}
              onClick={ctrlKey}
            >
              Ctrl
            </td>
            <td
              style={{ fontSize: "1.3vw" }}
              onClick={() => {
                audioState(audio);
                Swal.fire({
                  toast: true,
                  title: "I have no idea what to do with it",
                  icon: "warning",
                  timer: 1500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  position: "top-right",
                });
              }}
            >
              <em>Fn</em>
            </td>
            <td>
              <a
                href="https://www.microsoft.com/en-in/windows/windows-11"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <i className="fab fa-windows"></i>
              </a>
            </td>
            <td
              style={{ fontSize: "1.3vw" }}
              onClick={() => {
                audioState(audio);
                Swal.fire({
                  toast: true,
                  title: "I have no idea what to do with it",
                  icon: "warning",
                  timer: 1500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  position: "top-right",
                });
              }}
            >
              Alt
            </td>
            <td onClick={() => addText(" ")} colSpan={6}></td>
            <td
              style={{ fontSize: "1.3vw" }}
              onClick={() => {
                audioState(audio);
                Swal.fire({
                  toast: true,
                  title: "I have no idea what to do with it",
                  icon: "warning",
                  timer: 1500,
                  timerProgressBar: true,
                  showConfirmButton: false,
                  position: "top-right",
                });
              }}
            >
              Alt
            </td>
            <td
              className="ctrlTd"
              style={{ fontSize: "1.3vw" }}
              onClick={ctrlKey}
            >
              Ctrl
            </td>
            <td onClick={() => addShiftText("-", "_")}>
              <ShiftableKeys defaultKey="-" altKey="_" shift={shift} />
            </td>
            <td onClick={() => addShiftText("=", "+")}>
              <ShiftableKeys defaultKey="=" altKey="+" shift={shift} />
            </td>
          </tr>
        </table>
      </div>
      <Footer audioState={audio} setAudioState={setAudio} />
    </>
  );
}

const audioState = (state) => {
  if (state) {
    KeyPressAudio.play();
  }
};

function Footer(props) {
  const { audioState, setAudioState } = props;
  const volumeIcon = () => {
    if (audioState) {
      return (
        <>
          <i className="fas fa-volume-up" title="Audio On"></i>
        </>
      );
    } else {
      return (
        <>
          <i className="fas fa-volume-mute" title="Audio Off"></i>
        </>
      );
    }
  };
  return (
    <>
      <div className="btn-dark">
        <button
          id="sound-state"
          type="button"
          onClick={() => setAudioState(!audioState)}
        >
          {volumeIcon()}
        </button>
      </div>
    </>
  );
}

export default Content;
