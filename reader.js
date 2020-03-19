//const Socket = require('blockchain.info/Socket'); 
const blockexplorer = require('blockchain.info/blockexplorer')
const fs = require('fs');
//const mySocket = new Socket(); 




function checkBalance(address) {
	blockexplorer.getBalance(address, {})
			.then(balance => {
				if (balance) {
					const amount =  balance[address].final_balance
					if (amount > 100000000) {
						counter2++
						var txt = `\n"${address}", "${amount / 100000000}"`
						console.log(`INFO: ${counter2} ${txt}`)
						fs.appendFile('address_balances_bigger_than_$2300_clean.csv', txt, function (err) {
							if (err)
								throw err
							//console.log('Saved!')
						})
					}
					//console.log(balance)
					
				}
			})
			.catch(function(error) {
				console.log(`Failed to get the balance of ${address}`,error)
				console.log()
			})
}



var file_txt = fs.readFileSync('./address_balances_bigger_than_$2300_2.csv', 'utf8')

var counter = 0
var counter2 = 0


if (file_txt) {
	//console.log(txt)
	var lines = file_txt.split('\n')
	lines.forEach(line => {
		//console.log(line)
		var address = line.split(',')[0]
		address = address.replace('"', '')
		address = address.replace('"', '')

		//console.log(`Address ${address} typeof ${typeof address}`)
		counter++

		setTimeout(function() {checkBalance(address)}, 1000 * counter)
	})


}