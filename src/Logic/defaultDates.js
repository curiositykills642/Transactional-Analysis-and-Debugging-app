
// return the start and end date of a time frame

export function defaultDates(period){

    const today = new Date();
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const defaultDate = year+'-'+month+'-'+day;
    
    if(period === "daily"){

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const yYear = yesterday.getFullYear();
        const yMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
        const yDay = String(yesterday.getDate()).padStart(2, '0');
        const yDefaultDate = yYear+'-'+yMonth+'-'+yDay;  
        return [defaultDate,yDefaultDate];
    }else if(period === "same-day"){
        return [ defaultDate , defaultDate ];
    }
    else if(period === "weekly"){
        
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = (dayOfWeek + 6) % 7; // Calculate the difference to the last Monday (0 = Monday, 1 = Tuesday, etc.)

        const lastMonday = new Date(today.setDate(today.getDate() - diff));

        const year = lastMonday.getFullYear();
        const month = String(lastMonday.getMonth() + 1).padStart(2, '0');
        const day = String(lastMonday.getDate()).padStart(2, '0');
        const lastMondayDate = year + '-' + month + '-' + day;

        return [defaultDate, lastMondayDate];
    }
    else if(period === "monthly"){
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDateOfMonth = new Date(year, month, 1);

        const firstDay = String(firstDateOfMonth.getDate()).padStart(2, '0');
        const firstMonth = String(firstDateOfMonth.getMonth() + 1).padStart(2, '0');
        const firstYear = firstDateOfMonth.getFullYear();

        const firstDate = `${firstYear}-${firstMonth}-${firstDay}`;

        return [defaultDate, firstDate];
    }
}

