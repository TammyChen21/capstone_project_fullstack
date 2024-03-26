
import AddPlan from "./components/AddPlan.tsx";
import PlanList from "./components/PlanList.tsx";
import {Plan} from "./types/Plan.ts";
import {useState} from "react";

export default function App() {
const [plans, setPlans] = useState<Plan[]>([]);
const addPlan = (description:string) => {
    const newPlan: Plan= {
        id: plans.length + 1,
        description: description,
        checked: false,
        datumOfCheckIns: new Date,
        numberOfCheckIns: 0
    };
    setPlans([...plans, newPlan]);
}

const deletePlan = (id:number) => {
    setPlans(plans.filter(plan => plan.id !== id));
}

const togglePlan = (id:number) => {
    setPlans(plans.map(plan => {
        if(plan.id === id) {
            plan.checked = !plan.checked;
        }
        return plan;
    }));
}

  return (
      <div>
          <AddPlan addPlan={addPlan}/>
          <PlanList plans={plans} deletePlan={deletePlan} togglePlan={togglePlan}/>

      </div>
  )
}

