let labels = {
	'fasc':'Autoritarismo',
	'lgbt':'LGBT+',
	'edu':'Educação',
	'fam':'Família'
}

function makeSpanList(){
	let final_hilight = {};
	for (i of Object.keys(labels)){
		final_hilight[i] = document.getElementById("programa").getElementsByClassName(i);
	}
	return document.getElementById("programa").querySelectorAll(".hilight");
}


function makeBoxes() {
	const scroller = document.getElementById("scrollbar");

	// little side bars will be drawn at this scale from the original
	const scale = window.innerHeight / document.documentElement.getBoundingClientRect().height;

	for (elem of makeSpanList()) {
		let bar = document.createElement("div");
		bar.className = elem.className;
		bar.style.height = (elem.getBoundingClientRect().height * scale + 4) + "px";
		bar.style.top = ((elem.getBoundingClientRect().y + document.documentElement.scrollTop - 2) * scale) + "px";
		bar.style.position = "fixed";
		bar.style.cursor = "pointer";
		bar.style.width = "2rem";

		//Function fuckery idk
		bar.onclick = (function (currElem) {
			return function () {currElem.scrollIntoView();};
		})(elem);

		scroller.appendChild(bar);
	}
}

function jumpTo(type) {
	let spans = document.getElementById("programa")
		.querySelectorAll("span."+type);
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

function addQuoteListeners(){
	let spans = document.getElementById("programa").getElementsByTagName("span");
	for(span of spans){
		if (span.dataset.tooltip)
			span.addEventListener("click",function(a,b,c){
				this.classList.toggle("active");
			})
	}
}


document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
	makeBoxes();
    OverlayScrollbars(document.querySelectorAll('body'), { });
	addQuoteListeners();
});
