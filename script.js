const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false
ringTone = new Audio("/ringtone.mp3")



for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    // getting hours min and sec
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    // Change AM to PM
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    // if hour value is 0,  set this value to 12
    h = h == 0 ? h = 12 : h;

    // append zero if value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime == `${h}:${m}:${ampm}`){
        ringTone.play();
        ringTone.loop = true;
    }

}, 1000);

// setting alarm button
function setAlarm(){

    if(isAlarmSet){
        alarmTime = "";
        ringTone.pause();
        content.classList.remove("disable");
        setAlarm.innerHTML = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
    
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM") ){
        return alert("Select valid time")
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerHTML = "clear Alarm"
}

setAlarmBtn.addEventListener("click", setAlarm)