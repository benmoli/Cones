var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Space {
    index; i; j; height; color; xcoordinates = []; ycoordinates = []; building1; building2; building3; prefix;
    constructor(index, row, col, height, color, player, building1, building2, building3, soldiers) {
        this.player = player;
        this.prefix = "p" + this.player;
        this.soldiers = soldiers;
        this.building1 = building1;
        this.building2 = building2;
        this.building3 = building3;
        this.index = index;
        this.i = row;
        this.j = col;
        this.height = height;
        this.color = color;
        this.xcoordinates[0] = (14 + 30 * i) * 1.9;
        this.ycoordinates[0] = (21 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 35;
        this.xcoordinates[1] = (4 + 30 * i) * 1.9;
        this.ycoordinates[1] = (31 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 35;
        this.xcoordinates[2] = (14 + 30 * i) * 1.9;
        this.ycoordinates[2] = (41 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 35;
        this.xcoordinates[3] = (34 + 30 * i) * 1.9;
        this.ycoordinates[3] = (41 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 35;
        this.xcoordinates[4] = (44 + 30 * i) * 1.9;
        this.ycoordinates[4] = (31 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 35;
        this.xcoordinates[5] = (34 + 30 * i) * 1.9;
        this.ycoordinates[5] = (21 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 35;
        //alert(this.xcoordinates[0]);
        this.makePath();
        this.draw();
    }
    makePath(){
        ctx.beginPath();
        ctx.moveTo(this.xcoordinates[0], this.ycoordinates[0]);
        ctx.lineTo(this.xcoordinates[1], this.ycoordinates[1]);
        ctx.lineTo(this.xcoordinates[2], this.ycoordinates[2]);
        ctx.lineTo(this.xcoordinates[3], this.ycoordinates[3]);
        ctx.lineTo(this.xcoordinates[4], this.ycoordinates[4]);
        ctx.lineTo(this.xcoordinates[5], this.ycoordinates[5]);
        ctx.lineTo(this.xcoordinates[0], this.ycoordinates[0]);
        ctx.closePath();
    }
    draw(){
        if (!(this.color === "white")){
            ctx.fillStyle = this.color;
            ctx.fill();
            if (this.color === "yellow") ctx.fillStyle = "black";
            else ctx.fillStyle = "white";
            if (player > 0 && player != 9) ctx.fillText("P" + this.player, (14 + 30 * i) * 1.9 + 4, (21 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 50);
            if (height > 0) ctx.fillText("height " + height, (14 + 30 * i) * 1.9, (21 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 95);
            ctx.fillText(index, (14 + 30 * i) * 1.9 - 7, (21 - 10 * i + 20 * j) * Math.sqrt(3) * 1.9 + 66);
            if (this.player == 9) {
                this.drawDragon(this.xcoordinates[0], this.ycoordinates[0]);
            }
            else {
                this.drawBuilding(this.building1, 1, this.xcoordinates[0], this.ycoordinates[0]);
                this.drawBuilding(this.building2, 2, this.xcoordinates[0], this.ycoordinates[0]);
                this.drawBuilding(this.building3, 3, this.xcoordinates[0], this.ycoordinates[0]);
                this.drawSoldiers(this.soldiers, this.xcoordinates[0], this.ycoordinates[0]);
            }
        }
        ctx.stroke();
    }
    select(){
        this.makePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "orange"; 
        ctx.stroke();
    }
    drawInit(){
        this.makePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#FFBBBB"; 
        ctx.stroke();
    }
    buildMenu() {
        if (this.color === "black" || this.color === "grey") {
            alert("Cannot build on black spaces or mountain");
            window.location.href = ('build.html?GRS=' + generic + '&yellow=' + buy + '&red=' + build + '&blue=' + advance + '&wood=' + woodnum + '&stone=' + stonenum + '&iron=' + ironnum + '&board=' + sURLVariables[4].split('=')[1] + '&space=-1');
        }
        var building1String = '<p>Building 1: ' + this.building1;
        var building2String = '<p>Building 2: ' + this.building2;
        var building3String = '<p>Building 3: ' + this.building3;
        if (this.building1 !== "indcor") building1String += '<button onClick = "upgradeBuilding(&quot;' + this.building1 + '&quot;, ' + this.index + ', 1)">^</button>';
        building1String += '</p>';
        if (this.building2 !== "indcor") building2String += '<button onClick = "upgradeBuilding(&quot;' + this.building2 + '&quot;, ' + this.index + ', 2)">^</button>';
        building2String += '</p>';
        if (this.building3 !== "indcor") building3String += '<button onClick = "upgradeBuilding(&quot;' + this.building3 + '&quot;, ' + this.index + ', 3)">^</button>';
        building3String += '</p>';
        document.getElementById("building1").innerHTML = building1String;
        document.getElementById("building2").innerHTML = building2String;
        document.getElementById("building3").innerHTML = building3String;
    }
    drawBuilding(building, num, x, y) {
        var base_image = new Image(5, 5);
        if (building === "none") return;
        if (building === "barracks") base_image.src = this.prefix + 'barracks.png';
        if (building === "farm") base_image.src = this.prefix + 'farm.png';
        if (building === "fort") {
            base_image.src = this.prefix + 'fort.png';
            y += 5;
        }
        if (building === "indcor") {
            base_image.src = this.prefix + 'indcor.png';
            y += 7;
        }
        if (building === "comcor") {
            base_image.src = this.prefix + 'comcor.png';
            y += 7;
        }
        if (building === "transhub") base_image.src = this.prefix + 'transhub.png';
        base_image.onload = function(){
            ctx.drawImage(base_image, x - 30 + 20 * num, y + 35);
        }
    }
    drawSoldiers(num, x, y) {
        if (num == 0) return;
        var base_image = new Image(5, 5);
        base_image.src = this.prefix + 'soldier.png';
        base_image.onload = function(){
            ctx.drawImage(base_image, x + 20, y + 1);
        }
        ctx.fillText(num, x + 44, y + 32);
    }
    drawDragon(x, y) {
        var base_image = new Image(5, 5);
        base_image.src = 'dragon.png';
        base_image.onload = function(){
            ctx.drawImage(base_image, x - 5, y + 5);
        }
    }
}
function upgradeBuilding(building, index, num) {
    wood = parseInt(sURLVariables[4].split('=')[1]);
    stone = parseInt(sURLVariables[5].split('=')[1]);
    iron = parseInt(sURLVariables[6].split('=')[1]);
    rs = parseInt(sURLVariables[0].split('=')[1]);
    buildRs = parseInt(sURLVariables[2].split('=')[1]);
    if (challenge) buildRs += 5;
    totalRs = rs + buildRs;
    //barracks
    if (wood >= 1 && stone >= 1 && iron >= 2 && totalRs >= 15 && building === "none"){
        if (buildRs >= 15) buildRs -= 15;
        else {
            rs -= (15 - buildRs);
            buildRs = 0;
        }
        wood--;
        stone--;
        iron -= 2;
        window.location.href = ("build.html?GRS=" + rs + "&yellow=" + sURLVariables[1].split('=')[1] + "&red=" + buildRs + "&blue=" + sURLVariables[3].split('=')[1] + "&wood=" + wood + "&stone=" + stone + "&iron=" + iron + "&board=" + boardState.substring(0, 5 * index + num) + "1" + boardState.substring(5 * index + num + 1, boardState.length) + "&space=" + index + '&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + sURLVariables[11].split('=')[1]);
    }
    //farm
    else if (wood >= 2 && stone >= 1 && totalRs >= 10 && building === "barracks"){
        if (buildRs >= 10) buildRs -= 10;
        else {
            rs -= (10 - buildRs);
            buildRs = 0;
        }
        wood -= 2;
        stone--;
        window.location.href = ("build.html?GRS=" + rs + "&yellow=" + sURLVariables[1].split('=')[1] + "&red=" + buildRs + "&blue=" + sURLVariables[3].split('=')[1] + "&wood=" + wood + "&stone=" + stone + "&iron=" + iron + "&board=" + boardState.substring(0, 5 * index + num) + "2" + boardState.substring(5 * index + num + 1, boardState.length) + "&space=" + index + '&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1] + '&green=' + sURLVariables[11].split('=')[1]);
    }
    //fort
    else if (wood >= 1 && stone >= 3 && totalRs >= 15 && building === "farm"){
        if (buildRs >= 15) buildRs -= 15;
        else {
            rs -= (15 - buildRs);
            buildRs = 0;
        }
        wood--;
        stone -= 3;
        window.location.href = ("build.html?GRS=" + rs + "&yellow=" + sURLVariables[1].split('=')[1] + "&red=" + buildRs + "&blue=" + sURLVariables[3].split('=')[1] + "&wood=" + wood + "&stone=" + stone + "&iron=" + iron + "&board=" + boardState.substring(0, 5 * index + num) + "3" + boardState.substring(5 * index + num + 1, boardState.length) + "&space=" + index + '&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1]) + '&green=' + sURLVariables[11].split('=')[1];
    }
    // //ind corr
    // else if (wood >= 1 && stone >= 2 && iron >= 1 && totalRs >= 15 && building === "fort"){
    //     if (buildRs >= 15) buildRs -= 15;
    //     else {
    //         rs -= (15 - buildRs);
    //         buildRs = 0;
    //     }
    //     wood--;
    //     stone -= 2;
    //     iron--;
    //     window.location.href = ("build.html?GRS=" + rs + "&yellow=" + sURLVariables[1].split('=')[1] + "&red=" + buildRs + "&blue=" + sURLVariables[3].split('=')[1] + "&wood=" + wood + "&stone=" + stone + "&iron=" + iron + "&board=" + boardState.substring(0, 5 * index + num) + "4" + boardState.substring(5 * index + num + 1, boardState.length) + "&space=" + index + '&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1]);
    // }
    // //com corr
    // else if (wood >= 3 && iron >= 1 && totalRs >= 15 && building === "indcor"){
    //     if (buildRs >= 15) buildRs -= 15;
    //     else {
    //         rs -= (15 - buildRs);
    //         buildRs = 0;
    //     }
    //     wood -= 3;
    //     iron--;
    //     window.location.href = ("build.html?GRS=" + rs + "&yellow=" + sURLVariables[1].split('=')[1] + "&red=" + buildRs + "&blue=" + sURLVariables[3].split('=')[1] + "&wood=" + wood + "&stone=" + stone + "&iron=" + iron + "&board=" + boardState.substring(0, 5 * index + num) + "5" + boardState.substring(5 * index + num + 1, boardState.length) + "&space=" + index + '&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1]);
    // }
    // //trans hub
    else if (wood >= 1 && iron >= 1 && totalRs >= 10 && building === "fort"){
        if (buildRs >= 10) buildRs -= 10;
        else {
            rs -= (10 - buildRs);
            buildRs = 0;
        }
        wood--;
        iron--;
        window.location.href = ("build.html?GRS=" + rs + "&yellow=" + sURLVariables[1].split('=')[1] + "&red=" + buildRs + "&blue=" + sURLVariables[3].split('=')[1] + "&wood=" + wood + "&stone=" + stone + "&iron=" + iron + "&board=" + boardState.substring(0, 5 * index + num) + "4" + boardState.substring(5 * index + num + 1, boardState.length) + "&space=" + index + '&turn=' + sURLVariables[9].split('=')[1] + '&players=' + sURLVariables[10].split('=')[1]) + '&green=' + sURLVariables[11].split('=')[1];
    }
    // else if (building === "transhub") alert("Cannot upgrade further");
    else alert("Not enough RS or Resources");
}