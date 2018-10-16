
import WebClient from './web-client';

export default class GenApi {
	constructor() {
		this.Model = new Model();
	}
}

export class Model {

	constructor(classString)
	{
		this.classString = classString;
		this.classModel = GlobalUtil.getClassFromString(this.classString);

		// necessary if we do the new format get = () => {} then it will override inhertence
		this.search = this.search.bind(this);
		this.get = this.get.bind(this);
		this.delete = this.delete.bind(this);
	}

    // purpose
    //   generic search based on class string that you pass
    // args
    //   class_string (required) 
    //   query_search (optional)    
    //   take (optional) (default is 25) (max = 1000) - the number of pages to take
    //   page (optional) (default is 0) - starts at page 0, so display to the end user page + 1
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // returns
    //   models
	search (form_data, success_callback, failure_callback)
	{
		if (this.classString) form_data.class_string = this.classString;

		let tempClass = undefined;
		if (this.classModel) tempClass = new this.classModel();

		let url = '/global/gen/model/search';
		return WebClient.basicGet(form_data, url, success => {
			let modelClass = (this.classModel) ? this.classModel : GlobalUtil.getClassFromString(form_data['class_string']);
		
			if (modelClass) {
				success.data.models = success.data.models.map(model => new modelClass(model));
				if (tempClass) success.data[tempClass.dataModelPlural] = success.data.models;
			}

			if (success_callback) success_callback(success);
		}, failure_callback);
	}

	// purpose
	//   generic get based on class string
	// args
	//   class_string (required)
	//   model_id (required)
	// returns
	//   model
	get (form_data, success_callback, failure_callback) {

		if (this.classString) form_data.class_string = this.classString;

		let tempClass = undefined;
		if (this.classModel)
		{
			tempClass = new this.classModel();
			form_data['model_id'] = form_data[tempClass.primaryKey];
		}

		let url = '/global/gen/model';
		return WebClient.basicGet(form_data, url, success => {
			success.data.model = new this.classModel(success.data.model);
			if (this.classModel) success.data[tempClass.dataModel] = success.data.model;
			if (success_callback) success_callback(success);
		}, failure_callback);
	}

    // purpose
    //   delete a model based on class string
    // args
    //   class_string (required)
    //   model_id (required)
    // returns
    //   (none)
    delete (form_data, success_callback, failure_callback) {
		
		if (this.classString) form_data.class_string = this.classString;
		
		let url = '/global/gen/model/delete';

		if (this.classModel)
		{
			let tempClass = new this.classModel();
			form_data['model_id'] = form_data[tempClass.primaryKey];
		}

		return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get a model report
    // args
    //   class_string (required)
    //   include_map (optional) (0 or 1) (default is 0)
    //   tick_size (optional) (default is ALL) (ALL, YEAR, MONTH, WEEK, DAY, HOUR, MINUTE)
    //   methods (optional) (default is based on class_string)
    //   seperators (optional) 
    // returns
    //   report
   	report (form_data, success_callback, failure_callback)
   	{
   		if (this.classString) form_data.class_string = this.classString;
		let url = '/global/gen/model/report';
		return WebClient.basicGet(form_data, url, success_callback, failure_callback);
   	}
}