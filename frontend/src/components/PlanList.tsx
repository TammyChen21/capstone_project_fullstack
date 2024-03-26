import {Plan} from "../types/Plan.ts";
import PlanItem from "./PlanItem.tsx";

type PlanListProps = {
    plans: Plan[];
    togglePlan: (id:string) => void;
    deletePlan: (id:string) => void;
}
export default function PlanList({plans,togglePlan,deletePlan}:PlanListProps) {

    return (
        <div>
            <h1>Plan List</h1>
            <ul>
                {plans.map(plan=> (
                    <PlanItem key={plan.id} plan={plan} togglePlan={togglePlan} deletePlan={deletePlan}/>
                ))}
            </ul>
        </div>
    )
}