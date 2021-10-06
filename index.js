require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const generateId = require('./lib/generateId');
const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/info', (request, response) => {
	Person.find({}).then((result) => {
		response.send(
			`<p>Phonebook has info for ${
				result.length
			} people</p><p>${new Date()}</p>`
		);
	});
});

app.get('/api/persons', (request, response) => {
	Person.find({}).then((result) => {
		response.json(result);
	});
});

app.post('/api/persons', (request, response) => {
	const { name, number } = request.body;
	if (!name) {
		return response.status(400).json({
			error: 'name missing',
		});
	}
	if (!number) {
		return response.status(400).json({
			error: 'number missing',
		});
	}
	const person = new Person({
		id: generateId(),
		name,
		number,
	});
	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then((person) => {
		if (!person) {
			return response.status(404).json({ error: 'not found' });
		}
		response.json(person);
	});
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	Person.findById(id).then((person) => {
		if (!person) {
			return response.status(404).json({ error: 'not found' });
		}
		Person.deleteOne({ _id: id }).then((deletedPerson) => {
			response.status(204).end();
		});
	});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
