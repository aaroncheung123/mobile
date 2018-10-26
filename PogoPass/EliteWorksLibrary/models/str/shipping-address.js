import EliteModel from '../elite-model';

export default class EliteShippingAddress extends EliteModel {

  	primaryKey = 'shipping_address_id';
	dataModel = 'shipping_address';
	dataModelPlural = 'shipping_addresses';
	constructor(shipping_address)
	{
		super(shipping_address);

		this.shipping_address_id = (this.shipping_address_id !== undefined) ? Number(this.shipping_address_id) : undefined;

		if (!this.ship_to_name) this.ship_to_name = '';
		if (!this.description) this.description = '';
		if (!this.phone) this.phone = '';
		if (!this.notes) this.notes = '';
		if (!this.default) this.default = 0;
		if (!this.active) this.active = 1;

		this.address = new EliteAPI.Models.CRM.EliteAddress(this.address);
	}

	save(successCallback, failureCallback){
		if (this.shipping_address_id === undefined) return EliteAPI.STR.ShippingAddress.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
		else return EliteAPI.STR.ShippingAddress.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

	delete(successCallback, failureCallback)
	{
		if (this.shipping_address_id !== undefined) return EliteAPI.STR.ShippingAddress.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
}
