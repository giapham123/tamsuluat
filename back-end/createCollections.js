// Create Collections using nodejs

var MongoClient = require('mongodb').MongoClient;
const { url } = require('./config/database.config.js');

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db();
const collections = await dbo.collections();

if (!collections.map(c => c.s.namespace.collection).includes('companyss')) {
    await dbo.createCollection('companyss');
}
if (!collections.map(c => c.s.namespace.collection).includes('comments')) {
  await dbo.createCollection('comments');
}
if (!collections.map(c => c.s.namespace.collection).includes('replycomments')) {
  await dbo.createCollection('replycomments');
}
if (!collections.map(c => c.s.namespace.collection).includes('addresses')) {
  await dbo.createCollection('addresses');
}
});
