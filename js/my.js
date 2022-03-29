
class WindowControl {
    constructor(windowLetter, zLayer) {
        this.windowElement = document.getElementById('window' + windowLetter);
        this.zLayer = zLayer;
        this.windowElement.style.zIndex = zLayer;
        this.topNumber = 0;
        this.leftNumber = 0;
    }
    toggleShowHide() {
        this.windowElement.classList.toggle('hideWindow');
    }
    updateZindex() {
        this.windowElement.style.zIndex = this.zLayer;
    }
    updatePos(diffY, diffX) {
        this.topNumber += diffY;
        this.leftNumber += diffX;
        this.windowElement.style.top = this.topNumber + "px";
        this.windowElement.style.left = this.leftNumber + "px";
    }
}

const windowA = new WindowControl("A", 1);
const windowB = new WindowControl("B", 2);
const windowC = new WindowControl("C", 3);
const windowDragPos = {
    startPosY: 0,
    startPosX: 0,
    elementToMove: null
}

function moveWindowToTop(event) {
    switch (event.target) {
        case windowA.windowElement:
            windowA.zLayer = 3;
            if (windowB.zLayer > windowC.zLayer) {
                windowB.zLayer = 2;
                windowC.zLayer = 1;
            } else {
                windowB.zLayer = 1;
                windowC.zLayer = 2;
            }
            break;
        case windowB.windowElement:
            windowB.zLayer = 3;
            if (windowA.zLayer > windowC.zLayer) {
                windowA.zLayer = 2;
                windowC.zLayer = 1;
            } else {
                windowA.zLayer = 1;
                windowC.zLayer = 2;
            }
            break;
        case windowC.windowElement:
            windowC.zLayer = 3;
            if (windowB.zLayer > windowA.zLayer) {
                windowB.zLayer = 2;
                windowA.zLayer = 1;
            } else {
                windowB.zLayer = 1;
                windowA.zLayer = 2;
            }
            break;
    }
    windowA.updateZindex();
    windowB.updateZindex();
    windowC.updateZindex();
}

function dragStart(event) {
    //console.log("start Y:", event.y);
    //console.log("start X:", event.x);

    windowDragPos.startPosY = event.y;
    windowDragPos.startPosX = event.x;
    windowDragPos.elementToMove = event.target;

    event.dataTransfer.dropEffect = "move";
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    console.log(event);
    event.preventDefault();
    /*console.log("end Y:", event.y);
    console.log("end X:", event.x);
    console.log("diff Y:", (event.y - windowDragPos.startPosY));
    console.log("diff X:", (event.x - windowDragPos.startPosX));*/
    switch (windowDragPos.elementToMove) {
        case windowA.windowElement:
            windowA.updatePos((event.y - windowDragPos.startPosY), (event.x - windowDragPos.startPosX));
            break;
        case windowB.windowElement:
            windowB.updatePos((event.y - windowDragPos.startPosY), (event.x - windowDragPos.startPosX));
            break;
        case windowC.windowElement:
            windowC.updatePos((event.y - windowDragPos.startPosY), (event.x - windowDragPos.startPosX));
            break;
    }
}

document.getElementsByTagName('main')[0].addEventListener("dragover", allowDrop);
document.getElementsByTagName('main')[0].addEventListener("drop", drop);

windowA.windowElement.addEventListener("click", moveWindowToTop);
windowB.windowElement.addEventListener("click", moveWindowToTop);
windowC.windowElement.addEventListener("click", moveWindowToTop);

windowA.windowElement.addEventListener("dragstart", dragStart);
windowB.windowElement.addEventListener("dragstart", dragStart);
windowC.windowElement.addEventListener("dragstart", dragStart);


document.getElementById("btn-a").addEventListener("click", () => windowA.toggleShowHide());
document.getElementById("btn-b").addEventListener("click", () => windowB.toggleShowHide());
document.getElementById("btn-c").addEventListener("click", () => windowC.toggleShowHide());

