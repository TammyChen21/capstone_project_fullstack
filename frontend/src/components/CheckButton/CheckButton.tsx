import { useState, useEffect } from 'react';
import "./CheckButton.css"
import axios from "axios";
import {Plan} from "../../types/Plan.ts";

type CheckButtonProps = {
    plan: Plan;
    updateData: (plan:Plan) => void;
}
export default function CheckButton  ({plan, updateData}: Readonly<CheckButtonProps>) {
    const [isChecked, setIsChecked] = useState(false);
    const [counter, setCounter] = useState(0);
    const handleButtonClick = () => {
        if (isChecked) {
            setCounter(prevCounter => prevCounter - 1);
        } else {
            setCounter(prevCounter => prevCounter + 1);
        }
        setIsChecked(prevChecked => !prevChecked);

        updateData(plan);

        axios.post(`/api/plan/${plan.id}`, { updateData })
            .then(response => {
                console.log('Check-in successful');
                console.log(isChecked)
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error checking in:', error);

            });
    };

    /*const handleButtonClick = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);

        if (isChecked) {
            setCounter(prevCounter => prevCounter - 1);
        } else {
            setCounter(prevCounter => prevCounter + 1);
        }

        axios.post(`/api/plan/${plan.id}`, {isChecked:newCheckedState})

            .then(response => {
                console.log('Checked in:', response.data);
                updateData(response.data);
            })
            .catch(error => {
                console.error('Error checking in:', error);
                console.log(isChecked)
            });
    };*/

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

