import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {WebSocket} from "vite";
import Data = WebSocket.Data;

type CardData = {
    id: string;
    date: string;
    description: string;
    checked: boolean;
    datumOfCheckIns: Date;
    numberOfCheckIns: number;

}
export default function PlanDetailsPage(): JSX.Element {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        fetchCardData(selectedDate);
    }, [selectedDate]);

    const fetchCardData = (date:Data) => {
        axios.get(`/api/plan/${date.toISOString().split('T')[0]}`)
            .then(response => {
                setCardData(response.data);
            })
            .catch(error => {
                console.error('Error fetching card data:', error);
            });
    };
    return (
        <div>
            <Calendar onChange={setSelectedDate}
                      value={selectedDate}
                      tileContent={({ date, view }: { date: Date; view: string }) =>
                          view === 'month' &&
                          cardData.find((item: CardData) => new Date(item.date).toDateString() === date.toDateString()) ? (
                              <span>✔️</span>
                          ) : null
                      }/>
        </div>
    )
}