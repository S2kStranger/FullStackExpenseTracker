const express = require('express');
const router = express.Router();

const database = require('../models/expenses');

exports.getData = (req,res,next) => {

    database.findAll()
    .then(expenses => {
        res.status(200).json({allexpenses : expenses});
    })
    .catch(err => {
        res.status(500).json({error : err});
    });
    
}

exports.postData = (req,res,next) => {
    //console.log("Entered in postData");
    if(!req.body.price || !req.body.desc)
    {
        throw new Error("Fields cannot be empty");
    }
    console.log(req.body);
    database.create({
        category : req.body.category,
        price : req.body.price,
        description : req.body.desc
    })
    .then(result => {
        res.status(200).json({expense : result})
    })
    .catch(err => {
        res.status(500).json({error : err})
    });
}

exports.deleteData = (req,res,next) => {
    const expenseid = req.params.id;
    
    database.findByPk(expenseid)
        .then(expense => {
            return expense.destroy();
        })
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(500).json({error : err});
        });
}

exports.editExpense = (req,res,next) => {
        //console.log("entered in editexpense");
        const expenseid = req.params.id;
        database.findByPk(expenseid)
        .then(expense => {
           // console.log("expense found");
            res.status(201).json({expenseData : expense});
        })
        .catch(err => {
            res.status(500).json({error : err});
        })
}

exports.updateData = (req,res,next) => {
    if(!req.body.price || !req.body.desc)
    {
        throw new Error("Fields cannot be empty");
    }
        const expenseid = req.params.id;
        database.findByPk(expenseid)
        .then(expense => {
            expense.category = req.body.category;
            expense.price = req.body.price;
            expense.description = req.body.desc;
            return expense.save();
        })
        .then(result => {
            res.status(201).json({updatedexpense : result});
        })
        .catch(err => {
            res.status(500).json({error : err});
        })
}