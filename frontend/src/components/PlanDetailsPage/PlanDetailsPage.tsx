import Calendar from "react-calendar";
import {useEffect, useState} from "react";
import {Plan} from "../../types/Plan.ts";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function PlanDetailsPage(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchPlan();
        }
    }, [id]);

    const fetchPlan = () => {
        axios.get(`/api/plan/date/${id}`)
            .then(response => {
                const responseData = response.data;
                console.log(response.data)
                setPlans([responseData]);
            })
            .catch(error => {
                console.error('Error fetching plans:', error);
            });
    };

    const tileContent = ({ date }: { date: Date}) => {
        const dateKey = date.getTime();
        console.log('Date key:', dateKey);

        const hasPlanForDate = plans.some(plan =>
            Array.isArray(plan.datumOfCheckIns) &&
            plan.datumOfCheckIns.some(checkInDate => new Date(checkInDate).getTime() === dateKey)
        );
        console.log(hasPlanForDate)

        return hasPlanForDate ? "✔" :'❌';
    }

    return (
        <div>
            <Calendar tileContent={tileContent}  />
        </div>
    )
}
