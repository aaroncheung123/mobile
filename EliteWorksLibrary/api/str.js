
import WebClient from './web-client';
import {Model} from './gen';

export default class StrApi {
  constructor() {
    this.WorkOrder = new WorkOrder();
    this.WorkOrderProduct = new WorkOrderProduct();
    this.ShippingAddress = new ShippingAddress();
    this.Order = new Order();
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




class Order extends Model {
  constructor() {
    super('order')
  }

  // purpose
  //   get meta data for charts or reports
  // args
  //   user_id (optional) - filter by user_id
  //   start_created_at (optional) - filter by created at time after this time
  //   end_created_at (optional) - filter by created at time before this time
  //   query_order_key - query by order_key
  // returns
  //   meta - meta data for orders
  meta(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/meta";
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   get an order model from the database
  // args
  //   order_key (required if order_id is not set) - order_key of order you want to get (order key does not have to be authenticated as order_key is a auto generated 10 digit random key)
  //   order_id (required if order_key is not set) - order id of order you want to get (user has to be authenticated to use order_id)
  // returns
  //   order - order modal that matched order_key or order_id (order_id takes presenece)
  get(form_data, success_callback, failure_callback) {
    let url = "/global/str/order";
    return WebClient.basicGet(
      form_data,
      url,
      success => {
        success.data.order = new EliteAPI.Models.STR.Order(success.data.order);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   get all orders that match a filter
  // args
  //   (at lest one of the optional args needs to be set)
  //   user_id (optional) - filter by user_id
  //   start_created_at (optional) - filter by created at time after this time
  //   end_created_at (optional) - filter by created at time before this time
  // returns
  //   orders - all orders that match all filters
  where(form_data, success_callback, failure_callback) {
    let url = "/global/str/orders";
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   resend customer order email
  // args
  //   order_key (required if order_id is not set) - order_key of order you want to get
  //   order_id (required if order_key is not set) - order id of order you want to get
  // returns
  //   whether or not it successfully sent email
  sendConfirmation(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/confirmation/send";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   build an order export csv file
  // args
  //   filters (choose from available columns)
  //   selects (choose from available columns)
  //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
  // available columns
  //   ew_str_orders
  //     order_id, order_key, status, price_sub_total, price_discount, price_tax, price_shipping, price_handling, price_total_charged, payment_bypass, created_at, updated_at
  //   ew_crm_users
  //     id, email, username, first_name, last_name, full_name, phone, email_verified, created_at, updated_at, created_at, updated_at
  //   ew_crm_affiliates
  //     affiliate_id, name, referral_code, created_at, updated_at
  //   ew_str_shipping_addresses
  //     shipping_address_id, ship_to_name, description, street_address, apt_suite, phone, city, state, zipcode, country, notes, default, created_at, updated_at
  //   ew_str_tax_breakdowns
  //     tax_breakdown_id, taxable_amount, tax_collectable, combined_tax_rate, state_taxable_amount, state_tax_rate, state_tax_collectable, county_taxable_amount, county_tax_rate, county_tax_collectable, city_taxable_amount, special_tax_rate, special_district_tax_collectable, shipping_taxable_amount, shipping_tax_collectable, shipping_combined_tax_rate, shipping_state_taxable_amount, shipping_state_sales_tax_rate, shipping_state_amount, shipping_county_taxable_amount, shipping_county_tax_rate, shipping_county_amount, shipping_city_taxable_amount, shipping_city_tax_rate, shipping_city_amount, shipping_special_tax_rate, shipping_special_district_amount, created_at, updated_at
  // returns
  //   (order export file)
  export(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/export";
    return WebClient.basicPostRaw(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   refund a specific amout on an order
  // args
  /*   order_product_json (required) (
    ex:{
      [
        {
          order_product_id: {order_product_id of product you want to refudn},
          quantity: {quantity you want to refund},
          sub_total: {price that you want to refund for sub_total},
          shipping: {price that you want to refund for shipping},
          tax: {price that you want to refund for tax},
          handling: {price that you want to refund for handling},
          cancel: {true/false} {default is false}
        }
      ]
    }) */
  /*   transaction_refund_order_json (required) (
    ex: {
      [
        {transaction_id_1},
        {transaction_id_2}
      ]
    }) */
  //   order_id (required) (the order you want to refund)
  //   cancel (optional) (true/false) (default is false)
  //   refund_as_credit (optional) (default is 0)
  // returns
  //   order_product_refunds (all the different refund rows that were created for each product)
  //   amount_cash_check_due (the amount that is due to customer of either check or cash if they had a cash or check transaction for the order)
  refund(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/refund";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   process order commissions
  // args
  //   order_id (required)
  // returns
  //   (none)
  processCommission(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/process/commission";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   cancel an order
  // args
  //   order_id (requried)
  // returns
  //   (none)
  cancel(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/cancel";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   add an order
  // args
  //   products (required) (json string array)
  //     - product_id (required)
  //     - name (optional) (default is product name associted with product id)
  //     - quantity (required)
  //     - price (optional) (default is product price)
  //     - note (optional) (checkout note for product)
  //     - product_price_id (required)
  //   user_ids (required) (comma seperated list of ids) (an order invoice is created for each of these users)
  //   send_email (optional) (default is true) (invoice email is sent to customers as invoice is created)
  // returns
  //   orders
  add(form_data, success_callback, failure_callback) {
    let url = '/global/str/order/add';
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }


  // purpose
  //   sync an order
  // args
  //   order_id (required)
  // returns
  //   (none)
  sync(form_data, success_callback, failure_callback) {
    let url = '/global/str/order/sync';
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   add an order transaction
  // args
  //   order_id (required)
  //   type (required) (types: "CARD, CASH, CHECK, STORED")
  //   amount (required)
  //   card (required if type "CARD") - card number
  //   expiration (required if type "CARD") - expiration of card - must be 4 digits (mmyy)
  //   holder (required if type "CARD") - name on card
  //   cvv2 (required if type "CARD") - 3 digit security number on card
  //   payment_method_id (required if type = "STORED")
  // returns
  //   transaction
  transactionAdd(form_data, success_callback, failure_callback) {
    let url = "/global/str/order/transaction/add";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

}