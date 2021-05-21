function getCook(cookiename)
{
	// Get name followed by anything except a semicolon
	var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
	// Return everything after the equal sign, or an empty string if the cookie name not found
	return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

class Profile
{
  	constructor(user)
	{
		this.token = getCook("X-Auth-Token");
		this.url = "/auth/mngt";
		this.user = user;
	}
	generate(entropy)
	{
		var randomInt = function(len) {
			var x;
			if ('crypto' in window)
			{
				var y = new Uint32Array(1);
				window.crypto.getRandomValues(y);
				x = y[0] % len;
			}
			else
				x = Math.floor(Math.random() * len);
			return x;
		};
		var charset = "abcdefghijklmnopqrstuvwxyz";
		charset += "ABCDEFGHIJKLMNTOPQRSTUVWXYZ";
		charset += "0123456789";
		charset += "!#$@&€{}()";
		var passlength = Math.ceil(entropy * Math.log(2) / Math.log(charset.length));
		var password = "";
		for (var i = 0; i < passlength; i++)
			password += charset[randomInt(charset.length)];
		return password;
	}
	readfnc(request)
	{
		var user = request.getResponseHeader("X-Remote-User");
		if (this.user != user)
		{
			this.user = user;
		}
		var group = request.getResponseHeader("X-Remote-Group");
		if (this.onPermission != undefined)
			this.onPermission(user, group);
		return true;
	};
	readuser(data)
	{
		if (typeof(data) == "object")
		{
			if (data.length != undefined)
			{
				for (let id in data)
				{
					this.readuser(data[id]);
				}
			}
			else if (!jQuery.isEmptyObject(data))
			{
				var user = data.user;
				if (user == undefined)
					user = this.user;
				if (data.user == undefined)
					data.user = this.user;
				if (this.onChange != undefined)
					this.onChange(user, data);
			}
		}
	}
	read(user)
	{
		var url = this.url;
		if (user != undefined)
			url += "/"+user;
		if (this.request != undefined)
			console.log("WAIT");
		this.request = $.ajax({
			type: "GET",
			url: url,
			headers : {
				"X-Requested-With": "XMLHttpRequest",
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				if (this.readfnc(request))
					this.readuser(data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
					this.onError(JSON.parse(request.responseText));
				this.readfnc(request);
				this.request = undefined;
			}.bind(this),
		});
	};
	change(user, data)
	{
		if (this.request != undefined)
			console.log("WAIT");
		if (user == undefined)
			user = this.user;
		if (data.user == undefined)
			data.user = user;

		this.request = $.ajax({
			type: "POST",
			url: this.url+"/"+data.user,
			data: data,
			headers : {
				"X-Requested-With": "XMLHttpRequest",
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				if (this.readfnc(request))
					this.readuser(data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
					this.onError(JSON.parse(request.responseText));
				this.readfnc(request);
				this.request = undefined;
			}.bind(this),
		});
	};
	create(user, data)
	{
		if (this.request != undefined)
			console.log("WAIT");
		if (user == undefined)
			user = this.user;
		this.request = $.ajax({
			type: "PUT",
			url: this.url,
			data: data,
			headers : {
				"X-Requested-With": "XMLHttpRequest",
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				if (this.readfnc(request))
					this.readuser(data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
				{
					var message = textStatus;
					switch (request.status)
					{
						case 403:
							message = "The server disallows new user.<br>Contact the administrator";
						break;
					}
					this.onError(message);
				}
				this.readfnc(request);
				this.request = undefined;
			}.bind(this),
		});
	};
	remove(user)
	{
		if (this.request != undefined)
			console.log("WAIT");
		if (user == undefined)
			user = this.user;
		var data = {};
		data.user = user;
		this.request = $.ajax({
			type: "DELETE",
			url: this.url+"/"+user,
			data: data,
			headers : {
				"X-Requested-With": "XMLHttpRequest",
				"X-Auth-Token": this.token,
				"Accept":"text/json"
			},
			xhrFields: {
				withCredentials: true
			},
			success: function(data, status, request) {
				if (this.readfnc(request) && this.onRemove != undefined)
					this.onRemove(user, data);
				this.request = undefined;
				var token = request.getResponseHeader("X-Auth-Token");
				if (token != this.token)
					this.token = token;
			}.bind(this),
			error: function(request, textStatus, errorThrown) {
				if (this.onError != undefined)
					this.onError(JSON.parse(request.responseText));
				this.readfnc(request);
				this.request = undefined;
			}.bind(this),
		});
	};
}
