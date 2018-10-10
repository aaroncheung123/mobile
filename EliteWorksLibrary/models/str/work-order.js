import EliteModel from "../elite-model";

import WorkOrderProduct from './work-order-product';

export default class EliteWorkOrder extends EliteModel {

  primaryKey = "work_order_id";
  dataModel = 'work_order';
  dataModelPlural = 'work_orders';

  constructor(model) {
    super(model);

    if (GlobalUtil.isEmpty(this.work_order_products)) this.work_order_products = [];

    this.work_order_products = this.work_order_products.map(x => new WorkOrderProduct(x));
  }

  save(successCallback, failureCallback) {
    var ajax = null;
    if (this.work_order_id === undefined) {
      ajax = EliteAPI.STR.WorkOrder.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    } else ajax = EliteAPI.STR.WorkOrder.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);

    return ajax;
  }
}
