import moment from "moment"

const timeFormat = "DD MMMM YYYY HH:MM"

export function TimeFormat(time, format=timeFormat){
    return moment(time).format(format)
}

export function CapitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export function StatusColor(space){
    let status = 'Failed';
    let bg = 'danger';
    if(space?.upcoming){
        status = 'Upcoming';
        bg = 'warning';
    }else if(space?.launch_success){
        status = 'Success';
        bg = 'success';
    }
    return{
        status,
        bg
    }
}