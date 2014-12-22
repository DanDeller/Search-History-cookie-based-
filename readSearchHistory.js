// check to see if cookie has been set
if (getCookie('searchHistory')) {
	readSearchHistory();
} else {
	$('.search').hide();
	$('.profile').css({'min-height' : '100px'});
}

function readSearchHistory() {

	/*\
	 *		SearchHistory function to capture user searches and store them
	 *		into a cookie for later use.
	 *
	 *		The initial part of this JS is located in the setSearchHistory file.
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

	// if cookieArray is 3 or less, hide the arrows
	if (cookiesArray.length <= 3) {
		$('.arrow-left, .arrow-right').hide();
	}

	// controls to move the boxes around to see all of your searches(super hacky)
	var tracker = 2,
		cNumber = cookiesArray.length;

	// hide or show right arrow to prevent user from scrolling outside of the container
	$('.arrow-right').on('click', function() {
		$('#search-holder').animate({'left' : '-=100px'});
		tracker++;
		if (tracker === cNumber) {
			$('.arrow-right').fadeOut();
		}
		if (tracker > 0) {
			$('.arrow-left').fadeIn();
		}
	});

	// hide or show left arrow to prevent user from scrolling outside of the container
	$('.arrow-left').on('click', function() {
		$('#search-holder').animate({'left' : '+=100px'});
		tracker--;
		if (tracker === 1) {
			$('.arrow-left').fadeOut();
		}
		if (tracker < cNumber) {
			$('.arrow-right').fadeIn();
		}
	});

	// control to close each box if clicked
	var count = 3;
	$('.searchIt').on('click', function() {
		count++;
		tracker++;
		// if user hides all but 3 or less items, remove scrolling arrows
		var minus = cookiesArray.length;
		if (minus <= count) {
			$('.arrow-left, .arrow-right').hide(function() {
				$('#search-holder').animate({'left' : '0'});
			});
		}
		$(this).fadeOut();
	});
} // end readSearchHistory()
