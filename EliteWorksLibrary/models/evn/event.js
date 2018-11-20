import EliteModel from '../elite-model';

export default class EliteEvent extends EliteModel {

  primaryKey = 'event_id';
  dataModel = 'event';
  dataModelPlural = 'events';
  constructor(model){
    super(model)

    if (this.name === undefined) this.name = '';
    var now = (new Date()).getStartOfHour();
    var nowPlusHour = new Date(now);
    nowPlusHour = new Date((nowPlusHour).setHours(now.getHours() + 1));

    if (this.start === undefined) this.start = GlobalUtil.convertDateToMysqlRaw(now)
    if (this.end === undefined) this.end = GlobalUtil.convertDateToMysqlRaw(nowPlusHour)
    if (this.short_description === undefined) this.short_description = ''
    if (this.description === undefined) this.description = ''
    if (this.long_description === undefined) this.long_description = ''
    if (this.timezone === undefined) this.timezone = '(GMT) London'
    if (this.status === undefined) this.status = 'PENDING'



    if (!GlobalUtil.isEmpty(this.venue_id)) this.venue_id = Number(this.venue_id)
    if (!GlobalUtil.isEmpty(this.venue_location_id)) this.venue_location_id = Number(this.venue_location_id)

    if (GlobalUtil.isEmpty(this.data)) this.data = {}
    else if (typeof(this.data) === typeof('string')) {
      if (this.data.trim() == '') this.data = {};
      else this.data = JSON.parse(this.data);
    }
    if (this.data.allDay === undefined) this.data.addDay = false
    if (this.data.seo === undefined) this.data.seo = {};
    if (this.data.seo.meta_title === undefined) this.data.seo.meta_title = "";
    if (this.data.seo.meta_keywords === undefined) this.data.seo.meta_keywords = [];
    if (this.data.seo.meta_description === undefined) this.data.seo.meta_description = "";
    if (this.data.dynamic === undefined) this.data.dynamic = {};
  }

  save(successCallback, failureCallback){

  	var tempData = $.extend(true, {}, this.data);
  	this.data = JSON.stringify(this.data);

    if (this.venue_location_id == null) this.venue_location_id = 'NULL';
    if (this.venue_id == null) this.venue_id = 'NULL';
    if (this.organizer_id == null) this.organizer_id = 'NULL';

  	var ajax = null;
    if (this.event_id === undefined) ajax = EliteAPI.EVN.Event.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.EVN.Event.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)

    if (this.venue_location_id == 'NULL') this.venue_location_id = null;
    if (this.venue_id == 'NULL') this.venue_id = null;
    if (this.organizer_id == 'NULL') this.organizer_id = null;
  	this.data = tempData;
  	return ajax;
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.EVN.Event.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
