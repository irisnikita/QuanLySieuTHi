
const bodyParser = require('body-parser');

module.exports = function(app,conn){

	app.use(bodyParser.json());

	app.use((req,res,next)=>{
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		next();
	});

	app.get('/customers',(req,res)=>{
		conn.query('SELECT * from khachhtt',function(err,data){
			(err)?res.send(err):res.send(data);
		});

	});

	//get an id 
	app.get('/customers/:id',(req,res)=>{
		conn.query('SELECT * FROM khachhtt WHERE id = ?',[req.params.id],(err,data,fields)=>{
			if(err)
				res.send(err);
			else
				res.send(data);
		});
	});
	//Delete
	app.delete('/customers/:id',(req,res)=>{
		conn.query('DELETE FROM khachhtt WHERE id = ?',[req.params.id],(err,data,fields)=>{
			if(!err)
				res.send('Deleted successfully.');
			else
				res.send(err);
		});
	});

	//Insert
	app.post('/customers/',(req,res)=>{
		let sta = req.body;
		var query1= 'INSERT INTO khachhtt (id,tenkh,diachi,sdt) VALUES (?)';
		conn.query(query1,[[sta.id,sta.tenkh,sta.diachi,sta.sdt]],(err,data,fields)=>{
			if(!err){
				res.send(sta);
			}
			else
				res.send(err);
		});
	});

	//Update
	app.put('/customers/:id',(req,res)=>{
		let sta = req.body;
		var query2 = 'UPDATE khachhtt SET tenkh = ?, diachi=? , sdt=? WHERE id = ?; ';
		conn.query(query2,[sta.tenkh,sta.diachi,sta.sdt,parseInt(req.params.id)],(err,data,fields)=>{
			if(!err)
				res.send(sta);
			else
				res.send(err);
		});
        
	});

};