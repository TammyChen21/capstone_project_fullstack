import {Plan} from "../../types/Plan.ts";
import PlanItem from "../PlanItem/PlanItem.tsx";
import "./PlanList.css";



type PlanListProps = {
    plans: Plan[];
    deletePlan: (id:string) => void;
    editPlan: (id:string, description:string) => void;
}
export default function PlanList({plans,deletePlan,editPlan}:Readonly<PlanListProps>) {

    return (
        <div className="plan-list">
            <h1>💖 My Habits</h1>
            <ul className="plans">
                {plans.map(plan => (
                    <PlanItem key={plan.id} plan={plan} deletePlan={deletePlan} editPlan={editPlan}/>
                ))}
            </ul>
        </div>
    )
}