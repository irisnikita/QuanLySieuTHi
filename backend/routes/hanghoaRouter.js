
const bodyParser = require('body-parser')

module.exports = function(app,conn){

    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    })

    app.get('/listhanghoa',(req,res)=>{
        conn.query(`SELECT * from mhang`,function(err,data){
            (err)?res.send(err):res.send(data);
        });

    });

    //get an id 
    app.get('/listhanghoa/:id',(req,res)=>{
        conn.query(`SELECT * FROM mhang WHERE id = ?`,[req.params.id],(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send(data)
        })
    })
    //Delete
    app.delete('/listhanghoa/:id',(req,res)=>{
        conn.query('DELETE FROM mhang WHERE id = ?',[req.params.id],(err,data,fields)=>{
            if(!err)
            res.send('Deleted successfully.');
            else
            res.send(err);
        })
    })

    //Insert
    app.post('/listhanghoa/',(req,res)=>{
        let sta = req.body;
        var query1= "INSERT INTO mhang (id,tenmh,loaimh,dvt,soluong,dongia) VALUES (?)"
        conn.query(query1,[[sta.id,sta.tenmh,sta.loaimh,sta.dvt,sta.soluong,sta.dongia]],(err,data,fields)=>{
            if(!err){
                res.send(sta)
            }
            else
            res.send(err)
        })
    })
    //Update
    app.put('/listhanghoa/:id',(req,res)=>{
        let sta = req.body;
        var query2 = 'UPDATE mhang SET tenmh = ?, loaimh=? , dvt=? , soluong=?,dongia=?  WHERE id = ?; ';
        conn.query(query2,[sta.tenmh,sta.loaimh,sta.dvt,sta.soluong,sta.dongia,parseInt(req.params.id)],(err,data,fields)=>{
            if(!err)
            res.send(sta)
            else
            res.send(err)
        })
        
    })

};