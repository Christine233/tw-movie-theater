const sqlite3 = require('sqlite3');
const express = require('express');
const bodyparser = require('body-parser');
const app=express();
const db = new sqlite3.Database(__dirname + '/database/movieonline.db');


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/',function (req ,res) {
    res.sendFile(__dirname + '/HTML/'+'movie_detail.html');
});

app.get('/search_movie',function (req,res) {
    let movie_name =  req.query.search_keywords;
    db.all("select * from MovieDetails WHERE MovieName='"+movie_name+"'", function (err, result) {
        if (!err) {
            //console.log(result);
            res.send(result);
        }
        else
            console.log(err);
    });
});

// db.all("select * from MovieComment", function (err, result) {
//     if (!err) {
//         console.log(result);
//     }
//     else
//         console.log(err);
// });
//
// db.all("select * from MovieDetails", function (err, result) {
//     if (!err) {
//         console.log(result);
//     }
//     else
//         console.log(err);
// });

let server=app.listen(3000,function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("监听:%s%s",host,port);
});