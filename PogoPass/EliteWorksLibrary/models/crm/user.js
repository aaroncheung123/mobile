import EliteModel from "../elite-model";

export default class EliteUser extends EliteModel {
  primaryKey = 'id';
  dataModel = 'user';
  dataModelPlural = 'users';
  constructor(props) {
    super(props);

    if (GlobalUtil.isEmpty(this.first_name)) this.first_name = "";
    if (GlobalUtil.isEmpty(this.last_name)) this.last_name = "";
    if (GlobalUtil.isEmpty(this.email)) this.email = "";
    if (GlobalUtil.isEmpty(this.phone)) this.phone = "";
    if (GlobalUtil.isEmpty(this.username)) this.username = "";
    if (GlobalUtil.isEmpty(this.password)) this.password = "";
    if (GlobalUtil.isEmpty(this.password_option)) this.password_option = "GUEST";
    if (GlobalUtil.isEmpty(this.data)) this.data = {};
    else if (typeof(this.data) === typeof("string")) {
      try {
        this.data = JSON.parse(this.data);
      }
      catch (error)
      {
        console.log('could not parse user ' +  this.id);
        this.data = {};
      }
    }

    if (this.types === undefined) this.types = {};
  }

  save(successCallback, failureCallback) {

    if (GlobalUtil.isEmpty(this.role_id)) this.role_id = 'NULL';

    var tempData = {...this.data};
    this.data = JSON.stringify(this.data);

    var ajax = null;

    if (this.affiliate_parent_user_id == null) this.affiliate_parent_user_id = 'NULL'

    if (this.id === undefined) ajax = EliteAPI.CRM.User.add(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback);
    else ajax = EliteAPI.CRM.User.set(GlobalUtil.convertToAPIargs(this), successCallback, failureCallback)

    this.data = tempData;

    if (this.role_id === 'NULL') this.role_id = null;
    if (this.affiliate_parent_user_id === 'NULL') this.affiliate_parent_user_id = null

    return ajax;
  }

  toString() {
    return this.full_name + ' - ' + this.email
  }

}
