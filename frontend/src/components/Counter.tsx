
import {useCounter} from "../contexts/CounterContext.tsx";
export default function Counter() {
    const counter = useCounter()

    return (
        <div>
            {counter !== undefined && (
                <p>Finished: {counter.counter}</p>
            )}
        </div>
    );
}

