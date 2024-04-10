import Calendar from "react-calendar";
import axios from "axios";
import {useEffect, useState} from "react";
import {Plan} from "../../types/Plan.ts";
import {useParams} from "react-router-dom";

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
                console.log('Plan data:', responseData)
                console.log('Plan data:', responseData[0].datumOfCheckIns)

                if (responseData && typeof responseData === 'object' && responseData.id) {
                    if (typeof responseData.datumOfCheckIns === 'string') {
                        responseData.datumOfCheckIns = [new Date(responseData.datumOfCheckIns)];
                    }
                    console.log('Plan data:', responseData.datumOfCheckIns)
                    setPlans([responseData]);
                } else {
                    console.error('Invalid plans data:', responseData);
                }
            })
            .catch(error => {
                console.error('Error fetching plans:', error);
            });
    };

    const tileContent = ({ date }: { date: Date}) => {
        const dateKey = date.toDateString();

        const hasPlanForDate = plans.some(plan =>
            Array.isArray(plan.datumOfCheckIns) &&
            plan.datumOfCheckIns.some(checkInDate => checkInDate.toDateString() === dateKey)
        );
        return hasPlanForDate ? '✔' :'❌' ;

    }

    return (
        <div>
            <Calendar tileContent={tileContent}  />
        </div>
    )
}