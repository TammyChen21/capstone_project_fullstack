import Calendar from "react-calendar";
import axios from "axios";
import {useEffect, useState} from "react";
import {Plan} from "../../types/Plan.ts";
import {useParams} from "react-router-dom";

export default function PlanDetailsPage(): JSX.Element {
    const [plans, setPlans] = useState<Plan[]>([]);

    const { id } = useParams(); // 获取路由参数中的 ID


    useEffect(() => {
        if (id) {
            fetchPlan();
        }
    }, [id]);

    const fetchPlan = () => {
        axios.get(`/api/plan/${id}`)
            .then(response => {
                setPlans([response.data]);
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