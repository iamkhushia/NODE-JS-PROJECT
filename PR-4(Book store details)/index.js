const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/db');

app.set('view engine', 'ejs');

const user = require('./models/UserModel.js')

app.use(express.urlencoded());

app.get('/', (req, res) => {
    user.find({})
        .then((data) => {
            return res.render('view', {
                record: data
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/deletRecord',(req,res)=>{
    let id =req.query.deletId;
    user.findByIdAndDelete(id)
    .then((data)=>{
        console.log("user delete");
        return res.redirect('/')
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/editRecord', (req, res) => {
    let id = req.query.id;
    user.findById(id)
        .then((single) => {
            return res.render('edit', {
                data: single
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})


app.post('/updateRecord',(req,res)=>{
    const {editid,bookname,bookprice,bookpages,bookauthor} =req.body;
    console.log(bookname,bookprice,bookpages,bookauthor);
    
    user.findByIdAndUpdate(editid,{
        bookname : bookname,
        bookprice : bookprice,  
        bookpages : bookpages,
        bookauthor : bookauthor,
        
    }).then((data)=>{
        console.log("user update");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/add', (req, res) => {
    return res.render('add')
})

const userModel = require('./models/UserModel.js')

app.post('/insertRecord', (req, res) => {
    const { bookname, bookprice,bookpages, bookauthor } = req.body;

    userModel.create({
        bookname: bookname,
        bookprice: bookprice,
        bookpages: bookpages,
        bookauthor: bookauthor,

    }).then((data, err) => {
        if (err) {
            console.log(err);
            return false;
        }
        console.log(`recorde add`);
        return res.redirect('/add');
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is running:- ${port}`);
})

