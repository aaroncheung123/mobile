import EliteModel from '../elite-model';

export default class EliteModelActivity extends EliteModel {

  	primaryKey = 'model_activity_id';
	dataModel = 'model_activity';
	dataModelPlural = 'model_activities';
	constructor(props)
	{
		super(props);
		if (GlobalUtil.isEmpty(this.name)) this.name = '';
	}
	save(successCallback, failureCallback){
		if (this[this.primaryKey] === undefined) return EliteAPI.GEN.ModelActivity.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
		//else return EliteAPI.GEN.ModelActivity.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)
	}
	delete(successCallback, failureCallback) {
		if (this[this.primaryKey] !== undefined) return EliteAPI.GEN.ModelActivity.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
}
