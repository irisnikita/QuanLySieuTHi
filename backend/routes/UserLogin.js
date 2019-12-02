
const bodyParser = require('body-parser')

module.exports = function(app,conn){

    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    })
    //get an id 
    app.get('/userlogin/:username',(req,res)=>{
        conn.query(`SELECT * FROM user WHERE nameUser = ?`,[req.params.username],(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send(data[0])
        })
    })
    //update islogin
    app.put('/userlogin/islogin/:username',(req,res)=>{
        conn.query(`UPDATE user SET isLogin=1 WHERE nameUser= ?`,[req.params.username],(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send('Đăng nhập thành công')
        })
    })
    // update islogout
    app.put('/userlogin/islougout/:username',(req,res)=>{
        conn.query(`UPDATE user SET isLogin=0 WHERE nameUser= ?`,[req.params.username],(err,data,fields)=>{
            if(err)
            res.send(err)
            else
            res.send('Thoát thành công')
        })
    })

    //Delete
    app.delete('/userlogin/:id',(req,res)=>{
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
        var query1= "INSERT INTO nhanvien (msnv,tennv,date,phone,address) VALUES (?)"
        conn.query(query1,[[sta.msnv,sta.tennv,sta.date,sta.phone,sta.address]],(err,data,fields)=>{
            if(!err)
            res.send(sta)
            else
            res.send(err)
        })
    })
    //Update
    app.put('/staffs/:id',(req,res)=>{
        let sta = req.body;
        var query2 = 'UPDATE nhanvien SET msnv = ?, tennv = ?, date=? , phone=? , address=?  WHERE id = ?; ';
        conn.query(query2,[sta.msnv,sta.tennv,sta.date,sta.phone,sta.address,parseInt(req.params.id)],(err,data,fields)=>{
            if(!err)
            res.send(sta)
            else
            res.send(err)
        })
        
    })

};