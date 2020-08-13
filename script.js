function toggleCol(theme){
	[...document.getElementsByClassName(theme)]
		.forEach((elem)=>{
		elem.classList.toggle("hilight");

	})
}
