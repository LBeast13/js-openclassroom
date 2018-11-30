/* 
Activity : QUIZZ
*/

console.log("Welcome, are you ready for a little Quizz ?");

// Random int between 1 and 100
var solution = Math.floor(Math.random() * 100) + 1;

// Line used for debugging
console.log("(The solution is " + solution + ")");

var count = 0;
var attempt = 0 ;
var testNumber = true;

// Game Loop
while (count <6 && attempt != solution){
    count++;
   
    // Check if the input is a number
    while(testNumber === true){  
		attempt = Number(prompt("Attempt number " + count));
        testNumber = isNaN(attempt);
	}
    testNumber = true;

    if(attempt > solution) {
		console.log(attempt + " is too big...");
	}
	else if(attempt < solution){
		console.log(attempt + " is too small...");
	}
}

// Check if the user won or lost
if(attempt === solution) {
	console.log("Well done ! The answer was " + solution);
	console.log("You won in " + count + " attempt(s)");
}
else{
	console.log("Sorry, you lost... The answer was " + solution);
}	
	
