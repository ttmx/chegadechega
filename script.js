function toggleCol(theme){
	[...document.getElementsByClassName(theme)]
		.forEach((elem)=>{
		elem.classList.toggle("hilight");

	})
}

let types = ["fasc","lgbt","edu","fam"];
let labels = {
	'fasc':'Autoritarismo',
	'lgbt':'LGBT+',
	'edu':'Educação',
	'fam':'Família'
}

function pruneByClass(elems,className){
	let toReturn = []
		for(a of elems)
			if (a.localName == className)
				toReturn.push(a);
	return toReturn;
}
function makeSpanList(){
	let hilights = {};
	let final_hilight = {};
	for (i of types){
		hilights[i] = document.getElementsByClassName(i);
		final_hilight[i] = [];
		final_hilight[i] = pruneByClass(hilights[i],"span");
	}
	return final_hilight;
}


function makeBoxes(){
	let scroller = document.getElementById("scrollbar");

	// little side bars will be drawn at this scale from the original
	let scale = window.innerHeight / document.documentElement.getBoundingClientRect().height;

	for(type of Object.values(makeSpanList()))
		for (elem of type){
			let bar = document.createElement("div");
			bar.className = elem.className;
			bar.style.height = (elem.getBoundingClientRect().height * scale +4)+ "px";
			bar.style.top = ((elem.getBoundingClientRect().y + document.documentElement.scrollTop-2) * scale )+ "px";
			bar.style.position = "fixed";
			bar.style.cursor = "pointer";
			bar.style.width = "2rem";
			bar.onclick = (function(currElem) {
				return function() { currElem.scrollIntoView(); };
			 })(elem);
			scroller.appendChild(bar);
		}
}

function jumpTo(type) {
	let spans = pruneByClass(document.getElementsByClassName(type),"span");
	let found = false;
	for (span of spans){
		if(span.getBoundingClientRect().y>20){
			span.scrollIntoView();
			found = true;
			break;
		}
	}
	if (!found)
		toast("Fim de medidas sobre "+labels[type]);

}

let toastLock = false;
function toast(msg){
	if (!toastLock){
		toastLock = true;
		var x = document.getElementById("snackbar");
		x.innerHTML = msg;
		x.className = "show";
		setTimeout(function () {x.className = x.className.replace("show", ""); toastLock = false;}, 3000);
	}
}


document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
	makeBoxes();
    // OverlayScrollbars(document.querySelectorAll('body'), { });
});
