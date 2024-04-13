import { useState } from "react";
import CheckButton from "./CheckButton.tsx";

export default function Counter() {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
            setCount(prevCount => prevCount + 1);
    };

    const decreaseCount = () => {
            setCount(prevCount => prevCount - 1);
    };

    return (
        <div>
            <p>Finished: {count}</p>
            <CheckButton
                onCheck={increaseCount}
                onUncheck={decreaseCount}
                onMidnightChange={(isMidnight) => {
                    if (!isMidnight) {
                        increaseCount();
                    }
                }}
            />
        </div>
    );
}

