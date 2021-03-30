function getCook(cookiename)
{
	// Get name followed by anything except a semicolon
	var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
	// Return everything after the equal sign, or an empty string if the cookie name not found
	return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

class Filter
{
  	constructor()
	{
		this.token = getCook("X-Auth-Token");
		this.url = "/auth/filter";
	}
	readfilter(data)
	{
		if (typeof(data) == "object")
		{
			if (data.length != undefined)
			{
				for (let id in data)
				{
					this.readfilter(data[id]);
				}
			}
			else if (!jQuery.isEmptyObject(data))
			{
				if (this.onChange != undefined)
					this.onChange(data);
			}
		}
	}
	read(id)
	{
		var url = this.url;
		if (id != undefined)
			url += "/"+id;
		this.request = $.ajax({
			type: "GET",
			url: url,
			headers : {
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				this.readfilter(data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
					this.onError(JSON.parse(request.responseText));
				this.request = undefined;
			}.bind(this),
		});
	};
	create(data)
	{
		this.request = $.ajax({
			type: "PUT",
			url: this.url,
			data: data,
			headers : {
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				this.readfilter(data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
					this.onError(JSON.parse(request.responseText));
				this.request = undefined;
			}.bind(this),
		});
	};
	remove(id)
	{
		var data = {};
		data.id = id;
		this.request = $.ajax({
			type: "DELETE",
			url: this.url+"/"+id,
			data: data,
			headers : {
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				this.readfilter(data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
					this.onError(JSON.parse(request.responseText));
				this.request = undefined;
			}.bind(this),
		});
	};
}
