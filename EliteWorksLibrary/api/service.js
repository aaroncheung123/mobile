

import WebClient from './web-client';

export default class Service {
    constructor() {
        this.Config = new Config();
        this.User = new User();
    }
}

class Config {
    constructor() {
        this.config_settings = undefined
        this.subscribed_updates = []
        this.async_calls = {}


        this.populateConfig = this.populateConfig.bind(this);
        this.has = this.has.bind(this);
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    // this will populate all front end config values - this is meant only for an internal use function
    populateConfig(callback)
    {
        if (this.config_settings === undefined)
        {
            let successCallback = response => {
                this.config_settings = response.data.configurations;
                if (callback) callback();
            };
            let failureCallback = response => {
                this.config_settings = {};
                if (callback) callback();
            };
            let url = '/global/cfg/configs';
            WebClient.basicGet({}, url, successCallback, failureCallback);
        }
        else if (callback) callback();
    }

    // args
    // key - key to the frontend config
    // returns if there is a frontend config value with given key
    has(key, callback)
    {
        this.populateConfig(() => {
            let response = (this.config_settings[key] === undefined) ? false : true;
            if (callback) callback(response);
        });
    }

    // args
    // key - key to the frontend config
    // returns frontend config associated with key
    get(key, callback, defaultValue)
    {
        this.populateConfig(() => {
            let response =  (this.config_settings[key] == undefined) ? defaultValue : this.config_settings[key];
            if (callback) callback(response);
        });
    }

    // purpose to refresh the config
    refresh(callback) {
        this.config_settings = undefined;
        this.populateConfig(callback);
    }

    // purpose
    //   set a config value (you have to be logged in and have permissions in order to use this api call)
    // args
    //   key - key of config you would like to set
    //   value - value of config you would like to set
    //   encrypt (optional) - if this is set to 1 then it will encrypt the value in the database when it saves it. Make sure you do this if you save any api keys like slyce api key.
    // returns
    //   whether or not it successfully set config value
    set(key, value, encrypt, success_callback, failure_callback)
    {
        let url = '/global/cfg/config/set';
        this.config_settings[key] = value
        this.subscribed_updates.forEach(method => {
            method();
        })
        if (this.async_calls[key]) {
            this.async_calls[key].abort();
            delete this.async_calls[key];
        }

        let convertedValue = (typeof(value) === typeof('string')) ? value.trim() : value;
        if (GlobalUtil.isEmpty(convertedValue)) convertedValue = 'NULL'

        this.async_calls[key] = WebClient.basicPost({key: key, value: convertedValue, encrypt: encrypt}, url, (success) => {
            if (success_callback) success_callback(this.config_settings)
        }, failure_callback);

        return this.async_calls[key];
    }

}

class User {
    constructor() {
        this.loggedInUser = undefined;
        this.isLoggedIn = undefined;
        this.elitePermissions = undefined;
        this.userPermissions = undefined;
        this.userRole = undefined;
        this.types = undefined;
        this.preferences = {}


        this.populateLoggedInUser = this.populateLoggedInUser.bind(this);
    }
    // this will populate the logged in user values - this is meant only for an interal use function
    populateLoggedInUser(callback) {
        if (this.isLoggedIn === undefined)
        {
            let successCallback = response => {
                this.loggedInUser = new EliteAPI.Models.CRM.User(response.data.user);
                this.isLoggedIn = true;
                if (callback) callback();
            };
            let failureCallback = response => {
                this.isLoggedIn = false;
                if (callback) callback();
            };
            let url = '/global/crm/user';
            WebClient.basicGet({include_classes: 'account,accounttype'}, url, successCallback, failureCallback);
        }
        else callback()
    }

    // args
    // none
    // returns true if the user is logged in and false if they are not
    check = (callback) => {
        this.populateLoggedInUser(() => {
            if (callback) callback(this.isLoggedIn);
        });
    }

    // purpose
    //   refresh the user
    // args
    //   (none)
    // returns
    //   (none)
    refresh = (callback) => {
        this.loggedInUser = undefined;
        this.isLoggedIn = undefined;
        this.preferences = {};
        this.populateLoggedInUser(callback);
    }

    // purpose
    //   gets logged in user
    // args
    //   (none)
    // returns
    //   logged in user model
    get = (callback) => {
        this.populateLoggedInUser(() => {
            if (callback) callback(this.loggedInUser);
        });
    }

    populatePermissions = (callback) => {
        this.populateElitePermissions(() => {
            this.popoulateRole(() => {
                this.populateUserPermissions(() => {
                    if (callback) callback();
                });
            });
        });
    }

    populateElitePermissions = (callback) => {
        if (this.elitePermissions === undefined)
        {
            let successCallback = success => {
                this.elitePermissions = success.data.permissions;
                if (callback) callback();
            };
            let failureCallback = failure => {
                this.elitePermissions = [];
                if (callback) callback();
            };
            let url = '/global/elite/permissions';
            WebClient.blockGet({}, url, successCallback, failureCallback);
        }
        else if (callback) callback();
    }

    populateRole = (callback) => {
        if (this.populatedRole === undefined)
        {
            let successCallback = success => {
                this.populatedRole = true;
                if (success.data.role) this.userRole = success.data.role;
                if (callback) callback();
            };

            let failureCallback = failure => {
                this.userRole = undefined;
                if (callback) callback();
            }
            let url = '/global/crm/user/role';
            WebClient.blockGet({include_classes: 'rolepermission'}, url, successCallback, failureCallback);
        }
        else if (callback) callback();
    }

    populateUserPermissions = (callback) => {
        if (this.userPermissions === undefined)
        {
            let successCallback = success => {
                this.userPermissions = success.data.user_permissions;
                if (callback) callback();
            };
            let failureCallback = failure => {
                this.userPermissions = [];
                if (callback) callback();
            };
            let url = '/global/crm/user/permissions';
            WebClient.blockGet({}, url, successCallback, failureCallback);
        }
        else if (callback) callback();
    }

    populateTypes = (callback) => {
        if (this.types === undefined)
        {
            let successCallback = success => {
                this.types = success.data.user_types;
                if (callback) callback();
            };
            let failureCallback = failure => {
                this.types = [];
                if (callback) callback();
            };
            let url = '/global/crm/user/types';
            WebClient.blockGet({include_classes: 'type'}, url, successCallback, failureCallback);
        }
        else if (callback) callback();
    }

    // purpose
    //   check if user has permission
    // args
    //   permissionPair (array ['Permission Category', 'Permission'])
    // returns
    //   (true/false)
    hasPermission = (permissionPair, callback) => {
        this.hasAnyPermission([permissionPair], callback);
    }

    // purpose
    //   check if user has permission
    // args
    //   permissionPairs (array [ array ['Permission Category', 'Permission']])
    // returns
    //   (true/false)
    hasAnyPermission = (permissionPairs, callback) => {
        if (!callback) return;

        this.check((isLoggedIn) => {
            if (isLoggedIn)
            {
                this.get((user) => {
                    if (user)
                    {
                        if (GlobalUtil.inputToBool(user.administrator)) callback(true);
                        this.hasType('EMPLOYEE', true, hasEmployee => {
                            if (hasEmployee)
                            {
                                this.populatePermissions(() => {
                                    // get all permission ids
                                    let permissionIds = {};
                                    permissionPairs.forEach(permissionPair => {
                                        this.elitePermissions.forEach(permission => {
                                            if (permission.category == permissionPair[0] && permission.action == permissionPair[1]) permissionIds[permission.permission_id] = true;
                                        })
                                    })

                                    // check to see if user permission or role permissions has any of these permissions
                                    let foundPermission = false;
                                    this.userPermissions.forEach(userPermission => {
                                        if (permissionIds[userPermission.permission_id]) foundPermission = true;
                                    })

                                    this.userRole.role_permissions.forEach(rolePermission => {
                                        if (permissionIds[rolePermission.permission_id]) foundPermission = true;
                                    })
                                    if (callback) callback(foundPermission);
                                })
                            }
                            else callback(false)
                        })
                    }
                    else callback(false)
                })
            }
            else callback(false)
        })
    }

    // purpose
    //   get a permission by type for crrent logged in user
    // args
    //   type
    // returns
    //   first preference matching type
    getPreference = (type, callback, default_value = undefined) => {
        if (this.preferences[type] !== undefined) {
            if (callback) callback(this.preferences[type]);
        }

        let successCallback = response => {
            this.preferences[type] = JSON.parse(response.data.user_preference.value);
            if (callback) callback(this.preferences[type]);
        };
        let failureCallback = response => {
            this.preferences[type] = default_value;
            if (callback) callback(this.preferences[type]);
        }
        let url = '/global/crm/user/preference';
        WebClient.basicGet({type: type}, url, successCallback, failureCallback);
    }

    // purpose
    //   set a user preference
    // args
    //   type
    //   value
    // returns
    //   (none)
    setPreference = (type, value, callback) => {
        this.preferences[type] = value;
        let url = '/global/crm/user/preference/set';
        WebClient.basicPost({type: type, value: JSON.stringify(value)}, url, callback);
    }

    // purpose
    //   check to see if you has type
    // args
    //   type (AFFILIATE, EMPLOYEE, etc..)
    // returns
    //   (true/false)
    hasType = (typeName, approved, callback) => {
        this.populateTypes(() => {

            let foundType = false;
            this.types.forEach((user_type) => {
                if (user_type.type.type == typeName) {
                    if (approved !== undefined && GlobalUtil.inputToBool(approved) == GlobalUtil.inputToBool(user_type.approved)) foundType = true;
                    else foundType = true;
                }
            })
            if (callback) callback(foundType);
        });
    }

    // purpose
    //   get type
    // args
    //   type (AFFILIATE, EMPLOYEE, etc..)
    // returns
    //   user_type
    getType = (typeName, callback) => {
        this.populateTypes(() => {

            let type = undefined;
            this.types.forEach((user_type) => {
                if (user_type.type.type == typeName) type = user_type;
            })
            if (callback) callback(type);
        });

    }

    // purpose
    //   refresh the ser types
    // args
    //   (none)
    // returns
    //   (none)
    refreshTypes = () => {
        this.types = undefined;
    }
}