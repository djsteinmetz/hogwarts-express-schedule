// Initialize Firebase
var config = {
    apiKey: "AIzaSyApltuvOtyyXPBfPc1PoBRUY5RPnSIibww",
    authDomain: "hogwarts-express-schedule.firebaseapp.com",
    databaseURL: "https://hogwarts-express-schedule.firebaseio.com/",
    projectId: "hogwarts-express-schedule",
    storageBucket: "hogwarts-express-schedule.appspot.com",
    messagingSenderId: "737166235287"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log("hello");
// function calculateMonthsWorked(startDay) {
//     var monthsWorked = moment(moment(), 'months').diff(startDay, "months");
//     // Ternary statement to filter out the NAN values.  They are expressions, they evaluate to a value.
//     // Not an if-then statement, it is an evaluation.
//     return isNaN(monthsWorked) ? 0 : monthsWorked;
// }

// function calculateTotalBilled(monthsWorked, employeeMonthlyRate) {
//     var totalBilled = (monthsWorked * employeeMonthlyRate);
//     return totalBilled;
// }

$(document).on("click", "#add-train", function (event) {
    event.preventDefault();
    console.log("hello")
    // Display the info to the HTML
    var trainNumber = $("#train-number-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    firstTrainConverted = moment(firstTrain, "HH");
    console.log(firstTrainConverted);
    var trainFrequency = $("#frequency-input").val().trim();
    // Pushing new data to the database
    database.ref().push({
        train_number: trainNumber,
        train_destination: trainDestination,
        first_train: firstTrain,
        train_frequency: trainFrequency,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    var newTrain = snapshot.val();
    console.log(newTrain)
    var newRow = $("<tr>");
    var nameTd = $("<td>");
    var destTd = $("<td>");
    var arriveTd = $("<td>");
    var freqTd = $("<td>");
    nameTd.text(newTrain.train_number);
    destTd.text(newTrain.train_destination);
    arriveTd.text(newTrain.first_train);
    freqTd.text(newTrain.train_frequency);
    
    newRow.append(nameTd);
    newRow.append(destTd);
    newRow.append(arriveTd);
    newRow.append(freqTd);
    $(".tableBody").append(newRow);
    console.log("about to append to the DOM")

    // Here is where I would code in the logic to calculate the time until train arrival 
    // as well as the time till the next trains.
});