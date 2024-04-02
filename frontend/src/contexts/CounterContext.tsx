import {createContext, ReactNode, useContext, useState} from "react";

type CounterContextType = {
    counter: number;
   increaseCounter: () => void;
    decreaseCounter: () => void;
}

export const CounterContext= createContext<CounterContextType | undefined>(undefined);


export function CounterProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [counter, setCounter] = useState(0);

    const increaseCounter = () => {
        setCounter(prevCount => prevCount + 1);
    };

    const decreaseCounter = () => {
        setCounter(prevCount => prevCount - 1);
    };

    return (
        <CounterContext.Provider value={{counter, increaseCounter, decreaseCounter}}>
            {children}
        </CounterContext.Provider>
    );
}

    export const useCounter = () => {
        return useContext(CounterContext);
};
