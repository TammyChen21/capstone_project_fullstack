
import PlanList from "./components/PlanList/PlanList.tsx";
import {Plan} from "./types/Plan.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import PlanCards from "./components/PlanCards/PlanCards.tsx";
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/Profile/Profile.tsx";

export default function App() {
const [plans, setPlans] = useState<Plan[]>([]);


function fetchPlans() {
    axios.get("/api/plan")
        .then(response => {
            setPlans(response.data);
        })
        .catch(error => console.error("Error fetching data: ", error))
}
useEffect(fetchPlans,[])

    if(!plans){
        return "Loading..."
    }




const deletePlan = (id:string) => {
    setPlans(plans.filter(plan => plan.id !== id));
}

const checkPlan = (id:string) => {
    setPlans(plans.map(plan => {
        if(plan.id === id) {
            plan.checked = !plan.checked;
        }
        return plan;
    }));
}
    const editPlan = (id: string, description: string) => {

        const updatedPlans = plans.map(plan => {
            if (plan.id === id) {
                return { ...plan, description: description };
            }
            return plan;
        });

        setPlans(updatedPlans);
    };



  return (
      <>
      <Layout>
         <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/plancards" element={<PlanCards plans={plans}/>}/>
              <Route path="/plan" element={<PlanList plans={plans} deletePlan={deletePlan} checkPlan={checkPlan} editPlan={editPlan}/>}/>
              <Route path="/profile" element={<Profile/>}/>
          </Routes>
      </Layout>
      </>
  )
}

