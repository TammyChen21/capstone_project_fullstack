import {useEffect, useState} from "react";

type CheckButtonProps = {
    onCheck: () => void;
    onUncheck: () => void;
};

export default function CheckButton({ onCheck, onUncheck }: CheckButtonProps) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                if (checked) {
                    onUncheck();
                    setChecked(false);
                } else {
                    onCheck();
                    setChecked(true);
                }
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, [checked, onCheck, onUncheck]);

    const handleClick = () => {
        if (checked) {
            onUncheck();
        } else {
            onCheck();
        }
        setChecked(!checked);
    };

    return (
        <button onClick={handleClick}>{checked ? "Uncheck" : "Check"}</button>
    );
}