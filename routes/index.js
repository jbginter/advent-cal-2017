const express = require('express')
const router = express.Router()
const chalk = require('chalk')
const middleware = require('./middleware/index')
const days = [1,2,3,4,5,6,7]

router.use(middleware)

router.get('/', (req, res) => {
	res.sendFile('/views/index.html', {root: './'})
})

for (let day of days) {
	router.get(`/day${day}`, (req, res) => {
		res.sendFile(`/views/day${day}/index.html`, {root: './'})
	})
}

router.use((err, req, res, next) => {
		console.log(err.stack);
		res.status(500)
			.send('There was a problem, please check the server logs')
	})
	.use((req, res, next) => {
		res.status(404)
			.sendFile('/views/404.html', {root: './'})
	})

module.exports = router;