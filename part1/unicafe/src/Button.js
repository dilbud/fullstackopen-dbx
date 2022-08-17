
export const Button = ({ name, stateFun }) => {
    return (<button onClick={stateFun}>{name}</button>)
}