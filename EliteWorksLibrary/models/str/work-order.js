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


    if (GlobalUtil.isEmpty(this.assigned_role_id)) this.assigned_role_id = 'NULL';
    if (GlobalUtil.isEmpty(this.assigned_user_id)) this.assigned_user_id = 'NULL';

    var ajax = null;
    if (this.work_order_id === undefined) {
      ajax = EliteAPI.STR.WorkOrder.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    } else ajax = EliteAPI.STR.WorkOrder.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);

    if (this.assigned_user_id === 'NULL') this.assigned_user_id = undefined;
    if (this.assigned_role_id === 'NULL') this.assigned_role_id = undefined;


    return ajax;
  } 
  
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.STR.WorkOrder.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  
  complete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.STR.WorkOrder.complete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }

  cancel(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.STR.WorkOrder.cancel(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  process(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.STR.WorkOrder.process(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
