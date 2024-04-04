import { useState, useEffect } from 'react';
import "./CheckButton.css"

export default function CheckButton  ()  {
    const [isChecked, setIsChecked] = useState(false);
    const [counter, setCounter] = useState(0);

    const handleButtonClick = () => {
        if (isChecked) {
            setCounter(prevCounter => prevCounter - 1);
        } else {
            setCounter(prevCounter => prevCounter + 1);
        }
        setIsChecked(prevChecked => !prevChecked);
    };

    const isMidnight = () => {
        const now = new Date();
        return now.getHours() === 1 && now.getMinutes() === 0 && now.getSeconds() === 0;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isMidnight()) {
                setIsChecked(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isChecked]);

    return (
        <div className="button-box">
            <p className="counter">{counter} Days</p>
            <button onClick={handleButtonClick} className={`check-btn ${isChecked ? 'checked' : 'unchecked'}`}>
                {isChecked ? 'Cancel' : 'Check'}
            </button>
        </div>
    );
}

