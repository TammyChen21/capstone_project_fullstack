import {useState} from "react";
import {Plan} from "../types/Plan.ts";

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
                id: plans.length + 1,
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

    return (
        <div>

            <button onClick={handleAddClick}>Add</button>
            {inputVisible && (
                <div>
                    <form onSubmit={handleSaveClick}>
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