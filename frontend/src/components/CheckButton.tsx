import {useEffect, useState} from "react";


type CheckButtonProps = {
    onCheck: () => void;
    onUncheck: () => void;
    onMidnightChange: (isMidnight: boolean) => void;
};

export default function CheckButton({ onCheck,onUncheck,onMidnightChange}: Readonly<CheckButtonProps>) {

    const [isChecked, setIsChecked] = useState(false);

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

        setIsChecked(true);
        onCheck();
    };

    const handleUncheck = () => {

        setIsChecked(false);
        onUncheck();
    };

    return (
        <button onClick={isChecked ? handleUncheck : handleCheck}>
            {isChecked ? "Cancel" : "Check"}
        </button>
    );}