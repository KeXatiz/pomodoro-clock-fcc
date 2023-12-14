import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  interface DisplayState {
    time: number;
    timeType: "Session" | "Break";
    timerRunning: boolean;
  }
  
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionCount,
    timeType: "Session",
    timerRunning: false,
  });

  // less than equal to 1 hr
  const defaultBreakTime = 5 * 60; // 5 min in second
  const defaultSessionTime = 25 * 60; // 25 min in second
  const max = 60;
  const min = 1;


  //update break count
  const breakPress = (type: string) => {
    if (type === "decrement" && breakCount > min) {
      setBreakCount(breakCount - 1);
    } else if (type === "increment" && breakCount < max) {
      setBreakCount(breakCount + 1);
    }
  };
  //update session count
  const sessionPress = (type: string) => {
    if (type === "decrement" && sessionCount > min) {
      setSessionCount(sessionCount - 1);
    } else if (type === "increment" && sessionCount < max) {
      setSessionCount(sessionCount + 1);
    }
  };
  

  


  

  const formatTime = (time: number): string => {   //the return value expected string type
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes.toString() : minutes} : ${ seconds < 10 ? "0" + seconds.toString() : seconds}`;
  };

  return (
    <>
      <div className='container text-center'>
        <h1>25 + 5 Clock</h1>

        {/* maybe this can make another file */}
        <div className="row">
          <div className='col-md length-control'>
            <div id='break-label'>Break Length</div>
            <div className="row bg-primary justify-content-center">
              <button id="break-decrement" className='col-md-1' onClick={()=> breakPress("decrement")}>dn</button>
                <div id="break-length" className='col-md-1'>{breakCount}</div>
              <button id="break-increment" className='col-md-1' onClick={()=> breakPress("increment")}>up</button>
            </div>
          </div>
          
          <div className='col-md'>
            <div className='col-md session-control'>
              <div id='session-label'>Session Length</div>
            </div>
            <div className="row bg-primary justify-content-center">
              <button id="session-decrement" className='col-md-1' onClick={()=> sessionPress("decrement")}>dn</button>
                <div id="session-length" className='col-md-1'>{sessionCount}</div>
              <button id="session-increment" className='col-md-1' onClick={()=> sessionPress("increment")}>up</button>
            </div>
          </div>
        </div>



        {/* maybe this can make new file */}
        <div className="row">
          <h1 id="timer-label">Session</h1>
          <h2 id="time-left">{sessionCount}</h2>
          <h2 id="time-left">{formatTime(sessionCount)}</h2>

          <div className="col bg-primary">
            <button id="start_stop">start/stop</button>
            <button id="reset" onClick={() => {setBreakCount(5); setSessionCount(25);}}>reset</button>
          </div>
        </div>

        
        
      </div>
    </>
  )
}

export default App
