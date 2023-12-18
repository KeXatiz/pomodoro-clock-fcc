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
    <>
    <div className="row justify-content-center">
      <div className="card w-auto p-4" style={{backgroundColor:"#1E555C", color:"white" , borderWidth: "7px", borderRadius: "30px", borderColor: "#13353A"}}>
        <h3 id="timer-label" style={{fontSize: "70px"}}>{displayState.timeType}</h3>
        <span id="time-left" style={{color: `${displayState.timerRunning ? displayState.time < 60
          ? "red" : "white"
          : "white"}`}}>{formatTime(displayState.time)}</span>
      </div>
      
    </div>
    


      <div className="col">
        <button id="start_stop" className='m-2 p-1 text-white border-0 ' style={{backgroundColor:"#1E555C", fontSize: "35px"}} onClick={() => startStop(displayState)}> {displayState.timerRunning ? <FaPause /> : <FaPlay /> } </button>
        <button id="reset" className='m-2 p-1 text-white border-0 ' style={{backgroundColor:"#1E555C", fontSize: "35px"}} onClick={reset}><FaUndo /></button>
      </div>
    </>
  );
};

export default Display