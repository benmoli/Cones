function placeBuilding(){
    var toBuild = document.getElementById("options").options[document.getElementById("options").selectedIndex].value;
    window.location.replace('build.html?GRS=' + rgrs + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + rwood + '&stone=' + rstone + '&iron=' + riron);
}