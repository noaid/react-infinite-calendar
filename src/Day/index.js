import React from 'react';
const style = require('./Day.scss');

export default function Day({currentYear, date, day, handleDayClick, isDisabled, isToday, isSelected, monthShort, locale, theme}) {
    var {date: mmt, yyyymmdd, lunar} = date;
    var year = mmt.year();
    var lunarString = lunar.lunarDayName;
    if (lunar.lunarDay === 1) {
        lunarString = lunar.lunarMonthName;
    }
    if (lunar.term){
        lunarString = lunar.term;
    }

    let isWeekend = mmt.day() === 0 || mmt.day() === 6;
    return (
        <li
            style={(isToday) ? {color: theme.todayColor} : null}
            className={`${style.root}${isToday ? ' ' + style.today : ''}${isSelected ? ' ' + style.selected : ''}${isDisabled ? ' ' + style.disabled : ' ' + style.enabled}${isWeekend && ' ' + style.weekend}`}
            data-date={yyyymmdd}
            onClick={(!isDisabled && handleDayClick) ? handleDayClick.bind(this, mmt) : null}
        >
            {(day === 1) && <span className={style.month}>{monthShort}</span>}
            <span>{day}</span>
            {(day === 1 && currentYear !== year) && <span className={style.year}>{year}</span>}
            {(day !== 1) && <span className={style.year}>{lunarString}</span>}
            {(day === 1 && currentYear === year) && <span className={style.year}>{lunarString}</span>}
            {isSelected &&
            <div className={style.selection} style={{
                backgroundColor: (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor,
                color: theme.textColor.active
            }}>
                <span
                    className={style.lunar}>{(isToday) ? (locale.todayLabel.short || locale.todayLabel.long) : lunarString}</span>
                <span className={style.day}>{day}</span>
            </div>
            }
        </li>
    );
}
