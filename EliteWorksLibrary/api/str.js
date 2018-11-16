
import WebClient from './web-client';
import {Model} from './gen';

export default class StrApi {
  constructor() {
    this.WorkOrder = new WorkOrder();
    this.WorkOrderProduct = new WorkOrderProduct();
    this.ShippingAddress = new ShippingAddress();
    this.Order = new Order();
    this.PaymentMethod = new PaymentMethod();
    this.Subscription = new Subscription();
    this.Product = new Product();
    this.CartProduct = new CartProduct();
    this.Cart = new Cart();
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



class PaymentMethod extends Model {
  constructor() {
    super("paymentmethod");
  }

  // purpose
  //   get a payment method
  // args
  //   payment_method_id (required)
  // returns
  //   payment_method
  get(form_data, success_callback, failure_callback) {
    let url = "/global/str/payment/method";
    return WebClient.basicGet(
      form_data,
      url,
      success => {
        success.data.payment_method = new EliteAPI.Models.STR.PaymentMethod(success.data.payment_method);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   add a payment method
  // args
  //   user_id (optional) (default is logged in user) (requires User View permission to use this argument)
  //   name (required) - name on card
  //   description (optional)
  //   card (required)
  //   expiration (required)
  //   cvv2 (required)
  //   address_id (required)
  //   default (optional) (0 or 1) (default is 0) (will make default if it is the first shipping address set to user)
  // returns
  //   payment_method
  add(form_data, success_callback, failure_callback) {
    let url = "/global/str/payment/method/add";
    return WebClient.basicPost(
      form_data,
      url,
      success => {
        success.data.payment_method = new EliteAPI.Models.STR.PaymentMethod(success.data.payment_method);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   set a payment method
  // args
  //   payment_method_id (required)
  //   name (optional) - name on card
  //   description (optional)
  //   address_id (optional)
  //   default (optional) (0 or 1)
  // returns
  //   (none)
  set(form_data, success_callback, failure_callback) {
    let url = "/global/str/payment/method/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }
}


class Subscription extends Model {
  constructor() {
    super("subscription");
  }

  // purpose
  //   get subscription modal
  // args
  //   subscription_id (required)
  // returns
  //   subscription
  get(form_data, success_callback, failure_callback) {
    let url = "/global/str/subscription";
    return WebClient.basicGet(
      form_data,
      url,
      success => {
        success.data.subscription = new EliteAPI.Models.STR.Subscription(success.data.subscription);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  // purpose
  //   sets specifics on the subscription
  // args
  //   subscription_id (required)
  //   payment_method_id (optional)
  //   shipping_address_id (optional)
  //   renew_length_quantity (optional)
  //   renew_length_unit (optional)
  //   final_date (optional)
  //   renew_quantity (optional)
  //   use_price_lock (optional)
  //   price_lock (optional) (this must be set if use_price_lock is 1)
  //   renew_product_id (optional) (this must match the renew_product_price_id's product)
  //   renew_product_price_id (optional) (this must be set if the user_price_lock is 0)
  //   use_credit (optional)
  //   next_bill_date (optional)
  // returns
  //   (none)
  set(form_data, success_callback, failure_callback) {
    let url = "/global/str/subscription/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   cancel a subscription from future bills
  // args
  //   subscription_id (required)
  // returns
  //   (none)
  cancel(form_data, success_callback, failure_callback) {
    let url = "/global/str/subscription/cancel";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   activate a subscription for future bills
  // args
  //   subscription_id (required)
  // returns
  //   (none)
  activate(form_data, success_callback, failure_callback) {
    let url = "/global/str/subscription/activate";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }
}


class Product extends Model {
  constructor() {
    super("product");
  }
  
  // purpose
  //   adds a product to the database
  // args
  //   upc (optional) (default is '')
  //   manufacturer_id (optional) (default is null)
  //   supplier_id (optional) (default is null)
  //   url (optional)
  //   name (required)
  //   short_description (optional)
  //   description (optional)
  //   long_description (optional)
  //   type (required) (PHYSICAL, DOWNLOADABLE, SERVICE, PACKAGE, GIFT_VOUCHER, EVENT, AFFILIATE)
  //   manage_inventory (optional) (default is 0)
  //   cart_expiration_duration_minutes (optional) (default is 120)
  //   featured (optional) (default is 0)
  //   fulfillment_id (optional)
  //   gift_product_id (optional)
  //   gift_product_group_id (optional)
  //   service_id (required if product is SERVICE type)
  //   create_new_account (0, 1)
  //   requires_account (optional) (0, 1)
  //   account_type_id (optional)
  //   requires_shipping (optional) (default is 0)
  //   weight_ounces (optional) (default is null)
  //   shipping_height_inches (optional) (default is null)
  //   shipping_width_inches (optional) (default is null)
  //   shipping_length_inches (optional) (default is null)
  //   shipping_flat_rate (optional) (default is 0)
  //   requires_tax (optional) (default is 0)
  //   tax_code (optional) (default is 00000 can be any of (20010, 30070, 31000, 40030, 51010, 81100, 81110, 81120, 81300, 81310, 99999, 00000))
  //   handling_fee (optional) (default is 0.00) the weight of the product
  //   visible (optional) (default is 1)
  //   venue_location (optional)
  //   data (optional)
  //   sku_prefix (optional) (default is first two characters of product name with unique incrementing number)
  // returns
  //   product
  add(form_data, success_callback, failure_callback, async = true) {
    let url = "/global/str/product/add";
    return WebClient.basicPost(
      form_data,
      url,
      success => {
        success.data.product = new EliteAPI.Models.STR.Product(success.data.product);
        if (success_callback) success_callback(success);
      },
      failure_callback,
      async
    );
  }

  // purpose
  //   sets a product in the database.  If you want to add an inventory product as we we must do it separately.
  // args
  //   product_id (required)
  //   upc (optional)
  //   url (optional)
  //   manufacturer_id (optional)
  //   supplier_id (optional)
  //   name (optional)
  //   short_description (optional)
  //   description (optional)
  //   long_description (optional)
  //   manage_inventory (optional) (default is 0)
  //   cart_expiration_duration_minutes (optional) (default is 120)
  //   featured (optional) (default is 0)
  //   fulfillment_id (optional)
  //   gift_product_id (optional)
  //   gift_product_group_id (optional)
  //   force_subscription (optional) (default is 0)
  //   service_id (optional)
  //   create_new_account (0, 1)
  //   requires_account (optional) (0, 1)
  //   account_type_id (optional)
  //   requires_account_type_id (optional)
  //   requires_shipping (optional)
  //   weight_ounces (optional) the weight of the product
  //   shipping_height_inches (optional)
  //   shipping_width_inches (optional)
  //   shipping_length_inches (optional)
  //   shipping_flat_rate (optional)
  //   requires_tax (optional) (default is 0)
  //   tax_code (optional) (can be any of (20010, 30070, 31000, 40030, 51010, 81100, 81110, 81120, 81300, 81310, 99999, 00000)) the weight of the product
  //   handling_fee (optional)
  //   visible (optional) (0 or 1)
  //   template_id (optional)
  //   data (optional)
  //   active (optional) (0 or 1)
  //   sku_prefix (optional)
  // returns
  //   (none)
  set(form_data, success_callback, failure_callback, async = true) {
    let url = "/global/str/product/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback, async);
  }

  // purpose
  //   generate skus for product
  // args
  //   product_id (required)
  // returns
  //   (none)
  generateSkus(form_data, success_callback, failure_callback, async = true) {
    let url = "/global/str/product/generate/skus";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback, async);
  }
}



class CartProduct {
  // purpose
  //   add a product to cart
  // args
  //   cart_prefix (optional)
  //   product_id (required) - product id of product you want to add to cart
  //   account_id (optional) (required if requires_account is true) - if the product should be attached to an account like a Service Renewal
  //   event_availability_id (required if product type you are adding is "EVENT")
  //   quantity (optional) (default is 1) (if event_availability_id is set then max limit is availabe products left) (if account_id then it has to be less than or equal to limit in count)
  //   product_specifications_data (encode as json) (null means no specifications added to product)
  //   product_price_id (required)
  //   note (optional)
  // returns
  //   cart_product - the cart product you added to cart
  add(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/product/add";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   set a cart product
  // args
  //   cart_product_id (required)
  //   quantity (optional) (cannot set if product requires_account or create_account is active)
  //   product_specifictions_data (optional)
  //   product_price_id (optional)
  //   price_override (optional) (requires Checkout price override - set permission)
  //   note (optional)
  // returns
  //   whether or not it successfully set the correct cart quantity
  set(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/product/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   delete a cart product row
  // args
  //   cart_product_id (required) - cart product id of cart product
  //   cart_prefix (optional) - cart product id of cart product
  // returns
  //   whether or not it successfully deleted that cart product
  delete(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/product/delete";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   add a subscription product to cart
  // args
  //   cart_prefix (optional)
  //   subscription_id (required)
  // returns
  //   cart_product
  addSubscription(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/product/subscription/add";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }
}

class Cart {
  cartProductRemoveAll(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/product/delete/all";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  redeemVoucher(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/voucher/redeem";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   get current in cart info
  // args
  //   cart_prefix (optional) - used to create a seperate cart for like customer support rep checkoutdoCartVoucherAdd
  //   include_slyce_frame (optional) - this includes the slyce frame
  //   user_id (optional) - this includes user id to slyce frame
  //   shipping_address_id (optional) - this includes user shipping address id to the slyce frame
  // returns
  //   products - (only if include products is set to 1) // this is not included by default to speed up request call time
  //   inventory_products - (only if include_inventory_products is set to 1) // this is not included by default to speed up request call time
  //   unique_products - (only if include_unique_products is set to 1) // this is not included by default to speed up request call time
  get(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart";
    return WebClient.basicGet(
      form_data,
      url,
      success => {
        success.data.cart = new EliteAPI.Models.STR.Cart(success.data.cart);
        if (success_callback) success_callback(success);
      },
      failure_callback
    );
  }

  setCartSpecifications(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/specifications/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }
  // purpose
  //   empty the shopping cart
  // args
  //   cart_prefix (optional) - this is the cart_prefix of the cart you want to empty mainly used for customer support
  // returns
  //   whether or not it successfully removed items from cart
  empty(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/empty";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   set the cart information
  // args
  //   cart_prefix (optional) (default is null)
  //   guest_token (optional) (sets the user id based on guest token)
  //   user_id (optional) (must have permissions)
  //   shipping_address_id (optional)
  //   shipping_services_json (optional) - (if this is set then cart will calc tax)
  //   note (optional) (gets passed to order)
  // returns
  //   cart - returns cart recalculated with shipping info and tax info
  set(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/set";
    return WebClient.basicPost(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   get shipping quote for cart
  // args
  //   cart_prefix (optional) (default is null)
  // returns
  //   shipping_quote
  getShippingQuote(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/shipping/quote";
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   search all orders and get the orders matching filters
  // args
  //   take (optional) (max = 1000)
  //   page (optional)
  //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
  // returns
  //   orders
  search(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/search";
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }

  // purpose
  //   validate that cart has all the required specifications
  // args
  //   cart_prefix (optional)
  // returns
  //   validated
  specificationValidation(form_data, success_callback, failure_callback) {
    let url = "/global/str/cart/product/specification/validation";
    return WebClient.basicGet(form_data, url, success_callback, failure_callback);
  }
}
