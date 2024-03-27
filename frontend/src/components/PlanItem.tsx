import {Plan} from "../types/Plan.ts";
import axios from "axios";

type PlanItemProps = {
    plan: Plan;
    togglePlan: (id:string) => void;
    deletePlan: (id:string) => void;

}
export default function PlanItem({plan,togglePlan,deletePlan}:Readonly<PlanItemProps>) {

    function deleteThisPlan(id:string) {
    axios.delete(`/api/plan/${id}`)
        .then(response => {
            console.log("Response: ", response.data);
            deletePlan(id);
        })
        .catch(error => console.log("Error deleting plan: ", error))
}
    const handleDeleteClick = ()=>{
        deletePlan(plan.id);
        deleteThisPlan(plan.id);
    }


    return (
        <div>
            <li style={{textDecoration:plan.checked ? "line-through":"none"}}>
                {plan.description}
                <button onClick={() => togglePlan(plan.id)}>Finish</button>
                <button onClick={handleDeleteClick}>Delete</button>
                <button>Edit</button>
            </li>
        </div>
    );
}