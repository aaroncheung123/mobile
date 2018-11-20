import EliteModel from '../elite-model';

export default class EliteVenueLocation extends EliteModel {

  primaryKey = 'venue_location_id';
  dataModel = 'venue_location';
  dataModelPlural = 'venue_locations';

  constructor(model){
    super(model)

    if (this.name == undefined) this.name = ''
    if (this.url == undefined) this.url = ''
    if (this.short_description == undefined) this.short_description = ''
    if (this.description == undefined) this.description = ''
    if (this.email == undefined) this.email = ''
    if (this.phone == undefined) this.phone = ''
    if (this.description == undefined) this.description = ''

    if (GlobalUtil.isEmpty(this.data)) this.data = {}
    if (typeof(this.data) === 'string') this.data = JSON.parse(this.data);
    if (this.data.dynamic == undefined) this.data.dynamic = {};

  }

  save(successCallback, failureCallback){

  	var tempData = $.extend(true, {}, this.data);
  	this.data = JSON.stringify(this.data);
  	var ajax = null;
    if (this.venue_location_id === undefined) {
      if(this.url.trim() === '') this.url = undefined
      ajax = EliteAPI.EVN.VenueLocation.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    }
    else ajax = EliteAPI.EVN.VenueLocation.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)



  	this.data = tempData;
  	return ajax;
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.EVN.VenueLocation.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
