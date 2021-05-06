const { Router } = require('express');
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('menu.json')
const database = lowdb(adapter);
const router = new Router();

database.defaults({ menu: [] }).write();


router.get('/', (request, response) => {
    const menu = database.get('menu').value()
    let result = {menu}
    response.json(result)
});

module.exports = router;