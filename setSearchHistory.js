function setSearchHistory() {

	/*\
	 *		SearchHistory function to capture user searches and store them
	 *		into a cookie for later use.
	 *
	 *		The rest of the JS to pull the data can be found in the 
	 *		reg page JS file.
	 *
	 *    - Submit form 
	 *		- Check whether searchHistory cookie exists
	 *    - Read values from searchHistory cookie and store them into an array
	 *    - Add new value into array and reset cookie
	\*/

	// create initial array
	var cookieArray = [];

	$('.btn-search').on('click', function(e) {
		e.preventDefault();

		// grab input values 
		var firstName = $('#form-advanced-search--first_name').val(),
				lastName  = $('#form-advanced-search--last_name').val(),
				state     = $('#form-advanced-search--state').val();

		// create string to store values for new cookie
		var storeAll = firstName + '-' + lastName + '-' + state;

		// check to see if searchHistory cookie exists
		if (typeof(getCookie('searchHistory')) != 'undefined') {
			// read old values from cookie
			var getCookies = getCookie('searchHistory');
			// split the searchHistory cookie
			var getCookiesArray = getCookies.split(',');
			// push new items to cookieArray
			getCookiesArray.push(storeAll); 
			// set the new cookie
			setCookie('searchHistory', getCookiesArray, 1);
		} else {
			// push new items into cookieArray
			cookieArray.push(storeAll);
			// join all items to create new cookie
			var searchCookie = cookieArray.join();
			// set the new cookie
			setCookie('searchHistory', searchCookie, 1);
		}
	});
} // end setSearchHistory()
setSearchHistory();
