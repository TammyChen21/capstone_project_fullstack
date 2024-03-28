import {Plan} from "../types/Plan.ts";
import PlanItem from "./PlanItem.tsx";

type PlanListProps = {
    plans: Plan[];
    togglePlan: (id:string) => void;
    deletePlan: (id:string) => void;
}
export default function PlanList({plans,togglePlan,deletePlan}:Readonly<PlanListProps>) {

    return (
        <div>
            <ul>
                {plans.map(plan=> (
                    <PlanItem key={plan.id} plan={plan} togglePlan={togglePlan} deletePlan={deletePlan}/>
                ))}
            </ul>
        </div>
    )
}