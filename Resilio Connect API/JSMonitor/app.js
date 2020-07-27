// @ts-check

const { initializeMCParams, getAPIRequest } = require('./communication');
const { getAgentProperty, setAgentProperty } = require('./data-store');
const { getJobProperty, setJobProperty } = require('./data-store');
const { enumerateAgents } = require('./data-store');
const { updateAgentList, updateJobsPerAgent } = require('./agents');
const { findArrayDiff } = require('./utils');

//const { getAgentName, isAgentOnline, getAgentJobList } = require('./agents');

setAgentProperty(5, "name", "abc");
setAgentProperty(17, "name", "xyz");
console.log("the name of job 5 is: " + getAgentProperty(5, "name"));

setJobProperty(5, "agents", [1,7,99,2,105]);
setJobProperty(17, "agents", [7,18,42,55]);
setJobProperty(17, "name", "Sales and Marketing Folder");
console.log("the agents in job 5 are: " + getJobProperty(5, "agents"));
console.log("the name of job 17 is: " + getJobProperty(17, "name"));

initializeMCParams("demo29.resilio.com", 8443, "6BZK5YQ6ER72NWP2GB7MYKEGA2AQZUXCCEVU7G7H4JTDGLDRNPMA");
console.log("some fake api response: " + getAPIRequest("/api/v2/jobs"));


updateAgentList();

setTimeout(function(){console.log (getAgentProperty(1, "name"));}, 3000);
setTimeout(function(){console.log (getAgentProperty(1, "status"));}, 3000);

updateJobsPerAgent();

setTimeout(function(){console.log (getJobProperty(2, "agents"));}, 3000);

setTimeout(function() {console.log(enumerateAgents());}, 5000);

console.log(findArrayDiff([1, 5, 17, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160], [1, 5, 17, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 165]));

var prevList;
var updatedList = [];
let arrayDiff = [];

// function definition
function periodicAgentUpdate(freq, callback) {
    prevList = updatedList; 
    updatedList = enumerateAgents();

    arrayDiff = findArrayDiff(updatedList, prevList);
    callback();

    updateAgentList();
    setTimeout(function() {periodicAgentUpdate(30000, function() {
        if (arrayDiff.length != 0) {
            console.log("ALERT: The new agents are " + arrayDiff);
        } else {
            console.log("ALERT: No new agent IDs");
        }
    });}, freq);

}

// calling the function
periodicAgentUpdate(30000, () => {}); // JACK: inputting this empty callback function was my solution to the initial immediate alert that there was no new agent IDs,
                                      // but something about doing that doesn't feel as efficient as possible. Is it?
