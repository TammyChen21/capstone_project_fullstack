import {useState} from "react";
import {Plan} from "../../types/Plan.ts";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import "./AddPlan.css";

type AddPlanProps = {
    addPlan: (description:string) => void;
}
export default function AddPlan({addPlan}:Readonly<AddPlanProps>) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleAddClick = () => {
        setInputVisible(true);
    };
    const handleSaveClick = () => {
        if (inputValue.trim() !== '') {
            const newPlan: Plan= {
                id: uuidv4(),
                description: inputValue.trim(),
                checked: false,
                datumOfCheckIns: new Date,
                numberOfCheckIns: 0
            };
            setPlans([...plans, newPlan]);
            addPlan(inputValue.trim());
            setInputVisible(false);
            setInputValue('');
        }
    };

    function savePlan(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/plan", {
            id: uuidv4(),
            description: inputValue,
            checked: false,
            datumOfCheckIns: new Date,
            numberOfCheckIns: 0
        } as Plan).
        then((response) => {
            console.info("Response: ", response.data);
        })
            .catch(error =>
                console.error("Error saving plan: ", error)
            );}

    return (
        <div className="btn">
            <button onClick={handleAddClick} className="add-btn">Add</button>
            {inputVisible && (
                <div className="add-plan pink">
                    <form onSubmit={(event) => { handleSaveClick(); savePlan(event); }}>
                    <input
                        type="text"
                        value={inputValue}
                        className={"input"}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="save-btn">Save</button>
                    </form>
                </div>
            )}

        </div>
    );
}