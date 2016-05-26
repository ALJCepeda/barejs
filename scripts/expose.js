var Expose = function(map) {
	this.urls = {};
	this.server = null;

	this.add = function(url, name) {
		var absPath = path.join(__dirname, "scripts", name + ".js");

		try {
			var stat = fs.lstatSync(absPath);
			if(stat.isFile() === true) {
				this.urls[url] = absPath;
				return true;
			} else {
				return false;
			}
		} catch(e) {
			return false;
		}
	};

	this.has = function(url) {
		return V.defined(this.urls[url]);
	};

	this.listen = function(server) {
		console.log("Bindutil is listening on a server");
		server.on("request", function(req, res) {
			if(req.method === "GET") {
				if(this.has(req.url) === true) {
					var url = this.urls[req.url];

					fs.readFile(url, "UTF8", function(err, data) {
						if(err) { throw err; }
						else {
							res.setHeader("Content-Type", "text/javascript;charset=UTF-8");
							res.end(data, "UTF-8");
						}
					});
				}
			}
		}.bind(this));
	};

	O.forEach(function(value, key) {
		this.add(value, key);
	}.bind(this));
};

module.exports = Expose;
