const express = require('express');

const router = express.Router();

const path = require('path');

router.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'..','view','index.html'));
})

const controller = require('../controller/index');

router.get('/getExpense', controller.getData);

router.post('/postExpense',controller.postData);

router.delete('/deleteExpense/:id',controller.deleteData);

router.get('/editExpense/:id', controller.editExpense);

router.patch('/updateExpense/:id',controller.updateData);

module.exports = router;