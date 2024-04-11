import {Plan} from "../../types/Plan.ts";
import "./PlanCards.css";
import AddPlan from "../AddPlan/AddPlan.tsx";
import {v4 as uuidv4} from "uuid";
import PlanCard from "../PlanCard/PlanCard.tsx";
import {useState} from "react";



type PlanCardProps = {
    plans: Plan[];
    addPlan: (description:string) => void;
}
export default function PlanCards({plans}: Readonly<PlanCardProps>){
    const [plansState, setPlansState] = useState<Plan[]>(plans);
    const addPlan = (description:string) => {
        const newPlan: Plan= {
            id: uuidv4(),
            description: description,
            checked: false,
            datumOfCheckIns: [new Date],
            numberOfCheckIns: 0
        };
        console.info("New Plan: ", newPlan)
        setPlansState([...plansState, newPlan]);
    }

    return(
        <>
            <AddPlan addPlan={addPlan}/>
            <div>
                <h1 style={{color: "hotpink"}}>💖 My Plans</h1>
                <ul className="cards">
                    {plansState.map(plan => (
                        <PlanCard key={plan.id} plan={plan}/>
                    ))}
            </ul>
        </div>
        </>
    )
}