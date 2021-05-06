const { Router, request, response } = require('express');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('order.json')
const database = lowdb(adapter);
const router = new Router();


const orderid = require('order-id')('mysecret')



database.defaults({ order: [] }).write();


router.post('/', (request, response) => {

    const orderItem = request.body;
    console.log('order att lägga till:', orderItem);
    let d = new Date()
    orderItem.ordertime = new Date().toLocaleString('SE',d);
    orderItem.ordernummer = orderid.generate();

    database.get('accounts').filter({userID:orderItem.userID}).value();
    const order = database.get('order').push(orderItem).write();
    

    let result = {}

    result.success = true;
    result.order = order;

    response.json(result);
});

router.get('/:id', (request, response) => {

    const userID = request.params.id;
     const orders =  database.get('order').filter({ userID:userID }).value();
    let result = {};
    response.json(orders)  

 });
 
 router.get('/api/accounts/:id', (request, response) => {
  const id = request.params.id;
  const removedTodo = database.get('accounts').find({ id: id }).write();
  console.log('test:', removedTodo);

  let result = {};

  if (removedTodo.length > 0) {
    result.success = true;
  } else {
    result.success = false;
    result.message = 'Hittade ingen todo att ta bort med det id:et';
  }

  response.json(result);
});


module.exports = router