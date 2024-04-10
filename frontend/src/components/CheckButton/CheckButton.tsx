import { useState, useEffect } from 'react';
import "./CheckButton.css"
import axios from "axios";
import {Plan} from "../../types/Plan.ts";

type CheckButtonProps = {
    plan: Plan;
    updateData: (plan:Plan) => void;
}
export default function CheckButton  ({plan, updateData}: Readonly<CheckButtonProps>) {
    const [isChecked, setIsChecked] = useState(plan.checked);
    const [counter, setCounter] = useState(0);
    const [description, setDescription] = useState(plan.description);
    const handleButtonClick = () => {
        if (isChecked) {
            setCounter(prevCounter => prevCounter - 1);
        } else {
            setCounter(prevCounter => prevCounter + 1);
        }
        setIsChecked(prevChecked => !prevChecked);
        setDescription(plan.description);
        updateData(plan);

        axios.post(`/api/plan/${plan.id}`, { checked: !isChecked, description: description, numberOfCheckIns: counter, datumOfCheckIns: new Date()})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error checking in:', error);

            });
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
            <button onClick={handleButtonClick} className={`check-btn ${isChecked ? 'checked' : 'unchecked'}`}>
                {isChecked ? 'Cancel' : 'Check'}
            </button>
        </div>
    );
}

