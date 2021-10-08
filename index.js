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

app.post('/api/persons', (request, response, next) => {
	const { name, number } = request.body;
	Person.findOne({ name }).then((foundPerson) => {
		const person = new Person({
			id: generateId(),
			name,
			number,
		});
		person
			.save()
			.then((savedPerson) => {
				response.json(savedPerson);
			})
			.catch((error) => next(error));
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (!person) {
				const error = new Error("Person's phonebook info is already deleted");
				error.name = 'NotFound';
				next(error);
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
		{ new: true, runValidators: true, context: 'query' }
	)
		.then((updatedPerson) => {
			if (!updatedPerson) {
				const error = new Error("Person's phonebook info is already deleted");
				error.name = 'NotFound';
				next(error);
			} else {
				response.json(updatedPerson);
			}
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			if (!result) {
				const error = new Error("Person's phonebook info is already deleted");
				error.name = 'NotFound';
				next(error);
			} else {
				response.status(204).end();
			}
		})
		.catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
	console.error(error.message);
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if ((error.name = 'NotFound')) {
		return response.status(404).json({ error: error.message });
	}
	next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
