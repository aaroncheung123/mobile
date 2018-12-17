
import EliteModel from "../elite-model";

export default class EliteDealProduct extends EliteModel {
  primaryKey = 'deal_product_id';
  dataModel = 'deal_product';
  dataModelPlural = 'deal_products';

  static API_NAMESPACE = 'CRM';
  static API_CLASS = 'DealProduct';

  constructor(model) {
    super(model);
  }

  save(successCallback, failureCallback) {
    var ajax = null;
    if (this[this.primaryKey] === undefined)
      ajax = EliteAPI.CRM.DealProduct.add(
        GlobalUtil.convertToAPIargs(this),
        successCallback,
        failureCallback
      );
    else
      ajax = EliteAPI.CRM.DealProduct.set(
        GlobalUtil.convertToAPIargs(this),
        successCallback,
        failureCallback
      );
    return ajax;
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.DealProduct.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }

  toString() {
    return 'No to string implemented for deal product'
  }
}
