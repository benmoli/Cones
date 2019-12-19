function coneDivs(num) {
    conesDiv = ""
    if (sURLVariables[num + 1].split('=')[1].charAt( 11 * ((parseInt(sURLVariables[num].split('=')[1]) -  1) % (sURLVariables[num + 1].split('=')[1].length / 11)) + 6) != '0')
        conesDiv += '<img src = "green-cone.png" />';
    if (sURLVariables[num + 1].split('=')[1].charAt( 11 * ((parseInt(sURLVariables[num].split('=')[1]) -  1) % (sURLVariables[num + 1].split('=')[1].length / 11)) + 7) != '0')
        conesDiv += '<img src = "red-cone.png" />';
    if (sURLVariables[num + 1].split('=')[1].charAt( 11 * ((parseInt(sURLVariables[num].split('=')[1]) -  1) % (sURLVariables[num + 1].split('=')[1].length / 11)) + 8) != '0')
        conesDiv += '<img src = "yellow-cone.png" />';
    if (sURLVariables[num + 1].split('=')[1].charAt( 11 * ((parseInt(sURLVariables[num].split('=')[1]) -  1) % (sURLVariables[num + 1].split('=')[1].length / 11)) + 9) != '0')
        conesDiv += '<img src = "blue-cone.png" />';
    if (sURLVariables[num + 1].split('=')[1].charAt( 11 * ((parseInt(sURLVariables[num].split('=')[1]) -  1) % (sURLVariables[num + 1].split('=')[1].length / 11)) + 10) == '1')
        conesDiv += '<img src = "decision-cone.png" />';
    return conesDiv;
}