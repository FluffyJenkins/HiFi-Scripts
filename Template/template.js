// Template created by FluffyJenkins 26/08/2018
var ROOT = Script.resolvePath('').split("template.js")[0];

var icon = ROOT + "template.svg";
var appHTML = ROOT + "template.html";
var appUUID = Uuid.generate();

var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
    icon: icon,
    text: "TEMPLATE"
});

Script.scriptEnding.connect(function () { // So if anything errors out the tablet/toolbar button gets removed!
    tablet.removeButton(button);
});

var isOpen = false;

function onClicked() {
    if (isOpen) {
        tablet.gotoHomeScreen();
    } else {
        tablet.gotoWebScreen(appHTML + "?appUUID=" + appUUID, {});
    }
}

function onScreenChanged(type, url) {
    isOpen = (url === appHTML);
}

button.clicked.connect(onClicked);
tablet.screenChanged.connect(onScreenChanged);

function init() {
    try {
        tablet.webEventReceived.connect(onWebEventReceived);
    } catch (e) {
        print("connectWebHandler: error connecting: " + e);
    }
}

function emitScriptEvent(obj) {
    obj.appUUID = appUUID;
    tablet.emitScriptEvent(JSON.stringify(obj));
}

function onWebEventReceived(event) {
    event = JSON.parse(event);
    if (event.appUUID === appUUID) {
        if (event.type === "ready") {
            // Do stuff when ready is received!
        }
        if (event.type === "PING") {
            Window.alert("Ping from interface!");
            emitScriptEvent({type: "PONG"});
        }
    }
}

function shutdown() {
    try {
        tablet.webEventReceived.disconnect(onWebEventReceived);
    } catch (e) {
        print("disconnectWebHandler: error disconnecting web handler: " + e);
    }
    button.clicked.disconnect(onClicked);
    tablet.screenChanged.disconnect(onScreenChanged);
}

init();

Script.scriptEnding.connect(shutdown);
