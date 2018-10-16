const path = require('path');

module.exports = {
	getProjectRoots() {
		return [
			path.join(__dirname, '..', 'EliteWorksLibrary'),
			__dirname
		]
	}
}