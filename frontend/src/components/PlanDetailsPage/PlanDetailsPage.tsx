import Calendar from "react-calendar";
import axios from "axios";
import {useEffect, useState} from "react";
import {Plan} from "../../types/Plan.ts";

type PlanDetailsPageProps = {
    plan: Plan;
};
export default function PlanDetailsPage({ plan }: PlanDetailsPageProps): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = () => {
        axios.get(`/api/plan/${plan.id}`)
            .then(response => {
                setPlans(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching plans:', error);
            });
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const plan = plans.find(plan => new Date(plan.datumOfCheckIns).toDateString() === date.toDateString());
            if (plan) {
                return plan.checked ? '✔️' : '❌';
            }
        }
        return null;
    };

    return (
        <div>
            <Calendar tileContent={tileContent}  />
        </div>
    )
}