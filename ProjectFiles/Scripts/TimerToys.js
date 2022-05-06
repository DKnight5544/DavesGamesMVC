

const global = {};


function begin() {

    if (PageKey === "Home") return false

    global.banner = document.getElementById("banner");
    global.container = document.getElementById("container");
    global.bottomButtons = document.getElementById("bottomButtons");
    global.thisPageLink = document.getElementById("thisPageLink");

    global.thisPageLink.href = location.href;
    global.thisPageLink.innerHTML = "Page Link - Right Click To Copy.";

    buildPage();

    getTimers();

    setInterval(getTimers, 1000);

}

function buildPage() {

    global.banner.onblur = function () {
        updatePageName(this)
        global.banner.froze = false;
    }
    global.banner.onfocus = function () {
        global.banner.froze = true;
    }


    const template = document.getElementById("timerTemplate");


    for (let i = 0; i < 50; i++) {
        let div = document.createElement("div");
        div.innerHTML = template.innerHTML;
        let tbl = div.children[0];
        //tbl.className = "timer_table";
        global.container.append(tbl);
    }

}

function refresh() {

    if (!global.banner.froze) global.banner.value = global.timers[0].TimerName;
    global.banner.orgValue = global.timers[0].TimerName;
    global.readOnlyKey = global.timers[1].TimerKey;

    global.timers[0].IsReadOnly
    if (global.timers[0].IsReadOnly) {
        global.bottomButtons.children[1].style.display = "none";
        global.bottomButtons.children[2].style.display = "none";
    }
    else {
        global.bottomButtons.children[1].style.display = "inline-block";
        global.bottomButtons.children[2].style.display = "inline-block";
    }
    

    for (let i = 0; i < 50; i++) {

        let data = global.timers[i + 2];
        let timer = global.container.children[i];

        if (data) {

            let timeString = stringifyElapsedTime(data.ElapsedTime);

            timer.style.display = "block";

            //      tbody      row          col         inp/btn
            if (!global.froze) {
                timer.children[0].children[0].children[0].children[0].value = data.TimerName;
                timer.children[0].children[0].children[0].children[0].timerKey = data.TimerKey;
            }

            timer.children[0].children[1].children[0].innerHTML = timeString;
            timer.children[0].children[1].children[0].style.color = data.IsRunning ? "red" : "black";

            if (data.IsReadOnly) {
                // hide rows 2 and 3 (controls)
                timer.children[0].children[2].children[0].style.display = (data.IsReadOnly) ? "none" : "block";
                timer.children[0].children[3].children[0].style.display = (data.IsReadOnly) ? "none" : "block";
            }
            else {
                //row 2
                timer.children[0].children[2].children[0].children[0].timerKey = data.TimerKey;
                timer.children[0].children[2].children[0].children[1].timerKey = data.TimerKey;
                timer.children[0].children[2].children[0].children[2].timerKey = data.TimerKey;
                timer.children[0].children[2].children[0].children[3].timerKey = data.TimerKey;
                timer.children[0].children[2].children[0].children[4].timerKey = data.TimerKey;
                timer.children[0].children[2].children[0].children[5].timerKey = data.TimerKey;
                //row 3
                timer.children[0].children[3].children[0].children[0].innerHTML = data.IsRunning ? "OFF" : "ON";
                timer.children[0].children[3].children[0].children[0].timerKey = data.TimerKey;
                timer.children[0].children[3].children[0].children[1].timerKey = data.TimerKey;
                timer.children[0].children[3].children[0].children[2].timerKey = data.TimerKey;
            }



        }
        else {
            timer.style.display = "none";
        }


    }

}

function getTimers() {

    let endpoint = "/TimerToysAPI/GetTimers|{{PageKey}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(timers => {
            global.timers = timers;
            refresh();
        });

}

function getNewPage() {

    fetch('/timertoysapi/GetNewPage')
        .then(response => response.json())
        .then(pageKey => {
            location.href = `/TimerToys/${pageKey}`;
        });

}

function addNewTimer() {

    let endpoint = `/TimerToysAPI/AddNewTimer|${PageKey}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getTimers();
            refresh();
        });

}

function gotoReadOnly() {
    let url = `/TimerToys/${global.timers[1].TimerKey}`;
    location.href = url;
}

function updatePageName() {

    if (!global.timers) return false;
    if (global.banner.orgValue === global.banner.value) return false;

    let endpoint = "/TimerToysAPI/UpdatePageName|{{PageKey}}|{{PageName}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{PageName}}", global.banner.value);

    fetch(endpoint);

}

function updateTimerName(sender) {

    let endpoint = "/TimerToysAPI/UpdateTimerName|{{PageKey}}|{{TimerKey}}|{{TimerName}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.timerKey);
    endpoint = endpoint.replace("{{TimerName}}", sender.value);

    fetch(endpoint);
}

function adjustTime(sender, offset) {

    let endpoint = "/TimerToysAPI/AdustTimer|{{PageKey}}|{{TimerKey}}|{{Offset}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.timerKey);
    endpoint = endpoint.replace("{{Offset}}", offset);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getTimers();
            refresh();
        });
}

function toggleTimer(sender) {

    let endpoint = "/TimerToysAPI/ToggleTimer|{{PageKey}}|{{TimerKey}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.timerKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getTimers();
            refresh();
        });
}

function resetTimer(sender) {

    let endpoint = "/TimerToysAPI/ResetTimer|{{PageKey}}|{{TimerKey}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.timerKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getTimers();
            refresh();
        });
}

function deleteTimer(sender) {

    let endpoint = "/TimerToysAPI/DeleteTimer|{{PageKey}}|{{TimerKey}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.timerKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getTimers();
            refresh();
        });
}

function stringifyElapsedTime(seconds) {

    let hours = Math.floor(seconds / 3600);

    seconds -= hours * 3600;

    let minutes = Math.floor(seconds / 60);

    seconds -= minutes * 60;

    // ('000' + num).slice(-4)
    let h = ('0000' + hours).slice(-2);
    let m = ('0000' + minutes).slice(-2);
    let s = ('0000' + seconds).slice(-2);

    let sElapsedTime = `${h}:${m}:${s}`;

    return sElapsedTime;

}

function getAdjustButton(offset) {
    btn = document.createElement("button");
    btn.className = "timer_adj_btn";
    btn.offset = offset;

    btn.onclick = function () {
        adjustTime(this, offset);
    }

    if (offset < 0) {
        btn.innerHTML = "-";
        btn.style.marginRight = "0px";
    }
    else {
        btn.innerHTML = "+";
        btn.style.marginRight = "34px";
    }

    return btn;
}

function timerName_onblur(sender) {
    global.froze = false;
    updateTimerName(sender)
}

function timerName_onfocus(sender) {
    sender.select();
    global.froze = true;
}