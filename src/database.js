createDatabase = () =>{
	
	const Database = {

		mysql : require('mysql'),
		connection : {},
		connectionParameters : {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'root',
			database: 'bamazon',
		},

		query : function(query){
			const Database = this;
			Database.connection.query(query, function(error,result){

				if(error){
					console.log('ERROR on query: ' + error);
				}
				else{
					console.log('SUCCESS');
					console.log(result);	
				}
			});
		},
		/*connect : (connection,operation)=>{
			connection.connect( (error)=>{

				if(error){
					console.log('ERROR: \n' + error);
					return;
				}
				else{
					console.log(`Connected as id ${connection.threadId}`);
					operation();
				}
			});		
		},*/
		createProduct : function(product,department, price, quantity){
			const Database = this;

			const queryString = `INSERT INTO products (product_name, 
			department_name,price, stock_quantity ) 
			VALUES ("${product}","${department}",${price}, ${quantity})`;

			Database.query(queryString);

		},
	}

	
	Database.connection = Database.mysql.createConnection(Database.connectionParameters);

	return Database;
}

module.exports = createDatabase;



