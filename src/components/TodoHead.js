import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`
    padding: 48px 32px 24px 32px;
    border-bottom: 1px solid #e9ecef;
    h1 {
        margin: 0px;
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead() {

    const [state, setState] = useState({
        today: {
            year: 0,
            month: 0,
            date: 0,
        },
        day: ''
    });

    const {year, month, date} = state.today;

    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();
    
    useEffect(() => {
        setState({
            today: {
                year: todayYear,
                month: todayMonth,
                date: todayDate
            },
            day: dayOfWeek
        });
    }, []);

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[now.getDay()];
    const todos = useTodoState();
    const undoneTasks = todos.filter(todo => !todo.done);


    return (
        <TodoHeadBlock>
            <h1>{year + "년 " +  month + "월 " + date  + "일"}</h1>
            <div className='day'>{state.day}요일</div>
            <div className='tasks-left'>할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}


export default TodoHead;