import EliteModel from "../elite-model";

export default class EliteOrder extends EliteModel {

  static API_NAMESPACE = 'STR';
  static API_CLASS = 'Order';

  static SEARCH_FILTERS = [
    {
      title: 'Created After',
      argument: 'created_after',
      filterType: 'DATETIME',
      width: '150px'
    },
    {
      title: 'Created Before',
      argument: 'created_before',
      filterType: 'DATETIME',
      width: '150px'
    }
  ];

  static REPORT = {
    METHODS: [
      { label: "Sum Sub Total", value: "SUMSUBTOTAL" }, 
      { label: "Sum Discount", value: "SUMDISCOUNT" }, 
      { label: "Sum Tax", value: "SUMTAX" }, 
      { label: "Sum Shipping", value: "SUMSHIPPING" }, 
      { label: "Sum Handling", value: "SUMHANDLING" }, 
      { label: "Sum Discount Taxable", value: "SUMDISCOUNTTAXABLE" }, 
      { label: "Sum Total Invoiced", value: "SUMPRICETOTALCHARGED" }, 
      { label: "Sum Price Paid", value: "SUMPRICEPAID", default: true }, 
      { label: "Sum Refund Sub Total", value: "SUMREFUNDSUBTOTAL" }, 
      { label: "Sum Refund Handling", value: "SUMREFUNDHANDLING" }, 
      { label: "Sum Refund Tax", value: "SUMREFUNDTAX" },
      { label: "Sum Refund Total", value: "SUMREFUNDTOTAL" },
      { label: "Sum Commission", value: "SUMCOMMISSION" },
      { label: "Average Sub Total", value: "AVERAGESUBTOTAL" }, 
      { label: "Average Discount", value: "AVERAGEDISCOUNT" }, 
      { label: "Average Tax", value: "AVERAGETAX" }, 
      { label: "Average Shipping", value: "AVERAGESHIPPING" }, 
      { label: "Average Handling", value: "AVERAGEHANDLING" }, 
      { label: "Average Discount Taxable", value: "AVERAGEDISCOUNTTAXABLE" }, 
      { label: "Average Total Invoiced", value: "AVERAGEPRICETOTALCHARGED" }, 
      { label: "Average Price Paid", value: "AVERAGEPRICEPAID" }, 
      { label: "Average Refund Sub Total", value: "AVERAGEREFUNDSUBTOTAL" }, 
      { label: "Average Refund Handling", value: "AVERAGEREFUNDHANDLING" }, 
      { label: "Average Refund Tax", value: "AVERAGEREFUNDTAX" },
      { label: "Average Refund Total", value: "AVERAGEREFUNDTOTAL" },
      { label: "Average Commission", value: "AVERAGECOMMISSION" },
      { label: "Count", value: "COUNT" }
    ],
    SEPERATORS: [
      { label: "User", value: "USER" },
      { label: 'Product', value: 'PRODUCT'},
      { label: 'Order', value: 'ORDER'},
      { label: "Affiliate User", value: "AFFILIATEUSER" },
      { label: "Referral User", value: "REFERRALUSER" },
      { label: "Affiliate User Code", value: "AFFILIATEUSERCODE" }, 
      { label: "Referral User Code", value: "REFERRALUSERCODE" }
    ]
  };

  primaryKey = 'order_id';
  dataModel = 'order';
  dataModelPlural = 'orders';

  constructor(model) {
    super(model);

    if (this.address_id === undefined) this.address_id = "";
    if (this.affiliate_user_code_id === undefined) this.affiliate_user_code_id = "";
    if (this.commission === undefined) this.commission = 0;
    if (this.commissions_calculated === undefined) this.commissions_calculated = 0;
    if (this.note === undefined) this.note = "";
    if (this.order_key === undefined) this.order_key = "";
    if (this.outstanding_balance === undefined) this.outstanding_balance = 0;
    if (this.payment_bypass === undefined) this.payment_bypass = 0;
    if (this.price_discount === undefined) this.price_discount = 0;
    if (this.price_handling === undefined) this.payment_bypass = 0;
    if (this.price_shipping === undefined) this.price_shipping = 0;
    if (this.price_sub_total === undefined) this.price_sub_total = 0;
    if (this.price_tax === undefined) this.price_tax = 0;
    if (this.price_total_charged === undefined) this.price_total_charged = 0;
    if (this.referral_total === undefined) this.referral_total = 0;
    if (this.shipping_address_id === undefined) this.shipping_address_id = "";
    if (this.status === undefined) this.status = "";
    if (this.tax_breakdown_id === undefined) this.tax_breakdown_id = 0;
    if (this.order_products === undefined) this.order_products = [];
    if (this.transactions === undefined) this.transactions = [];

  }

  save(successCallback, failureCallback) {
    var ajax = null;
    if (this[this.primaryKey] === undefined) ajax = EliteAPI.STR.Order.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.STR.Order.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);

    return ajax;
  }

  toString() {
    return "Order Does Not Have To String";
  }

  hasShippingProduct() {
    let hasShippingProduct = false;
    this.order_products.forEach(orderProduct => {
      if (GlobalUtil.inputToBool(orderProduct.product.requires_shipping)) hasShippingProduct = true;
    });
    return hasShippingProduct;
  }

  hasDiscount() {
    let hasDiscount = this.order_products.find(orderProduct => {
      if (orderProduct.discount > 0) return orderProduct;
    });
    if (hasDiscount) {
      return true;
    }
    return false;
  }

  getFirstBillingAddress() {
    if (this.transactions) {
      let transaction = this.transactions.find(transaction => {
        if (transaction.payment_method) return transaction;
      });
      return (!transaction) ? this.address : transaction.payment_method.address;
    }
    return false;
  }

  getProductInstructions() {
    let productInstructions = {};
    this.order_products.forEach(orderProduct => {
      if (orderProduct.product.data.checkout.instructions.length > 0) {
        productInstructions[orderProduct.product_id] = orderProduct.product.data.checkout.instructions;
      }
    });
    return productInstructions;
  }
}
