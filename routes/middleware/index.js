const express = require('express')
const middleware = express.Router()
const helmet = require('helmet')()
const compression = require('compression')()

middleware.use(compression)
	.use(helmet)

module.exports = middleware;