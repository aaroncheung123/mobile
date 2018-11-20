import EliteModel from '../elite-model';

export default class EliteAvailability extends EliteModel {
  primaryKey = 'availability_id';
  dataModel = 'availability';
  dataModelPlural = 'availabilitys';
  constructor(model){
    super(model)

    if (this.name === undefined) this.name = ''
    if (this.quantity === undefined) this.quantity = '';
    if (this.description === undefined) this.description = ''
    if (this.redeem_description === undefined) this.redeem_description = ''
    if (this.product_id === undefined) this.product_id = ''
    if (this.venue_service_id === undefined) this.venue_service_id = ''
    if (this.limit_per_account === undefined) this.limit_per_account = 1
    if (this.open_enrollment === undefined) this.open_enrollment = 0
    if (this.use_codes === undefined) this.use_codes = 0
    if (this.registration_start === undefined) this.registration_start = GlobalUtil.convertDateToMysqlRaw(new Date().getStartOfDay())
    if (this.registration_end === undefined) this.registration_end = GlobalUtil.convertDateToMysqlRaw(new Date().getEndOfDay())
  }

  save(successCallback, failureCallback){
  	var ajax = null;

    if (this.quantity == '') this.quantity = 'NULL';

    if (this.availability_id === undefined) ajax = EliteAPI.EVN.Availability.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.EVN.Availability.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)

    if (this.quantity == 'NULL') this.quantity = '';

  	return ajax;
  } 
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.EVN.Availability.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
