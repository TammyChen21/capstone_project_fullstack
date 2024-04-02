import Counter from "./Counter.tsx";
import {Plan} from "../types/Plan.ts";


type PlanCardProps = {
    plans: Plan[];
}
export default function PlanCard({plans}: Readonly<PlanCardProps>){

    return(
        <div>
            {plans.map(plan => (
                <div key={plan.id}>
                    <p>{plan.description}</p>
                    <Counter/>
                </div>
            ))}

        </div>
    )
}