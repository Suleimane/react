import React, { useEffect } from 'react';

import { isEqual, parseISO,  format} from 'date-fns';


import { Container } from './styles';

export default function Teste(){

    useEffect(() => {

        const range = ["08","09","10"];
        const dataTeste = "2020-04-15T0800:00.000Z";

        const data = range.map(hour =>{
            const hojeToString = format(new Date(), 'yyyy-MM-dd');
            const hoje = hojeToString + "T" + hour + "00:00.000Z";

            return{
               datas: hoje,
               appointment: isEqual(parseISO(hoje).getTime(), parseISO(dataTeste).getTime()),
            }
        });

        console.log(data);
    });

    return (
        <Container>
            <ul>
                <li>15/04/2020</li>
                <li>16/04/2020</li>
            </ul>
        </Container>
    );
}
