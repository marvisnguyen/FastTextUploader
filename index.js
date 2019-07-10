let person = {
    name: 'Mosh',
    age: 30
};

//Dot Notation
person.name = "Mark";

//Bracket Notation
let selection = 'name';
person[selection] = 'Mary';

let selectedColors = ['red', 'blue'];
selectedColors[2] = 3;


//Performing a Task
function greet(named, lastName){
    console.log('Hello ' + named + ' ' + lastName);
}
//greet('Mark', 'Chang');

//Calculating a Value
function square(number) {
    return number*number;

}
console.log(square(2));
