import EliteModel from "../elite-model";

export default class EliteDevice extends EliteModel {

  static API_NAMESPACE = 'CRM';
  static API_CLASS = 'Device';

  static SEARCH_FILTERS = [
    {
      title: 'Created After',
      argument: 'created_after',
      filterType: 'DATETIME'
    },
    {
      title: 'Created Before',
      argument: 'created_before',
      filterType: 'DATETIME'
    }
  ];

  static REPORT = {
    METHODS: [
      { label: "Count", value: "COUNT", default: true}
    ],
    SEPERATORS: [
      { label: "User", value: "USER" }
    ]
  };

  primaryKey = 'device_id';
  dataModel = 'device';
  dataModelPlural = 'devices';

  toString() {
    return this.os;
  }


  save(successCallback, failureCallback) {
    var ajax = null;
    if (this[this.primaryKey] === undefined) ajax = EliteAPI.CRM.Device.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.CRM.Device.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    return ajax;
  }

  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Device.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  
}
