"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.stdin.resume();
process.stdin.setEncoding("utf-8");
var inputString = "";
var inputLines = [];
var currentLine = 0;
process.stdin.on("data", function (inputStdin) {
    inputString += inputStdin;
});
process.stdin.on("end", function () {
    inputLines = inputString.split("\n");
    inputString = "";
    main();
});
function readLine() {
    return inputLines[currentLine++];
}
function timeConversion(s) {
    // Write your code here
    var timeAMPM = parseAMPM(s);
    var timeMilitary = convertToMilitaryTime(timeAMPM);
    return formatMilitaryTime(timeMilitary);
}
function convertToMilitaryTime(time) {
    var hours = time.hours, minutes = time.minutes, seconds = time.seconds, period = time.period;
    if (period === "AM") {
        return { hours: hours, minutes: minutes, seconds: seconds };
    }
    else if (period === "PM") {
        return { hours: hours + 12 < 24 ? hours + 12 : 0, minutes: minutes, seconds: seconds };
    }
    else {
        throwerror("Period not not recognized", period);
    }
}
function formatMilitaryTime(time) {
    var hours = time.hours, minutes = time.minutes, seconds = time.seconds;
    var hours_str = hours.toString();
    var minutes_str = minutes.toString();
    var seconds_str = seconds.toString();
    if (hours < 10)
        hours_str = "0".concat(hours);
    if (minutes < 10)
        minutes_str = "0".concat(minutes);
    if (seconds < 10)
        seconds_str = "0".concat(seconds);
    return "".concat(hours_str, ":").concat(minutes_str, ":").concat(seconds_str);
}
function parseAMPM(string) {
    var newArray = string.split(":");
    var hours = parseAMPMHours(parseInt(newArray[0]));
    var minutes = parseMinutesOrSeconds(parseInt(newArray[1]));
    var seconds = parseMinutesOrSeconds(parseInt(newArray[2]));
    var period = newArray[2].slice(2).toUpperCase();
    return { hours: hours, minutes: minutes, seconds: seconds, period: period };
}
function throwerror(msg, problem) {
    throw new Error("Error: ".concat(msg, ", problem: ").concat(problem));
}
function parseAMPMHours(number) {
    //throw error if number is not between 0 and 12
    if (number < 0 || number > 12) {
        throwerror("Hours out of range", number);
    }
    if (number === 12)
        return 0;
    else
        return number;
}
function parseMinutesOrSeconds(number) {
    if (number < 0 || number > 60)
        throwerror("Minutes or seconds out of range", number);
    else
        return number;
}
function main() {
    var s = "07:05:45PM";
    var result = timeConversion(s);
    console.log("input: ".concat(s, ", output: ").concat(result));
    s = "12:01:02AM";
    result = timeConversion(s);
    console.log("input: ".concat(s, ", output: ").concat(result));
    s = "12:01:02PM";
    result = timeConversion(s);
    console.log("input: ".concat(s, ", output: ").concat(result));
    s = "13:01:02PM";
    result = timeConversion(s);
    console.log("input: ".concat(s, ", output: ").concat(result));
    return;
}
main();
