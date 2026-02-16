// counter is set to 0 so that we can add/increase the numbers later
let counter = 0;

// += 1 allows us to increase the tick higher 
function tickUp() {
    counter = counter + 1;
    // this code below is to make sure the span updates the counter on the page 
    const count = document.getElementById("counter");
    count.textContent = counter;
}

// -= 1 allows us to decrease the ticker lower
function tickDown() {
    counter -=1;
    // same as the above comment. helps me with consistency !
    const count = document.getElementById("counter");
    count.textContent = counter;
}

// this helps us loop whatever number in the counter from zero
function runForLoop() {
    let output = "";
    for (let num = 0; num <= counter; num++) {
        output += num + " ";
    }

    document.getElementById("forLoopResult").textContent = output;
}

// only shows the odd numbers
function showOddNumbers() {
    let odd = "";

    for (let num = 1; num <= counter; num++) {
        if (num % 2 === 1) {
            odd += num + " ";
        }
    }

    document.getElementById("oddNumberResult").textContent = odd;
}

// arrays for multiple of five
function addMultiplesToArray() {
    const multiples = [];
// checks if the counteris greater than five, and divides the counter number by 5 to display the multiples
    if (counter >= 5) {
        for (let num = counter; num > 0; num--) {
            if (num % 5 === 0) {
                multiples.push(num);
            }
        }
    }

    console.log(multiples);
}

// prints the data the user inputs 
function printCarObject() {
    const carInfo = {
        cType: document.getElementById("carType").value,
        cMPG: document.getElementById("carMPG").value,
        cColor: document.getElementById("carColor").value
    };

    console.log(carInfo);
}

// prints the car type the user picks based off the buttons
function loadCar(num) {
    let car;

    if (num === 1) {
        car = carObject1;
    } else if (num === 2) {
        car = carObject2;
    } else if (num === 3) {
        car = carObject3;
    }

    document.getElementById("carType").value = car.cType;
    document.getElementById("carMPG").value = car.cMPG;        
    document.getElementById("carColor").value = car.cColor;
}

// changes the color of the paragraph
function changeColor(num) {
    const paragraphColor = document.getElementById("styleParagraph");

    if (num === 1) {
        paragraphColor.style.color = "red";
    } else if (num === 2) {
        paragraphColor.style.color = "green";
    } else if (num === 3 ) {
        paragraphColor.style.color = "blue";
    }
}
