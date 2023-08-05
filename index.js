function createEmployeeRecord(employeeArray){
    let employeeObj = {}
    employeeObj.firstName = employeeArray[0]
    employeeObj.familyName = employeeArray[1]
    employeeObj.title = employeeArray[2]
    employeeObj.payPerHour = employeeArray[3]
    employeeObj.timeInEvents = []
    employeeObj.timeOutEvents = []


    return employeeObj
}

function createEmployeeRecords(employeeArrays) {
    let employeeRecordsArray = [];
  
    for (let employeeRecord of employeeArrays) {
      let employeeRecordObj = createEmployeeRecord(employeeRecord);
      employeeRecordsArray.push(employeeRecordObj);
    }
  
    return employeeRecordsArray;
  }
  

function createTimeInEvent(employeeRecord, dateTimeString){
    const [date, time] = dateTimeString.split(' ')
    const hour = parseInt(time)
    // Time in event object
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: hour
    }

    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString){
    const [date, time] = dateTimeString.split(' ')
    const hour = parseInt(time)

    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: hour
    }

    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;

    const hoursWorked = (timeOutHour - timeInHour) / 100; // Convert to hours

    return hoursWorked;
}
  
  
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payPerHour = employeeRecord.payPerHour;

    const wagesEarned = hoursWorked * payPerHour;

    return wagesEarned;
}
  
function allWagesFor(employeeRecord) {
    const timeInEvents = employeeRecord.timeInEvents;
    const timeOutEvents = employeeRecord.timeOutEvents;

    let totalWages = 0;

    for (let i = 0; i < timeInEvents.length; i++) {
        const hoursWorked = (timeOutEvents[i].hour - timeInEvents[i].hour) / 100;
        const payPerHour = employeeRecord.payPerHour;
        const wagesEarned = hoursWorked * payPerHour;
        totalWages += wagesEarned;
    }

    return totalWages;
}
  
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
  