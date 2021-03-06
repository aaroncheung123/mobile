
import WebClient from './web-client';
import {Model} from './gen';

export default class StrApi {
  constructor() {
    this.WorkOrder = new WorkOrder();
    this.WorkOrderProduct = new WorkOrderProduct();
    this.ShippingAddress = new ShippingAddress();
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

  
  // purpose
  //   mark a work order complete
  // args
  //   work_order_id (required)
  // returns
  //   (none)
  complete(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/complete";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   mark work order as cancelled
  // args
  //   work_order_id (required)
  // returns 
  //   (none)
  cancel(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/cancel";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   mark work order as cancelled
  // args
  //   work_order_id (required)
  // returns 
  //   (none)
  process(form_data, success_callback, failure_callback) {
    var url = "/global/str/work/order/process";
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


class ShippingAddress extends Model {
  constructor() {
    super("shippingaddress");
  }

  // purpose
  //   Add a shipping address to a user
  // args
  //   ship_to_name (optional)
  //   description (optional)
  //   phone (optional)
  //   address_id (required)
  //   user_id (optional) (default is the user logged in)
  //   guest_token (optional) (if user is not logged in and still wants to set a shipping address id)
  //   default (optional) (0 or 1) (default is 0) (will make default if it is the first shipping address set to user)
  //   notes (optional)
  // returns
  //   shipping_address
  add(form_data, success_callback, failure_callback) {
    var url = "/global/str/shipping/address/add";
    return WebClient.basicPost(
      form_data,
      url,
      success => {
        success.data.shipping_address = new EliteAPI.Models.STR.ShippingAddress(success.data.shipping_address);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   edit an existing shipping address
  // args
  //   ship_to_name (optional)
  //   description (optional)
  //   shipping_address_id (required)
  //   address_id (optional)
  //   phone (optional)
  //   active (optional) (0 or 1)
  //   default (optional) (0 or 1)
  //   notes (optional)
  // returns
  //   (none)
  set(form_data, success_callback, failure_callback) {
    var url = "/global/str/shipping/address/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   get a shipping address model from the database
  // args
  //   shipping_address_id (required) - shipping address id of the address you want to get
  // returns
  //   shipping_address - shipping address model from the database
  get(form_data, success_callback, failure_callback) {
    var url = "/global/str/shipping/address";
    return WebClient.basicGet(
      form_data,
      url,
      success => {
        success.data.shipping_address = new EliteAPI.Models.STR.ShippingAddress(success.data.shipping_address);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }
}