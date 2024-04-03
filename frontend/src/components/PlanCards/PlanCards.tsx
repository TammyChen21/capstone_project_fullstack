import Counter from "../Counter.tsx";
import {Plan} from "../../types/Plan.ts";
import {useState} from "react";
import "./PlanCards.css";
import AddPlan from "../AddPlan/AddPlan.tsx";
import {v4 as uuidv4} from "uuid";


type PlanCardProps = {
    plans: Plan[];
}
export default function PlanCards({plans}: Readonly<PlanCardProps>){
    const [planState, setPlanState] = useState<Plan[]>([]);
    const addPlan = (description:string) => {
        const newPlan: Plan= {
            id: uuidv4(),
            description: description,
            checked: false,
            datumOfCheckIns: new Date,
            numberOfCheckIns: 0
        };
        console.info("New Plan: ", newPlan)
        setPlanState([...plans, newPlan]);
    }
    const [counter, setCounter] = useState(0);
    const increaseCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
    };

    const decreaseCounter = () => {
        setCounter(prevCounter => prevCounter - 1);
    };
    return(
        <div>
        <AddPlan addPlan={addPlan}/>
        <div className="plan-card">
            <ul className="cards">
            {planState.map(plan => (
                <div key={plan.id}>
                    <p>{plan.description}</p>
                    <Counter count={plan.numberOfCheckIns}/>
                </div>
            ))}
            </ul>
        </div>
        </div>
    )
}