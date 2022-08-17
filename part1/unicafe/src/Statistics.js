import { StatisticLine } from './StatisticLine'

export const Statistics = ({ feedBack }) => {
    const Statistics = feedBack.statistic.statistics.map((s, i) => (<StatisticLine key={i} name={s.name} value={s.valueFun(feedBack)} sufix={s.sufix} fixed={s.fixed}></StatisticLine>))
    return (
        <div>
            <h1>{feedBack.statistic.name}</h1>
            {feedBack.statistic.helperFun.all(feedBack) === 0 ?
                <h3>{feedBack.statistic.fallback}</h3> :
                <table>
                    <tbody>
                        {Statistics}
                    </tbody>
                </table>
            }
        </div >
    );
}