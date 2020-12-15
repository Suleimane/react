import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, isBefore, isEqual, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '../../service/api';

import { Container, Time } from './styles';

const range = ["08", "09", "10", "11", "12", "13", "14", "15", "17", "16", "18", "19"];

export default function Dashboard(){
    const [schedules, setSchedules] = useState([]);
    const [date, setDate] = useState(new Date());

    const dateFormated = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    useEffect(() => {

        async function loadSchedule(){

            const response = await api.get('schedules',{
                params: { date }
            });

            const data = range.map(hour => {

                const hojeToString = format(date, 'yyyy-MM-dd');
                const hoje = hojeToString + "T" + hour + "00:00.000Z";

                return {
                    time: `${hour}:00h`,
                    past: isBefore(parseISO(hoje), new Date()),
                    appointment: response.data.find(a =>
                        isEqual(parseISO(a.date).getTime(), parseISO(hoje).getTime())
                    ),
                };
            });

            setSchedules(data);
        }

        loadSchedule();
    }, [date]);

    function hadlePrevDay(){
        setDate(subDays(date, 1));
    }

    function handleNexDay(){
        setDate(addDays(date, 1));
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={hadlePrevDay}>
                    <MdChevronLeft size="36" color="#FFF" />
                </button>
                <strong>{dateFormated}</strong>
                <button type="button" onClick={handleNexDay}>
                    <MdChevronRight size="36" color="#FFF" />
                </button>
            </header>

            <ul>
                { schedules.map(time => (
                    <Time key={time.time} past={time.past} available={!time.appointment}>
                        <strong>{time.time}</strong>
                        <span>{time.appointment ? time.appointment.user.name : 'Em aberto'}</span>
                    </Time>
                )) }
            </ul>
        </Container>
    );
}
