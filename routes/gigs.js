const express = require('express');
const db = require('../config/database');

// IMport Model
const Gig = require('../models/Gig');

// import Model
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const gigs = await Gig.findAll();

		return res.render('gigs', {
			gigs,
		});
	} catch (err) {
		console.log(err);
	}
});

router.get('/add', async (req, res) => res.render('add'));

router.post('/add', async (req, res) => {
	let { title, technologies, description, budget, contact_email } = req.body;
	try {
		console.log(req.body);
		let errors = [];

		if (!title) {
			errors.push({ text: 'Please add a title' });
		}
		if (!technologies) {
			errors.push({ text: 'Please add some technologies' });
		}
		if (!description) {
			errors.push({ text: 'Please add a description' });
		}

		if (!contact_email) {
			errors.push({ text: 'Please add a contact email' });
		}

		// Check for errors
		if (errors.length > 0) {
			res.render('add', {
				errors,
				title,
				technologies,
				description,
				budget,
				contact_email,
			});
		} else {
			if (!budget) {
				budget = 'Unknown';
			} else {
				budget = `$${budget}`;
			}
			// Make lower case and remove commas
			technologies = technologies.toLowerCase().replace(/, /g, ',');
			const gig = await Gig.create({
				title,
				technologies,
				description,
				budget,
				contact_email,
			});

			return res.render('gigs');
		}
	} catch (err) {
		return res.json({
			err: err.message,
		});
	}
});

module.exports = router;
