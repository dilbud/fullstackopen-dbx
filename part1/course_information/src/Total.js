

export const Total = ({ parts }) => {
    return (
        <p>Number of exercises {parts.map(v => v.exercises).reduce((a, b) => a + b, 0)}</p>
    );
};