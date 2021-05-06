/* const { Router } = require('express');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('menu.json')
const database = lowdb(adapter);
const router = new Router();


//Verifiera skapat konto/login
router.post('/api/login', (request, response) => {
    const loginCreds = request.body;
    console.log('LoginCreds:', loginCreds);

    const compareCreds = database.get(accounts).find({username: loginCreds.username, password: loginCreds.password}).value();
    console.log('compare:',compareCreds);
});


module.exports = router */