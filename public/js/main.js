(function($) {

	// Custom Promise 
	const jqueryCheck = new Promise((resolve, reject) => {
		// Code that can be executed...

		// Check to fire .then() or else .catch(), doesn't necessarily need a value returned
		if ($) {
			resolve('jQuery enabled!')
		} else {
			reject({
				code: 499,
				message: 'jQuery is not installed'
			})
		}
	})

	jqueryCheck.then(val => {
		console.log(val)
	})
	.catch(err => {
		console.log(err)
	})

})(window.jQuery || null);