function playCard() {
    action = parseInt(sURLVariables[11].split('=')[1]);
    if (generic + action < 12) {
        alert("Not enough RS!");
        return;
    }
    if (action > 12) action -= 12;
    else {
        generic -= 12 - action;
        action = 0;
    }
    player = (parseInt(sURLVariables[9].split('=')[1]) -  1) % 2 + 1;
    state = sURLVariables[7].split('=')[1];
    rando = Math.random() * 30;
    if (rando > 26) {
        var num = 0;
        for (c = 0; c < 3; c++) {
            roll = Math.random() * 6 + 1 | 0;
            if (roll > num) num = roll;
        }
        alert("Frostbite\nSoldiers on mountain get frostbite and die. Smallest height in which frostbite occurs is determined by the highest number of 3 dice roll. (Roll was " + num + ")");
        var toDelete = frostBite(num);
        for (d = 0; d < 74; d++) {
            if (toDelete[d]) {
                state = state.substring(0, 5 * d) + '0' + state.substring(5 * d + 1, state.length);
                state = state.substring(0, 5 * d + 4) + '0' + state.substring(5 * d + 5, state.length);
            }
        }
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + state + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action);
    }
    else if (rando > 25) {
        alert("Plague\nAll farms become diseased and are destroyed");
        state = sURLVariables[7].split('=')[1];
        for (i = 0; i < 74; i++) {
            for (j = 1; j < 4; j++) {
                if (state.charAt(5 * i + j) == '2') {
                    state = state.substring(0 , 5 * i + j) + '0' + state.substring(5 * i + j + 1, state.length);
                }
            }
        }
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + state + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action);
    } 
    else if (rando > 20){
        wood = sURLVariables[4].split('=')[1];
        stone = sURLVariables[5].split('=')[1];
        iron = sURLVariables[6].split('=')[1];
        var resource = prompt("Year of plenty\nMax out one of your resources\nPlease enter the name of the resource you would like to max out");
        while (resource.toLowerCase() != "wood" && resource.toLowerCase() != "stone" && resource.toLowerCase() != "iron") {
            resource = prompt("Invalid entry!\nPlease enter the name of the resource you would like to max out");
            if (resource == null) alert("null");
        }
        if (resource.toLowerCase() === "wood") wood = 9;
        if (resource.toLowerCase() === "stone") stone = 9;
        if (resource.toLowerCase() === "iron") iron = 9;
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + wood + '&stone=' + stone + '&iron=' + iron + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action);
    } 
    else if (rando > 12) {
        alert("Recruitment Season\nGain 10 soldiers (max total soldiers including on board is 150 per player)");
        players = sURLVariables[10].split('=')[1];
        if (parseInt(players.substring(11 * (player - 1) + 3, 11 * (player - 1) + 6)) + soldiersOnBoard(player) > 140) insert = 150 - soldiersOnBoard((parseInt(sURLVariables[9].split('=')[1]) -  1) % 2 + 1);
        else insert = parseInt(players.substring(11 * (player - 1) + 3, 11 * (player - 1) + 6)) + 10;
        if (insert < 100) stringInsert = "0" + insert;
        else stringInsert = insert;
        players = players.substring(0, 11 * (player - 1) + 3) + stringInsert + players.substring(11 * (player - 1) + 6, players.length);
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + players + '&green=' + action);
    }
    else if (rando > 5) {
        alert("Universal Currency\nAll RS becomes Generic RS");
        generic += buy + build + advance + action;
        buy = 0;
        build = 0;
        advance = 0;
        action = 0;
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action);
    }
    else if (rando > 3) {
        alert("Enlightenment\nPlayer receives the cone of decision");
        players = sURLVariables[10].split('=')[1];
        players = players.substring(0, 11 * (player - 1) + 10) + '1' + players.substring(11 * (player - 1) + 11, players.length);
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + players + '&green=' + action);
    }
    else {
        alert("Dragon\nDragon spawns on a non-mountain hex that is the most civilized by an opponent. Civilization is destroyed on hex. Civilization cannot be built on hex where the dragon sits. Player cannot move through dragon space. If dragon is already on the board, it will move to a new space and new dragon will not be initialized.");
        index = largestCiv(player);
        state = sURLVariables[7].split('=')[1];
        for (e = 0; e < state.length; e++) {
            if (state.charAt(e) == '9') state = state.substring(0, e) + '0' + state.substring(e + 1, state.length);
        }
        state = state.substring(0, 5 * index) + "90000" + state.substring(5 * index + 5, state.length);
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + state + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action);
    }
}