
//-arrays & variables    decla 
	//let poly = [];        // decla array holding stations
    let calcSt = [];    // decla array  stations calc
	// ------ array -- data,  stations bonded//
		let pop = document.getElementById('onDemand');
		let displayNumber = document.getElementById('number');
		let linkSt = document.getElementById('linkSt');
		let standardDevAng = 0.01;
		let zInitial = 400;
		let xInitial = 500;
		let yInitial = 500;
		let bearing = 100; // North celestial pole
		let standardDist = 0.002;
		let dishorArr = [];
		let dishorAva = [];
		let dishorEcar = [];
		let dishorMoy = [];
		let proportion = [];
		let compAng = [];
		let angleIntC = [];
		let gis = []; 
		let deltaX = [];
		let deltaY = [];
		let cooProvX = [];
		let cooProvY = [];
		let deltaCompX = [];
		let deltaCompY = [];
		let cooX = [];
		let cooY = [];
		let zAr = [];
		let zAv = [];
		let zecart = [];
		let zdelta = [];
		let zProv = [];
		let zdeltaComp = [];
		let cooZ = [];
	// -----var decla-----
		let selected = 0;
		let horD1 = 0;
		let horR1 = 0;
		let verD1 = 0;
		let verR1 = 0;
		let distoD1 = 0;
		let distoR1 = 0;
		let horD2 = 0;
		let horR2 = 0;
		let verD2 = 0;
		let verR2 = 0;
		let distoD2 = 0;
		let distoR2 = 0;
		let hautid = 0;
		let htA = 0;
		let htB = 0;
		let stationNum = -1;
		let mah = 0;
		let mbh = 0;
		let eah = 0;
		let ebh = 0;
		let mav = 0;
		let mbv = 0;
		let eav = 0;
		let ebv = 0;
		let ead = 0;
		let ebd = 0;
		let mad = 0;
		let mbd = 0;
		let smr = 0;
		let checkGap = ["eah", "ebh", "eav", "ebv", "ead", "ebd"]
		let acceptanceMessage = "Out of acceptance: ";
		let error = false;
// end decla

//resetData();

//poly = JSON.parse(localStorage.getItem('polyInstance'));

displayStlist();
function displayStlist() {
	emptyContent("linkSt");
		for (let index = 0; index < poly.length; index++) {
			let newA = document.createElement("a");
			let textLink = document.createTextNode(index+1);
			newA.appendChild(textLink);
			let tempo = index;
			newA.classList.add(tempo);
			linkSt.appendChild(newA);
		}
		let lastA = document.createElement("a");
		let textLink = document.createTextNode((poly.length) + 1);
		lastA.appendChild(textLink);
		lastA.classList.add(poly.length);
		linkSt.appendChild(lastA);
		displayNumber.innerHTML = "Station n°"+((poly.length) + 1)+ " ▾";
		emptyNoteBook ();
	}
function is_touch_enabled() {
		return ( 'ontouchstart' in window ) ||
			   ( navigator.maxTouchPoints > 0 ) ||
			   ( navigator.msMaxTouchPoints > 0 );
	}
if( is_touch_enabled() ) {
		// Get the button, and when the user clicks on it, execute myFunction
	document.getElementById("number").onclick = function() {myFunction()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
	function myFunction() {
  		let contentId = document.getElementById("linkSt");
		contentId.style.display == "block" ? contentId.style.display = "none" : 
		contentId.style.display = "block"; 
}
	}
document.getElementById("reset").addEventListener("click", resetData);
function resetData () {
	poly = [];
    calcSt = [];
	dishorArr = [];
	dishorAva = [];
	dishorEcar = [];
	dishorMoy = [];
	proportion = [];
	compAng = [];
	angleIntC = [];
	gis = []; 
	deltaX = [];
	deltaY = [];
	cooProvX = [];
	cooProvY = [];
	deltaCompX = [];
	deltaCompY = [];
	cooX = [];
	cooY = [];
	zAr = [];
	zAv = [];
	zecart = [];
	zdelta = [];
	zProv = [];
	zdeltaComp = [];
	cooZ = [];
	selected = 0;
	acceptanceMessage = "Out of acceptance: ";
	displayStlist();
	emptyNoteBook ();
}
// calcul function
function calc() {
	error = false;
	acceptanceMessage = "Out of acceptance: ";
	for (let index = 0; index < checkGap.length; index++) {
		let temp = checkGap[index];
		document.getElementById(temp).style.color =  "#f4f5f6";
	}

	mah = roundTo(averHor(horD1,horR1),5);
	mbh = roundTo(averHor(horD2,horR2),5);
	eah = roundTo(gapHor(horD1,horR1),4);
	if (eah > (2.5*Math.sqrt(1)*Math.sqrt(2)*standardDevAng)) {
		acceptanceMessage += "\n"+"gap hor Backsight: "+ eah+"\n";
		error = true;
		document.getElementById("eah").style.color =  "red";
	}
	ebh = roundTo(gapHor(horD2,horR2),4);
	if (ebh > (2.5*Math.sqrt(1)*Math.sqrt(2)*standardDevAng)) {
		acceptanceMessage += "gap hor Foresight: "+ ebh+"\n";
		error = true;
		document.getElementById("ebh").style.color =  "red";
	}
	mav = roundTo(averVer (verD1,verR1),5);
	mbv = roundTo(averVer (verD2,verR2),5);
	eav = roundTo(gapVer (verD1,verR1),4);
	if (eav > (2.5*Math.sqrt(1)*Math.sqrt(2)*standardDevAng)) {
		acceptanceMessage += "gap hor Backsight: "+ eav+"\n";
		error = true;
		document.getElementById("eav").style.color =  "red";
	}
	ebv = roundTo(gapVer (verD2,verR2),4);
	if (ebv > (2.5*Math.sqrt(1)*Math.sqrt(2)*standardDevAng)) {
		acceptanceMessage += "gap hor Foresight: "+ ebv+"\n";
		error = true;
		document.getElementById("ebv").style.color =  "red";
	}
	ead = roundTo(gapDis(distoD1,distoR1),3);
	if (ead > standardDist) {
		acceptanceMessage += "gap distance Backsight: "+ ead+"\n";
		error = true;
		document.getElementById("ead").style.color =  "red";
	}
	ebd = roundTo(gapDis(distoD2,distoR2),3);
	if (ebd > standardDist) {
		acceptanceMessage += "gap distance Foresight: "+ ebd;
		error = true;
		document.getElementById("ebd").style.color =  "red";
	}
	mad = roundTo(averDis (distoD1,distoR1),4);
	mbd = roundTo(averDis (distoD2,distoR2),4);
	smr = roundTo(averRed (mah,mbh),5);
	if (error == true) {
		alert(acceptanceMessage);
	}
}

function averHor(x,y) {
	if (x == 0) {
		if ((x+600+y)/2>400) {
			return (x+600+y)/2-400
		} else {
			return (x+600+y)/2
		}
	} else {
		if (x<y) {
			return (x-200+y)/2
		} else {
			if ((x+200+y)/2>400) {
				return ((x+200+y)-400)/2-400
			} else {
				return (x+200+y)/2
			}		
		}
	}
}
function gapHor(x,y) {
	if (y>x) {
		return Math.abs(x+200-y)
	} else {
		return Math.abs(x-200-y)
	}
}
function averVer(x,y) {
	return ((x+400-y)/2)
}
function gapVer(x,y) {
	return (Math.abs(400-x-y))
}
function gapDis(x,y) {
	return (Math.abs(x-y))
}
function averDis(x,y) {
	return (x+y)/2
}
function averRed(x,y) {
	if (y-x<0) {
		return y-x+400
	} else {
		return y-x
	}
}
function validityGrade(x){
	if (x < 0  || x > 400) {
		return false
	} else {
		return true
	}
}
function validityEDMI(x){
	// if (x > 500) {
	// 	calcul correction earth curve
	// }
	if (x <= 0) {
		return false
	} else {
		return true
	}
}
function validityHeight(x) {
	if (x < 1 || x > 2 ) {
		return false
	} else {
		return true
	}
}
// end basic calc
function roundTo(value, places){
	let power = Math.pow(10, places);
	return Math.round(value * power) / power;
}
function setDisplay(){
	closeNav();
	openOnDemand();
}
function setDatum(){
	standardDevAng = parseFloat(document.getElementById("stdDev").value);
	zInitial = parseFloat(document.getElementById("zInitial").value);
	xInitial = parseFloat(document.getElementById("xInitial").value);
	yInitial = parseFloat(document.getElementById("yInitial").value);
	standardDist = (parseFloat(document.getElementById("stdDis").value))/1000;
	bearing = parseFloat(document.getElementById("bearing").value);
	resetExceptPoly();
	closeOnDemand();
}
function resetExceptPoly (){
	calcSt = [];
	dishorArr = [];
	dishorAva = [];
	dishorEcar = [];
	dishorMoy = [];
	proportion = [];
	compAng = [];
	angleIntC = [];
	gis = []; 
	deltaX = [];
	deltaY = [];
	cooProvX = [];
	cooProvY = [];
	deltaCompX = [];
	deltaCompY = [];
	cooX = [];
	cooY = [];
	zAr = [];
	zAv = [];
	zecart = [];
	zdelta = [];
	zProv = [];
	zdeltaComp = [];
	cooZ = [];
	acceptanceMessage = "acceptance matter: ";
}
document.getElementById("submit").addEventListener("click", setDatum);
// get values
function getValueGrade(x){
	let temp = 0;
	temp = parseFloat(document.getElementById(x).value);
	if (validityGrade(temp) == true) {
		return temp;
	} else {
		alert("invalide, should be between 0 & 400!")
	}
}
function getValueEDMI(x) {
	let temp = 0;
	temp = parseFloat(document.getElementById(x).value);
	if (validityEDMI(temp) == true) {
		return temp;
	} else {
		alert("invalide, should be above 0!")
	}
}
function getValueHeight(x) {
	let temp = 0;
	temp = parseFloat(document.getElementById(x).value);
	if (validityHeight(temp) == true) {
		return temp;
	} else {
		alert("invalide, should between 1 & 2!")
	}
}
function getValues() {
	horD1 = getValueGrade("ahg"); //  1 for foresight and 2 for backsight, D=Direct, R=reverse
	horR1 = getValueGrade("ahd");
	verD1 = getValueGrade("avg");
	verR1 = getValueGrade("avd");
	distoD1 = getValueEDMI("adg");
	distoR1 = getValueEDMI("add");
	horD2 = getValueGrade("bhg");
	horR2 = getValueGrade("bhd");
	verD2 = getValueGrade("bvg");
	verR2 = getValueGrade("bvd");
	distoD2 = getValueEDMI("bdg");
	distoR2 = getValueEDMI("bdd");
	hautid = getValueHeight("ht");
	htA = getValueHeight("hta");
	htB = getValueHeight("htb");
}
function getStatValues(el) {
	horD1 = poly[el].horD1; //  1 for foresight and 2 for backsight, D=Direct, R=reverse
	horR1 = poly[el].horR1;
	verD1 = poly[el].verD1;
	verR1 = poly[el].verR1;
	distoD1 = poly[el].distoD1;
	distoR1 = poly[el].distoR1;
	horD2 = poly[el].horD2;
	horR2 = poly[el].horR2;
	verD2 = poly[el].verD2;
	verR2 = poly[el].verR2;
	distoD2 = poly[el].distoD2;
	distoR2 = poly[el].distoR2;
}

function displayStationCalcul(){
	getValues();
	calc();
	document.getElementById('eah').innerHTML = roundTo(eah,4);
	document.getElementById('eav').innerHTML = roundTo(eav,4);
	document.getElementById('mah').innerHTML = roundTo(mah,4);
	document.getElementById('mav').innerHTML = roundTo(mav,4);
	document.getElementById('ead').innerHTML = roundTo(ead,3);
	document.getElementById('mad').innerHTML = roundTo(mad,3);
	document.getElementById('ebh').innerHTML = roundTo(ebh,4);
	document.getElementById('ebv').innerHTML = roundTo(ebv,4);
	document.getElementById('mbh').innerHTML = roundTo(mbh,4);
	document.getElementById('mbv').innerHTML = roundTo(mbv,4);
	document.getElementById('ebd').innerHTML = roundTo(ebd,3);
	document.getElementById('mbd').innerHTML = roundTo(mbd,3);
	document.getElementById('smr').innerHTML = roundTo(smr,4);
}
function emptyCalcul (){
	document.getElementById('eah').innerHTML = "";
	document.getElementById('eav').innerHTML = "";
	document.getElementById('mah').innerHTML = "";
	document.getElementById('mav').innerHTML = "";
	document.getElementById('ead').innerHTML = "";
	document.getElementById('mad').innerHTML = "";
	document.getElementById('ebh').innerHTML = "";
	document.getElementById('ebv').innerHTML = "";
	document.getElementById('mbh').innerHTML = "";
	document.getElementById('mbv').innerHTML = "";
	document.getElementById('ebd').innerHTML = "";
	document.getElementById('mbd').innerHTML = "";
	document.getElementById('smr').innerHTML = "";
}
function emptyNoteBook (){
	document.getElementById('ahg').value = "";
	document.getElementById('ahd').value = "";
	document.getElementById('avg').value = "";
	document.getElementById('avd').value = "";
	document.getElementById('adg').value = "";
	document.getElementById('add').value = "";
	document.getElementById('bhg').value = "";
	document.getElementById('bhd').value = "";
	document.getElementById('bvg').value = "";
	document.getElementById('bvd').value = "";
	document.getElementById('bdg').value = "";
	document.getElementById('bdd').value = "";
	document.getElementById('ht').value = "";
	document.getElementById('hta').value = "";
	document.getElementById('htb').value = "";
	emptyCalcul();
}
// calcul check before record if you wish to:
document.getElementById("calc").addEventListener("click", displayStationCalcul);
document.getElementById("set").addEventListener("click", setDisplay);
document.getElementById("record").addEventListener("click", record);
function record() {
	displayStationCalcul();
let statio = {
	hautid: hautid,
	htA: htA,
	htB: htB,
	horD1: horD1,
	horR1: horR1,
	verD1: verD1,
	verR1: verR1,
	distoD1: distoD1,
	horD2: horD2,
	verD2: verD2,
	distoR1: distoR1,
	verR2: verR2,
	horR2: horR2,
	distoD2: distoD2,
	distoR2: distoR2,
  };
poly[selected] = statio;
	alert("You have recorded station: " +(parseInt(selected)+1));
	if (selected === (poly.length)-1) {
		displayStlist();
		selected ++;
	} 
	// emptyCalcul ();
}

document.getElementById("calculpoly").addEventListener("click", calculpoly);
function calculpoly() {
	acceptanceMessage = "Out of acceptance: ";
	if (poly.length <= 2) {
		alert("At least 3 stations recorded required!")
	} else {
		resetExceptPoly();
		let num = (poly.length) - 1
        for(let i = 0; i < poly.length; i++){
            getStatValues(i);
            calc();
            let calculSt = {
            eav: eav,
            eah: eah,
            ead: ead,
            mah: mah,
            mav: mav,
            mad: mad,
            ebh: ebh,
            ebv: ebv,
            ebd: ebd,
            mbh: mbh,
            mbv: mbv,
            mbd: mbd,
            smr: smr,
            };
            calcSt[i] = calculSt;
        }
		// distance plani
		for(let i = 0; i < poly.length; i++){
			if (i == 0) {
				let r = ((calcSt[num].mbv)/200)*(Math.PI);
				dishorArr.push(Math.sin(r)*calcSt[num].mbd);
				let s = ((calcSt[i].mav)/200)*(Math.PI);
				dishorAva.push(Math.sin(s)*calcSt[i].mad);
				dishorMoy[num] = ((dishorArr[i]+dishorAva[i])/2);
			} else {
				let r = ((calcSt[i-1].mbv)/200)*(Math.PI);
				dishorArr.push(Math.sin(r)*calcSt[i-1].mbd);
				let s = ((calcSt[i].mav)/200)*(Math.PI);
				dishorAva.push(Math.sin(s)*calcSt[i].mad);
				dishorMoy[i-1] = ((dishorArr[i]+dishorAva[i])/2);			
			}
			if ((Math.abs(dishorArr[i]-dishorAva[i])) > standardDist) {
				acceptanceMessage += "gap distance: st "+ [i]+" & st "+ [i+1]+ ": "+roundTo((Math.abs(dishorArr[i]-dishorAva[i])),4)+ "\n";
				error = true;
			}
			dishorEcar.push(Math.abs(1000*(dishorArr[i]-dishorAva[i])));
			
		}
		let totalMdist = dishorMoy.reduce((a, b) => {
			return a + b;
		});
		// each line/ total distances
		for(let i = 0; i < poly.length; i++){
			if (i==0) {
				proportion.push(100*((1/dishorMoy[num])+(1/dishorMoy[1])));
			} else {
				proportion.push(100*((1/dishorMoy[i-1])+(1/dishorMoy[1])));
			}
		}
		let totalP = proportion.reduce((a, b) => {
			return a + b;
		});
		let totaldist = dishorMoy.reduce((a, b) => {
			return a + b;
		});
		let totalAngleInterne = calcSt.reduce(function(a, b){
			return a + b.smr;
		},0);
		let angleTheorique = 200*(poly.length -2);
		let fermetureAngulaire = angleTheorique-totalAngleInterne;
		if (fermetureAngulaire > (2.5*Math.sqrt(poly.length)*Math.sqrt(2)*standardDevAng)) {
			error = true;
			acceptanceMessage += "angular closure error" + roundTo(fermetureAngulaire,4)+"\n";
		}
		// compensation angles
		for(let i = 0; i < poly.length; i++){
				compAng.push(fermetureAngulaire/totalP*proportion[i]);
				angleIntC.push(compAng[i]+calcSt[i].smr);
		}
		let totalAngleComp = angleIntC.reduce((a, b) => {
			return a + b;
		});
		// calcul bearing
		for(let i = 0; i < poly.length; i++){
			if (i==0) {
				gis.push(bearing);
			} else {
				if (gis[i-1]+calcSt[i].smr+200<400) {
					gis.push(gis[i-1]+calcSt[i].smr+200);
				} else {
					gis.push(gis[i-1]+calcSt[i].smr-200);
				}
			}
		}
		// delta x & y  before compensation
		for(let i = 0; i < poly.length; i++){
			deltaX.push(dishorMoy[i]*Math.sin(gis[i]/200*Math.PI));
			deltaY.push(dishorMoy[i]*Math.cos(gis[i]/200*Math.PI));
		}
		// intermediates coo x & y
		for(let i = 0; i < poly.length + 1; i++){
			if (i==0) {
				cooProvX.push(xInitial);
				cooProvY.push(yInitial);
			} else {
				cooProvX.push(cooProvX[i-1]+deltaX[i-1]);
				cooProvY.push(cooProvY[i-1]+deltaY[i-1]);
			}
		}
		let fermeturePlaniProvX = (cooProvX[0]-cooProvX[cooProvX.length - 1]);
		if (fermeturePlaniProvX > (2.7*standardDist*Math.sqrt(poly.length))) {
			acceptanceMessage += "linearX closure error: "+ roundTo(fermeturePlaniProvX,4) +"\n";
			error = true;
			// document.getElementById("ead").style.color =  "red";
		}
		let fermeturePlaniProvY = (cooProvY[0]-cooProvY[cooProvY.length - 1]);
		if (fermeturePlaniProvY > (2.7*standardDist*Math.sqrt(poly.length))) {
			acceptanceMessage += "linearY closure error: "+ roundTo(fermeturePlaniProvY,4) +"\n";
			error = true;
			// document.getElementById("ead").style.color =  "red";
		}
		// delta x & y with compensation
		for(let i = 0; i < poly.length; i++){
			deltaCompX.push((fermeturePlaniProvX)/totalMdist*dishorMoy[i]+deltaX[i]);
			deltaCompY.push((fermeturePlaniProvY)/totalMdist*dishorMoy[i]+deltaY[i]);
		}
		// coo x & y
		for(let i = 0; i < poly.length + 1; i++){
			if (i==0) {
				cooX.push(xInitial);
				cooY.push(yInitial);
			} else {
				cooX.push(cooX[i-1]+deltaCompX[i-1]);
				cooY.push(cooY[i-1]+deltaCompY[i-1]);
			}
		}
		let fermeturePlaniX = 1000*(cooX[0]-cooX[poly.length]);
		let fermeturePlaniY = 1000*(cooY[0]-cooY[poly.length]);
		// Altitude --------------------------------------------------------------------
		// delta z before compensation
		for(let i = 0; i < poly.length; i++){
			if (i==0) {
				let r = ((calcSt[num].mbv)/200)*(Math.PI);
				let rAr = (Math.cos(r)*calcSt[num].mbd + poly[num].hautid - poly[num].htB);
				zAr[num] = rAr;
				let s = ((calcSt[0].mav)/200)*(Math.PI);
				let sAv = (Math.cos(s)*calcSt[0].mad + poly[0].hautid - poly[0].htA);
				zAv[num]= sAv;
				if (Math.abs((Math.abs(rAr)-Math.abs(sAv))) > 0.005) {
					acceptanceMessage += "gap z: st "+ 1 +" & st "+ [num] + ": " + roundTo((Math.abs((Math.abs(rAr)-Math.abs(sAv)))),4)+ "\n";
					error = true;
				}
				if (rAr>sAv){
					zdelta[num] = ((Math.abs(rAr)+Math.abs(sAv))/2);
				} else {
					zdelta[num] = (-(Math.abs(rAr)+Math.abs(sAv))/2);
				}
			} else {
				let r = ((calcSt[i-1].mbv)/200)*(Math.PI);
				let rAr = (Math.cos(r)*calcSt[i-1].mbd + poly[i-1].hautid - poly[i-1].htB);
				zAr[i-1] = rAr;
				let s = ((calcSt[i].mav)/200)*(Math.PI);
				let sAv = (Math.cos(s)*calcSt[i].mad  + poly[i].hautid - poly[i].htA);
				zAv[i-1] = sAv;
				if (Math.abs((Math.abs(rAr)-Math.abs(sAv))) > 0.005) {
					acceptanceMessage += "gap z: st "+ [i] +" & st "+ [i+1] + ": " + roundTo((Math.abs((Math.abs(rAr)-Math.abs(sAv)))),4)+ "\n";
					error = true;
				}
				if (rAr>sAv) {
					zdelta[i-1] = ((Math.abs(rAr)+Math.abs(sAv))/2);
				} else {
					zdelta[i-1] = (-(Math.abs(rAr)+Math.abs(sAv))/2);			
				}
			}
		}
		// intermediate cco z
		for(let i = 0; i < poly.length + 1; i++){
			if (i==0) {
				zProv.push(zInitial);
			} else {
				zProv.push(zProv[i-1]+zdelta[i-1]);
			}
		}
		let toleranceZ = 2.5*0.005*Math.sqrt(poly.length);
		let fermetureProvZ = (zProv[0]-zProv[poly.length]);
		if ((Math.abs(fermetureProvZ)) > toleranceZ) {
			acceptanceMessage += "closure z: "+ roundTo((Math.abs(fermetureProvZ)),4)+ "\n";
			error = true;
		}
		// delta z with compensation
		for(let i = 0; i < poly.length; i++){
			zdeltaComp.push(zdelta[i]+(fermetureProvZ)*dishorMoy[i]/totalMdist)
		}
		// coo z
		for(let i = 0; i < poly.length + 1; i++){
			if (i==0) {
				cooZ.push(zInitial);
			} else {
				cooZ.push(cooZ[i-1]+zdeltaComp[i-1]);
			}
		}
		fillTable();
		displayResult();
	}
}
function fillTable () {
	table = document.createElement("table"),
	table.setAttribute("id","displayTable")
    row = table.insertRow();
	let cell1 = row.insertCell();
	cell1.innerHTML = '#';
	let cell2 = row.insertCell();
	cell2.innerHTML = 'x';
	let cell3 = row.insertCell();
	cell3.innerHTML = 'y';
	let cell4 = row.insertCell();
	cell4.innerHTML = 'z';
	for(let i = 0; i < poly.length; i++){	
      	row = table.insertRow();
		  for (let index = 0; index <= 3; index++) {
			  switch (index) {
				  	case 0:
						let cell5 = row.insertCell();
						cell5.innerHTML = 'Station ' + [i+1];
					break;
					case 1:
						let cell6 = row.insertCell();
						cell6.innerHTML = roundTo(cooX[i],3);
					break;
					case 2:
						let cell7 = row.insertCell();
						cell7.innerHTML = roundTo(cooY[i],3);
					break;
					case 3:
						let cell8 = row.insertCell();
						cell8.innerHTML = roundTo(cooZ[i],3);
					break;
				  	default:
					break;
			  }  
		  }
	}
	csvButton = document.createElement("button");
	let textButton = document.createTextNode("Download csv");
	csvButton.appendChild(textButton);
	csvButton.setAttribute("onclick", "exportTableToCSV(null,'coo.csv')");
	if (error == true) {
		alarm = document.createElement("p");
		let textAlert = document.createTextNode(acceptanceMessage);
		alarm.appendChild(textAlert);
		document.getElementById("error").appendChild(alarm);
	}
	document.getElementById("displayCoo").appendChild(table);
	document.getElementById("displayCoo").appendChild(csvButton);
	let spanX = Math.max(...cooX)-Math.min(...cooX);
	let spanY = Math.max(...cooY)-Math.min(...cooY);
	let begX = 0;
	let endX = 0;
	let begY = 0;
	let endY = 0;
	let spanGap = Math.abs(spanX-spanY)/2+5;
	if (spanX>spanY) {
		begX = Math.min(...cooX)-5;
		endX = Math.max(...cooX)+5;
		begY = Math.min(...cooY)-spanGap;
		endY = Math.min(...cooY)+spanY+spanGap;
	} else {
		begY = Math.min(...cooY)-5;
		endY = Math.max(...cooY)+5;
		begX = Math.min(...cooX)-spanGap;
		endX = Math.min(...cooX)+spanX+spanGap;
	}
	let data=[
		{
			opacity:0.8,
			type: 'scatter3d',
			x: cooX, 
			y: cooY, 
			z: cooZ, 
			value: [1,2,3],
			marker: {
				size: 5,
				color: 'blue',
				colorscale: "Greens",
			}, 
		},
	];
	let layout = {
		title: "",
		height: 360,
  		width: 360,
		autosize: false,
		showlegend: false,
		scene:{
			xaxis: {
			 spikecolor: '#1fe5bd',
			 spikesides: false,
			 spikethickness: 3,
			 mirror : "none",
			 title : "x",
			 range: [begX, endX],
			 color: '#a16423f2',
			   },
		   yaxis: {
			 spikecolor: '#1fe5bd',
			 spikesides: false,
			 spikethickness: 3,
			 title : "y",
			 range: [begY, endY],
			  },
		   zaxis: {
			 spikecolor: '#1fe5bd',
			 spikesides: false,
			 spikethickness: 3,
			 showgrid : false,
			 nticks: 4,
			 range: [Math.min(...cooZ)-5, Math.max(...cooZ)+5],
			 title : "",
			 color: '#b1a9a096',
			  },
			camera: {
				projection: {
					type: "orthographic"
				},
				eye: {
					x: -1.25,
					y: -1.25,
				},
			},
		//legend = {1, 2, 3, 4}
	    },
	};
	Plotly.newPlot('chart3d', data, layout);
}
document.getElementById("delete").addEventListener("click", deleteStation);
function deleteStation() {
	poly.splice(selected, 1);
	displayStlist();
}
// display selected station
  $( "#linkSt" ).on( "click", "a", function(event) {
	selected = parseInt($(event.target).attr('class'));
	displayNumber.innerHTML = "Station n°"+(selected+1)+ " ▾";
		if (selected === (poly.length)) {
			emptyNoteBook ();
		} else {
			fillStation(selected);
		}
});
function fillStation(num) {
	let tempObject = poly[num];
	document.getElementById('ahg').value = tempObject["horD1"];
	document.getElementById('ahd').value = tempObject["horR1"];
	document.getElementById('avg').value = tempObject["verD1"];
	document.getElementById('avd').value = tempObject["verR1"];
	document.getElementById('adg').value = tempObject["distoD1"];
	document.getElementById('add').value = tempObject["distoR1"];
	document.getElementById('bhg').value = tempObject["horD2"];
	document.getElementById('bhd').value = tempObject["horR2"];
	document.getElementById('bvg').value = tempObject["verD2"];
	document.getElementById('bvd').value = tempObject["verR2"];
	document.getElementById('bdg').value = tempObject["distoD2"];
	document.getElementById('bdd').value = tempObject["distoR2"];
	document.getElementById('ht').value = tempObject["hautid"];
	document.getElementById('hta').value = tempObject["htA"];
	document.getElementById('htb').value = tempObject["htB"];
	displayStationCalcul();
}

function exportTableToCSV(html, filename) {
	var csv = [];
	let rows = document.querySelectorAll('#displayTable tr');
    for(var i = 0; i < rows.length; i++){
		var row = [], 
		cols = rows[i].querySelectorAll("td, th");
        for(var j = 0; j < cols.length; j++){
			row.push(cols[j].innerText);
        }
		csv.push(row.join(","));
    }
    // download csv file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
	var csvFile;
    var downloadLink;
	
	if (window.Blob == undefined || window.URL == undefined || window.URL.createObjectURL == undefined) {
		alert("Your browser doesn't support Blobs");
		return;
	}
	
    csvFile = new Blob([csv], {type:"text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

// ------------function menu de boutons------------------------------------
function openNav() {
	document.getElementById("mySidepanel").style.width = "90px";
}

function closeNav() {
	document.getElementById("mySidepanel").style.width = "0";
}
function openOnDemand(){
	pop.hidden = false;
}
function closeOnDemand(){
	pop.hidden = true;
}
//-------- modal script---------//
// Get the modal
let modal = document.getElementById("modal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
function displayResult() {
	modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
	emptyContent("displayCoo");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		emptyContent("displayCoo");
	}
}
function emptyContent(idName) {
	let content = document.getElementById(idName);
	while (content.hasChildNodes()) {
		content.removeChild(content.firstChild);
	}
} 
