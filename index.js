
const Socket = require('blockchain.info/Socket'); 
const blockexplorer = require('blockchain.info/blockexplorer')
const fs = require('fs');
const mySocket = new Socket(); 
var counter = 0

mySocket.onTransaction(function() {
	//console.log(arguments)
	var arg = arguments['0']


	const out = arg.out
	const inputs = arg.inputs[0].prev_out

	var address = inputs.addr

	var balances = blockexplorer.getBalance(address, {})
		.then(balance => {
			if (balance) {
				const amount =  balance[address].final_balance
				if (amount > 100000000) {
					counter++
					var txt = `\n"${address}", "${amount / 100000000}"`
					console.log(`INFO: typeof: ${typeof address}, ${counter}, ${txt}`)
					fs.appendFile('address_balances_bigger_than_$2300.csv', txt, function (err) {
						if (err)
							throw err
						//console.log('Saved!')
					})
				}
				
			}
		})
		.catch(function(error) {
			//console.log('no')
		})

		
	//}
	

	//console.log(inputs.value)

	/*out.forEach(item => {
		console.log('ITEM: ', item.addr, item.value)
	})
	console.log()
	/*console.log(arguments['0'].hash)
	blockexplorer.getTx(arguments['0'].hash, {}).then(tx => {
		//console.log(tx)
		
	})*/
})
