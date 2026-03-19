import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Timer : React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const startTimer = () => {
        setInterval(() => { setSeconds((prev) => prev + 1) }, 1000)
    }

    return(
        <div>
            <h2>타이머 : {seconds}초</h2>
            <Button variant="mute" onClick={startTimer}>타이머 시작하기</Button>
        </div>
    )
}

export default Timer;