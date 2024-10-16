const http = require('http');

const fs = require('fs');

const server = http.createServer((req,res)=>{
    let fileName = "";

    switch (req.url){
        case '/':
            fileName = "./home.html";
        break;

        case '/product':
            fileName = "./product.html";
        break;
    
        case '/about':
            fileName = "./about.html";
        break; 

        case '/contact':
            fileName = "./contact.html";
        break; 

        default:
            fileName = "./404.html"        
    }
    fs.readFile(fileName,(err,record)=>{
        if(err){
            console.log(err);
            return false    
        }
        res.end(record)
    })

}).listen(8000)
