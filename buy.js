function doit(generic, buy, build, advance, wood, stone, iron) {
    woodnum = document.getElementById("wood selection").options[document.getElementById("wood selection").selectedIndex].value;
    stonenum = document.getElementById("stone selection").options[document.getElementById("stone selection").selectedIndex].value;
    ironnum = document.getElementById("iron selection").options[document.getElementById("iron selection").selectedIndex].value;
    total = wood * woodnum + stone * stonenum + iron * ironnum;
    if (generic + buy < total) alert("This requires " + total + " RS. You do not have enough RS");
    else {
        if (buy < total) {
            tmp = buy;
            buy = 0;
            generic = generic - (total - tmp);
        }
        else buy -= total;
        window.location.replace('build.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + woodnum + '&stone=' + stonenum + '&iron=' + ironnum + '&board=' + sURLVariables[4].split('=')[1] + '&space=-1');
    }
}