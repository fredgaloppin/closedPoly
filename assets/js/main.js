// à integrer: 
//			correction sphericite terre eventuel; 
//			grade de 0 à 400;
//			alert? ecarts trop important  + tout calcul ecart typ appareil				

// ];

//   document.getElementById("calc").addEventListener("click", calc);
//   function validerangle(obj, seuilMin, seuilMax) {
// 	if ((obj.value < seuilMin) || (obj.value > seuilMax))
// 	  alert("Valeur invalide !");
//   }
  
// ------------function menu de boutons------------------------------------

function openNav() {
	document.getElementById("mySidepanel").style.width = "100px";
  }
  
function closeNav() {
	document.getElementById("mySidepanel").style.width = "0";
  }
// ---- arrays & variables----decla-----
let poly = [];        // decla array holding stations
// ------ array data,  stations bonded//
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
let horD1 = 0;
let horR1 = 0;
let verD1 = 0;
let verR1 = 0;
let distoD1 = 0;
let distoR1 = 0;
let horD2 = 0;
let horG2 = 0;
let verD2 = 0;
let verG2 = 0;
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
// end decla
// calcul function
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
function roundTo(value, places){
	let power = Math.pow(10, places);
	return Math.round(value * power) / power;
}
function averRed(x,y) {
	if (y-x<0) {
		return y-x+400
	} else {
		return y-x
	}
}
function getValues() {
	horD1 = parseFloat(document.getElementById("ahg").value); //  1 for foresight and 2 for backsight, D=Direct, R=reverse
	horR1 = parseFloat(document.getElementById("ahd").value);
	verD1 = parseFloat(document.getElementById("avg").value);
	verR1 = parseFloat(document.getElementById("avd").value);
	distoD1 = parseFloat(document.getElementById("adg").value);
	distoR1 = parseFloat(document.getElementById("add").value);
	horD2 = parseFloat(document.getElementById("bhg").value);
	horG2 = parseFloat(document.getElementById("bhd").value);
	verD2 = parseFloat(document.getElementById("bvg").value);
	verG2 = parseFloat(document.getElementById("bvd").value);
	distoD2 = parseFloat(document.getElementById("bdg").value);
	distoR2 = parseFloat(document.getElementById("bdd").value);
	stationNum = parseFloat(document.getElementById("ids").value);
	hautid = parseFloat(document.getElementById("ht").value);
	htA = parseFloat(document.getElementById("hta").value);
	htB = parseFloat(document.getElementById("htb").value);
}
function calc() {

	mah = averHor(horD1,horR1);
	mbh = averHor(horD2,horG2);
	eah = gapHor(horD1,horR1);
	ebh = gapHor(horD2,horG2);
	mav = averVer (verD1,verR1);
	mbv = averVer (verD2,verG2);
	eav = gapVer (verD1,verR1);
	ebv = gapVer (verD2,verG2);
	ead = gapDis (distoD1,distoR1);
	ebd = gapDis (distoD2,distoR2);
	mad = averDis (distoD1,distoR1);
	mbd = averDis (distoD2,distoR2);
	smr = averRed (mah,mbh);
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

document.getElementById("calc").addEventListener("click", displayStationCalcul);
// fonction calcul pour éventuellement vérifier une station avant d'enregistrer:

document.getElementById("record").addEventListener("click", record);
function record() {
	getValues();
	calc();
let statio = {
	stationid: stationNum,
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
	verG2: verG2,
	horG2: horG2,
	distoD2: distoD2,
	distoR2: distoR2,
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
poly.push(statio);
let num = (poly.length) - 1
	alert("You have recorded station: " +poly[num].stationid);
}

document.getElementById("calculpoly").addEventListener("click", calculpoly);
function calculpoly() {
	for(let i = 0; i < poly.length; i++){
		let num = (poly.length) - 1
		if (i==0) {
			let r = ((poly[num].mbv)/200)*(Math.PI);
			dishorArr.push(Math.sin(r)*poly[num].mbd);
			let s = ((poly[i].mav)/200)*(Math.PI);
			dishorAva.push(Math.sin(s)*poly[i].mad);
		} else {
			let r = ((poly[i-1].mbv)/200)*(Math.PI);
			dishorArr.push(Math.sin(r)*poly[i-1].mbd);
			let s = ((poly[i].mav)/200)*(Math.PI);
			dishorAva.push(Math.sin(s)*poly[i].mad);
		}
		dishorEcar.push(Math.abs(1000*(dishorArr[i]-dishorAva[i])));
		dishorMoy.push((dishorArr[i]+dishorAva[i])/2);
	}
	let totalMdist = dishorMoy.reduce((a, b) => {
		return a + b;
	});
	for(let i = 0; i < poly.length; i++){
		let num = (poly.length) - 1
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
	let totalAngleInterne = poly.reduce(function(a, b){
		return a + b.smr;
	},0);
	let angleTheorique = 200*(poly.length -2);
	let fermetureAngulaire = angleTheorique-totalAngleInterne;
	for(let i = 0; i < poly.length; i++){
			compAng.push(fermetureAngulaire/totalP*proportion[i]);
			angleIntC.push(compAng[i]+poly[i].smr);
	}
	let totalAngleComp = angleIntC.reduce((a, b) => {
		return a + b;
	});
	for(let i = 0; i < poly.length; i++){
		if (i==0) {
			gis.push(100);
		} else {
			if (gis[i-1]+poly[i].smr+200<400) {
				gis.push(gis[i-1]+poly[i].smr+200);
			} else {
				gis.push(gis[i-1]+poly[i].smr-200);
			}
		}
	}
	for(let i = 0; i < poly.length; i++){
		deltaX.push(dishorMoy[i]*Math.sin(gis[i]/200*Math.PI));
		deltaY.push(dishorMoy[i]*Math.cos(gis[i]/200*Math.PI));
	}
	for(let i = 0; i < poly.length + 1; i++){
		if (i==0) {
			cooProvX.push(500);
			cooProvY.push(500);
		} else {
			cooProvX.push(cooProvX[i-1]+deltaX[i-1]);
			cooProvY.push(cooProvY[i-1]+deltaY[i-1]);
		}
	}
	let fermeturePlaniProvX = 100*(cooProvX[0]-cooProvX[cooProvX.length - 1]);
	let fermeturePlaniProvY = 100*(cooProvY[0]-cooProvY[cooProvY.length - 1]);
	for(let i = 0; i < poly.length; i++){
		deltaCompX.push((fermeturePlaniProvX/100)/totalMdist*dishorMoy[i]+deltaX[i]);
		deltaCompY.push((fermeturePlaniProvY/100)/totalMdist*dishorMoy[i]+deltaY[i]);
	}
	for(let i = 0; i < poly.length + 1; i++){
		if (i==0) {
			cooX.push(500);
			cooY.push(500);
		} else {
			cooX.push(cooX[i-1]+deltaCompX[i-1]);
			cooY.push(cooY[i-1]+deltaCompY[i-1]);
		}
	}
	let fermeturePlaniX = 1000*(cooX[0]-cooX[poly.length]);
	let fermeturePlaniY = 1000*(cooY[0]-cooY[poly.length]);
	// Altitude --------------------------------------------------------------------
	for(let i = 0; i < poly.length; i++){
		let num = (poly.length) - 1
		if (i==0) {
			let r = ((poly[num].mbv)/200)*(Math.PI);
			zAr.push(Math.cos(r)*poly[num].mbd + poly[num].hautid - poly[num].htB);
			let s = ((poly[i].mav)/200)*(Math.PI);
			zAv.push(Math.cos(s)*poly[i].mad + poly[i].hautid - poly[i].htA);
		} else {
			let r = ((poly[i-1].mbv)/200)*(Math.PI);
			zAr.push(Math.cos(r)*poly[i-1].mbd + poly[i-1].hautid - poly[i-1].htB);
			let s = ((poly[i].mav)/200)*(Math.PI);
			zAv.push(Math.cos(s)*poly[i].mad  + poly[i].hautid - poly[i].htA);
		}
		zecart.push(1000*(Math.abs(zAr[i])-Math.abs(zAv[i])));
		if (zAr>zAv) {
			zdelta.push((Math.abs(zAr[i])+Math.abs(zAv[i]))/2);
		} else {
			zdelta.push(-(Math.abs(zAr[i])+Math.abs(zAv[i]))/2);			
		}
	}
	for(let i = 0; i < poly.length + 1; i++){
		if (i==0) {
			zProv.push(400);
		} else {
			zProv.push(zProv[i-1]+zdelta[i-1]);
		}
	}
	let fermetureProvZ = 1000*(zProv[0]-zProv[poly.length]);
	for(let i = 0; i < poly.length; i++){
		zdeltaComp.push(zdelta[i]+(fermetureProvZ/1000)*dishorMoy[i]/totalMdist)
	}
	for(let i = 0; i < poly.length + 1; i++){
		if (i==0) {
			cooZ.push(400);
		} else {
			cooZ.push(cooZ[i-1]+zdeltaComp[i-1]);
		}
	}
// console.log('dist hor Arr: ', dishorArr);
// console.log('dist hor Ava: ', dishorAva);
// console.log('dist hor Ecar: ', dishorEcar);
// console.log('dist hor Moy: ', dishorMoy);
// console.log('Total dist: ', totalMdist);
// console.log('dist pour P: ', proportion);
// console.log('total P: ', totalP);
// console.log('perimeter intermédiaire : ', totaldist);
// console.log('sum angle interne : ', totalAngleInterne);
// console.log('angl théo : ', angleTheorique);
// console.log('Fermeture : ', fermetureAngulaire);
// console.log('Compensation A : ', compAng);
// console.log('Total Angle Int Comp : ', totalAngleComp);
// console.log('Gisment : ', gis);
// console.log('delta X : ', deltaX);
// console.log('delta Y : ', deltaY);
// console.log('X prov: ', cooProvX);
// console.log('Y prov: ', cooProvY);
// console.log('Fermeture plani prov: x:', fermeturePlaniProvX, 'y: ', fermeturePlaniProvY);
// console.log('delta X : ', deltaCompX);
// console.log('delta Y : ', deltaCompY);
// console.log('coo X : ', cooX);
// console.log('coo Y : ', cooY);
// console.log('Fermeture plani: x:', fermeturePlaniX, 'y: ', fermeturePlaniY);
// console.log('z Arr: ', zAr);
// console.log('z Ava: ', zAv);
// console.log('z ecart: ', zecart);
// console.log('z delta: ', zdelta);
// console.log('z prov: ', zProv);
// console.log('z delta compensé: ', zdeltaComp);
// console.log('coo z: ', cooZ);

let message = "coordonnées" + " #" + " x" + " y" + " z"+ "\r\n";
	for(let i = 0; i < poly.length; i++){
		message += 'Station ' + [i+1] + ' ' + roundTo(cooX[i],4) + ' '
		+roundTo(cooY[i],4)+ ' '+ roundTo(cooZ[i],4)+ "\r\n";
	}
	alert(message)
}
// document.getElementById("afficher").addEventListener("click", afficher);
// function afficher(){
// 	let i = parseInt(prompt("Please enter whiche one: "));
// 	document.getElementById('ahg').innerHTML = poly[i-1].ahg;
// 	alert(poly[i-1].ahg);
// }
// document.getElementById("afficher").addEventListener("click", pageDisplay);
// function pageDisplay() {
//   href="#display";
// }