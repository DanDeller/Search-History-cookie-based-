function readSearchHistory() {

	/*\
	 *		SearchHistory function to capture user searches and store them
	 *		into a cookie for later use.
	 *
	 *		The initial part of this JS is located in the report page JS file.
	\*/
	
	// read & split the cookies 
	var cookies = getCookie('searchHistory');
	var cookiesArray = cookies.split(',');
	var searchBox = document.getElementById('search-holder');

	// iterate over each search and create page elements for each one
	for (var i = 0; i < cookiesArray.length; i++) {
		// split up the string at the "-" mark
		var clean = cookiesArray[i].split('-');
		// clean it up further by joining the string
		var cleaner = clean.join(' ');

		// create a div for each search box
		var divIt = document.createElement('div');
		    divIt.className = 'searchIt';
		    searchBox.appendChild(divIt);

		// create close icon for each search box
		var closeIt = document.createElement('p');
		    closeIt.className = 'closeIt';
		    closeIt.innerHTML = 'x';
		    divIt.appendChild(closeIt);

		// create a text node for each search box
		var textIt = document.createElement('p');
		    textIt.className = 'textIt';
		    textIt.innerHTML = cleaner;
		    divIt.appendChild(textIt);
	}

	// controls to move the boxes around to see all of your searches
	$('.arrow-left').on('click', function() {
		$('#search-holder').animate({'left' : '+=70px'});
	});
	$('.arrow-right').on('click', function() {
		$('#search-holder').animate({'left' : '-=70px'});
	});

	// control to close each box if clicked
	$('.searchIt').on('click', function() {
		$(this).fadeOut();
	});
} // end readSearchHistory()
readSearchHistory();
