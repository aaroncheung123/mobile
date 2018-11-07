


Date.prototype.getWeekDay = function() {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[this.getDay()];
};


Date.prototype.getWeekDayShort = function() {
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[this.getDay()];
};


Date.prototype.getMonthName = function() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[this.getMonth()];
};

Date.prototype.getStartOfHour = function()
{
    var newDate = new Date(this);
    newDate.setHours(this.getHours(),0,0,0);
    return newDate;
};

Date.prototype.getEndOfHour = function()
{
    var newDate = new Date(this);
    newDate.setHours(this.getHours(),59,59,999);
    return newDate;
};

Date.prototype.getStartOfMinute = function()
{
    var newDate = new Date(this);
    newDate.setHours(this.getHours(),this.getMinutes(),0,0);
    return newDate;
};

Date.prototype.getEndOfMinute = function()
{
    var newDate = new Date(this);
    newDate.setHours(this.getHours(),this.getMinutes(),59,999);
    return newDate;
};

Date.prototype.getStartOfDay = function()
{
    var newDate = new Date(this);
    newDate.setHours(0,0,0,0);
    return newDate;
};

Date.prototype.getEndOfDay = function()
{
    var newDate = new Date(this);
    newDate.setHours(23,59,59,999);
    return newDate;
};

Date.prototype.getStartOfMonth = function()
{
    var newDate = new Date(this.getFullYear(), this.getMonth() + 0, 1);
    newDate.setHours(0,0,0,0);
    return newDate;
};

Date.prototype.getEndOfMonth = function()
{
    var newDate = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    newDate.setHours(23,59,59,999);
    return newDate;
};

Date.prototype.getStartOfWeek = function()
{
    var currentWeekDay = this.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1
    var newDate = new Date(new Date(this).setDate(this.getDate()- lessDays));
    newDate.setHours(0,0,0,0);
    return newDate;
}

Date.prototype.getEndOfWeek = function()
{
    var currentWeekDay = this.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1
    var startOfWeek = this.getStartOfWeek();
    var newDate = new Date(new Date(startOfWeek).setDate(startOfWeek.getDate()+6));
    newDate.setHours(23,59,59,999);
    return newDate;
}


// format time
// format string
//     ('l' is the full day [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday])
//     ('k' is the Abbr. full day [Mon, Tue, Wed, Thu, Fri, Sat, Sun])
//     ('M' is the full month [January, February, March, April, May, June, July, August, September, October, November, December]);
//     ('n' is the month number;
//     ('d' is the day of month)
//     ('h' is the hour of the day military time)
//     ('m' is the minute of the hour)
//     ('s' is the second of the minute)
//     ('H' is the hour of the day standard time)
//     ('A' is the AM or PM of the time)
//     ('Y' is the full year)
Date.prototype.formatDate = function(format_string)
{
    let globalUtil = new GlobalUtil();
    var completeString = '';
    for (var i = 0; i < format_string.length; i++)
    {
        var c = format_string[i];
        if (c == 'l') completeString += this.getWeekDay();
        else if (c == 'k') completeString += this.getWeekDayShort();
        else if (c == 'M') completeString += this.getMonthName();
        else if (c == 'n') completeString += globalUtil.padZeros((this.getMonth() + 1), 2);
        else if (c == 'd') completeString += globalUtil.padZeros(this.getDate(), 2);
        else if (c == 'h') completeString += this.getHours();
        else if (c == 'i') completeString += globalUtil.padZeros(this.getHours(), 2);
        else if (c == 'm') completeString += globalUtil.padZeros(this.getMinutes(), 2);
        else if (c == 's') completeString += globalUtil.padZeros(this.getSeconds(), 2);
        else if (c == 'H') completeString += this.getHours() > 12 ? this.getHours() - 12 : this.getHours() == 0 ? 12 : this.getHours();
        else if (c == 'A') completeString += this.getHours() > 12 ? 'PM' : 'AM';
        else if (c == 'y') completeString += this.getFullYear().toString().substr(-2);
        else if (c == 'Y') completeString += this.getFullYear();
        else completeString += c;
    }
    return completeString;
};

import CLASS_STRING_MAP from './class-string-map';


class GlobalUtil {

    constructor() {
        this.webClientKey = 'www';
        this.webClientApiKey = '';
    }

    htmlTextStripper (html){
        var striptags = require('striptags');
        return striptags(html);
    }

    padZeros (string, number_of_zeros)
    {
        string = String(string);
        while(string.length < number_of_zeros) string = '0' + string;
        return string;
    }

    pad (string, number, character)
    {
        string = String(string);
        while(string.length < number) string = character + string;
        return string;
    }

    convertMysqlToDate (mysql_date)
    {
        if (mysql_date === undefined || mysql_date === null) return new Date();
        var dateConvertedString = mysql_date.substring(5,7) + "/" + mysql_date.substring(8,10) + "/" + mysql_date.substring(0,4) + " " + mysql_date.substring(11,13) + ":" + mysql_date.substring(14,16) + ":" + mysql_date.substring(17, 19) + " UTC";
        return new Date(dateConvertedString);
    }

    convertDateToMysql (date)
    {
        return date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2) + ' ' +  ('00' + date.getUTCHours()).slice(-2) + ':' +  ('00' + date.getUTCMinutes()).slice(-2) + ':' + ('00' + date.getUTCSeconds()).slice(-2);
    }
    convertMysqlToDateRaw (mysql_date)
    {
        if (mysql_date === undefined || mysql_date === null) return new Date();
        var dateConvertedString = mysql_date.substring(5,7) + "/" + mysql_date.substring(8,10) + "/" + mysql_date.substring(0,4) + " " + mysql_date.substring(11,13) + ":" + mysql_date.substring(14,16) + ":" + mysql_date.substring(17, 19);
        return new Date(dateConvertedString);
    }

    inputToBool (input)
    {
        if (input === 'true') return true;
        else if (input === true) return true;
        else if (input === '1') return true;
        else if (input === 1) return true;
        else return false;
    }
    isEmpty (input)
    {
        if (input === '') return true;
        else if (input === undefined) return true;
        else if (input === null) return true;
        else if (input === "0000-00-00 00:00:00") return true;
        else return false;
    }
    getClassFromString (classString) {
        let classStringMap = CLASS_STRING_MAP();
        return classStringMap[classString];
    }


    ulify (string, character_limit)
    {
        if (string == undefined) return '';
        return (string.length <= character_limit) ? string : string.substring(0, character_limit) + "...";
    }

    convertToAPIargs (obj) {
        obj = {...obj};
        if(obj !== undefined && obj !== null && Object.getPrototypeOf(obj).toString() === '[object Object]') {
            var newObj = {...obj};
            for (var key in newObj) {
                if (newObj.hasOwnProperty(key)) {
                    if(newObj[key] === null) delete newObj[key];
                    else if(newObj[key] === undefined || Array.isArray(newObj[key])) {
                         newObj[key] = (function(){return})()
                    }
                }
            }
            return newObj;
        }
        return obj;
    }
}

window.GlobalUtil = new GlobalUtil();

// str models
import WorkOrder from './models/str/work-order';
import WorkOrderProduct from './models/str/work-order-product';
import ShippingAddress from './models/str/shipping-address';

class StrModels {
    constructor()
    {
        this.WorkOrder = WorkOrder;
        this.WorkOrderProduct = WorkOrderProduct;
        this.ShippingAddress = ShippingAddress;
    }
} 

// crm models
import User from './models/crm/user';
import TimeClock from './models/crm/time-clock';
import Address from './models/crm/address';
import Deal from './models/crm/deal';
import Zone from './models/crm/zone';

class CrmModels {
    constructor()
    {
        this.User = User;
        this.TimeClock = TimeClock;
        this.Address = Address;
    }
}

import Blog from './models/cms/blog';
import Post from './models/cms/post';

// cms models
class CMSModels {
    constructor()
    {
        this.Blog = Blog;
        this.Post = Post;
    }
}

// do all api declarations
import StrApis from './api/str';
import CrmApis from './api/crm';
import GenApis from './api/gen';
import CmsApis from './api/cms';

class EliteAPI {
    constructor() {
        this.Models = {
            STR: new StrModels(),
            CRM: new CrmModels(),
            CMS: new CMSModels()
        };

    }
}

window.EliteAPI = new EliteAPI();

window.EliteAPI.STR = new StrApis();
window.EliteAPI.CRM = new CrmApis();
window.EliteAPI.GEN = new GenApis();
window.EliteAPI.CMS = new CmsApis();

import Service from './api/service';
window.Service = new Service();
