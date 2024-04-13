import {useEffect, useState} from "react";

type CheckButtonProps = {
    onCheck: () => void;
    onUncheck: () => void;
    onMidnightChange: (isMidnight: boolean) => void;
};

export default function CheckButton({ onCheck, onUncheck,onMidnightChange}: CheckButtonProps) {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                setIsChecked(false);
                onUncheck();
                onMidnightChange(true);
            } else {
                onMidnightChange(false);
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

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
            {isChecked ? "取消打卡" : "打卡"}
        </button>
    );}