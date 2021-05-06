const { Router, request, response } = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('order.json');
const database = lowdb(adapter);
const router = new Router();
const { nanoid } = require('nanoid');
var generator = require('generate-password');

var password = generator.generate({
	length: 10,
	numbers: true
});

database.defaults({ accounts: [] }).write();

// skapa konto


router.post('/', (request, response) => {
   const accountItem = request.body;
    accountItem.id = nanoid(); 
    accountItem.password = password;
   console.log('Konto att lägga till:', accountItem);
/*     accounts.push(accountItem)
 */const user = database.get('accounts').push(accountItem).write();
/*     const accounts = accountsdatabase.get('accounts').value();
 */
    console.log('account-databasen innhåller:', JSON.stringify(user));
    
    
    let result = {};
    result.user = user
    response.json(result);

}) 

/* const account = {
    username: 'Test',
    email: 'test@test.se',
    password: '12345'
} */

/* database.get('accounts').push(account).write();
 */



module.exports = router