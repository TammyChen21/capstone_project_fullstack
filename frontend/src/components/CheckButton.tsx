import {useEffect, useState} from "react";
import {useCounter} from "../contexts/CounterContext.tsx";

type CheckButtonProps = {
    id: string;
    counter: number;
    onCheck: () => void;
    onUncheck: () => void;
    updateCounter: (value: number) => void;
    onMidnightChange: (isMidnight: boolean) => void;
};

export default function CheckButton({ onCheck, onUncheck,onMidnightChange,updateCounter}: Readonly<CheckButtonProps>) {

    const [isChecked, setIsChecked] = useState(false);const counterContext = useCounter();

    if (!counterContext) {
        return null; // or handle the case where counterContext is undefined
    }

    const { counter, increaseCounter, decreaseCounter } = counterContext;

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const isMidnight = now.getHours() === 1 && now.getMinutes() === 0 && now.getSeconds() === 0;
            onMidnightChange(isMidnight);
            if (isMidnight) {
                setIsChecked(false);
                onUncheck();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onMidnightChange, onUncheck]);

    const handleCheck = () => {
        updateCounter(1);
        setIsChecked(true);
        increaseCounter();
        onCheck();
    };

    const handleUncheck = () => {
        updateCounter(-1);
        setIsChecked(false);
        decreaseCounter();
        onUncheck();
    };

    return (
        <button onClick={isChecked ? handleUncheck : handleCheck}>
            {isChecked ? "Cancel" : "Check"}
        </button>
    );}