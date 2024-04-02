import {Plan} from "../types/Plan.ts";
import axios from "axios";
import {useState} from "react";
import CheckButton from "./CheckButton.tsx";

type PlanItemProps = {
    plan: Plan;
    deletePlan: (id:string) => void;
    editPlan: (id:string, description:string) => void;
}
export default function PlanItem({plan,deletePlan,editPlan}:Readonly<PlanItemProps>) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedDescription, setEditedDescription] = useState(plan.description);
    const [counter, setCounter] = useState(0);

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

    const increaseCount = () => {
        setCounter(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
        setCounter(prevCount => prevCount - 1);
    };
    const updateCounter = (value:number) => {
        setCounter(prevCounter => prevCounter + value);
    };

    return (
        <div>
            <li>
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
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
                <CheckButton
                    id={plan.id}
                    counter={counter}
                    onCheck={increaseCount}
                    onUncheck={decreaseCount}
                    updateCounter={updateCounter}
                    onMidnightChange={() => {}}
                />

            </li>
        </div>
    );
}