let randomString = require('random-string')
let x = randomString();
let y = randomString({
    length: 7,
    numeric: true,
    letters: false,
    special: false,
});
const userData = {
    "standart" : "standard_user",
    "locked_out" : "locked_out_user",
    "problem" : "problem_user",
    "performance_glitch" : "performance_glitch_user",
    "incorrect" : x,
    "correctPassword" : "secret_sauce",
    "incorrectPassword" : y
}
export {userData}