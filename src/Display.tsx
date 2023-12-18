//rafce

import { FaPause, FaUndo, FaPlay } from "react-icons/fa";
import { DisplayState, formatTime } from "./extend";

interface DisplayProps{
    displayState: DisplayState;                         // import type
    reset: () => void;                                  
    startStop: (displayState: DisplayState) => void;    // which take displayState
}

const Display: React.FC<DisplayProps> = ({
    //destructure props
    displayState, reset, startStop,
}) => {
  return (
    <div className="row">
      <h3 id="timer-label">{displayState.timeType}</h3>
      <span id="time-left" style={{color: `${displayState.timerRunning ? "red" : "black"}`}}>{formatTime(displayState.time)}</span>

      <div className="col">
        <button id="start_stop" className='bg-primary m-2 p-1' style={{color:"white"}} onClick={() => startStop(displayState)}> {displayState.timerRunning ? <FaPause /> : <FaPlay /> } </button>
        <button id="reset" className='bg-primary m-2 p-1' style={{color:"white"}} onClick={reset}><FaUndo /></button>
      </div>
    </div>
  );
};

export default Display