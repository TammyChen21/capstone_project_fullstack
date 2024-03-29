import {Plan} from "../types/Plan.ts";
import axios from "axios";
import {useState} from "react";

type PlanItemProps = {
    plan: Plan;
    togglePlan: (id:string) => void;
    deletePlan: (id:string) => void;
    editPlan: (id:string, description:string) => void;
}
export default function PlanItem({plan,togglePlan,deletePlan,editPlan}:Readonly<PlanItemProps>) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedDescription, setEditedDescription] = useState(plan.description);

    function deleteThisPlan(id:string) {
    axios.delete(`/api/plan/${id}`)
        .then(response => {
            console.info("Response: ", response.data);
            deletePlan(id);
        })
        .catch(error=>
            console.error("Error deleting plan: ", error))
}
    const handleDeleteClick = ()=>{
        deleteThisPlan(plan.id);
    }

    const handleSaveClick = () =>{
       editPlan(plan.id, editedDescription);
        setIsEditing(false);
        axios.put(`/api/plan/${plan.id}`, { description: editedDescription })
            .then(response => {
                console.info("Plan updated successfully:", response.data);
            })
            .catch(error => {
                console.error("Error updating plan:", error);
            });
    }

    return (
        <div>
            <li style={{textDecoration: plan.checked ? "line-through" : "none"}}>
                <div>
                    {isEditing ? (
                        <div>
                            <input type="text" value={editedDescription}
                                   onChange={(e) => setEditedDescription(e.target.value)}/>
                            <button onClick={handleSaveClick}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <span>{plan.description}</span>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )}
                    <button onClick={() => togglePlan(plan.id)}>Finish</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>

            </li>
        </div>
    );
}