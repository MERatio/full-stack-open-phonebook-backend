const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const generateId = require('./lib/generateId');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/info', (request, response) => {
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
	);
});

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.post('/api/persons', (request, response) => {
	const { name, number } = request.body;
	if (!name) {
		response.status(400).json({
			error: 'name missing',
		});
	} else if (!number) {
		response.status(400).json({
			error: 'number missing',
		});
	} else if (persons.some((person) => person.name === name)) {
		response.status(400).json({
			error: 'name must be unique',
		});
	} else {
		const person = {
			id: generateId(),
			name,
			number,
		};
		persons = persons.concat(person);
		response.json(person);
	}
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (!person) {
		return response.status(404).json({ error: 'not found' });
	}
	response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.some((person) => person.id === id);
	if (!person) {
		return response.status(404).json({ error: 'not found' });
	}
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
