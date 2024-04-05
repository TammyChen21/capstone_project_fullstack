import "./PlanCard.css";
import {Plan} from "../../types/Plan.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";
import {useState} from "react";

type PlanCardProps = {
    plan: Plan;
}
export default function PlanCard({plan}: Readonly<PlanCardProps>) {
    const [isChecked, setIsChecked] = useState(false);
    const [counter, setCounter] = useState(0);
    const updateData = (isChecked:boolean) => {
        if (isChecked) {
            setCounter(prevCounter => prevCounter - 1);
        } else {
            setCounter(prevCounter => prevCounter + 1);
        }
         setIsChecked(prevChecked => !prevChecked);
    }

    return(
       <div className="plan-card">
        <div className="text">
            {plan.description}
        </div>
           <div className="check">
               <CheckButton plan={plan} updateData={updateData}/>
           </div>

    </div>
   )
}
