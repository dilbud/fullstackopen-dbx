import { Part } from './Part';

export const Content = ({
    parts
}) => {
    const partElements = parts.map(({ name, exercises }, i) => {
        return (<Part key={i} part={name} exercises={exercises} />)
    });
    return (
        <div>
            {partElements}
        </div>
    );
};