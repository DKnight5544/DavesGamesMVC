
function begin() {
}

function addUser(sponsorName) {
    let inp = document.getElementById("UserNameInput");
    let userName = inp.value;
    if (userName != "") {
        window.location.href = "/org/add|" + userName + "|" + sponsorName;
    }
}