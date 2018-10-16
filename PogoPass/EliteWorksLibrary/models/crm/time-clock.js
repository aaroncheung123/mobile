import EliteModel from '../elite-model';

export default class EliteTimeClock extends EliteModel {

  	primaryKey = 'time_clock_id';
	dataModel = 'time_clock';
	dataModelPlural = 'time_clocks';

	constructor(props)
	{
		super(props);

		if (this.approved === undefined) this.approved = false;
		this.approved = GlobalUtil.inputToBool(this.approved);
	}

	save(successCallback, failureCallback){
		if (this[this.primaryKey] === undefined) return EliteAPI.CRM.TimeClock.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
		else return EliteAPI.CRM.TimeClock.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
	}
	
}
