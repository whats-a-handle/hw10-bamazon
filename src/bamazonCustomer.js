const createDatabase = require('./database.js');
const Inquirer = require('inquirer');
const Database = createDatabase();


const promptLoop = (Database) =>{

	Inquirer.prompt([{

			name:'productId',
			message: 'Enter a product id to purchase',											
		},
		{
			name:'quantity',
			message: 'Enter the quantity you\'d like to purchase',

		}]).then(answers =>{

			Database.orderProduct(answers.productId,answers.quantity);
			promptLoop(Database);
		});

}

promptLoop(Database);



