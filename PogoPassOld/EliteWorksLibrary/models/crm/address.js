import EliteModel from '../elite-model';

export default class EliteAddress extends EliteModel {

  	primaryKey = 'address_id';
	dataModel = 'address';
	dataModelPlural = 'addresss';
	constructor(props)
	{
		super(props);

		if (this.validate == undefined) this.validate = false;
		if (this.street_1 == undefined) this.street_1 = "";
		if (this.street_2 == undefined) this.street_2 = "";
		if (this.city == undefined) this.city = "";
		if (this.state == undefined) this.state = "AL";
		if (this.zipcode == undefined) this.zipcode = "";
		if (this.country == undefined) this.country = "US";
		if (this.longitude == undefined) this.longitude = "";
		if (this.latitude == undefined) this.latitude = "";
	}

	save(successCallback, failureCallback, block = false){
		if (this.address_id === undefined) return EliteAPI.CRM.Address.add(GlobalUtil.convertToAPIargs(this), (success) => {
			this.address_id = success.data.address.address_id;
			if (successCallback) successCallback(success);
		}, failureCallback, block);
		else console.log('Address does not save')
	}

	toString() {
		return this.formatted;
	}
}
