export function timeDiffrence(start , end){

    let currentTimestamp;

    if(end === 0)
        currentTimestamp = new Date().getTime();
    else 
        currentTimestamp =  end;

    const timeDifferenceInMilliseconds = currentTimestamp - start;
    let timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60 * 60);
    timeDifferenceInMinutes = timeDifferenceInMinutes.toFixed(3);

    return timeDifferenceInMinutes;
}
