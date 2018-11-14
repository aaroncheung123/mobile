import EliteModel from "../elite-model";

export default class EliteZone extends EliteModel {
  primaryKey = 'zone_id';
  dataModel = 'zone';
  dataModelPlural = 'zones';
  constructor(model) {
    super(model);
  }

  save(successCallback, failureCallback) {
    var ajax = null;
    if (this.zone_id === undefined) ajax = EliteAPI.CRM.Zone.add(
        GlobalUtil.convertToAPIargs(this),
        successCallback,
        failureCallback
    );
    else ajax = EliteAPI.CRM.Zone.set(
        GlobalUtil.convertToAPIargs(this),
        successCallback,
        failureCallback
    );
    return ajax;
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Zone.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }

}
