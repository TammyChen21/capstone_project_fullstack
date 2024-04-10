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
                const convertedDates = responseData.map((dateString: string) => new Date(dateString));
                setPlans(convertedDates);
                console.log('Response data:', responseData);

            })
            .catch(error => {
                console.error('Error fetching plans:', error);
            });
    };

    const tileContent = ({ date }: { date: Date}) => {
        const dateKey = date.toDateString();
        const hasPlanForDate = plans.some(planDate => planDate.toDateString() === dateKey);
        return hasPlanForDate ? "✅" : "❌";
    }
       /* const dateKey = date.toDateString();

        const hasPlanForDate = plans.some(plan =>
            Array.isArray(plan.datumOfCheckIns) &&
            plan.datumOfCheckIns.some(checkInDate =>
            {const checkInDateTimestamp = new Date(checkInDate).toDateString();
                console.log('CheckInDate:', checkInDateTimestamp);
                return checkInDateTimestamp === dateKey;})

    );
       console.log('Plans:', plans);
        console.log('Date:', date);
        console.log('Has plan for date:', hasPlanForDate);
       // console.log("dateKey",dateKey)

        return hasPlanForDate ? "✅" :"❌";*/


    return (
        <div>
            <Calendar tileContent={tileContent}  />
        </div>
    )
}
