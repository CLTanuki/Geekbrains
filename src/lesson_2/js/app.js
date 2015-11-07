var getContent,
	updatestate,
	updateButtons,
	updateEL,
	contentEL,
	clickListener,
	navEL;

contentEL = document.querySelector("#content");
navEL = document.querySelector(".menu");

getContent = function ( url, callback ) {
	console.log('1');

    // Feature detection
    if ( !window.XMLHttpRequest ) return;

    // Create new request
    var xhr = new XMLHttpRequest();

    // Setup callback
    xhr.onload = function() {
    	console.log('2');
        if ( callback && typeof( callback ) === 'function' ) {
            callback( this.responseXML );
        }
    }

    // Get the HTML
    xhr.open( 'GET', url.concat('.html') );
    xhr.responseType = 'document';
    xhr.send();
    console.log('3');

};

updateEL = function(html) {
	contentEL.innerHTML = getContent(state.page);
}

updatestate = function(state) {
	if (!state) return;
	getContent(state.page, updateEL);
	updateButtons(state);
}

updateButtons = function(state) {
	[].slice.call(navEL.querySelectorAll('a'))
		.forEach(function(e) {
			var classList = e.parentNode.classList;
			state.page == e.getAttribute('href')
				? classList.add('active')
				: classList.remove('active');
		})
}

navEL.addEventListener('click', function(e) {
	var state;
	if (e.target.tagName != 'A') return;
	state = {
		page: e.target.getAttribute('href')
	}
	// history.pushState(state, '', state.page);
	updatestate(state);
	e.preventDefault();

});

window.addEventListener('popstate', function(e) {
	updatestate(e.state);
})

window.addEventListener('hashchange', updatestate)
window.addEventListener('load', updatestate)