const bodyParser = require('body-parser')

module.exports = function(app,conn){

    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    })

    app.get('/phieumua',(req,res)=>{
        conn.query(`SELECT * from phieumuahang`,function(err,data){
            (err)?res.send(err):res.send(data);
        });

    });

    //get an id 
    app.get('/phieumua/:id',(req,res)=>{
        conn.query(`SELECT * FROM phieumuahang WHERE id = ?`,[req.params.id],(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send(data)
        })
    })
    //Delete
    app.delete('/listncc/:id',(req,res)=>{
        conn.query('DELETE FROM ncc WHERE id = ?',[req.params.id],(err,data,fields)=>{
            if(!err)
            res.send('Deleted successfully.');
            else
            res.send(err);
        })
    })

    //Insert
    app.post('/phieumua/',(req,res)=>{
        let sta = req.body;
        var query1= "INSERT INTO phieumuahang (id,ngay,tongcong,sohang) VALUES (?)"
        conn.query(query1,[[sta.id,sta.ngay,sta.tongcong,sta.sohang]],(err,data,fields)=>{
            if(!err){
                res.send(sta)
            }
            else
            res.send(err)
        })
    })

    //Update
    app.put('/listncc/:id',(req,res)=>{
        let sta = req.body;
        var query2 = 'UPDATE ncc SET tenncc = ?, diachi=? , sdt=? WHERE id = ?; ';
        conn.query(query2,[sta.tenncc,sta.diachi,sta.sdt,parseInt(req.params.id)],(err,data,fields)=>{
            if(!err)
            res.send(sta)
            else
            res.send(err)
        })
        
    })

};