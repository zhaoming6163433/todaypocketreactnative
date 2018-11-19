import moment from 'moment';

let util = {
    dateformate(date, fomatter) {
        if (!date) return '';
        var fmt = fomatter || 'YYYY-MM-DD';
        return moment(date).format(fmt);
    },
    formatDateTime(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    },
    timeago(nowtime, publishTime) {
        var publishTime = publishTime / 1000;
        var d_seconds, d_minutes, d_hours, d_days;
        var timeNow = parseInt(nowtime / 1000);
        var d;
        var r;
        d = timeNow - publishTime;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        if (d_hours > 0) {
            r = d - d_hours * 3600;
            d_minutes = parseInt(r / 60);
            d_seconds = parseInt(r);
            d_hours = d_hours - d_days * 24;
        } else {
            d_minutes = parseInt(d / 60);
            d_seconds = parseInt(d);
        }
        if (d_days > 0) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else if (d_minutes <= 0 && d_seconds >= 0) {
            return "刚刚"
        }
    }
}
export {
    util
}