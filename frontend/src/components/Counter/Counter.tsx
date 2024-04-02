import "./Counter.css";
type CounterProps = {
    count: number;

}
export default function Counter({count}: Readonly<CounterProps>) {

    return (
        <div className="counter">
                <p>{count}Days</p>
        </div>
    );
}

