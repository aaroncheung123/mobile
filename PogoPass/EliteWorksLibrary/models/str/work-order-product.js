import EliteModel from "../elite-model";

export default class EliteWorkOrderProduct extends EliteModel {

  primaryKey = "work_order_product_id";
  dataModel = 'work_order_product';
  dataModelPlural = 'work_order_products';

  constructor(model) {
    super(model);
    if (this.name === undefined) this.name = "";
    if (this.product_id !== undefined && this.product_id !== null) this.product_id = Number(this.product_id);
  }

  save(successCallback, failureCallback, async = true) {
    var ajax = null;
    if (this.work_order_product_id === undefined)
      ajax = EliteAPI.STR.WorkOrderProduct.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback, async);
    else ajax = EliteAPI.STR.WorkOrderProduct.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback, async);

    return ajax;
  }

  delete(successCallback, failureCallback) {
    if (this.work_order_product_id !== undefined)
      return EliteAPI.STR.WorkOrderProduct.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
