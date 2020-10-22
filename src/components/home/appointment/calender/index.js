import React, {useState} from 'react';
import {DayPickerSingleDateController} from "react-dates"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function Calender(props){
    const [focus, updateFocus] = useState(false);
    
    const handleFocus = () => {
        updateFocus(true);
    }
    const handleDateChange = (date) => {
        props.setDate(date);
    }

    return(
    <div >
     <h3>Select a Date</h3>
    <DayPickerSingleDateController 
        autoFocus={true} 
        initialDate={new Date()} 
        numberOfMonths={1} 
        focused={focus} 
        onFocusChange={handleFocus}
        onDateChange={(date) => handleDateChange(date)}
        enableOutsideDays
        date={props.date}
        />
    </div>
    );
}

export default Calender;