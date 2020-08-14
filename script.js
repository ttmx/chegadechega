function toggleCol(theme){
	[...document.getElementsByClassName(theme)]
		.forEach((elem)=>{
		elem.classList.toggle("hilight");

	})
}

let types = ["fasc","lgbt","edu","fam"];

function makeSpanList(){
	let hilights = {};
	let final_hilight = {};
	for (i of types){
		hilights[i] = document.getElementsByClassName(i);
		final_hilight[i] = [];
		for(a of hilights[i])
			if (a.localName == "span")
				final_hilight[i].push(a);
	}
	return final_hilight;
}


function makeBoxes(){
	let scroller = document.getElementById("scrollbar");
	let scale = window.innerHeight / document.body.getBoundingClientRect().height;
	for(type of Object.values(makeSpanList()))
		for (elem of type){
			let bar = document.createElement("div");
			bar.className = elem.className;
			bar.style.height = elem.getBoundingClientRect().height * scale + "px";
			bar.style.top = (elem.getBoundingClientRect().y + document.documentElement.scrollTop) * scale + "px";
			bar.style.position = "relative";
			scroller.appendChild(bar);
		}
}


document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
	makeBoxes();
    OverlayScrollbars(document.querySelectorAll('body'), { });
});
