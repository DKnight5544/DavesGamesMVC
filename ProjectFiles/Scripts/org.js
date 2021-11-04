
let DisplayWindow;
let Questions = {};
let CurrentPage;
let BackButton;

let UserCount;
let DayNumber;
let Day = 1;

function begin() {

    DisplayWindow = document.getElementById("DisplayWindow");
    BackButton = document.getElementById("BackButton");
    UserCount = document.getElementById("UserCount");
    DayNumber = document.getElementById("DayNumber");

    let nl = document.getElementsByName("Question");
    Questions = Array.from(nl);

    showQuestion("Q");

}

function showQuestion(id) {
    let q = Questions.find(e => e.id == id);
    DisplayWindow.innerHTML = q.innerHTML;
    BackButton.style.display = (id == "Q" || id == "Q-Y-N-N-N") ? "none" : "block";
    CurrentPage = id;
}

function previous() {
    let len = CurrentPage.length - 2;
    let prevPage = CurrentPage.substr(0, len);
    showQuestion(prevPage);
}

function nextDay(offset) {

    let userCount;

    Day += offset;
    if (Day < 1) {
        Day = 1;
        DayNumber.innerHTML = "Your Day " + Day + " User Count";
        UserCount.innerHTML = 0;
        showQuestion("Q-Y");
        return;
    }

    else if (Day == 1) userCount = 0;
    else if (Day == 2) userCount = 0;
    else if (Day == 3) userCount = 1;
    else if (Day == 4) userCount = 3;
    else if (Day == 5) userCount = 7;
    else if (Day == 6) userCount = 15;
    else if (Day == 7) userCount = 31;
    else if (Day == 8) userCount = 63;
    else if (Day == 9) userCount = 127;
    else if (Day == 10) userCount = 255;
    else if (Day == 11) userCount = 511;
    else if (Day == 12) userCount = 1023;
    else if (Day == 13) userCount = 2047;
    else if (Day == 14) userCount = 4095;
    else if (Day == 15) userCount = 8191;
    else if (Day == 16) userCount = 16383;
    else if (Day == 17) userCount = 32767;
    else if (Day == 18) userCount = 65535;
    else if (Day == 19) userCount = 131071;
    else if (Day == 20) userCount = 262143;
    else if (Day == 21) userCount = 524287;
    else if (Day == 22) userCount = 1048575;
    else {
        Day = 1;
        DayNumber.innerHTML = "Your Day " + Day + " User Count";
        UserCount.innerHTML = 0;
        showQuestion("Q-Y-N-N-N");
        return;
    }

    DayNumber.innerHTML = "Your Day " + Day + " User Count";
    UserCount.innerHTML = userCount;
    showQuestion("Q-Y-N-N");
}


function addUser(sponsorName) {
    let inp = document.getElementById("UserNameInput");
    let userName = inp.value;
    if (userName != "") {
        let uri = "/org/add|" + userName + "|" + sponsorName;
        window.open(uri);
    }
}