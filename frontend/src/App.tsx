
import PlanList from "./components/PlanList/PlanList.tsx";
import {Plan} from "./types/Plan.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import PlanCards from "./components/PlanCards/PlanCards.tsx";
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import {Profile} from "./components/Profile/Profile.tsx";
import PlanDetailsPage from "./components/PlanDetailsPage.tsx";

export default function App() {

    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        fetchPlans();
    }, []);

    function fetchPlans() {
    axios.get("/api/plan")
        .then(response => {
            setPlans(response.data);
        })
        .catch(error => console.error("Error fetching data: ", error))
}


    const deletePlan = (id:string) => {
        setPlans(plans.filter(plan => plan.id !== id));
    }

    const addPlan = (description: string) => {
        const newPlan: Plan = {
            id: uuidv4(),
            description: description,
            checked: false,
            datumOfCheckIns: new Date(),
            numberOfCheckIns: 0
        };
        console.info("New Plan: ", newPlan);
        setPlans([...plans, newPlan]);

    };

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
              <Route path="/plancards" element={<PlanCards plans={plans} addPlan={addPlan}/>}/>
              <Route path="/plan" element={<PlanList plans={plans} deletePlan={deletePlan} editPlan={editPlan}/>}/>
              <Route path="/plan/:id" element={<PlanDetailsPage/>}/>
              <Route path="/profile" element={<Profile/>}/>
          </Routes>
      </Layout>
      </>
  )
}

