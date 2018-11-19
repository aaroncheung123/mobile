import EliteModel from '../elite-model';

export default class EliteCredit extends EliteModel {
  primaryKey = "credit_id";
  dataModel = 'credit';
  dataModelPlural = 'credits';
  toString() {
    return "Credit Does Not Have To String";
  }


}