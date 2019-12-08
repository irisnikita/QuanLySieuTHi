const bodyParser = require('body-parser');

module.exports = function(app,conn){

	app.use(bodyParser.json());

	app.use((req,res,next)=>{
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		next();
	});

	app.get('/phieuhoadon',(req,res)=>{
		conn.query('SELECT * from hoadon',function(err,data){
			(err)?res.send(err):res.send(data);
		});

	});

	//Insert
	app.post('/phieuhoadon/',(req,res)=>{
		let sta = req.body;
		var query1= 'INSERT INTO hoadon (id,ngaylap,tongtgia) VALUES (?)';
		conn.query(query1,[[sta.id,sta.ngaylap,sta.tongtgia]],(err,data,fields)=>{
			if(!err){
				res.send(sta);
			}
			else
				res.send(err);
		});
	});

};