
import WebClient from './web-client';
import {Model} from './gen';

export default class CrmApi {
    constructor() {
        this.User = new User();
        this.TimeClock = new TimeClock();
        this.Address = new Address();
        this.Deal = new Deal;
        this.Zone = new Zone;
    }
}


class User {


    // purpose
    //   add a user login token so the user can login one time
    // args
    //   user_id (optional) (only allowed to use user id if you have [User, view] permission)
    //   email (optional) (required if no username)
    //   username (optional) (required if no email)
    //   password (required)
    // returns
    //   user_login_token
    getLoginToken (formData, success_callback, failure_callback)
    {
        var url = '/global/crm/user/login/token/add';
        WebClient.basicPost(formData, url, success_callback, failure_callback);
    }


    // purpose
    //   log a user in via a token
    // args
    //   token (required)
    // returns
    //   none
    tokenLogin (formData, success_callback, failure_callback)
    {
        var url = '/global/crm/user/login/token/login';
        WebClient.basicPost(formData, url, success_callback, failure_callback);
    }

	// purpose
	//   check credentials for api
	// args
	//   username (required)
	//   password (required)
	//   api_key (optional)
	// returns
	//   user_key
	login(args, successCallback, failureCallback) {
		return WebClient.basicPost(args, '/global/crm/user/api/check', successCallback, failureCallback);
	}

    // purpose
    //   add a user to the database
    // args
    //   email (required)
    //   first_name (required)
    //   last_name (required)
    //   phone (optional)
    //   signin (optional) (true or false) (signs user in if set to true)
    //   password_option (required) - (PASSWORD, EMAIL, GUEST)
    //   type (optional) (default is "LEAD") (Options - "LEAD", "CUSTOMER", "EMPLOYEE", "AFFILIATE")
    //   username (required only if REQUIRE_USERNAME config value = 1)
    //   password (required if password_option = PASSWORD)
    // notes
    //   (if password option is set to PASSWORD then it will send user an email saying thanks for signing up - please verify your email)
    //   (if password option is set to GUEST then it will not send the user any emails regarding them creating a user)
    //   (if password option is set to EMAIL then it will send user an email asking them to set a password - when they click the set password link account will verify as well)
    // returns
    //   user
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/add';
        return WebClient.basicPost(form_data, url, (success) => {
            success.data.user = new EliteAPI.Models.CRM.User(success.data.user);
            if (success_callback) success_callback(success);
        }, failure_callback);
    }

    // purpose
    //   get a user model
    // args
    //   user_id (optional) - user id for model you wish to get if not selected then it will get logged in user
    // returns
    //   user - user model for specified id
    get (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.user = new EliteAPI.Models.CRM.User(success.data.user);
            if (success_callback) success_callback(success);
        }, failure_callback);
    }



    // purpose
    //   get meta data for the users for charts or reports
    // args
    //   start_created_at (optional) - filter by created at time after this time
    //   end_created_at (optional) - filter by created at time before this time
    // returns
    //   meta - meta data for users
    meta (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/meta';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   set a user in the database
    // args
    //   user_id (optional) (default is logged in user) - id of the user that is going to be changed
    //   email (optional) - change the users email has to be a email that doesn't exist as another user
    //   first_name (optional) - edit first name of user
    //   last_name (optional) - edit last name of user
    //   phone (optional) - edit main phone number for user
    //   username (optional) - edit user name of user must be a username that doesn't exist
    //   affiliate_parent_user_id (optional)
    //   affiliate_commission_group_id (optional)
    // returns
    //   whether or not it successfully edited user
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }


		// purpose
    //   set password of user
    //	args
    //   password (required)
    //   current_password (required if key is not set)
    //   key (required if current_password is not set)
    // returns
    //   (none)
    setPassword (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/password/set'
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }


    // purpose
    //   search all users
    // args
    //   query_name (optional) - search users by name
    //   query_email (optional) - search users by their email
    //   query_phone (optional) - search users by their phone
    //   query_search (optional) - this queries all fields
    //   query_types (optional) (array of types - comma delimited) ("CUSTOMER", "EMPLOYEE", "LEAD", "AFFILIATE")
    //   take (optional) (max = 1000) (default = 20)
    //   page (optional) (default = 0)
    // returns
    //   users - a list of all user basic modals that match the given queries (if no queries are supplied then it will return no users)
    search (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/search';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.users = success.data.users.map((user) => new EliteAPI.Models.CRM.User(user));
            if (success_callback) success_callback(success);
        }, failure_callback);
    }


    // purpose
    //   build a user export csv file
    // args
    //   filters (choose from available columns)
    //   selects (choose from available columns)
    //   sort_columns (optional) (default is "created_at DESC") (seperate columns by comma ex "{column_1} {ASC:DESC}, {column_2} {ASC:DESC}")
    // available columns
    //   ew_crm_users
    //     id, affiliate_id, email, username, first_name, last_name, full_name, phone, email_verified, created_at, updated_at
    //   ew_crm_affiliates
    //     affiliate_id, name, referral_code
    // returns
    //   (user export file)
    export (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/export';
        return WebClient.basicPostRaw(form_data, url, success_callback, failure_callback);
    }


    // purpose
    //   get available amount of credit they can redeem
    // args
    //   user_id (optional) (default is logged in user)
    // returns
    //   amount
    creditAvailable (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/credit/available';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   gets ths user role
    // args
    //   user_id (optional) (must have admin role in order to call)
    // returns
    //   role
    getRole (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/role';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   gets the user permissions
    // args
    //   user_id (optional) (requires Administrator permission) (default is logged in userid)
    // returns
    //   user_permissions
    getPermissions (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/permissions';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   adds affiliate type to user and makes them become an affiliate
    // args
    //   user_id (optional) (default is logged in user id)
    //   tax_address_id (required if AFFILIATE_REQUIRE_TAX_ADDRESS is true in config)
    //   tax_id (required if AFFILIATE_REQUIRE_TAX_ID is true in config)
    //   payout_method_id (required if AFFILIATE_REQUIRE_PAYOUT_METHOD is true in config)
    //   company_name (optional)
    //   company_website (optional)
    // returns
    //   user affiliate signup
    affiliateSignup (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/affiliate/signup';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   approve an approval process
    // args
    //   user_id (required)
    //   type (AFFILIATE, EMPLOYEE, CUSTOMER, PROSPECT)
    // returns
    //   (none)
    typeApprove (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/type/approve';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   check credentials for api
    // args
    //   username (required)
    //   password (required)
    //   token (MD5 of (ipiS89VOwluieIAaTBxstizMOsoa2X7p + username + password))
    // returns
    //   user_key
    apiCheck (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/api/check';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   validate an api key is valid
    // args
    //   api_key (required)
    // returns
    //   (none)
    apiKeyValidate (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/api/key/validate';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get the affilite direct children
    // args
    //   user_id (required)
    // returns
    //   users
    getAffiliateChildren (form_data, success_callback, failure_callback, async = true)
    {
        var url = '/global/crm/user/affiliate/children';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.children = success.data.children.map((child) => new EliteAPI.Models.CRM.User(child));
            if (success_callback) success_callback(success);
        }, failure_callback, async);
    }

    // purpose
    //   get commission payout
    // args
    //   user_id (optional) (default is user logged in)
    // returns
    //   amount
    getCurrentCommission (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/current/commission';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }


    // purpose
    //   get the venues this user belongs to
    // args
    //   (none)
    // returns
    //   venues
    getVenues (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/venues';
        return WebClient.basicGet(form_data, url, success_callback, failure_callback);
    }


    // purpose
    //   add a user type
    // args
    //   user_id (required)
    //   approved (default is false)
    //   type (AFFILIATE, EMPLOYEE, CUSTOMER, PROSPECT)
    // returns
    //   (none)
    addType (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/type/add';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   delete a user type
    // args
    //   user_id (required)
    //   type (AFFILIATE, EMPLOYEE, CUSTOMER, PROSPECT)
    // returns
    //   (none)
    deleteType (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/user/type/delete';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }


    // purpose
    //   send forgot password email
    // args
    //   email (required)
    // returns
    //   (none)
    forgotPassword (form_data, success_callback, failure_callback)
    {

        var url = '/global/eml/user/password/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get referral code
    // args
    //   (none)
    // returns
    //   (none)
    getReferralCode (form_data, success_callback, failure_callback)
    {

        var url = '/global/crm/user/code/referral/system';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }
}


class TimeClock extends Model {
    constructor() {
        super('timeclock');
    }

    // purpose
    //   clock in an employee
    // args
    //   user_id (default is logged in user)
    //   manager_user_id (required if role requires it)
    // returns
    //   time_clock
    in (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/timeclock/in';
        return WebClient.basicPost(form_data, url, success => {
            success.data.time_clock = new EliteAPI.Models.CRM.TimeClock(success.data.time_clock);
            if (success_callback) success_callback(success)
        }, failure_callback);
    }

    // purpose
    //   clock out an employee
    // args
    //   user_id (default is logged in user)
    // returns
    //   time_clock
    out (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/timeclock/out';
        return WebClient.basicPost(form_data, url, success => {
            success.data.time_clock = new EliteAPI.Models.CRM.TimeClock(success.data.time_clock);
            if (success_callback) success_callback(success)
        }, failure_callback);
    }

    // purpose
    //   set a timeclock
    // args
    //   time_clock_id (required)
    //   start (optional)
    //   end (optional)
    //   approved (optional) (only allowed if you have the permission to approve timeclocks)
    // returns
    //   (none)
    set (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/timeclock/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   add a timeclock
    // args
    //   user_id (optional default is user signed in)
    //   manager_user_id (required if user role requires manager)
    //   start (required)
    //   end (required)
    // returns
    //   time_clock
    add (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/timeclock/add';
        return WebClient.basicPost(form_data, url, success => {
            success.data.time_clock = new EliteAPI.Models.CRM.TimeClock(success.data.time_clock);
            if (success_callback) success_callback(success)
        }, failure_callback);
    }

    // purpose
    //   approve timeclocks
    // args
    //   time_clock_ids (required) (comma seperated)
    // returns
    //   (none)
    approve (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/timeclock/approve';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get the active time clock
    // args
    //   user_id (optional)
    // returns
    //   status (IN, OUT)
    //   time_clock (if status is IN)
    status (form_data, success_callback, failure_callback)
    {
        var url = '/global/crm/timeclock/status';
        return WebClient.basicGet(form_data, url, success => {
            if (success.data.time_clock) success.data.time_clock = new EliteAPI.Models.CRM.TimeClock(success.data.time_clock);
            if (success_callback) success_callback(success)
        }, failure_callback);
    }
}


class Address {

    // purpose
    //   add an address into the system
    // args
    //   street_1 (required)
    //   street_2 (optional)
    //   city (required)
    //   state (required)
    //   country (required)
    //   zipcode (required)
    //   latitude (optional)
    //   longitude (optional)
    //   validate (optional) (defualt is false)
    // returns
    //   address
    // error_codes
    //   VALIDATION_ERROR (unable to validate address in api)
    add (form_data, success_callback, failure_callback, block = false)
    {
        let url = '/global/crm/address/add';
        if (!block) return WebClient.basicPost(form_data, url, success_callback, failure_callback);
        else return WebClient.blockPost(form_data, url, success_callback, failure_callback);
    }

    // purpose
    //   get an address
    // args
    //   address_id (required)
    // returns
    //   address
    get (form_data, success_callback, failure_callback)
    {
        let url = '/global/crm/address';
        return WebClient.basicGet(form_data, url, (success) => {
            success.data.address = new EliteAPI.Models.CRM.Address(success.data.address);
            if (success_callback !== undefined) success_callback(success);
        }, failure_callback);
    }

    // purpose
    //   validate an address
    // args
    //   (none)
    // returns
    //   address
    validate (form_data, success_callback, failure_callback, async = true)
    {
        let url = '/global/crm/address/validate';
        return WebClient.basicPost(form_data, url, (success) => {
            success.data.address = new EliteAPI.Models.CRM.Address(success.data.address);
            if (success_callback !== undefined) success_callback(success);
        }, failure_callback, async);
    }
}

class Deal extends Model {
    constructor() {
        super('deal')
    }

    // purpose
    //   add a deal
    // args
    //   status (default is OPPORTUNITY)
    //   name (required)
    //   zone_id (optional)
    //   description (optional)
    //   user_id (required)
    // returns
    //   deal
    add (form_data, success_callback, failure_callback)
    {
        let url = '/global/crm/deal/add';
        return WebClient.basicPost(form_data, url, success => {
            success.data.deal = new EliteAPI.Models.CRM.Deal(success.data.deal);
            if (success_callback) success_callback(success)
        }, failure_callback);
    }


    // purpose
    //   set a deal
    // args
    //   deal_id (required)
    //   zone_id (optional)
    //   status (optional)
    //   name (optional)
    //   description (optional)
    //   user_id (optional)
    // returns
    //   (none)
    set (form_data, success_callback, failure_callback)
    {
        let url = '/global/crm/deal/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }
}

class Zone extends Model {
    constructor() {
        super('zone');
    }

    // purpose
    //   set a zone
    // args
    //   zone_id (required)
    //   name (optional)
    // returns
    //   (none)
    set(form_data, success_callback, failure_callback) {
        let url = '/global/crm/zone/set';
        return WebClient.basicPost(form_data, url, success_callback, failure_callback);
    }
}
