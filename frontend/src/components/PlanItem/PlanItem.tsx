import {Plan} from "../../types/Plan.ts";
import axios from "axios";
import {useState} from "react";
import "./PlanItem.css";
import {Link} from "react-router-dom";

type PlanItemProps = {
    plan: Plan;
    deletePlan: (id:string) => void;
    editPlan: (id:string, description:string) => void;
}
export default function PlanItem({plan,deletePlan,editPlan}:Readonly<PlanItemProps>) {

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

    const renderContent = () => {
        if (isEditing) {
            return (
                <div>
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button onClick={handleSaveClick} className="save-btn">Save</button>
                </div>
            );
        } else {
            return (
                <div className="edit">
                    <div className="edit">
                        <Link to={`/plan/date/${plan.id}`} className="description">
                            {plan.description}
                        </Link>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                </div>
            );
        }
    };


    return (
        <div className="plan-item">
            {renderContent()}
            <button onClick={handleDeleteClick} className="delete-btn">Delete</button>
        </div>
    );
}