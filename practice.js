var animals = [
	{name: 'tobi', species: 'dog'} ,
	{name: 'snickers', species: 'cat'},
	{name: 'moo', species: 'cow'} ,
	{name: 'romi', species: 'dog'} ,
	{name: 'muffy', species: 'dog'} 
]

//gets the animals who are from the dog species
var ob = animals.filter(animal => animal.species === 'dog'); 

var ob2 = animals.map((animal) => animal.name+" is a "+animal.species);
console.log(ob2);