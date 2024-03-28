import {Plan} from "../types/Plan.ts";
import PlanItem from "./PlanItem.tsx";

type PlanListProps = {
    plans: Plan[];
    togglePlan: (id:string) => void;
    deletePlan: (id:string) => void;
    editPlan: (id:string, description:string) => void;
}
export default function PlanList({plans,togglePlan,deletePlan,editPlan}:Readonly<PlanListProps>) {

    return (
        <div>
            <ul>
                {plans.map(plan=> (
                    <PlanItem key={plan.id} plan={plan} togglePlan={togglePlan} deletePlan={deletePlan} editPlan={editPlan}/>
                ))}
            </ul>
        </div>
    )
}