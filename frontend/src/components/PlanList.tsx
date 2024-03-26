import {Plan} from "../types/Plan.ts";
import PlanItem from "./PlanItem.tsx";

type PlanListProps = {
    plans: Plan[];
    togglePlan: (id:number) => void;
    deletePlan: (id:number) => void;
}
export default function PlanList({plans,togglePlan,deletePlan}:PlanListProps) {

    return (
        <div>
            <h1>Plan List</h1>
            <ul>
                {plans.map(plan=> (
                    // <li key={plan.id}>{plan.description}</li>
                    <PlanItem key={plan.id} plan={plan} togglePlan={togglePlan} deletePlan={deletePlan}/>
                ))}
            </ul>
        </div>
    )
}