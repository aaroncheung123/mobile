import EliteModel from "../elite-model";

export default class EliteNotification extends EliteModel {

  static API_NAMESPACE = 'CRM';
  static API_CLASS = 'Notification';

  static SEARCH_FILTERS = [
    {
      title: 'Viewed',
      argument: 'viewed',
      options: [{value: '1', label: 'Viewed'}, {value: '0', label: 'Not Viewed'}],
      filterType: 'DROPDOWN'
    },
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

  primaryKey = 'notification_id';
  dataModel = 'notification';
  dataModelPlural = 'notifications';

  toString() {
    return this.title
  }

  save(successCallback, failureCallback) {
    var ajax = null;
    if (this[this.primaryKey] === undefined) ajax = EliteAPI.CRM.Notification.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.CRM.Notification.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    return ajax;
  }

  delete(successCallback, failureCallback) {
    if (this[this.primaryKey] !== undefined) return EliteAPI.CRM.Notification.delete(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
  }
  
}
