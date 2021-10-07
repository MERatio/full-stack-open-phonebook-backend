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
	Person.findOne({ name }).then((foundPerson) => {
		if (foundPerson) {
			response
				.status(400)
				.send(`${foundPerson.name} is already added to phonebook`);
		} else {
			const person = new Person({
				id: generateId(),
				name,
				number,
			});
			person.save().then((savedPerson) => {
				response.json(savedPerson);
			});
		}
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (!person) {
				response.status(404).end();
			} else {
				response.json(person);
			}
		})
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndUpdate(
		request.params.id,
		{ number: request.body.number },
		{ new: true }
	)
		.then((updatedPerson) => {
			if (!updatedPerson) {
				response.status(404).end();
			} else {
				response.json(updatedPerson);
			}
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(!result ? 404 : 204).end();
		})
		.catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
	console.error(error.message);
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}
	next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
