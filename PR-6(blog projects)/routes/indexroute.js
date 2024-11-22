

const express = require('express')

const routes = express.Router()

const { registerPage, loginPage, registerUser, loginUser, dashboardPage, logOut,addSection,addBlog} = require('../controllers/controllers')

routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.post('/registeruser', registerUser);
routes.post('/loginuser', loginUser);
routes.get('/dashboard', dashboardPage);
routes.get('/logout', logOut);

routes.get('/gotoaddsection',addSection);
routes.post('/addblog',addBlog)


module.exports = routes
