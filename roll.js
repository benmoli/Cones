function preroll() {
    roll1 = (6 * Math.random() + 1) | 0;
    roll2 = (6 * Math.random() + 1) | 0;
    roll3 = (6 * Math.random() + 1) | 0;
    sum = roll1 + roll2 + roll3;
    if (sum > 10) smallDiceNum = 10;
    else smallDiceNum = sum;
    dropdown = '<select id = "small selection">';
    for (i = 0; i <= smallDiceNum; i++){
        dropdown += '<option value = "' + i + '">' + i + '</option>';
    }
    dropdown += '</select><button onClick = "smallDiceRoll(' + sum + ')">Roll!</button>';
    document.getElementById("preroll roll").innerHTML = roll1 + " + " + roll2 + " + " + roll3 + " = " + sum + " total dice";
    document.getElementById("preroll result").innerHTML = "roll up to " + smallDiceNum + " small dice"
    document.getElementById("small dice option").innerHTML = dropdown;
    play("brrrap.wav");
}
function smallDiceRoll(sum) {
    total = 0;
    display = "";
    for (i = 0; i < document.getElementById("small selection").options[document.getElementById("small selection").selectedIndex].value; i++){
        roll = (6 * Math.random() + 1) | 0;
        total += roll;
        display += roll;
        if (i != document.getElementById("small selection").options[document.getElementById("small selection").selectedIndex].value - 1)
            display += " + "
        else display += " =</br>" + total + " Generic RS";
    }
    document.getElementById("small dice roll").innerHTML = display;
    if (sum - document.getElementById("small selection").options[document.getElementById("small selection").selectedIndex].value > 6) specialDiceNum = 6;
    else specialDiceNum = sum - document.getElementById("small selection").options[document.getElementById("small selection").selectedIndex].value;
    dropdown = '<select id = "special selection">';
    for (i = 0; i <= specialDiceNum; i++){
        dropdown += '<option value = "' + i + '">' + i + '</option>';
    }
    dropdown += '</select><button onClick = "specialDiceRoll(' + total + ')">Roll!</button>';
    document.getElementById("special dice amount").innerHTML = "roll up to " + specialDiceNum + " special dice"
    document.getElementById("special dice option").innerHTML = dropdown;
    play("brrrap.wav");
}
function specialDiceRoll(genericRS) {
    red = 0;
    blue = 0;
    green = 0;
    yellow = 0;
    count = document.getElementById("special selection").options[document.getElementById("special selection").selectedIndex].value
    for (i = 0; i < count; i++){
        roll = (4 * Math.random() + 1) | 0;
        if (roll == 1) red++;
        if (roll == 2) blue++;
        if (roll == 3) green++;
        if (roll == 4) yellow++;
    }
    document.getElementById("yellow").innerHTML = yellow + " yellow = " + 5 * yellow + " Buy RS";
    document.getElementById("red").innerHTML = red + " red = " + 5 * red + " Build RS";
    document.getElementById("blue").innerHTML = blue + " blue = " + 5 * blue + " Advance RS";
    document.getElementById("green").innerHTML = green + " green = " + 5 * green + " Action RS";
    GRS = genericRS;
    player = (parseInt(sURLVariables[2].split('=')[1]) - 1) % (sURLVariables[3].split('=')[1].length / 11) + 1;
    players = sURLVariables[3].split('=')[1];
    if (checkMountain(player)) {
        for (d = 0; d < players.length / 11; d++) {
            if (player == d - 1) insert = '1';
            else insert = '0';
            players = players.substring(0, 11 * d + 10) + insert + players.substring(11 * d + 11, players.length);
        }
    }
    players = players.substring(0, 11 * (player - 1)) + wood + stone + iron + players.substring(11 * (player - 1) + 3, players.length);
    if (sURLVariables[4].split('=')[1] === "true" && sURLVariables[3].split('=')[1].charAt(11 * player - 1) == '1') {
        GRS *= 2;
        yellow *= 2;
        red *= 2;
        blue *= 2;
        green *= 2;
    }
    document.getElementById("continue").innerHTML = '<a href = "buy.html?GRS=' + GRS + '&yellow=' + 5 * yellow + '&red=' + 5 * red + '&blue=' + 5 * blue + '&board=' + sURLVariables[0].split('=')[1] + '&space=-1&turn=' + sURLVariables[2].split('=')[1] + '&players=' + players + '&green=' + 5 * green + "&required=" + sURLVariables[4].split('=')[1] + "&civNum=" + sURLVariables[5].split('=')[1] + '">Continue</a>';
    play("brrrap.wav");
}
