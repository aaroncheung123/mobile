import EliteModal from '../elite-model';

export default class ElitePaymentMethod extends EliteModal {

  	primaryKey = 'payment_method_id';
	dataModel = 'payment_method';
	dataModelPlural = 'payment_methods';
	constructor(payent_method)
	{
		super(payent_method);

		this.payment_method_id = (this.payment_method_id !== undefined) ? Number(this.payment_method_id) : undefined;
		if (GlobalUtil.isEmpty(this.name)) this.name = '';
		if (GlobalUtil.isEmpty(this.description)) this.description = '';
		if (GlobalUtil.isEmpty(this.card)) this.card = '';
		if (GlobalUtil.isEmpty(this.expiration)) this.expiration = '';
		if (GlobalUtil.isEmpty(this.cvv2)) this.cvv2 = '';
		if (GlobalUtil.isEmpty(this.defaultdefault)) this.default = 0;
		if (GlobalUtil.isEmpty(this.active)) this.active = 1;
		if (GlobalUtil.isEmpty(this.bank)) this.bank = '';
		if (GlobalUtil.isEmpty(this.account)) this.account = '';
		if (GlobalUtil.isEmpty(this.account_confirmation)) this.account_confirmation = '';
		if (GlobalUtil.isEmpty(this.routing)) this.routing = '';

		this.address = new EliteAPI.Models.CRM.Address(this.address);

		this.typeMessage = this.getTypeMessage();
	}

	clone(overrides) {
		var clone = JSON.parse(JSON.stringify(this));
		if (overrides) {
			var keys = Object.keys(overrides);
			keys.map(key => clone[key] = overrides[key]);
		}
		return new ElitePaymentMethod(clone);
	}
	save(successCallback, failureCallback){
		if (this.payment_method_id === undefined) return EliteAPI.ELITE.PaymentMethod.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
		else return EliteAPI.ELITE.PaymentMethod.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

	delete(successCallback, failureCallback)
	{
		if (this.payment_method_id !== undefined) return EliteAPI.ELITE.PaymentMethod.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
	getTypeMessage() {

		if (this.gateway === 'PAYPAL') return this.name;
		else return this.type + " ending in " + this.last_four
	}

}
