import "./PlanCard.css";
import {Plan} from "../../types/Plan.ts";
import CheckButton from "../CheckButton/CheckButton.tsx";

type PlanItemProps = {
    plan: Plan;
}
export default function PlanCard({plan}:Readonly<PlanItemProps>) {

    return(
       <div className="plan-card">
        <div className="text">
            {plan.description}
        </div>
           <div className="check">
               <CheckButton/>
           </div>

    </div>
   )
}
