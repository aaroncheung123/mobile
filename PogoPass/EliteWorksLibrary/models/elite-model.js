export default class EliteModel {

	primaryKey = 'Unknown';

	constructor(model) {
		if(model)
		{
			var keys = Object.keys(model);
			keys.map(key => this[key] = model[key]);
		}
	}

	clone(overrides) {
		var clone = JSON.parse(JSON.stringify(this));
		if (overrides) {
			var keys = Object.keys(overrides);
			keys.map(key => clone[key] = overrides[key]);
		}
		return clone;
	}

	get primaryId() {
		return this[this.primaryKey];
	}

	toString() {
		return 'No to string defiend';
	}
	 
}