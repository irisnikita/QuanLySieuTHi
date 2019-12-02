
const bodyParser = require('body-parser')

module.exports = function(app,conn){

    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    })

    app.get('/staffs',(req,res)=>{
        conn.query(`SELECT nhanvien.id,nhanvien.tennv,nhanvien.date,nhanvien.phone,nhanvien.address,chucvu.tenchucvu FROM nhanvien
        INNER JOIN chucvu  ON nhanvien.machucvu=chucvu.id`,function(err,data){
            (err)?res.send(err):res.send(data);
        });

    });

    //get an id 
    app.get('/staffs/:id',(req,res)=>{
        conn.query(`SELECT * FROM nhanvien WHERE id = ?`,[req.params.id],(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send(data)
        })
    })
    //Delete
    app.delete('/staffs/:id',(req,res)=>{
        conn.query('DELETE FROM nhanvien WHERE id = ?',[req.params.id],(err,data,fields)=>{
            if(!err)
            res.send('Deleted successfully.');
            else
            res.send(err);
        })
    })

    //Insert
    app.post('/staffs/',(req,res)=>{
        let sta = req.body;
        var query1= "INSERT INTO nhanvien (id,tennv,date,phone,address,machucvu) VALUES (?)"
        conn.query(query1,[[sta.id,sta.tennv,sta.date,sta.phone,sta.address,sta.machucvu]],(err,data,fields)=>{
            if(!err){
                res.send(sta)
            }
            else
            res.send(err)
        })
    })
    //findlastidstaff
    app.get('/findlast/',(req,res)=>{
        conn.query(`SELECT id FROM nhanvien ORDER BY id DESC LIMIT 1`,(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send(data[0])
        })
    })

    //Update
    app.put('/staffs/:id',(req,res)=>{
        let sta = req.body;
        var query2 = 'UPDATE nhanvien SET tennv = ?, date=? , phone=? , address=?,machucvu=?  WHERE id = ?; ';
        conn.query(query2,[sta.tennv,sta.date,sta.phone,sta.address,sta.machucvu,parseInt(req.params.id)],(err,data,fields)=>{
            if(!err)
            res.send(sta)
            else
            res.send(err)
        })
        
    })

};