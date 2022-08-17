
export const StatisticLine = ({ name, value, sufix, fixed }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value.toFixed(fixed)}</td>
            <td>{sufix}</td>
        </tr>
    );
}