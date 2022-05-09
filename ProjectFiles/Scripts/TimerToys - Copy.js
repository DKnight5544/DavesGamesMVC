


function begin() {

    if (global.PageKey === "Home") return false

    global.Banner = document.getElementById("Banner");
    global.MenuButtons = document.getElementById("MenuButtons");
    global.NewPageButton = document.getElementById("NewPageButton")
    global.AddTimerButton = document.getElementById("AddTimerButton")
    global.ReadOnlyButton = document.getElementById("ReadOnlyButton")
    global.AddLinkButton = document.getElementById("AddLinkButton")
    global.EditModeButton = document.getElementById("EditModeButton")

    global.LinkTemplate = document.getElementById("LinkTemplate");
    global.TimerTemplate = document.getElementById("TimerTemplate");
    global.LinkContainer = document.getElementById("LinkContainer");
    global.TimerContainer = document.getElementById("TimerContainer");

    global.IsEditMode = false;

    buildPage();

    getAll();

    //setInterval(getTimers, 1000);

}

function buildPage() {

    global.Banner.onblur = function () {
        updatePageName(this)
        this.Froze = false;
    }
    global.Banner.onfocus = function () {
        this.Froze = true;
        this.select();
    }

    for (let i = 0; i < 50; i++) {
        appendObjectFromTemplate(global.LinkTemplate, global.LinkContainer);
        appendObjectFromTemplate(global.TimerTemplate, global.TimerContainer);
    }

}

function appendObjectFromTemplate(template, container) {
    let div = document.createElement("div");
    div.innerHTML = template.innerHTML;
    let obj = div.children[0];
    container.append(obj);
}

function refresh() {

    if (!global.Banner.Froze) global.Banner.value = global.Page.PageName;
    global.Banner.OrgValue = global.Page.PageName;
    global.ReadOnlyKey = global.Page.ReadOnlyKey;

    let displaySetting = global.Page.IsReadOnly ? "none" : "inline-block";
    global.AddTimerButton.style.display = displaySetting;
    global.ReadOnlyButton.style.display = displaySetting;
    global.AddLinkButton.style.display = displaySetting;
    global.EditModeButton.style.display = displaySetting;

    showHide(global.Links, global.LinkContainer, refreshLink);
    showHide(global.Timers, global.TimerContainer, refreshTimer);

}

function showHide(dataObj, container, refreshFunction) {


    for (let i = 0; i < 50; i++) {
        let obj = container.children[i];

        let data = dataObj[i];
        if (data) {
            refreshFunction(data, obj);
            obj.style.display = "inline-block";
        }
        else {
            obj.style.display = "none";
        }

    }

}


function refreshLink(data, link) {

    let linkNormal = link.children[0];
    let linkEdit = link.children[1];

    linkNormal.style.display = global.IsEditMode ? "none" : "inline-block";
    linkNormal.children[0].innerHTML = data.LinkName;
    linkNormal.children[0].url = data.LinkUrl;


    linkEdit.style.display = global.IsEditMode ? "inline-block" : "none";

    let obj = linkEdit.children[2];
    if(!obj.Froze) obj.value = data.LinkName;
    obj.LinkKey = data.LinkKey;

    obj = linkEdit.children[6];
    if(!obj.Froze) obj.value = data.LinkUrl;
    obj.LinkKey = data.LinkKey;

}

function refreshTimer(data, timer) {

    let timerNormal = timer.children[0].children[0];
    let timerEdit = timer.children[1].children[0];

    let timeString = stringifyElapsedTime(data.ElapsedTime);
    let timeColor = data.IsRunning ? "red" : "black";

    timerNormal.style.display = global.IsEditMode ? "none" : "inline-block";
    timerNormal.children[0].innerHTML = data.TimerName;
    timerNormal.children[1].innerHTML = timeString;
    timerNormal.children[1].style.color = timeColor;


    // table    tbody      row          col       inp/btn
    timerEdit.style.display = global.IsEditMode ? "inline-block" : "none";
    timerEdit.children[0].children[0].children[0].children[0].TimerKey = data.TimerKey;

    //timer name input.
    let obj = timerEdit.children[0].children[0].children[0].children[0];
    if (!obj.Froze) obj.value = data.TimerName;
    obj.TimerKey = data.DataKey;

    timerEdit.children[0].children[1].children[0].innerHTML = timeString;
    timerEdit.children[0].children[1].children[0].style.color = timeColor;
    timerEdit.children[0].children[2].children[0].children[0].TimerKey = data.TimerKey;
    timerEdit.children[0].children[2].children[0].children[1].TimerKey = data.TimerKey;
    timerEdit.children[0].children[2].children[0].children[2].TimerKey = data.TimerKey;
    timerEdit.children[0].children[2].children[0].children[3].TimerKey = data.TimerKey;
    timerEdit.children[0].children[2].children[0].children[4].TimerKey = data.TimerKey;
    timerEdit.children[0].children[2].children[0].children[5].TimerKey = data.TimerKey;
    timerEdit.children[0].children[3].children[0].children[0].innerHTML = data.IsRunning ? "OFF" : "ON";

}

function refreshTimerEdit(data, timer) {
    let timeString = stringifyElapsedTime(data.ElapsedTime);

    timer.style.display = "inline-block";

    let inp = timer.children[0].children[0].children[0].children[0];
    if (!inp.Froze) {
        inp.value = data.TimerName;
        inp.TimerKey = data.TimerKey;
    }

    //      tbody      row          col         inp/btn
    //row 1
    timer.children[0].children[1].children[0].innerHTML = timeString;
    timer.children[0].children[1].children[0].style.color = data.IsRunning ? "red" : "black";

    //row 2
    timer.children[0].children[2].children[0].children[0].TimerKey = data.TimerKey;
    timer.children[0].children[2].children[0].children[1].TimerKey = data.TimerKey;
    timer.children[0].children[2].children[0].children[2].TimerKey = data.TimerKey;
    timer.children[0].children[2].children[0].children[3].TimerKey = data.TimerKey;
    timer.children[0].children[2].children[0].children[4].TimerKey = data.TimerKey;
    timer.children[0].children[2].children[0].children[5].TimerKey = data.TimerKey;

    //row 3
    timer.children[0].children[3].children[0].children[0].innerHTML = data.IsRunning ? "OFF" : "ON";
    timer.children[0].children[3].children[0].children[0].TimerKey = data.TimerKey;
    timer.children[0].children[3].children[0].children[1].TimerKey = data.TimerKey;
    timer.children[0].children[3].children[0].children[2].TimerKey = data.TimerKey;

}

function getAll() {

    let endpoint = "/TimerToysAPI/GetAll|{{PageKey}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(results => {
            global.Page = results.Page
            global.Timers = results.Timers;
            global.Links = results.Links;
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

    let endpoint = `/TimerToysAPI/AddNewTimer|${global.PageKey}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getAll();
            refresh();
        });

}

function addNewLink() {

    let endpoint = `/TimerToysAPI/AddNewLink|${global.PageKey}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getAll();
            refresh();
        });

}

function gotoReadOnly() {
    let url = `/TimerToys/${global.Page.ReadOnlyKey}`;
    location.href = url;
}

function gotoLink(sender) {
    if (sender.url) {
        location.href = sender.url;
    }
}

function updatePageName() {

    if (!global.Timers) return false;
    if (global.Banner.OrgValue === global.Banner.value) return false;

    let endpoint = "/TimerToysAPI/UpdatePageName|{{PageKey}}|{{PageName}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{PageName}}", global.Banner.value);

    fetch(endpoint);

}

function updateTimerName(sender) {

    let endpoint = "/TimerToysAPI/UpdateTimerName|{{PageKey}}|{{TimerKey}}|{{TimerName}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.TimerKey);
    endpoint = endpoint.replace("{{TimerName}}", sender.value);

    fetch(endpoint);
}

function updateLinkName(sender) {

    let endpoint = "/TimerToysAPI/UpdateLinkName|{{PageKey}}|{{LinkKey}}|{{LinkName}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{LinkKey}}", sender.LinkKey);
    endpoint = endpoint.replace("{{LinkName}}", sender.value);

    fetch(endpoint);
}

function updateLinkUrl(sender) {

    let endpoint = "/TimerToysAPI/UpdateLinkUrl|{{PageKey}}|{{LinkKey}}|{{LinkUrl}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{LinkKey}}", sender.LinkKey);
    endpoint = endpoint.replace("{{LinkUrl}}", encodeURI(sender.value));
    //endpoint = encodeURI(endpoint);
    fetch(endpoint);
}


function adjustTime(sender, offset) {

    let endpoint = "/TimerToysAPI/AdustTimer|{{PageKey}}|{{TimerKey}}|{{Offset}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.TimerKey);
    endpoint = endpoint.replace("{{Offset}}", offset);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getAll();
            refresh();
        });
}

function toggleTimer(sender) {

    let endpoint = "/TimerToysAPI/ToggleTimer|{{PageKey}}|{{TimerKey}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.TimerKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getAll();
            refresh();
        });
}

function resetTimer(sender) {

    let endpoint = "/TimerToysAPI/ResetTimer|{{PageKey}}|{{TimerKey}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.TimerKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getAll();
            refresh();
        });
}

function deleteTimer(sender) {

    let endpoint = "/TimerToysAPI/DeleteTimer|{{PageKey}}|{{TimerKey}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{TimerKey}}", sender.TimerKey);

    fetch(endpoint)
        .then(response => response.json())
        .then(pageKey => {
            getAll();
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
    sender.Froze = false;
    updateTimerName(sender)
}

function timerName_onfocus(sender) {
    sender.select();
    sender.Froze = true;
}

function linkName_onblur(sender) {
    sender.Froze = false;
    updateLinkName(sender)
}

function linkName_onfocus(sender) {
    sender.select();
    sender.Froze = true;
}

function linkUrl_onblur(sender) {
    sender.Froze = false;
    updateLinkUrl(sender)
}

function linkUrl_onfocus(sender) {
    sender.select();
    sender.Froze = true;
}

function toggleEditMode() {
    global.IsEditMode = global.IsEditMode ? false : true;
    refresh();
}