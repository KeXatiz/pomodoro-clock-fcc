import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { DisplayState } from './extend';
import TimeSet from './TimeSet';
import Display from './Display';

// less than equal to 1 hr
const defaultBreakTime = 5 * 60; // 5 min in second
const defaultSessionTime = 25 * 60; // 25 min in second
const max = 60 * 60;
const min = 60;
const interval = 60;

function App() {
  
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  //the <DisplayState> is a type (jenis apa)
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  // https://www.w3schools.com/react/react_useeffect.asp#:~:text=The%20useEffect%20Hook%20allows%20you,useEffect%20accepts%20two%20arguments.
  useEffect(() => {
    let timerID : number;
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }
    //clean up
    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]); //it takes arrow fx and second argument is dependency array, if it's blank then it will just run once when the component mounts

  useEffect(() => {
    if(displayState.time === -1){
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.play();
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,  //take all the preveious value (time, timeType, timerRunning) into a new object
        timeType: prev.timeType == "Session" ? "Break" : "Session",
        time: prev.timeType == "Session" ? breakTime : sessionTime,
      }));
      
    }
  }, [displayState, breakTime, sessionTime]);  //when displaState, breakTime or sessionTime changes then it will run useEffect

  const reset = () => {
    console.log("clicked reset");
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });

    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };


  const startStop = () => {
    console.log("clicked startStop");
    setDisplayState((prev) => ({
      ...prev,  //take all the preveious value (time, timeType, timerRunning) into a new object
      timerRunning: !prev.timerRunning,
    }));
  };

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return; //if time is ticking then true then return nothing
    setBreakTime(time);
  };
  
  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev, //take the previous value
      time: prev.time - 1,
    }));
  };

  const changeSessionTime = (time: number) => {
    if(displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <>
      <div className='container text-center'>
        <h1>25 + 5 Clock</h1>

        {/* maybe this can make another file */}
        <div className="row">
          <div className='col-md length-control'>
            <h3 id='break-label'>Break Length</h3>
            <TimeSet 
              time={breakTime}
              setTime={changeBreakTime}
              min={min}
              max={max}
              interval={interval}
              type='break'
            />
          </div>
          
          <div className='col-md session-control'>
            <h3 id='session-label'>Session Length</h3>
            <TimeSet 
              time={sessionTime}
              setTime={changeSessionTime}
              min={min}
              max={max}
              interval={interval}
              type='session'
            />
          </div>
        </div>

        <Display 
          displayState={displayState}
          reset={reset}
          startStop={startStop}
        />
        <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
      </div>
    </>
  );
}

export default App
