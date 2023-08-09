

var myform = document.getElementById('my-form');
var category = document.getElementById('category');
var price = document.getElementById('expenseamt');
var desc = document.getElementById('description');
var userid = document.getElementById('userid');
var btnsubmit = document.getElementById('submit');
var btnupdate = document.getElementById('update');
var expenselist = document.getElementById('expenseList');


//Fetching data from database to the window on loading the page
window.addEventListener('DOMContentLoaded', async () => {
    try
    {
        const result = await axios.get("http://localhost:4000/getExpense");
        //console.log(result);
        for(var i =0;i<result.data.allexpenses.length;i++)
        {
            //console.log(result.data.allexpenses[i]);
            listExpenses(result.data.allexpenses[i]);
        }

    }catch(error){
        document.body.innerHTML = document.body.innerHTML+'<h4>Error in fetching data</h4>';
        console.log(error);
    }

})

function listExpenses(expense_obj)
{
    var str = `Category: ${expense_obj.category} , Price: ${expense_obj.price} , Description: ${expense_obj.description}`;
    //creating li attribute in ul list
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(str));

    //createing delete button
    let delbtn = document.createElement('button');
    delbtn.classList.add('tempbtn');
    delbtn.appendChild(document.createTextNode("Delete"));
    li.append(delbtn);
    
    //adding eventlistener to delete button created here
    delbtn.addEventListener('click', (e) =>{
        e.preventDefault();

        axios.delete(`http://localhost:4000/deleteExpense/${expense_obj.id}`)
        .then(result => {
            li.remove();
        })
        .catch(error => {
            document.body.innerHTML = document.body.innerHTML+'<h4>Something went wrong</h4>';
            console.log(error);
        });
    })

    //creating edit button 
    let editbtn = document.createElement('button');
    editbtn.classList.add('tempbtn');
    editbtn.appendChild(document.createTextNode("Edit"));
    li.append(editbtn);

    //adding eventListener to edit button created here
    editbtn.addEventListener('click',(e) => {

        e.preventDefault();
        axios.get(`http://localhost:4000/editExpense/${expense_obj.id}`)
        .then(expense => {
            const data = expense.data.expenseData;
            category.value = data.category;
            price.value = data.price;
            desc.value = data.description;
            userid.value = data.id;
            li.remove();
        })
        .catch(error => {
            document.body.innerHTML = document.body.innerHTML+'<h4>Something went wrong</h4>';
            console.log(error);
        })

    })
    expenselist.appendChild(li);
}


//adding event listener to submit button
myform.addEventListener('submit', async (e) =>  {
    e.preventDefault();
    //console.log("Entered in listener");
    try
    {
        const obj_expense = {
            category : category.value,
            price : price.value,
            desc : desc.value
        }
        //console.log(obj_serialized);
        const result = await axios.post('http://localhost:4000/postExpense',obj_expense);
        listExpenses(result.data.expense);
        myform.reset();
    }catch(error){
        document.body.innerHTML = document.body.innerHTML+'<h4>Error in fetching data</h4>';
        console.log(error);
    }

})

//adding event listener to update button
btnupdate.addEventListener('click', async (e) => {
        e.preventDefault();
    try{
        const obj_expense = {
        category : category.value,
        price : price.value,
        desc : desc.value,
        id : userid.value
        }

        const result = await axios.patch(`http://localhost:4000/updateExpense/${userid.value}`,obj_expense);
        listExpenses(result.data.updatedexpense);
        myform.reset();

    }catch(error) {
        document.body.innerHTML = document.body.innerHTML+'<h4>Error in fetching data</h4>';
        console.log(error);
    }


})
