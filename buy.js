function doit(generic, buy, build, advance, wood, stone, iron, cWood, cStone, cIron) {
    woodnum = parseInt(document.getElementById("wood selection").options[document.getElementById("wood selection").selectedIndex].value);
    stonenum = parseInt(document.getElementById("stone selection").options[document.getElementById("stone selection").selectedIndex].value);
    ironnum = parseInt(document.getElementById("iron selection").options[document.getElementById("iron selection").selectedIndex].value);
    total = wood * woodnum + stone * stonenum + iron * ironnum;
    if (generic + buy < total) alert("This requires " + total + " RS. You do not have enough RS");
    else {
        if (buy < total) {
            tmp = buy;
            buy = 0;
            generic = generic - (total - tmp);
        }
        else buy -= total;
        woodnum += cWood;
        stonenum += cStone;
        ironnum += cIron;
        if (woodnum > 9 || stonenum > 9 || ironnum > 9) {
            alert(stonenum);
            return;
        }
        window.location.replace('build.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + woodnum + '&stone=' + stonenum + '&iron=' + ironnum + '&board=' + sURLVariables[4].split('=')[1] + '&space=-1&turn=' + sURLVariables[6].split('=')[1] + '&players=' + sURLVariables[7].split('=')[1]);
    }
}