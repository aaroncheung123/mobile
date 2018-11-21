import EliteModel from '../elite-model';

export default class EliteAccount extends EliteModel {

  	primaryKey = 'account_id';
	dataModel = 'account';
	dataModelPlural = 'accounts';
	constructor(account)
	{
		super(account);
		if (this.account_id !== undefined) this.account_id = Number(this.account_id);
		if (this.first_name === undefined) this.first_name = '';
		if (this.last_name === undefined) this.last_name = '';
		if (this.description === undefined) this.description = '';
	}

	clone(overrides) {
		var clone = JSON.parse(JSON.stringify(this));
		if (overrides) {
			var keys = Object.keys(overrides);
			keys.map(key => clone[key] = overrides[key]);
		}
		return new EliteAccount(clone);
	}

	save(successCallback, failureCallback){
		if (this.account_id === undefined) return EliteAPI.CRM.Account.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
		else return EliteAPI.CRM.Account.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

	get fullName() {
		return this.first_name + " " + this.last_name;
	}

	toString() {
		return `${this.first_name} ${this.last_name} - ${this.description}`;
	}
	delete(successCallback, failureCallback) {
		if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Account.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}



	profileImageApprove(successCallback, failureCallback) {
		if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Account.profileImageApprove(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

	profileImageDelete(successCallback, failureCallback) {
		if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Account.profileImageDelete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

	profileImageReject(successCallback, failureCallback) {
		if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Account.profileImageReject(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
	profileImageTempDelete(successCallback, failureCallback) {
		console.log('test');
		if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Account.profileImageTempDelete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}

}