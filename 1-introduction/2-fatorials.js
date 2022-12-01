import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

writeFiles();

function writeFiles() {
  let dataFat = calculateFatorials();
  fs.writeFileSync(__dirname + '/fat.txt', 'Fatorials \n', fileCallback);
  for (let i = 0; i < dataFat.length; i++) {
    fs.appendFileSync(__dirname + '/fat.txt', dataFat[i], fileCallback);
  }

  let dataLog = calculateLogFatorials(dataFat);
  fs.writeFileSync(__dirname + '/logfat.txt', 'Log Factorial \n', fileCallback);
  for (let i = 0; i < dataLog.length; i++) {
    fs.appendFileSync(__dirname + '/logfat.txt', dataLog[i], fileCallback);
  }

  let dataStirling = calculateStirling();
  fs.writeFileSync(__dirname + '/stirling.txt', 'Stirling \n', fileCallback);
  for (let i = 0; i < dataStirling.length; i++) {
    fs.appendFileSync(
      __dirname + '/stirling.txt',
      dataStirling[i],
      fileCallback
    );
  }

  let errorStirling = calculateErrorStirling(dataLog, dataStirling);
  fs.writeFileSync(__dirname + '/errorstirling.txt', 'Error \n', fileCallback);
  for (let i = 0; i < errorStirling.length; i++) {
    fs.appendFileSync(
      __dirname + '/errorstirling.txt',
      errorStirling[i],
      fileCallback
    );
  }
}

function calculateFatorials() {
  let data = [];
  let fat = 1;
  for (let i = 1; i <= 40; i++) {
    fat *= i;
    data.push(`${i}! = ${fat} \n`);
  }

  return data;
}

function calculateLogFatorials() {
  let logData = [];
  let fat = 1;
  for (let i = 1; i <= 40; i++) {
    fat *= i;
    logData.push(`log ${i + 1}! = ${Math.log(fat)} \n`);
  }
  return logData;
}

function calculateStirling() {
  let stirlingData = [];
  for (let i = 1; i <= 40; i++) {
    let op1 = i * Math.log(i);
    let op2 = i;
    let op3 = (1 / 2) * Math.log(2 * Math.PI * i);

    stirlingData.push(`S${i} = ${op1 - op2 + op3} \n`);
  }
  return stirlingData;
}

function calculateErrorStirling(logData, stirData) {
  let errorData = [];
  for (let i = 0; i < logData.length; i++) {
    let logI = +logData[i].split('= ')[1];
    let stirI = +stirData[i].split('= ')[1];
    errorData.push(
      `(err S(${i + 1})) = ${((logI - stirI) / logI).toExponential()} \n`
    );
  }
  return errorData;
}

function fileCallback(err) {
  if (err) {
    console.log(err);
  }
  return;
}
