var Kahoot = require('kahoot.js-updated');
var client = new Kahoot;
var NameGenerator = require('nodejs-randomnames');
var randomName = NameGenerator.getRandomName();
//const cluster = require('cluster');
var game_pin = 0;
var cluster = require('cluster');

if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id);
}
var randomnumber = Math.round(Math.random() * 3);
process.on('message', function(msg) {
  console.log("msg: " + msg);
  game_pin = msg;
  console.log("Joining kahoot...  ");
  client.join(game_pin, 'bot' + cluster.worker.id);
  //client.join(game_pin, randomName);

});
client.on("joined", () => {
    console.log("I joined the Kahoot!");
});
client.on("questionStart", question => {
    console.log("A new question has started, answering the first answer.");
    //var answer = question.correctAnswer(1)
  var answer = cluster.worker.id - 1;
  question.answer(answer);
  
});
client.on("questionEnd", question => {
  console.log("did i get it right? " + question.correct);
  var correct = question.correct;
  if (correct) {
    console.log("YES TRIGGERED");
    process.send("true");
    process.send('true');
  } else {
    console.log("YES TRIGGERED but got answer wrong :(");
  }
});
client.on("quizEnd", () => {
    console.log("The quiz has ended. - bot" + cluster.worker.id);
});
