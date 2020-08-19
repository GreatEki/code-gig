const express = require('express');
const db = require('./config/database');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const {
	allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const path = require('path');

const app = express();

app.use(express.json());
// app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'handlebars');
// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultlayout: 'main',
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
); //We set the default layout of the handlebars pages to use the main.handlebars.

const DBConnect = async () => {
	try {
		await db.authenticate();

		console.log('Postgress DB connected');
	} catch (err) {
		console.log('DB Connection Faiure', err);
	}
};

DBConnect();

app.use('/gigs', require('./routes/gigs'));
app.use('/', (req, res) => res.render('index', { layout: 'landing' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever running on ${PORT}`));
