const mongoose = require('mongoose');
const generateId = require('./lib/generateId');

const cmdArgsLen = process.argv.length;
if (cmdArgsLen < 3 || cmdArgsLen === 4 || cmdArgsLen > 5) {
  console.log(
    'Please provide valid arguments: node mongo.js <password> <name> and <number>. <name> <number> is optional.'
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://mark:${password}@cluster0.lchrk.mongodb.net/full-stack-open-phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    id: generateId(),
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    if (result.length < 1) {
      console.log('people collection is empty');
    } else {
      console.log('phonebook:');
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    }
    mongoose.connection.close();
  });
}
