const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('testing api...!')
})

app.get('/form', (req,res) => {
    res.sendFile(__dirname +'/form.html');
})

function isNumeric(val) {
    return /^-?\d+$/.test(val);
}

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/api_processor', urlencodedParser,(req,res) => {
    console.log(req.body)
    var Resp = {};
    Resp["user_id"] = "john_doe_17091999";

    if(!req.body.numbers){
        Resp["is_success"] = false;
        res.send(JSON.stringify(Resp))
        return
    }

    numbers = req.body.numbers;
    odd = []
    even = []

    for(var i=0; i<numbers.length; i++){
        if(isNumeric(numbers[i])){
            n = parseInt(numbers[i]);

            if(n%2==0){
                even.push(n);
            }else{
                odd.push(n);
            }
        }else{
            Resp["is_success"] = false;
            res.send(JSON.stringify(Resp))
            return
        }
    }

    Resp["is_success"] = true;
    Resp["odd"] = odd;
    Resp["even"] = even;
    res.send(JSON.stringify(Resp))
    return
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})