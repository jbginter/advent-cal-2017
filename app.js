const express = require('express')
const app = express()
const chalk = require('chalk')
const router = require('./routes/index.js')
let console_log

const envPath = function() {
	switch(process.env.NODE_ENV) {
		case 'production':
			console_log = '*** Using '+ chalk.green('Production') +' ENV \n'
			return {path: './.env_prod'}
		case 'staging':
			console_log = '*** Using '+ chalk.green('Staging') +' ENV \n'
			return {path: './.env_staging'}
		default:
			console_log = '*** Using '+ chalk.green('Development') +' ENV \n'
			return {path: './.env'}
	}
}

require('dotenv').config(envPath())

if (process.env.VIEW_ENGINE) {
	app.set('view engine', process.env.VIEW_ENGINE)
		.set('views', './views')

	console_log += '*** View Engine set to: ' + chalk.green(process.env.VIEW_ENGINE) +'\n'
} else {
	console_log += chalk.yellow('View Engine not set, .render() won\'t be usable \n')
}

app.use(express.static('views/'))
	.use(express.static('public/'))
	.use(router)

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), () => {
	console_log += '*** running on port: ' + chalk.green(app.get('port'))
	console.log(console_log)
})