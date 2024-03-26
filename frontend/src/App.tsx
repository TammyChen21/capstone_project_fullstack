
import AddPlan from "./components/AddPlan.tsx";
import PlanList from "./components/PlanList.tsx";
import {Plan} from "./types/Plan.ts";
import {useState} from "react";
import axios from "axios";

export default function App() {
const [plans, setPlans] = useState<Plan[]>([]);
const addPlan = (description:string) => {
    const newPlan: Plan= {
        id: (plans.length + 1).toString(),
        description: description,
        checked: false,
        datumOfCheckIns: new Date,
        numberOfCheckIns: 0
    };
    setPlans([...plans, newPlan]);
}

const deletePlan = (id:string) => {
    setPlans(plans.filter(plan => plan.id !== id.toString()));
}
const deleteThisPlan = (id:string) => {
    axios.delete(`/api/plan/${id}`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error =>
            console.log("error", error))
}
const handleDeletePlan = (id:string) => {
    deletePlan(id);
    deleteThisPlan(id)
}

const togglePlan = (id:string) => {
    setPlans(plans.map(plan => {
        if(plan.id === id.toString()) {
            plan.checked = !plan.checked;
        }
        return plan;
    }));
}

  return (
      <div>
          <AddPlan addPlan={addPlan}/>
          <PlanList plans={plans} deletePlan={handleDeletePlan} togglePlan={togglePlan}/>

      </div>
  )
}

