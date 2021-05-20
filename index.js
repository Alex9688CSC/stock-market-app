const express = require('express')
const exphbs  = require('express-handlebars');
const app = express()
const path  =require('path')
const PORT = process.env.PORT || 5000
const request= require("request")


// API key pk_c5b127615d0b4eb9925735138dc49fae


//create call_api function 
function call_api(){
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_c5b127615d0b4eb9925735138dc49fae',{json:true},(err, res, body)=>{
    if(err){return console.log(err);}
    if(res.statusCode===200){
        console.log(body);
        return body
        //finishedAPI (body);
    };
});
};

//set handlebars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    const api = call_api();
    console.log(api)
    res.render('home', {
    stock: api
    });
});

app.get('/about.html', function (req, res) {
    res.render('about');
});

// set static folder
app.use(express.static(path.join(__dirname, "public")))
app.listen(PORT, () => console.log("server listening"))


