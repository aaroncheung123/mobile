import EliteModel from "../elite-model";

export default class EliteModelTimeSpan extends EliteModel {
  primaryKey = 'model_time_span_id';
  dataModel = 'model_time_spans';
  dataModelPlural = 'model_time_span';

  start(successCallback, failureCallback) {
    return EliteAPI.GEN.ModelTimeSpan.start(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  stop(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.GEN.ModelTimeSpan.stop(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.GEN.ModelTimeSpan.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }

}
