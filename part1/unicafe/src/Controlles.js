import { Button } from './Button'

export const Controlles = ({ feedBack }) => {
    const controlles = feedBack.controlle.controlles.map((c, i) => (<Button key={i} name={c.name} stateFun={c.stateFun}></Button>))
    return (
        <div>
            <h1>{feedBack.controlle.name}</h1>
            <div>{controlles}</div>
        </div>
    );
}