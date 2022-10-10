import { Part } from './Part';

export const Content = ({
    parts
}) => {
    const partElements = parts.map(({ name, exercises, id }, i) => {
        return (<Part key={id} name={name} exercises={exercises} />)
    });
    return (
        <div>
            {partElements}
        </div>
    );
};