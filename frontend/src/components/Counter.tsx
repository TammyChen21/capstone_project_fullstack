
type CounterProps = {
    count: number;

}
export default function Counter({count}: Readonly<CounterProps>) {

    return (
        <div>
                <p>Finished: {count}</p>
        </div>
    );
}

