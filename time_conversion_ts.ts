"use strict";

import { error } from "console";
import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
type NumOrStr = number | string;
type MilitaryHours = number;
type AMPMHours = number;
type MinutesOrSeconds = number;
type Period = "AM" | "PM";
interface MilitaryTime {
  hours: MilitaryHours;
  minutes: MinutesOrSeconds;
  seconds: MinutesOrSeconds;
}
// takes minutes and seconds from military time
interface AMPMTime {
  hours: AMPMHours;
  minutes: MinutesOrSeconds;
  seconds: MinutesOrSeconds;
  period: Period;
}

function timeConversion(s: string): string {
  // Write your code here
  let timeAMPM: AMPMTime = parseAMPM(s);
  let timeMilitary: MilitaryTime = convertToMilitaryTime(timeAMPM);
  return formatMilitaryTime(timeMilitary);
}
function convertToMilitaryTime(time: AMPMTime): MilitaryTime {
  const { hours, minutes, seconds, period } = time;

  if (period === "AM") {
    return { hours, minutes, seconds };
  } else if (period === "PM") {
    return { hours: hours + 12 < 24 ? hours + 12 : 0, minutes, seconds };
  } else {
    throwerror("Period not not recognized", period);
  }
}
function formatMilitaryTime(time: MilitaryTime): string {
  let { hours, minutes, seconds } = time;
  let hours_str: string = hours.toString();
  let minutes_str: string = minutes.toString();
  let seconds_str: string = seconds.toString();
  if (hours < 10) hours_str = `0${hours}`;
  if (minutes < 10) minutes_str = `0${minutes}`;
  if (seconds < 10) seconds_str = `0${seconds}`;

  return `${hours_str}:${minutes_str}:${seconds_str}`;
}

function parseAMPM(string: string): AMPMTime {
  const newArray = string.split(":");
  const hours: AMPMHours = parseAMPMHours(parseInt(newArray[0]));
  const minutes: MinutesOrSeconds = parseMinutesOrSeconds(
    parseInt(newArray[1])
  );
  const seconds: MinutesOrSeconds = parseMinutesOrSeconds(
    parseInt(newArray[2])
  );
  const period: Period = newArray[2].slice(2).toUpperCase() as Period;
  return { hours, minutes, seconds, period };
}
function throwerror(msg: string, problem: NumOrStr): never {
  throw new Error(`Error: ${msg}, problem: ${problem}`);
}
function parseAMPMHours(number: number): AMPMHours {
  //throw error if number is not between 0 and 12
  if (number < 0 || number > 12) {
    throwerror("Hours out of range", number);
  }
  if (number === 12) return 0;
  else return number;
}

function parseMinutesOrSeconds(number: number): MinutesOrSeconds {
  if (number < 0 || number > 60)
    throwerror("Minutes or seconds out of range", number);
  else return number as MinutesOrSeconds;
}

function main() {
  let s = "07:05:45PM";
  let result = timeConversion(s);
  console.log(`input: ${s}, output: ${result}`);

  s = "12:01:02AM";
  result = timeConversion(s);
  console.log(`input: ${s}, output: ${result}`);

  s = "12:01:02PM";
  result = timeConversion(s);
  console.log(`input: ${s}, output: ${result}`);
  s = "13:01:02PM";
  result = timeConversion(s);
  console.log(`input: ${s}, output: ${result}`);
  return;
}
main();
