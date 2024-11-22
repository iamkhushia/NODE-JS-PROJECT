const usersmodel = require('../models/usersmodels');

// login system start

const registerPage = (req, res) => {
    return res.render('register');
}

const loginPage = (req, res) => {
    if (req.cookies['auth']) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
}

const dashboardPage = (req, res) => {
    if (!req.cookies['auth']) {
        return res.redirect('/');
    }
    return res.render('dashboard');
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await usersmodel.create({
            name: name,
            email: email,
            password: password,
        })
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usersmodel.findOne({ email: email })
        if (!user || user.password != password) {
            console.log(`Email and Password are invalid`);
            return res.redirect('/');
        }
        res.cookie('auth',user);
        return res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        return false;
    }
}

const logOut = (req,res) =>{
    res.clearCookie('auth')
    return res.redirect('/')
}

// login system end


const addSection = (req, res) => {
    return res.render('addnewblog');
}

const addBlog = async(req,res)=>{
    console.log(req.body.title);
    try{
        const {title,desc} = req.body;
         await usersmodel.create({
             title : title,
             desc : desc,
        })
        console.log(`user add`);
        return res.redirect('/dashboard');  
     }catch(err){
         console.log(err);
         return false;
     }
}

module.exports = {
    registerPage, loginPage, registerUser, loginUser, dashboardPage,logOut,
    addSection,addBlog
}