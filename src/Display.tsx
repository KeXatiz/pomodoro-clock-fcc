//rafce

import { FaPause, FaUndo, FaPlay } from "react-icons/fa";
import { DisplayState, formatTime } from "./extend"

interface DisplayProps{
    displayState: DisplayState;                         // import type
    reset: () => void;                                  
    startStop: (displayState: DisplayState) => void;    // which take displayState
}

const Display: React.FC<DisplayProps> = ({
    //destructure props
    displayState, reset, startStop
}) => {
  return (
    <div className="row">
      <h4 id="timer-label">{displayState.timeType}</h4>
      <span id="time-left" style={{color: `${displayState.timerRunning ? "red" : "white"}`}}>{formatTime(displayState.time)}</span>

      <div className="col bg-primary">
        <button id="start_stop" onClick={() => startStop(displayState)}> {displayState.timerRunning ? <FaPause /> : <FaPlay /> } </button>
        <button id="reset" onClick={() => {reset}}><FaUndo /></button>
      </div>
    </div>
  )
}

export default Display