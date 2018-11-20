import EliteModel from '../elite-model';

export default class EliteVenue extends EliteModel {

  primaryKey = 'venue_id';
  dataModel = 'venue';
  dataModelPlural = 'venues';
  constructor(model){
    super(model)

    if (!this.name) this.name = "";
    if (!this.email) this.email = "";
    if (!this.phone) this.phone = "";
    if (!this.short_description) this.short_description = "";
    if (!this.description) this.description = "";
    if (!this.inclusions) this.inclusions = "";
    if (this.visible === undefined) this.visible = false;
    else this.visible = GlobalUtil.inputToBool(this.visible);

    if (this.address_id) this.address_id = Number(this.address_id)
    if (this.logo_site_file_id) this.logo_site_file_id = Number(this.logo_site_file_id)
    if (this.icon_site_file_id) this.icon_site_file_id = Number(this.icon_site_file_id)
    if (this.banner_site_file_id) this.banner_site_file_id = Number(this.banner_site_file_id)

    if (!this.data) this.data = {}
    if (typeof(this.data) === 'string') this.data = JSON.parse(this.data);
    if (!this.data.seo) this.data.seo = {};
    if (!this.data.seo.meta_title) this.data.seo.meta_title = "";
    if (!this.data.seo.meta_keywords) this.data.seo.meta_keywords = [];
    if (!this.data.seo.meta_description) this.data.seo.meta_description = "";
    if (GlobalUtil.isEmpty(this.data.website)) this.data.website = ''; 
    if (!this.data.dynamic) this.data.dynamic = {};
    if (!this.data.hours_of_operations) this.data.hours_of_operations = {};
    if (!this.data.hours_of_operations.custom) this.data.hours_of_operations.custom = {};

    if (this.venue_locations) this.venue_locations = this.venue_locations.map(venueLocation => new EliteAPI.Models.EVN.VenueLocation(venueLocation));
  }

  save(successCallback, failureCallback){

  	var tempData = $.extend(true, {}, this.data);
    this.data = JSON.stringify(this.data);
    this.visible = Number(this.visible) === 0 || this.visible.toString() === "false" ? 0 : 1

  	var ajax = null;
    if (this.venue_id === undefined) ajax = EliteAPI.EVN.Venue.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.EVN.Venue.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)

  	this.data = tempData;
  	return ajax;
  }

   delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.EVN.Venue.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
