import "./PlanCard.css";
import {Plan} from "../../types/Plan.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";
import Counter from "../Counter/Counter.tsx";
import {useState} from "react";

type PlanItemProps = {
    plan: Plan;
}
export default function PlanCard({plan}:Readonly<PlanItemProps>) {
    const [counter, setCounter] = useState(0);
    const increaseCount = () => {
        setCounter(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        setCounter(prevCount => prevCount - 1);
    };

    return(
       <div className="plan-card">
        <div className="text">
            {plan.description}
        </div>
           <div className="check">
       <Counter count={counter}/>

        <CheckButton
            onCheck={increaseCount}
            onUncheck={decreaseCount}
            onMidnightChange={() => {}}
        />
           </div>

    </div>
   )
}
