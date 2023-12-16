import { useState } from 'react'
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


  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
  }

  const startStop = () => {
    console.log("startStop");
  }


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
              setTime={setBreakTime}
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
              setTime={setSessionTime}
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


        {/* <div className="row">
          <h1 id="timer-label">Session</h1>
          <h2 id="time-left">{sessionTime}</h2>
          
          <div className="col bg-primary">
            <button id="start_stop">start/stop</button>
            <button id="reset" onClick={() => {setBreakTime(5); setSessionTime(25);}}>reset</button>
          </div>
        </div> */}

      </div>
    </>
  )
}

export default App
