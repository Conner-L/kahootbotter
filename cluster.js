
var cluster = require('cluster');
var amount = global.amount;
global.name;
global.amount;
//global.rn;
function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}
module.exports.sendBots = function () {
  var cluster = require('cluster');
var amount = global.amount;
global.name;
global.amount;
  console.log("cluster ran");
  var worker;
if (cluster.isMaster) {
  console.log("name: " + global.name);
  console.log("amount: " + global.amount);

  //let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function lol () {
    console.log("function lol ran");
    for (var i = 0; i < amount; i += 1) {
      cluster.setupMaster({ exec: __dirname + '/bot.js',});
      console.log("fork runnng");
      worker = cluster.fork();
      await wait(500);
      var data = '{"json":"' + false + '","name":"' + global.name + '"}'
      worker.send(data);
      //worker.send(global.rn);
      //lol sleep();
    }
  }
  lol();
  var workersded = false;
  timeout = setInterval(() => {
    if (workersded == false) {
        console.log('killing workers.');
        workersded = true;
    }
    for (var id in cluster.workers) {
      cluster.workers[id].kill();
    }
    var ready = '{"json":"' + true + '", "ready":"' + true + '"}'
    worker.send(ready);
    cluster.disconnect();
  }, 20000);
  //function interval() {
   // return setInterval(sendLength, 3000);
  //}
  //function sendLength() {
    //var amount = cluster.workers.length;
    //global.bots = amount;
  //}
  //interval();

    cluster.on('exit', function () {
        //cluster.fork();
        //console.log("cluster exit");
    });

} else {
    require('./bot');
    //console.log("name3: " + global.name);
}
}



