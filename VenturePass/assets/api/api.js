

import {AsyncStorage} from 'react-native'

const HOST = "https://6fe57a.eliteworks.com";

class APIClass {
	constructor() {
		this.host = HOST;
	}

	Login(args, successCallback, failureCallback) {
		return this.basicFetchPost('/global/crm/user/api/check', args, (success) => {
			AsyncStorage.setItem('customer_api_key', success.data.user_key.key, () => {
				if (successCallback) successCallback(success)
			});	
		}, failureCallback);
	}

	ForgotPassword(args, successCallback, failureCallback) {
		return this.basicFetchPost('/global/eml/user/password/set', args, successCallback, failureCallback);
	}

	getUser(args, successCallback, failureCallback) {
		AsyncStorage.getItem('customer_api_key').then((value) => {
			if (value == null) 
			{
				if (failureCallback) failureCallback({result: 'failure', error_message: 'Unable to connect'});
			}
			args.api_key = value;
			this.basicFetchGet('/global/crm/user', args, successCallback, failureCallback);
		});
	}

    getReferralCode(args, successCallback, failureCallback)
    {   
        AsyncStorage.getItem('customer_api_key').then((value) => {
            if (value == null) 
            {
                if (failureCallback) failureCallback({result: 'failure', error_message: 'Unable to connect'});
            }
            args.api_key = value;
            this.basicFetchGet('/global/crm/user/code/referral/system', args, successCallback, failureCallback);
        });    
    }

	basicFetchPost(url, args, successCallback, failureCallback) {
		fetch(this.host + url, {
			method: "POST",
			body: JSON.stringify(args),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			var json = response.json().then((data) => {
				if (data.result == 'success') {
					if (successCallback !== undefined) successCallback(data);
				}
				else if (failureCallback !== undefined) failureCallback(data);
			}).catch(() => {
				if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
			});
		}).catch(() => {
			if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
		})
	}

	basicFetchGet(url, args, successCallback, failureCallback)
	{
		var paramsEncoded = "?" + Object.keys(args).map(prop => {return [prop, args[prop]].map(encodeURIComponent).join("=")}).join("&");
		fetch(this.host + url + paramsEncoded, {
			method: "GET",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((response) => {
			var json = response.json().then((data) => {
				if (data.result == 'success') {
				  	if (successCallback !== undefined) successCallback(data);
				}
				else if (failureCallback !== undefined) failureCallback(data);
			}).catch(() => {
				if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
			});
		}).catch(() => {
			if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
		})
	}
}

const API = new APIClass();
export default API;




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
    var completeString = '';
    for (var i = 0; i < format_string.length; i++)
    {
        var c = format_string[i];
        if (c == 'l') completeString += this.getWeekDay();
        else if (c == 'k') completeString += this.getWeekDayShort();
        else if (c == 'M') completeString += this.getMonthName();
        else if (c == 'n') completeString += GlobalUtil.padZeros((this.getMonth() + 1), 2);
        else if (c == 'd') completeString += GlobalUtil.padZeros(this.getDate(), 2);
        else if (c == 'h') completeString += this.getHours();
        else if (c == 'i') completeString += GlobalUtil.padZeros(this.getHours(), 2);
        else if (c == 'm') completeString += GlobalUtil.padZeros(this.getMinutes(), 2);
        else if (c == 's') completeString += GlobalUtil.padZeros(this.getSeconds(), 2);
        else if (c == 'H') completeString += this.getHours() > 12 ? this.getHours() - 12 : this.getHours() == 0 ? 12 : this.getHours();
        else if (c == 'A') completeString += this.getHours() > 12 ? 'PM' : 'AM';
        else if (c == 'y') completeString += this.getFullYear().toString().substr(-2);
        else if (c == 'Y') completeString += this.getFullYear();
        else completeString += c;
    }
    return completeString;
};
window.GlobalUtil = {

    htmlTextStripper: function strip(html){
        var striptags = require('striptags');
        return striptags(html);
    },
    padZeros: function(string, number_of_zeros)
    {
        string = String(string);
        while(string.length < number_of_zeros)
        {
            string = '0' + string;
        }
        return string;
    },

    convertMysqlToDate: function(mysql_date)
    {
        if (mysql_date === undefined || mysql_date === null) return new Date();
        var dateConvertedString = mysql_date.substring(5,7) + "/" + mysql_date.substring(8,10) + "/" + mysql_date.substring(0,4) + " " + mysql_date.substring(11,13) + ":" + mysql_date.substring(14,16) + ":" + mysql_date.substring(17, 19) + " UTC";
        return new Date(dateConvertedString);
    },

    convertDateToMysql: function(date)
    {
        return date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' + ('00' + date.getUTCDate()).slice(-2) + ' ' +  ('00' + date.getUTCHours()).slice(-2) + ':' +  ('00' + date.getUTCMinutes()).slice(-2) + ':' + ('00' + date.getUTCSeconds()).slice(-2);
    },
    convertMysqlToDateRaw: function(mysql_date)
    {
        if (mysql_date === undefined || mysql_date === null) return new Date();
        var dateConvertedString = mysql_date.substring(5,7) + "/" + mysql_date.substring(8,10) + "/" + mysql_date.substring(0,4) + " " + mysql_date.substring(11,13) + ":" + mysql_date.substring(14,16) + ":" + mysql_date.substring(17, 19);
        return new Date(dateConvertedString);
    },
};