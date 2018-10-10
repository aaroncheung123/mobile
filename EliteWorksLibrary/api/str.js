
import WebClient from './web-client';
import {Model} from './gen';

export default class StrApi {
  constructor() {
    this.WorkOrder = new WorkOrder();
    this.WorkOrderProduct = new WorkOrderProduct();
  }
}

class WorkOrder extends Model {
  constructor() {
    super("workorder");
  }

  // purpose
  //   add a work order
  // args
  //   user_id (required)
  //   name (required)
  //   notes (optional)
  //   scheduled_at (optional) (default is NULL)
  //   address_id (required)
  // returns
  //   work_order
  add(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/add";
    return WebClient.basicPost(
      form_data,
      url,
      success => {
        success.data.work_order = new EliteAPI.Models.STR.WorkOrder(success.data.work_order);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   set a work order
  // args
  //   user_id (optional)
  //   name (optional)
  //   notes (optional)
  //   scheduled_at (optional)
  //   address_id (optional)
  // returns
  //   (none)
  set(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

}

class WorkOrderProduct extends Model {

  constructor()
  {
    super('workorderproduct');
  }

  // purpose
  //   add a work order product
  // args
  //   work_order_id (required)
  //   product_id (required)
  //   name (optional) (default is product name)
  //   price (optional) (default is product price)
  //   quantity (optional) (default is 1)
  //   notes (optional)
  // returns
  //   work_order_product
  add(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/product/add";
    return WebClient.basicPost(
      form_data,
      url,
      success => {
        success.data.work_order_product = new EliteAPI.Models.STR.WorkOrderProduct(success.data.work_order_product);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   set a work order product
  // args
  //   work_order_product_id (required)
  //   name (optional)
  //   price (optional)
  //   quantity (optional)
  //   notes (optional)
  // returns
  //   (none)
  set(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/product/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }
}
