
let DisplayWindow;
let Questions = {};
let CurrentPage;
let BackButton;

let UserCount;
let DayNumber;
let Day = 0;

let DayValueArray = [];

function begin() {

    DisplayWindow = document.getElementById("DisplayWindow");
    BackButton = document.getElementById("BackButton");
    UserCount = document.getElementById("UserCount");
    DayNumber = document.getElementById("DayNumber");

    let total = 0;
    let newlyAdded = .5;
    DayValueArray.push(0);
    DayValueArray.push(0);
    DayValueArray.push(0);
    for (let i = 1; i < 21; i++) {
        newlyAdded *= 2;
        total += newlyAdded
        DayValueArray.push(total);
    }

    let nl = document.getElementsByName("Question");
    Questions = Array.from(nl);

    showQuestion("HOME");
    CurrentPage = "HOME";

}

function showQuestion(id) {
    let q = Questions.find(e => e.id == id);
    DisplayWindow.innerHTML = q.innerHTML;
    BackButton.style.display = (id == "HOME" || id == "DAY22") ? "none" : "block";
    CurrentPage = id;
}

function previous() {

    let prevPage;

    if (CurrentPage == "USER01") prevPage = "HOME";
    else if (CurrentPage == "GUEST01") prevPage = "HOME";
    else if (CurrentPage == "GUEST02") prevPage = "GUEST01";
    else if (CurrentPage == "DEMO-01") prevPage = "USER01";
    else if (CurrentPage == "DEMO-02") prevPage = "DEMO-01";
    else if (CurrentPage == "DEMO-03") prevPage = "DEMO-02";
    else if (CurrentPage == "DEMO-04") prevPage = "DEMO-03";
    else if (CurrentPage == "DAY01") prevPage = "DEMO-04";
    else if (CurrentPage == "DAY22") prevPage = "DAY01";
    else if (CurrentPage == "") prevPage = "";
    else prevPage = "HOME";

    showQuestion(prevPage);
}

function dayOne() {
    Day = 0;
    nextDay(1);
}

function nextDay(offset) {

    Day += offset;

    if (Day == 0) {
        showQuestion("DEMO-04");
        return;
    }    

    DayNumber.innerHTML = "Your Day " + Day + " User Count";
    UserCount.innerHTML = DayValueArray[Day];

    if (Day == 22) {
        showQuestion("DAY22");
    } else {
        showQuestion("DAY01");
    }


}


function addUser(sponsorName) {
    let inp = document.getElementById("UserNameInput");
    let userName = inp.value;
    if (userName != "") {
        let uri = "/org/add|" + userName + "|" + sponsorName;
        window.open(uri);
    }
}