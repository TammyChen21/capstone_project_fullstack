import {Plan} from "../types/Plan.ts";

type PlanItemProps = {
    plan: Plan;
    togglePlan: (id:string) => void;
    deletePlan: (id:string) => void;

}
export default function PlanItem({plan,togglePlan,deletePlan}: PlanItemProps) {

    return (
        <div>
            <li style={{textDecoration:plan.checked ? "line-through":"none"}}>
                {plan.description}
                <button onClick={() => togglePlan(plan.id)}>Finish</button>
                <button onClick={() => deletePlan(plan.id)}>Delete</button>
            </li>
        </div>
    );
}