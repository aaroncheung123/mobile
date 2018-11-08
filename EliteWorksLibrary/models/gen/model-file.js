import EliteModel from "../elite-model";

export default class EliteModelFile extends EliteModel {
  primaryKey = "model_file_id";
  dataModel = "model_file";
  dataModelPlural = "model_files";
  constructor(props) {
    super(props);
    if (GlobalUtil.isEmpty(this.name)) this.name = "";
  }
  save(successCallback, failureCallback) {
    if (this[this.primaryKey] === undefined) return EliteAPI.GEN.ModelFile.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else return EliteAPI.GEN.ModelFile.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined)
      return EliteAPI.GEN.ModelFile.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
}
