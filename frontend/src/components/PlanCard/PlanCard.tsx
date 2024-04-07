import "./PlanCard.css";
import {Plan} from "../../types/Plan.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

type PlanCardProps = {
    plan: Plan;
}
export default function PlanCard({plan}: Readonly<PlanCardProps>) {
    const [isChecked, setIsChecked] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        axios.get(`/api/plan/${plan.id}`)
            .then(response => {
                const { numberOfCheckIns } = response.data;
                setCounter(numberOfCheckIns);

            })
            .catch(error => {
                console.error('Error fetching plan details:', error);
            });
    }, [plan.id]);

    const updateData = () => {
        setIsChecked(prevChecked => !prevChecked);
        setCounter(prevCounter => prevCounter + (isChecked ? -1 : 1));
    };

    return(
        <div className="plan-card">
            <div className="text">
                {plan.description}
            </div>
            <div className="check">
                <CheckButton plan={plan} updateData={updateData}/>
            </div>
            <div className="counter">
                {counter} Days
            </div>
        </div>
);
}
