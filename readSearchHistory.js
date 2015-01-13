// check to see if cookie has been set
if (getCookie('searchHistory')) {
	readSearchHistory();
} else {
	$('.search').hide();
	$('.profile').css({'min-height' : '100px'});
}

function readSearchHistory() {

	/*\
	 *	SearchHistory function to capture user searches and store them
	 *	into a cookie for later use.
	 *
	 *	The initial part of this JS is located in the setSearchHistory file.
	\*/
	
	// read & split the cookies 
	var cookies      = getCookie('searchHistory');
	var cookiesArray = cookies.split(',');
	var searchBox    = document.getElementById('search-holder');
	var output       = ''; 

	// iterate over each search and create page elements for each one
	for (var i = 0; i < cookiesArray.length; i++) {
		// split up the string at the "-" mark
		var clean = cookiesArray[i].split('-');
		// clean it up further by joining the string
		var cleaner = clean.join(' ');
		// create array we need for each part of the name
		var cleanest = cleaner.split(' ');
		// create object to store parts of the name
		var name = {
			firstName : cleanest[0],
			lastName  : cleanest[1],
			state     : cleanest[2]
		};

		// make states capitalized
		var lowerCaseIt = name.state;
		var lower       = lowerCaseIt.toLowerCase();

		// create a way to filter states so they display as full names and not abbreviations
		for (key in test) {
			if (test.hasOwnProperty(key)) {
				if (key === cleanest[2]) {
					lower = test[key];
				}
			}
		}

		// create output string 
		output += '<div class="searchIt">' +
				'<p class="nameIt">Name:</p>' +
				'<p class="fName">' + cleanest[0] + '</p>' +
				'<p class="lName">' + cleanest[1] + '</p>' +
				'<p class="state">' + lower + '</p>' +
				'<img class="checkMe" src="/assets/shared/img/register/checkmark.png">' +
				'<p class="reportIncluded">Report Included</p>' +
			'</div>';

		// set output string to page element
		searchBox.innerHTML = output;
	}

	// determine search holder width
	var howMany = $('.searchIt').length;
	var howWide = $('.searchIt').width() + 60;
	var totalWidth = howMany * howWide;
	$('#search-holder').css({'width' : totalWidth});

	// if cookieArray is 3 or less, hide the arrows
	if (cookiesArray.length <= 3) {
		$('.arrow-left, .arrow-right').hide();
	}

	// controls to move the boxes around to see all of your searches(super hacky)
	var tracker = 2,
	    cNumber = cookiesArray.length;

	// hide or show right arrow to prevent user from scrolling outside of the container
	$('.arrow-right').on('click', function() {
		$('#search-holder').animate({'left' : '-=100px'}); // 100px was just what I needed.
		tracker++;					   // Some simple math against each div width will get your px's
		if (tracker === cNumber) {
			$('.arrow-right').fadeOut();
		}
		if (tracker > 0) {
			$('.arrow-left').fadeIn();
		}
	});

	// hide or show left arrow to prevent user from scrolling outside of the container
	$('.arrow-left').on('click', function() {
		$('#search-holder').animate({'left' : '+=100px'}); // 100px was just what I needed.
		tracker--;					   // Some simple math against each div width will get your px's
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
