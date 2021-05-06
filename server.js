// TEST TEST TEST TEST
const express = require('express')
const menuRouter = require('./routes/coffee')
const order = require('./routes/order')
const signup = require('./routes/signup')
const login = require('./routes/login')
const { request, response } = require('express')

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('accounts.json');
const database = lowdb(adapter);

const app = express();

app.use(express.json());

app.use('/api/coffee', menuRouter);
app.use('/api/order', order);
app.use('/api/accounts', signup)
/* app.use('/api/order/:id',order); */
/* app.use('/api/login', login) */


//  function initiateDatabase() {
//      accountsdatabase.defaults({ accounts: [] }).write();
// };
/* app.get('/api/order/:id', (request, response) => {
    const userid = request.params.id;

    response.send('userid',userid)
}) */

app.listen(5000, () => {
    console.log("server started")
    // initiateDatabase();
})


//PARAMETER-TEST. Tar bort användare utifrån unikt ID.
app.delete('/api/account/:id', (request, response) => {
  const accountId = request.params.id;
  const orderHistory = database.get('accounts').remove({ id: accountId }).write();
  console.log('Historik:', orderHistory);

  let result = {};

  if (orderHistory.length > 0) {
    result.success = true;
  } else {
    result.success = false;
    result.message = 'Användaren finns inte';
  }

  response.json(result);
});