flights = [
    ["Delhi", "Mumbai", 1000],
    ["Mumbai", "Bangalore", 200],
    ["Delhi", "Chennai", 300],
    ["Chennai", "Bangalore", 500],
    ["Delhi", "Kolkata", 250],
    // ["Delhi", "A", ],
    // ["A", "B"],
    // ["B", "Bangalore"],
    // ["Delhi", "C"],
    //["C", "Bangalore"]
]
 
source = "Delhi"
destination = "Bangalore"

function findFlights(flights, source, destination) {
    let sourceFlights = [];
    let destinationFlights = [];
    let ifConnectingFlight = false;
    flights.forEach((element, index) => {
        if (element[0] === source) {
            sourceFlights.push([element[0], element[1], element[2]]);
            //sourceFlights.push(element[1]);
        }
        if (element[1] === destination) {
            destinationFlights.push([element[0], element[1], element[2]]);
            //destinationFlights.push(element[1]);
        }   
    });
    let amount = 0;
    sourceFlights.forEach((sourceFlight) => {
        destinationFlights.forEach((destinationFlight) => {
            if (sourceFlight[1] === destinationFlight[0]) {
                //console.log("amount:",sourceFlight[2], destinationFlight[2]);
                if(amount > sourceFlight[2] + destinationFlight[2]){
                    amount = sourceFlight[2] + destinationFlight[2];
                    console.log(sourceFlight[1], sourceFlight[1],destinationFlight[0], destinationFlight[1],"amount:",amount);

                }
                amount = sourceFlight[2] + destinationFlight[2];
                ifConnectingFlight = true;
                //console.log(sourceFlight[1], sourceFlight[1],destinationFlight[0], destinationFlight[1],"amount:",amount);
                //console.log(`Connecting flight found: ${sourceFlight[0]} -> ${sourceFlight[1]} -> ${destinationFlight[1]}`);
            }
        });
    });
    console.log("sourceFlights",sourceFlights);
    console.log("destinationFlights",destinationFlights);
    return ifConnectingFlight;
}
console.log(findFlights(flights, source, destination));