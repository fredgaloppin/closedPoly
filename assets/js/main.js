// à integrer: 
//			correction sphericite terre eventuel; 
//			
//			alert? ecarts trop important  + tout calcul ecart typ appareil				

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
			emptyContent();
           }
           // When the user clicks anywhere outside of the modal, close it
           window.onclick = function(event) {
             if (event.target == modal) {
               modal.style.display = "none";
			   emptyContent();
             }
           }
        function emptyContent() {
			let content = document.getElementById("displayCoo");
				 while (content.hasChildNodes()) {
					 content.removeChild(content.firstChild);
					}
		}
//-arrays & variables    decla 
	let poly = [];        // decla array holding stations
	// ------ array -- data,  stations bonded//
		let pop = document.getElementById('onDemand');
		let displayNumber = document.getElementById('number');
		let standardDevAng = 0.01;
		let zInitial = 400;
		let xInitial = 500;
		let yInitial = 500;
		let bearing = 100; // North celestial pole
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
displayNumber.innerHTML = "Station n°"+((poly.length) + 1);
function displayNumber() {
	
}
document.getElementById("displayStations").addEventListener("click", displayStlist);
function displayStlist() {
	if (poly.length == 0) {
		alert("no stations recorded yet");
	} else {
		let choiceList = document.createElement("LI");
		var textnode = document.createTextNode("Water");         
		choiceList.appendChild(textnode);
		displayNumber.appendChild(choiceList);

	}
}
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
function setDisplay(){
	closeNav();
	openOnDemand();
}
function setDatum(){
	standardDevAng = parseFloat(document.getElementById("stdDev").value);
	zInitial = parseFloat(document.getElementById("zInitial").value);
	xInitial = parseFloat(document.getElementById("xInitial").value);
	yInitial = parseFloat(document.getElementById("yInitial").value);
	bearing = parseFloat(document.getElementById("bearing").value);
	closeOnDemand();
}
document.getElementById("submit").addEventListener("click", setDatum);
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
	horG2 = getValueGrade("bhd");
	verD2 = getValueGrade("bvg");
	verG2 = getValueGrade("bvd");
	distoD2 = getValueEDMI("bdg");
	distoR2 = getValueEDMI("bdd");
	// stationNum = parseFloat(document.getElementById("ids").value);
	hautid = getValueHeight("ht");
	htA = getValueHeight("hta");
	htB = getValueHeight("htb");
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
document.getElementById("calc").addEventListener("click", displayStationCalcul);
// fonction calcul pour éventuellement vérifier une station avant d'enregistrer:
document.getElementById("set").addEventListener("click", setDisplay);
document.getElementById("record").addEventListener("click", record);
function record() {
	getValues();
	calc();
let statio = {
	stationid: (poly.length) + 1,
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
	displayNumber.innerHTML = "Station n°"+((poly.length) + 1);
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
			gis.push(bearing);
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
			cooProvX.push(xInitial);
			cooProvY.push(yInitial);
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
			cooZ.push(zInitial);
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

	fillTable();
	displayResult();
}
function fillTable () {
	table = document.createElement("table"),
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
						cell6.innerHTML = roundTo(cooX[i],2);
					break;
					case 2:
						let cell7 = row.insertCell();
						cell7.innerHTML = roundTo(cooY[i],2);
					break;
					case 3:
						let cell8 = row.insertCell();
						cell8.innerHTML = roundTo(cooZ[i],2);
					break;
				  	default:
					break;
			  }  
		  }
	}
	document.getElementById("displayCoo").appendChild(table);
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
			 range: [Math.min(...cooX)-5, Math.max(...cooX)+5],
			 color: '#a16423f2',
			   },
		   yaxis: {
			 spikecolor: '#1fe5bd',
			 spikesides: false,
			 spikethickness: 3,
			 title : "y",
			 range: [Math.min(...cooY)-5, Math.max(...cooY)+5],
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
function fillCard() {
	document.getElementById("hta").value = "Kat";
	document.getElementById("ahg").value = "Kat";
	document.getElementById("avg").value = "Kat";
	document.getElementById("adg").value = "Kat";
	document.getElementById("ahd").value = "Kat";
	document.getElementById("avd").value = "Kat";
	document.getElementById("add").value = "Kat";
	document.getElementById("htb").value = "Kat";
	document.getElementById("bhg").value = "Kat";
	document.getElementById("bvg").value = "Kat";
	document.getElementById("bdg").value = "Kat";
	document.getElementById("bhd").value = "Kat";
	document.getElementById("bvd").value = "Kat";
	document.getElementById("bdd").value = "Kat";
  }

/* <thead>
<tr>
<th>#</th>
<th>x</th>
<th>y</th>
<th>z</th>
</tr>
</thead>  */

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
//Make the DIV element draggagle:
// dragElement(document.getElementById("modal"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById("modal-content")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById("modal-content").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }