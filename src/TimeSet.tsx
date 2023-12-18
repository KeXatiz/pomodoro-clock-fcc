import {FaArrowDown, FaArrowUp} from "react-icons/fa";

interface TimeSetProps {
    time: number;   //breakTime & sessionTime
    setTime: (time: number) => void;  //this is not the same as the previous line.     //setBreakTime & setSessionTime
    min: number;
    max: number;
    interval: number;
    type: "break" | "session";
}

//TimeSet will be type React.FC, React.FC is a data type that is used to represent a React component function
//https://medium.com/@RobertoSilvaZ/when-should-i-use-jsx-element-or-react-fc-29e61eb1e754#:~:text=On%20the%20other%20hand%2C%20React,you%20should%20use%20React.FC.
const TimeSet: React.FC<TimeSetProps> = ({
    //destructor
    time, setTime, min, max, interval, type,
}) => {
  return (
    <div>
        <div className="row justify-content-center">
            {/* the setTime is refer to setBreakTime & set from app.tsx */}
            {/* id="break-decrement" |  id="session-decrement"*/}
            <button id={`${type}-decrement`} className='col-md-1' onClick={()=> (time > min ? setTime(time - interval): null)}><FaArrowDown /></button>

            {/* id="break-length" | id="session-length" */}
            <span id={`${type}-length`} className='col-md-1'>{time / interval}</span>   {/* time in second / 60 = minutes */}

            {/* id="break-increment" | id="session-increment" */}
            <button id={`${type}-increment`} className='col-md-1' onClick={()=> (time < max ? setTime(time + interval): null)}><FaArrowUp /></button>
        </div>
    </div>
  );
};

export default TimeSet