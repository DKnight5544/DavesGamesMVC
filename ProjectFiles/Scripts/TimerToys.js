


function begin() {

    if (global.PageKey === "Home") return false

    global.Banner = document.getElementById("Banner");
    global.MenuButtons = document.getElementById("MenuButtons");
    global.NewPageButton = document.getElementById("NewPageButton")
    global.AddTimerButton = document.getElementById("AddTimerButton")
    global.ReadOnlyButton = document.getElementById("ReadOnlyButton")
    global.AddLinkButton = document.getElementById("AddLinkButton")
    global.EditModeButton = document.getElementById("EditModeButton")
    global.ControlsButton = document.getElementById("ControlsButton")
    global.MenuContainer = document.getElementById("MenuContainer")
    global.DoneButtonOne = document.getElementById("DoneButtonOne")
    global.DoneButtonTwo = document.getElementById("DoneButtonTwo")

    global.LinkTemplate = document.getElementById("LinkTemplate");
    global.TimerTemplate = document.getElementById("TimerTemplate");
    global.LinkContainer = document.getElementById("LinkContainer");
    global.TimerContainer = document.getElementById("TimerContainer");

    global.RefreshCount = 0;
    global.ControlCount = 0;
    
    global.Form1 = document.getElementById("Form1");

    global.IsEditMode = false;

    buildPage();

    getAll();

    setInterval(getAll, 1000);

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


    if (global.Page.IsReadOnly) {
        global.AddTimerButton.style.display = "none";
        global.AddLinkButton.style.display = "none";
        global.ReadOnlyButton.style.display = "none";
        global.EditModeButton.style.display = "none";
        global.NewPageButton.style.display = "inline-block";
        global.DoneButtonOne.style.display = "none";
        global.DoneButtonTwo.style.display = "none";
    }

    else if (global.IsEditMode) {
        global.AddTimerButton.style.display = "none";
        global.AddLinkButton.style.display = "none";
        global.ReadOnlyButton.style.display = "none";
        global.EditModeButton.style.display = "none";
        global.NewPageButton.style.display = "none";
        global.DoneButtonOne.style.display = "inline-block";
        global.DoneButtonTwo.style.display = "inline-block";
    }
    else {
        global.AddTimerButton.style.display = "inline-block";
        global.AddLinkButton.style.display = "inline-block";
        global.ReadOnlyButton.style.display = "inline-block";
        global.EditModeButton.style.display = "inline-block";
        global.NewPageButton.style.display = "inline-block";
        global.DoneButtonOne.style.display = "none";
        global.DoneButtonTwo.style.display = "none";
    }

    global.ControlCount = 0;
    global.RefreshCount++;
    showHide(global.Links, global.LinkContainer, refreshLink);
    showHide(global.Timers, global.TimerContainer, refreshTimer);

    //If first time screen is displayed and 0 controls show the controls.
    if (global.ControlCount === 0 && global.RefreshCount === 1) {
        controlsButton_onclick();
    }

}

function showHide(dataObj, container, refreshFunction) {


    for (let i = 0; i < 50; i++) {
        let obj = container.children[i];

        let data = dataObj[i];
        if (data) {
            refreshFunction(data, obj);
            obj.style.display = "block";
            global.ControlCount++;
        }
        else {
            obj.style.display = "none";
        }

    }

}


function refreshLink(data, link) {

    let linkNormal = link.children[0];
    let linkEdit = link.children[1];

    linkNormal.style.display = global.IsEditMode ? "none" : "block";
    linkNormal.children[0].innerHTML = data.LinkName;
    linkNormal.children[0].url = data.LinkUrl;


    linkEdit.style.display = global.IsEditMode ? "inline-block" : "none";

    //Link Name Input
    let obj = linkEdit.children[2];
    if (!obj.Froze) obj.value = data.LinkName;
    obj.OrgValue = data.LinkName;
    obj.LinkKey = data.LinkKey;

    //Link Url Input
    obj = linkEdit.children[6];
    if (!obj.Froze) obj.value = data.LinkUrl;
    obj.LinkKey = data.LinkKey;

    //Delete Button.
    obj = linkEdit.children[8];
    obj.LinkKey = data.LinkKey;


}

function refreshTimer(data, timer) {

    let timerNormal = timer.children[0].children[0];
    let timerEdit = timer.children[1].children[0];

    let timeString = stringifyElapsedTime(data.ElapsedTime);
    let timeColor = data.IsRunning ? "red" : "black";

    timerNormal.style.display = global.IsEditMode ? "none" : "inline-block";
    timerNormal.TimerKey = data.TimerKey;
    timerNormal.children[0].innerHTML = data.TimerName;
    timerNormal.children[1].innerHTML = timeString;
    timerNormal.children[1].style.color = timeColor;


    timerEdit.style.display = global.IsEditMode ? "block" : "none";


    //timer name input.
    let inp = timerEdit
        .children[0] //timer_name_wrapper
        .children[0] //timer_name_input
        ;

    if (!inp.Froze) inp.value = data.TimerName;
    inp.TimerKey = data.TimerKey;
    inp.OrgValue = data.TimerName;

    //elapsed time
    let elapsedTimeDiv = timerEdit.children[1];
    elapsedTimeDiv.innerHTML = timeString;
    elapsedTimeDiv.style.color = timeColor;

    ////adjust buttons
    let adjustButtons = timerEdit.children[2];
    adjustButtons.children[0].TimerKey = data.TimerKey;
    adjustButtons.children[1].TimerKey = data.TimerKey;
    adjustButtons.children[2].TimerKey = data.TimerKey;
    adjustButtons.children[3].TimerKey = data.TimerKey;
    adjustButtons.children[4].TimerKey = data.TimerKey;
    adjustButtons.children[5].TimerKey = data.TimerKey;

    //// Timer Buttons
    let timerButtons = timerEdit.children[3];
    timerButtons.children[0].innerHTML = data.IsRunning ? "OFF" : "ON";
    timerButtons.children[0].TimerKey = data.TimerKey;
    timerButtons.children[1].TimerKey = data.TimerKey;
    timerButtons.children[2].TimerKey = data.TimerKey;

}

function getAll() {

    let form1 = global.Form1;
    form1.Action.value = "GetAll";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = "Null";
    form1.StringValue.value = "Null";
    form1.IntegerValue.value = "Null";
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        let r = JSON.parse(event.target.response);
        global.Page = r.Page
        global.Timers = r.Timers;
        global.Links = r.Links;
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function getApi(returnFunction) {
    let api = new XMLHttpRequest();
    api.onload = returnFunction;
    api.open("POST", "/TimerToysAPI/");
    return api;
}

function getNewPage() {

    let form1 = global.Form1;
    form1.Action.value = "GetNewPage";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = "Null";
    form1.StringValue.value = "Null";
    form1.IntegerValue.value = "Null";
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        let r = JSON.parse(event.target.response);
        location.href = `/Page/${r}`;
    };

    getApi(returnFunction).send(formData);

}

function addNewTimer() {

    controlsButton_onclick();

    let form1 = global.Form1;
    form1.Action.value = "AddNewTimer";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = "Null";
    form1.StringValue.value = "Null";
    form1.IntegerValue.value = "Null";
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function addNewLink() {

    controlsButton_onclick();

    let form1 = global.Form1;
    form1.Action.value = "AddNewLink";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = "Null";
    form1.StringValue.value = "Null";
    form1.IntegerValue.value = "Null";
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function updatePageName() {

    if (global.Banner.OrgValue === global.Banner.value) return false;

    let form1 = blankForm();
    form1.Action.value = "UpdatePageName";
    form1.PageKey.value = global.Page.PageKey;
    form1.StringValue.value = global.Banner.value;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);
}

function updateTimerName(sender) {

    if (sender.value === sender.OrgValue) return false;

    let form1 = blankForm();
    form1.Action.value = "UpdateTimerName";
    form1.PageKey.value = global.Page.PageKey;
    form1.ObjectKey.value = sender.TimerKey;
    form1.StringValue.value = sender.value;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function updateLinkName(sender) {

    if (sender.value === sender.OrgValue) return false;

    let form1 = blankForm();
    form1.Action.value = "UpdateLinkName";
    form1.PageKey.value = global.Page.PageKey;
    form1.ObjectKey.value = sender.LinkKey;
    form1.StringValue.value = sender.value;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);


    let endpoint = "/TimerToysAPI/UpdateLinkName|{{PageKey}}|{{LinkKey}}|{{LinkName}}";
    endpoint = endpoint.replace("{{PageKey}}", global.PageKey);
    endpoint = endpoint.replace("{{LinkKey}}", sender.LinkKey);
    endpoint = endpoint.replace("{{LinkName}}", sender.value);

    fetch(endpoint);
}

function updateLinkUrl(sender) {

    if (sender.value === sender.OrgValue) return false;

    let form1 = blankForm();
    form1.Action.value = "UpdateLinkUrl";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = sender.LinkKey;
    form1.StringValue.value = sender.value;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);
}

function adjustTime(sender, offset) {

    let form1 = blankForm();
    form1.Action.value = "AdustTimer";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = sender.TimerKey;
    form1.IntegerValue.value = offset;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function toggleTimer(sender) {

    let form1 = blankForm();
    form1.Action.value = "ToggleTimer";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = sender.TimerKey;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);
}

function resetTimer(sender) {

    let form1 = blankForm();
    form1.Action.value = "ResetTimer";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = sender.TimerKey;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function deleteLink(sender) {

    let form1 = blankForm();
    form1.Action.value = "DeleteLink";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = sender.LinkKey;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

}

function deleteTimer(sender) {

    let form1 = blankForm();
    form1.Action.value = "DeleteTimer";
    form1.PageKey.value = global.PageKey;
    form1.ObjectKey.value = sender.TimerKey;
    let formData = new FormData(form1);

    let returnFunction = function (event) {
        getAll();
        refresh();
    };

    getApi(returnFunction).send(formData);

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
    controlsButton_onclick();
    refresh();
}

function gotoReadOnly() {
    let url = `/Page/${global.Page.ReadOnlyKey}`;
    location.href = url;
}

function gotoLink(sender) {
    let url = sender.url.toLowerCase();
    //let loc = url.startsWith("http") ? sender.url : "https://" + sender.url;
    //location.href = loc;
    location.href = url;
}

function blankForm() {
    let form1 = global.Form1;
    form1.Action.value = "";
    form1.PageKey.value = "";
    form1.ObjectKey.value = "";
    form1.StringValue.value = "";
    form1.IntegerValue.value = "";
    return form1;
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

function controlsButton_onclick() {
    if (global.IsEditMode) return false;
    global.MenuContainer.style.display = (global.MenuContainer.style.display != "block") ? "block" : "none";
}