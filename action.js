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
    player = (parseInt(sURLVariables[9].split('=')[1]) -  1) % (sURLVariables[10].split('=')[1].length / 11) + 1;
    if (sURLVariables[10].split('=')[1].charAt( 11 * (player - 1) + 6) == '2') challenge = true;
    else challenge = false;
    state = sURLVariables[7].split('=')[1];
    if (challenge){
         rando = Math.random() * 40;
        // alert("Changing odds...");
    }
    else rando = Math.random() * 40;
    if ((!challenge && rando > 26) || (challenge && rando > 33)) {
        var num = 0;
        for (c = 0; c < 3; c++) {
            roll = Math.random() * 6 + 1 | 0;
            if (roll > num) num = roll;
        }
        alert("Frostbite\nSoldiers on top of mountain get frostbite and die.");
        if (state.length < 150) {
            state = state.substring(0, 5 * 11) + '0' + state.substring(5 * 11 + 1, state.length);
            state = state.substring(0, 5 * 11 + 4) + '0' + state.substring(5 * 11 + 5, state.length);
        }
        else {
            state = state.substring(0, 5 * 32) + '0' + state.substring(5 * 32 + 1, state.length);
            state = state.substring(0, 5 * 32 + 4) + '0' + state.substring(5 * 32 + 5, state.length);
            state = state.substring(0, 5 * 41) + '0' + state.substring(5 * 41 + 1, state.length);
            state = state.substring(0, 5 * 41 + 4) + '0' + state.substring(5 * 41 + 5, state.length);
        }
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + state + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action + "&required=" + sURLVariables[12].split('=')[1] + "&civNum=" + sURLVariables[13].split('=')[1]);
    }
    else if ((!challenge && rando > 25) || (challenge && rando > 31)) {
        alert("Plague\nSome farms may be diseased and are destroyed");
        state = sURLVariables[7].split('=')[1];
        for (i = 0; i < 74; i++) {
            for (j = 1; j < 4; j++) {
                if (state.charAt(5 * i + j) == '2' && Math.random() < 0.3) {
                    state = state.substring(0 , 5 * i + j) + '0' + state.substring(5 * i + j + 1, state.length);
                }
            }
        }
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + state + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action + "&required=" + sURLVariables[12].split('=')[1] + "&civNum=" + sURLVariables[13].split('=')[1]);
    } 
    else if ((!challenge && rando > 20) || (challenge && rando > 24)){
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
    else if ((!challenge && rando > 12) || (challenge && rando > 16)) {
        max = 160 / (sURLVariables[10].split('=')[1].length / 11);
        if (sURLVariables[10].split('=')[1].length / 5 < 30) max /= 2;
        alert("Recruitment Season\nGain 5 soldiers (max total soldiers including on board is " + max + " per player)");
        players = sURLVariables[10].split('=')[1];
        if (parseInt(players.substring(11 * (player - 1) + 3, 11 * (player - 1) + 6)) + soldiersOnBoard(player) > max - 5) insert = 80 / (sURLVariables[10].split('=')[1].length / 11) - soldiersOnBoard((parseInt(sURLVariables[9].split('=')[1]) -  1) % (sURLVariables[10].split('=')[1].length / 11) + 1);
        else insert = parseInt(players.substring(11 * (player - 1) + 3, 11 * (player - 1) + 6)) + 5;
        if (insert < 100) stringInsert = "0" + insert;
        else stringInsert = insert;
        players = players.substring(0, 11 * (player - 1) + 3) + stringInsert + players.substring(11 * (player - 1) + 6, players.length);
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + players + '&green=' + action + "&required=" + sURLVariables[12].split('=')[1] + "&civNum=" + sURLVariables[13].split('=')[1]);
    }
    else if ((!challenge && rando > 5) || (challenge && rando > 9)) {
        alert("Universal Currency\nAll RS becomes Generic RS");
        generic += buy + build + advance + action;
        buy = 0;
        build = 0;
        advance = 0;
        action = 0;
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action + "&required=" + sURLVariables[12].split('=')[1] + "&civNum=" + sURLVariables[13].split('=')[1]);
    }
    else if ((!challenge && rando > 3) || (challenge && rando > 6)) {
        alert("Decision\nPlayer receives the cone of decision. Other player loses cone of decision immediately");
        otherPlayer = 2;
        if (player == 2) otherPlayer = 1;
        for (d = 0; d < players.length / 11; d++) {
            if (player == d - 1) insert = '1';
            else insert = '0';
            players = players.substring(0, 11 * d + 10) + insert + players.substring(11 * d + 11, players.length);
        }
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + sURLVariables[7].split('=')[1] + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + players + '&green=' + action + "&required=" + sURLVariables[12].split('=')[1] + "&civNum=" + sURLVariables[13].split('=')[1]);
    }
    else {
        alert("Dragon\nDragon spawns on a non-mountain hex that is civilized by an opponent. Civilization is destroyed on hex. Civilization cannot be built on hex where the dragon sits. Player cannot move through dragon space. If dragon is already on the board, it will move to a new space and new dragon will not be initialized.");
        index = randomCiv(player);
        if (index == -1) return;
        state = sURLVariables[7].split('=')[1];
        for (e = 0; e < state.length; e++) {
            if (state.charAt(e) == '9') state = state.substring(0, e) + '0' + state.substring(e + 1, state.length);
        }
        state = state.substring(0, 5 * index) + "90000" + state.substring(5 * index + 5, state.length);
        window.location.href = ('action.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + sURLVariables[4].split('=')[1] + '&stone=' + sURLVariables[5].split('=')[1] + '&iron=' + sURLVariables[6].split('=')[1] + '&board=' + state + '&space=-1&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + action + "&required=" + sURLVariables[12].split('=')[1] + "&civNum=" + sURLVariables[13].split('=')[1]);
    }
}