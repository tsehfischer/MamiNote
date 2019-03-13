const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('');
    // return [year, month, day].map(formatNumber).join('/')
    //return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


const getLastDay = (year, month) => {

    var day = new Date(year, month, 0);
    var lastdate = year + month + day.getDate(); //获取月份的最后一天

    return lastdate
        //return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

module.exports = {
    formatTime: formatTime,
    getLastDay: getLastDay
}