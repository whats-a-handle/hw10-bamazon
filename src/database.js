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
		stockInventory : function(){

			const Database = this;
			Database.createProduct('Macbook','electronics',1000,2);
			Database.createProduct('Mouse','accessories',35,10);
			Database.createProduct('Mousepad','accessories',10,5);
			Database.createProduct('Cat 6 cable','networking equipment',20,100);
			Database.createProduct('Bitcoin Rocks Hat','clothing', 50,4);
			Database.createProduct('How to Javascript','books',15,90);
			Database.createProduct('Google Pixel','phones',1000,10);
			Database.createProduct('iPhone X','phones',10000,200);
			Database.createProduct('Jolt Cola','essentials',2,500);
			Database.createProduct('Pixie Sticks','essentials',1,500);
			console.log('Done stocking inventory products');
		},

		query : function(query,operation){
			const Database = this;
			Database.connection.query(query, function(error,result){

				if(error){
					console.log('ERROR on query: ' + error);
				}
				else{
					
					operation(result);	
				}
			});

		},
		checkIdExists : function(productId){
			const Database = this;
			const queryString = 'Select item_id FROM products WHERE item_id = ' + productId;
			Database.query(queryString, (result)=>{
				if(result[0].item_id){
					console.log('Exists');
				}
				else{
					console.log('Does not exist');
				}

				

			});

		},
		createProduct : function(product,department, price, quantity){
			const Database = this;

			const queryString = `INSERT INTO products (product_name, 
			department_name,price, stock_quantity ) 
			VALUES ("${product}","${department}",${price}, ${quantity})`;



			Database.query(queryString,(result)=>{
				console.log(result.affectedRows);
				if(result.affectedRows === 1){
					console.log(`${product} Successfully Inserted`);
					//Database.connection.destroy();

				}
			});
			

		},
		orderProduct : function(productId, quantity){
			const Database = this;

			const checkQuantityQuery = `SELECT product_name, stock_quantity, price FROM products WHERE item_id =` + productId;

			Database.query(checkQuantityQuery, (result)=>{
				const inventoryQueryResults = result[0];
				if(inventoryQueryResults.stock_quantity >= quantity){
					const newQuantityQuery = `UPDATE products SET stock_quantity = `+ (inventoryQueryResults.stock_quantity - quantity)+ ` WHERE item_id = ` + productId;
					Database.query(newQuantityQuery, (result)=>{
						if(result.affectedRows === 1){
							console.log('You have successfully placed an order for ' + inventoryQueryResults.product_name + ' x ' +  quantity);
							console.log(`The total cost is: $` + (inventoryQueryResults.price * quantity));
							
						}
						else{
							console.log('Something bad happened when placing your order');
							
						}
						
					})
				}
				else if(inventoryQueryResults.stock_quantity < quantity){
					console.log(`There are only ${inventoryQueryResults.stock_quantity} remaining. You must order fewer items`);
					
				}
			});
			
		}
	}

	
	Database.connection = Database.mysql.createConnection(Database.connectionParameters);

	return Database;
}

module.exports = createDatabase;




