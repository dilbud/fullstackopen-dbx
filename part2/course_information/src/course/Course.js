import { useMemo } from 'react';

import { Content } from "./Content";
import { Header } from "./Header";
import { Sum } from "./Sum";


export const Course = ({ name, parts }) => {

    const sum = useMemo(() => {
        return parts.map(p => p.exercises).reduce((e1, e2) => {
            return e1 + e2
        }, 0);
    }, [parts]);

    return (
        <div>
            <Header name={name}></Header>
            <Content parts={parts}></Content>
            <Sum sum={sum}></Sum>
        </div>
    );
};