
export default class WebClient {

	static getFullUrl(url)
	{
		return `https://${GlobalUtil.webClientKey}.eliteworks.com${url}`;
	}

	static addApiKey(args)
	{
		if (!GlobalUtil.isEmpty(GlobalUtil.webClientApiKey)) args['api_key'] = GlobalUtil.webClientApiKey;
		return args;
	}

	static basicPost(args, url, successCallback, failureCallback)
	{
		args = WebClient.addApiKey(args);
		fetch(WebClient.getFullUrl(url), {
			method: "POST",
			body: JSON.stringify(args),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			var json = response.json().then((data) => {
				if (data.result == 'success') {
					if (successCallback !== undefined) successCallback(data);
				}
				else if (failureCallback !== undefined) failureCallback(data);
			}).catch(() => {
				if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
			});
		}).catch(() => {
			if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
		})
	}
	static basicGet(args, url, successCallback, failureCallback) 
	{
		args = WebClient.addApiKey(args);
		var paramsEncoded = "?" + Object.keys(args).map(prop => {return [prop, args[prop]].map(encodeURIComponent).join("=")}).join("&");

        console.log(WebClient.getFullUrl(url) + paramsEncoded);
		fetch(WebClient.getFullUrl(url) + paramsEncoded, {
			method: "GET",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((response) => {
			var json = response.json().then((data) => {
				if (data.result == 'success') {
				  	if (successCallback !== undefined) successCallback(data);
				}
				else if (failureCallback !== undefined) failureCallback(data);
			}).catch(() => {
				if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
			});
		}).catch(() => {
			if (failureCallback !== undefined) failureCallback({result: 'failure', error_message: 'Unable to connect'});
		})
	}
}