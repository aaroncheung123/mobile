import EliteModel from '../elite-model';

export default class EliteSubscription extends EliteModel {

  	primaryKey = 'subscription_id';
	dataModel = 'subscription';
	dataModelPlural = 'subscriptions';
	constructor(subscription)
	{
		super(subscription);

		if (this.renew_quantity === undefined || this.renew_quantity === null) this.renew_quantity = '';

		if (!GlobalUtil.isEmpty(this.payment_method_id)) this.payment_method_id = Number(this.payment_method_id);

		if (this.renew_product_price_id !== undefined) this.renew_product_price_id = Number(this.renew_product_price_id);
		if (this.renew_product_id !== undefined) this.renew_product_id = Number(this.renew_product_id);

		if (this.price_lock === undefined || this.price_lock === null) this.price_lock = '';
	}

	clone(overrides) {
		var clone = JSON.parse(JSON.stringify(this));
		if (overrides) {
			var keys = Object.keys(overrides);
			keys.map(key => clone[key] = overrides[key]);
		}
		return new EliteSubscription(clone);
	}
	save(successCallback, failureCallback){

		if (this.renew_quantity == '') this.renew_quantity = "NULL";
		if (this.final_date == null) this.final_date = "NULL";
		if (this.next_bill_date == null) this.next_bill_date = "NULL";
		if (GlobalUtil.isEmpty(this.payment_method_id)) this.payment_method_id = "NULL";
		if (this.price_lock == '') this.price_lock = "NULL";

		var api = null
		if (this.subscription_id === undefined) return;
		else api = EliteAPI.STR.Subscription.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);

		if (this.renew_quantity === 'NULL') this.renew_quantity = "";
		if (this.final_date === 'NULL') this.final_date = null;
		if (this.next_bill_date === 'NULL') this.next_bill_date = null;
		if (this.payment_method_id === 'NULL') this.payment_method_id = '';
		if (this.price_lock === 'NULL') this.price_lock = '';

		return api
	}


	cancel(successCallback, failureCallback)
	{
		if (this.subscription_id !== undefined) return EliteAPI.STR.Subscription.cancel(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

	activate(successCallback, failureCallback)
	{
		if (this.subscription_id !== undefined) return EliteAPI.STR.Subscription.activate(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
	
	delete(successCallback, failureCallback) {
		if (this[this.primaryKey] !== undefined) return EliteAPI.STR.Subscription.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
}