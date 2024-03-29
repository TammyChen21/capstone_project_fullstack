import { useState } from "react";

type CheckButtonProps = {
    onCheck: () => void;
    onUncheck: () => void;
};

export default function CheckButton({ onCheck, onUncheck }: CheckButtonProps) {
    const [checked, setChecked] = useState(false);

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