import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
export default function PlanDetailsPage(): JSX.Element {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [cardData, setCardData] = useState([]);

    useEffect(() => {

    }, []);

    const fetchCardData = () => {

    };
    return (
        <div>
            <Calendar onChange={setSelectedDate}
                      value={selectedDate}
                      tileContent={({ date, view }) =>
                          view === 'month' &&
                          cardData.find((item) => new Date(item.date).toDateString() === date.toDateString()) ? (
                              <span>✔️</span>
                          ) : null
                      }/>
        </div>
    )
}