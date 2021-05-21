const express = require('express')
const exphbs  = require('express-handlebars');
const app = express()
const path  =require('path')
const PORT = process.env.PORT || 5000
const request= require("request")
const bodyParser= require('body-parser')

// API key pk_c5b127615d0b4eb9925735138dc49fae

//use body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));



//create call_api function 
function call_api(finishedAPI,ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_c5b127615d0b4eb9925735138dc49fae',{json:true},(err, res, body)=>{
    if(err){return console.log(err);}
    if(res.statusCode===200){
        console.log(body);
        finishedAPI (body);
        };
    });
};

//set handlebars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//set handlebar index Get route
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    });
});
// set handlebar index post route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        //posted_stuff= req.body.stock_ticker
        res.render('home', {
            stock: doneAPI, 
        });
    }, req.body.stock_ticker);
});


app.get('/about.html', function (req, res) {
    res.render('about');
});

// set static folder
app.use(express.static(path.join(__dirname, "public")))
app.listen(PORT, () => console.log("server listening"))


