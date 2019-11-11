var c = document.getElementById("myCanvas");
if (window.location.pathname.split("/").pop() === "roll.html") currentSpace = parseInt(sURLVariables[1].split('=')[1]);
else if (window.location.pathname.split("/").pop() === "buy.html") currentSpace = parseInt(sURLVariables[5].split('=')[1]);
else if (window.location.pathname.split("/").pop() === "build.html") currentSpace = parseInt(sURLVariables[8].split('=')[1]);
else if (window.location.pathname.split("/").pop() === "advance.html") currentSpace = parseInt(sURLVariables[8].split('=')[1]);
selected = -1;
myCanvas.addEventListener('click', function(e) {
    var rect = myCanvas.getBoundingClientRect();
    var x = e.pageX - .375 * self.innerWidth;
    var y = e.pageY - 45;
    for (i = 0; i < spaces.length; i++) {
        if (!(spaces[i].color === "white")) {
            if (x > spaces[i].xcoordinates[0] && x < spaces[i].xcoordinates[5] && y > spaces[i].ycoordinates[0] && y < spaces[i].ycoordinates[2]) {
                window.location.replace(window.location.pathname.split("/").pop() + '?GRS=' + sURLVariables[0].split('=')[1] + '&yellow=' + sURLVariables[1].split('=')[1] + '&red=' + sURLVariables[2].split('=')[1] + '&blue=' + sURLVariables[3].split('=')[1] + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1]+ '&board=' + sURLVariables[7].split('=')[1] + '&space=' + i);
            }
        }
    }
    // alert(rect.right - rect.left + ", " + rect.top - rect.bottom);
    //alert(x + ", " + y);
});
var colors = [ "green", "blue", "red", "blue",
    "blue", "red", "yellow", "green", "yellow", "blue",
    "yellow", "green", "black", "red", "black", "red", "yellow", "red",
    "red", "black", "blue", "yellow", "green", "blue", "green", "blue", "green",
    "yellow", "green", "red", "white", "black", "grey", "red", "black", "yellow", "blue",
    "blue", "yellow", "black", "red", "grey", "black", "white", "red", "green", "yellow",
    "green", "blue", "green", "blue", "green", "yellow", "blue", "black", "red",
        "red", "yellow", "red", "black", "red", "black", "green", "yellow",
        "blue", "yellow", "green", "yellow", "red", "blue",
        "blue", "red", "blue", "green"];
spaces = [];
index = 0;
root = window.location.pathname.split("/").pop();
if (root === "roll.html") var boardState = sURLVariables[0].split('=')[1];
else if (root === "buy.html") var boardState = sURLVariables[4].split('=')[1];
else var boardState = sURLVariables[7].split('=')[1];
draw();
function draw(){
    for (j = 0; j < 10; j++) {
        row = 0;
        for (i = 0; i < 11; i++) {
            if ((i > 3 && j == 0) || (i > 5 && j == 1) || (i > 7 && j == 2) || (i > 8 && j == 3) || (i > 9 && j == 4)
                || (i < 7 && j == 9) || (i < 5 && j == 8) || (i < 3 && j == 7) || (i < 2 && j == 6) || (i < 1 && j == 5))
                continue;
            //if (index == 30 || index == 42) i++;
            //ctx.lineWidth = 10;
            spaceState = boardState.substring(index * 5, index * 5 + 5);
            player = spaceState[0];
            building1 = setBuilding(spaceState[1]);
            building2 = setBuilding(spaceState[2]);
            building3 = setBuilding(spaceState[3]);
            soldiers = spaceState[4];
            height = 0;
            if (index == 20 || index == 23 || index == 50 || index == 53) height = 1;
            else if (index == 21 || index == 22 || index == 51 || index == 52) height = 2;
            else if (index == 31 || index == 42) height = 3;
            else if (index == 33 || index == 40) height = 4;
            else if (index == 32 || index == 41) height = 5;
            // else {
            //     index++;
            //     continue;
            // }
            spaces[index] = new Space(index, i, j, height, colors[index], player, building1, building2, building3, soldiers);
            index++;
            row++;           
        }
    }
}
if (currentSpace != -1) select(currentSpace);
function select(i) {
    if (window.location.pathname.split("/").pop() === "build.html") {
        if (selected == -1) {
            spaces[i].select();
            selected = i;
            spaces[i].buildMenu();                
        }
        else if (selected == i) window.location.reload(true);
    }
    else if (window.location.pathname.split("/").pop() === "advance.html" && spaces[i].soldiers > 0) {
        soldierMenu = '<p>Select number of soldiers to move <select id = "selecta">';
        //soldierMenu += '<option>' + sURLVariables[7].split('=')[1].charAt(5 * i + 4);
        for (j = parseInt(sURLVariables[7].split('=')[1].charAt(5 * i + 4)); j > 0; j--) {
            soldierMenu += '<option>' + j + '</option>'
        }
        soldierMenu += '</select></p>';
        document.getElementById("soldier-amount").innerHTML = soldierMenu;
        badKey = false;
        if (selected == -1) {
            spaces[i].select();
            selected = i;
            document.body.addEventListener("keyup", function(event) {
                nextI = spaces[i].i;
                nextJ = spaces[i].j;
                if (event.key == "q"){nextI--; nextJ--;}
                else if (event.key == "w"){nextJ--;}
                else if (event.key == "e"){nextI++;}
                else if (event.key == "a"){nextI--;}
                else if (event.key == "s"){nextJ++;}
                else if (event.key == "d"){nextI++; nextJ++;}
                else badKey = true;
                if (!badKey) {
                    toMove = document.getElementById("selecta").options[document.getElementById("selecta").selectedIndex].value;
                    for (asdf = 0; asdf < spaces.length; asdf++) {
                        if (spaces[asdf].i == nextI && spaces[asdf].j == nextJ && spaces[asdf].color != "white") {
                            if (spaces[asdf].height != 0) alert("This part of the advance phase does not involve advancement on the mountain");
                            else {
                                next = parseInt(sURLVariables[7].split('=')[1].charAt(5 * asdf + 4));
                                prev = parseInt(sURLVariables[7].split('=')[1].charAt(5 * i + 4));
                                array = moveSoldiers(prev, next, parseInt(toMove));
                                prev = array[0]; next = array[1]; moved = array[2];
                                state = sURLVariables[7].split('=')[1].substring(0, 5 * asdf + 4) + next + sURLVariables[7].split('=')[1].substring(5 * asdf + 5, sURLVariables[7].split('=')[1].length);
                                state = state.substring(0, 5 * i + 4) + prev + state.substring(5 * i + 5, state.length);
                                advRS = parseInt(sURLVariables[3].split('=')[1]);
                                GRS = parseInt(sURLVariables[0].split('=')[1]);
                                if (advRS >= moved) advRS -= moved;
                                else if (advRS + GRS >= moved){
                                    GRS = GRS - moved + advRS;
                                    advRS = 0;
                                }
                                else {
                                    alert("Not enough RS");
                                    return;
                                }
                                goTo = 'advance.html?GRS=' + GRS + '&yellow=' + sURLVariables[1].split('=')[1] + '&red=' + sURLVariables[2].split('=')[1] + '&blue=' + advRS + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1]+ '&board=' + state + '&space=' + asdf;
                                window.location.replace(goTo);
                            } 
                        }
                    }
                }
            });         
        }
        else if (selected == i) window.location.reload(true);
    }
}
function setBuilding(building) {
    if (building == 0) return "none";
    if (building == 1) return "barracks";
    if (building == 2) return "farm";
    if (building == 3) return "fort";
    if (building == 4) return "indcor";
    if (building == 5) return "comcor";
    if (building == 6) return "transhub";
}
function moveSoldiers(prev, next, moving) {
    moved = 0;
    rtrn = [];
    while (moving > 0 && next < 5) {
        next++;
        prev--;
        moving--;
        moved++;
    }
    rtrn[0] = prev;
    rtrn[1] = next;

    rtrn[2] = moved;
    return rtrn;
}
function initSoldiers(num, spaceIndex) {
    if (num > 5 - spaces[spaceIndex].soldiers){
        alert("Too many soldiers on start space");
        return;
    }
    grs = parseInt(sURLVariables[0].split('=')[1]);
    ars = parseInt(sURLVariables[3].split('=')[1]);
    total = grs + ars;
    if (num > total) alert("Not enough RS");
    else if (num <= ars) ars -= num;
    else {
        grs = grs - num + ars;
    }
    initNum = parseInt(num) + parseInt(spaces[spaceIndex].soldiers);
    window.location.replace('advance.html?GRS=' + grs + '&yellow=' + sURLVariables[1].split('=')[1] + '&red=' + sURLVariables[2].split('=')[1] + '&blue=' + ars + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1]+ '&board=' + sURLVariables[7].split('=')[1].substring(0, 5 * spaceIndex + 4) + initNum + sURLVariables[7].split('=')[1].substring(5 * spaceIndex + 5, sURLVariables[7].split('=')[1].length) + '&space=' + sURLVariables[8].split('=')[1]);
}