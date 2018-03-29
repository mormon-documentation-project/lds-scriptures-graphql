const Database = require('better-sqlite3');
module.exports = new Database(require.resolve('lds-scriptures/lds-scriptures-sqlite3.db'), {
	readonly: true,
});
