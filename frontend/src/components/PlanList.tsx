import {Plan} from "../types/Plan.ts";
import PlanItem from "./PlanItem.tsx";

type PlanListProps = {
    plans: Plan[];
    deletePlan: (id:string) => void;
    editPlan: (id:string, description:string) => void;
    checkPlan: (id:string) => void;
}
export default function PlanList({plans,deletePlan,editPlan}:Readonly<PlanListProps>) {

    return (
        <div>
            <ul>
                {plans.map(plan=> (
                    <PlanItem key={plan.id} plan={plan} deletePlan={deletePlan} editPlan={editPlan}/>
                ))}
            </ul>
        </div>
    )
}