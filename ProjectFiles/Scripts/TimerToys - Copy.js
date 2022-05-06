

const global = {};


function begin() {

    global.banner = document.getElementById("banner");
    global.container = document.getElementById("container");
    global.buttons = document.getElementById("buttons");

    buildPage();

    if (PageKey === "Home") {
        global.banner.value = "Timer Toys"
        return false
    }

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

    for (let i = 0; i < 50; i++) {

        let btn;
        let tbl = document.createElement("tbl");

        tbl.id = `tbl${i}`;
        tbl.style.display = "none";


        // Name Input
        let row = document.createElement("tr");
        let col = document.createElement("td");

        let inp = document.createElement("input");
        tbl.inputObj = inp;


        col.append(inp);
        row.append(col);

        tbl.append(row);

        tbl.className = "timer_table";

        col.className = "timer_name_col";

        inp.type = "text";
        inp.className = "timer_name_inp";

        inp.onblur = function () {
            tbl.inputObj.froze = false;
            updateTimerName(this);
        }

        tbl.inputObj.onfocus = function () {
            tbl.inputObj.froze = true;
        }

        // Elapsed time
        row = document.createElement("tr");
        col = document.createElement("td");
        row.append(col);

        tbl.elapsedObj = col;
        tbl.append(row);

        col.className = "timer_elapsed_col";

        // Adjust buttons
        row = document.createElement("tr");
        col = document.createElement("td");
        row.append(col);

        tbl.btnInfoObj = col;
        tbl.append(row);

        col.className = "timer_adj_col";
        col.append(getAdjustButton(-3600));
        col.append(getAdjustButton(3600));
        col.append(getAdjustButton(-60));
        col.append(getAdjustButton(60));
        col.append(getAdjustButton(-1));
        col.append(getAdjustButton(1));

        // main buttons row
        row = document.createElement("tr");
        col = document.createElement("td");
        col.className = "timer_main_col";
        row.append(col);
        tbl.append(row);

        // toggle button
        btn = document.createElement("button");
        btn.className = "timer_toggle_btn";
        btn.onclick = function () {
            toggleTimer(this);
        }
        tbl.toggleButton = btn;
        col.append(btn);

        //reset button
        btn = document.createElement("button");
        btn.className = "timer_main_btn";
        btn.innerHTML = "RESET";
        btn.onclick = function () {
            resetTimer(this);
        }
        tbl.resetButton = btn;
        col.append(btn);

        //delete button
        btn = document.createElement("button");
        btn.className = "timer_main_btn";
        btn.innerHTML = "DELETE";
        btn.onclick = function () {
            deleteTimer(this);
        }
        tbl.deleteButton = btn;
        col.append(btn);

        // add table 
        global.container.append(tbl);

    }

}

function refresh() {

    if(!global.banner.froze) global.banner.value = global.timers[0].TimerName;
    global.banner.orgValue = global.timers[0].TimerName;
    global.readOnlyKey = global.timers[1].TimerKey;


    for (let i = 0; i < 50; i++) {

        let timer = global.timers[i + 2];

        let tbl = document.getElementById(`tbl${i}`);

        if (timer) {

            tbl.style.display = "block";
            tbl.inputObj.timerKey = timer.TimerKey;
            if(!tbl.inputObj.froze) tbl.inputObj.value = timer.TimerName;
            tbl.inputObj.orgValue = timer.TimerName;
            tbl.elapsedObj.innerHTML = stringifyElapsedTime(timer.ElapsedTime);
            tbl.btnInfoObj.timerKey = timer.TimerKey;
            tbl.toggleButton.timerKey = timer.TimerKey;
            tbl.toggleButton.innerHTML = timer.IsRunning ? "OFF" : "ON";
            tbl.resetButton.timerKey = timer.TimerKey;
            tbl.deleteButton.timerKey = timer.TimerKey;
        }
        else {
            tbl.style.display = "none";
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

function updatePageName() {

    if (!global.timers) return false;
    if (global.banner.orgValue === global.banner.value) return false;

    let endpoint = "/TimerToysAPI/UpdatePageName|{{PageKey}}|{{PageName}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{PageName}}", global.banner.value);

    fetch(endpoint);

}

function updateTimerName(sender) {

    if (sender.orgValue === sender.value) return false;

    let endpoint = "/TimerToysAPI/UpdateTimerName|{{PageKey}}|{{TimerKey}}|{{TimerName}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.timerKey);
    endpoint = endpoint.replace("{{TimerName}}", sender.value);

    fetch(endpoint);

}

function adjustTime(sender, offset) {

    let endpoint = "/TimerToysAPI/AdustTimer|{{PageKey}}|{{TimerKey}}|{{Offset}}";
    endpoint = endpoint.replace("{{PageKey}}", PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.parentElement.timerKey);
    endpoint = endpoint.replace("{{Offset}}", sender.offset);

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

function stringifyElapsedTime(seconds){

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