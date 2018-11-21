import EliteModel from "../elite-model";

export default class EliteDeal extends EliteModel {
  primaryKey = "deal_id";
  dataModel = "deal";
  dataModelPlural = "deals";
  constructor(props) {
    super(props);
    if (GlobalUtil.isEmpty(this.name)) this.name = "";
    if (GlobalUtil.isEmpty(this.description)) this.description = "";
    if (GlobalUtil.isEmpty(this.status)) this.status = "OPPORTUNITY";
  }
  save(successCallback, failureCallback) {
    if (GlobalUtil.isEmpty(this.zone_id)) this.zone_id = 'NULL';

    if (this[this.primaryKey] === undefined) return EliteAPI.CRM.Deal.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else return EliteAPI.CRM.Deal.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);

    if (this.zone_id === 'NULL') this.zone_id = undefined;
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Deal.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
