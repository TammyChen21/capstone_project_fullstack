
import AddPlan from "./components/AddPlan.tsx";
import PlanList from "./components/PlanList.tsx";
import {Plan} from "./types/Plan.ts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
const [plans, setPlans] = useState<Plan[]>([]);

function fetchPlans() {
    axios.get("/api/plan")
        .then(response => {
            console.log("Response: ", response.data);
            setPlans(response.data);
        })
        .catch(error => console.log("Error fetching data: ", error))
}
useEffect(fetchPlans,[])

    if(!plans){
        return "Loading..."
    }


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

const handleDeletePlan = (id:string) => {
    deletePlan(id);

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

