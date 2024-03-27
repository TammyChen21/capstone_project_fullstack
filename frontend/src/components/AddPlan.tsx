import {useState} from "react";
import {Plan} from "../types/Plan.ts";
import axios from "axios";
type AddPlanProps = {
    addPlan: (description:string) => void;
}
export default function AddPlan({addPlan}:AddPlanProps) {

    const [plans, setPlans] = useState<Plan[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleAddClick = () => {
        setInputVisible(true);
    };

    const handleSaveClick = () => {
        if (inputValue.trim() !== '') {
            const newPlan: Plan= {
                id: (plans.length + 1).toString(),
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
            id: (plans.length + 1).toString(),
            description: inputValue,
            checked: false,
            datumOfCheckIns: new Date,
            numberOfCheckIns: 0
        } as Plan).
        then((response) => {
            console.log(response.data)})
        .catch(error =>
                console.log("error", error))
    }


    return (
        <div>
            <button onClick={handleAddClick}>Add</button>
            {inputVisible && (
                <div>
                    <form onSubmit={(event) => { handleSaveClick(); savePlan(event); }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button>Save</button>
                    </form>
                </div>
            )}


        </div>
    );
}