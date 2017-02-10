window.addEventListener("load", function(){

	//Calls the function that will set the display of all replies to "none".
	hideAllReplies();

	//This function sets all replies to "display none" when the page first loads.
	function hideAllReplies(e){
		var replies = document.getElementsByClassName("replies");

		for (var i = 0; i < replies.length; i++){
			replies[i].style.display = "none";
		}
	}

	//When any of the "replies" links are clicked, sets the display of replies to "display: block", making them visible. This function also checks to see if the block is already visible, and if so, it returns the display back to "none".
	function showReplies(e){
		
		var nextReplyBlock = e.target.parentNode.nextElementSibling;

		if (nextReplyBlock.style.display == "block"){
			nextReplyBlock.style.display = "none";
		}
		else {
			nextReplyBlock.style.display = "block";
		}
		e.preventDefault();
	}

	//This function deals with the "Like" link on each comment/reply. If the like button currently says "like", this means the user hasn't "liked" the comment yet. If the user clicks the link in this state, it will change the text to "Unlike". Otherwise, it will change the link to "like" again. Each case also moves on to the like counter function, dealing with how many likes a given comment/reply has.
	function clickLike(e){
		var likeLink = e.target.innerHTML;
		var likeCounter = e.target.nextElementSibling.nextElementSibling.innerHTML;
		
		if (likeLink == "Like"){
			e.target.innerHTML = "Unlike";
			newLikeString = addLikeCount(likeCounter);
			e.target.nextElementSibling.nextElementSibling.innerHTML = newLikeString;
		}
		else {
			e.target.innerHTML = "Like";
			newLikeString = subtractLikeCount(likeCounter);
			e.target.nextElementSibling.nextElementSibling.innerHTML = newLikeString;
		}
		e.preventDefault();
	}

	//If the user clicked "like", this function will be called and will add 1 to the like count on that comment. It finds the current count first, then adds 1 for the user clicking like, then updates the string with the new number.
	function addLikeCount(likecounter){
		addLikeArray = likecounter.split(" ");
		likeNumber = parseInt(addLikeArray[0]);
		addLikeNumber = likeNumber + 1;
		updateLike = likeOrLikes(addLikeNumber);
		return updateLike;
	}

	//If the user clicked "Unlike", this function will be called and will subtract 1 from the like count on that comment. It finds the current count first, then subtracts 1 for the user clicking unlike, then updates the string with the new number.
	function subtractLikeCount(likecounter){		
		addLikeArray = likecounter.split(" ");
		likeNumber = parseInt(addLikeArray[0]);
		subLikeNumber = likeNumber - 1;
		updateLike = likeOrLikes(subLikeNumber);
		return updateLike;
	}

	//This function simply determinds if the like count is "1". If so, the new like count string will say "1 like", instead of "1 likes".
	function likeOrLikes(likeNum){
		
		if (likeNum == 1){
			likeBackToString = likeNum.toString();
			newLike = likeBackToString + " like";
		}
		else {
			likeBackToString = likeNum.toString();
			newLike = likeBackToString + " likes";
		}
		return newLike;
	}

	//This function deals with submitting replies. This function does not deal with replies to the original comment, as that has some different functionality. This function first checks whether the reply text field is blank when the user clicks "submit". If so, it gives them an error message. Otherwise, it first calls the updateReplyCounter function, the newReplyString function, then sets the new reply count to the correct string. This function then calls the getReply function, then resets the form to blank, without refreshing the page.
	function replySubmit(e){
		if (e.target.parentNode.childNodes[1].value == ""){
			alert("The text box is currently empty! Type in your comment and I'll submit it for you.");
			e.preventDefault();
		}
		else {
			var newReplyNum = updateReplyCounter(e);
			var newString = newReplyString(newReplyNum);
			e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].innerHTML = newString;
			e.preventDefault();
			getReply(e);
			e.target.parentNode.reset();
		}
	}

	//This function first finds the string of the original amount of replies that are on the comment being replied to. It then splits that string into an array, grabs index [0], which will be the number of replies, parses it into an integer, and adds 1. Returns an integer.
	//Example: "13 replies" will return int 14.
	function updateReplyCounter(e){
		var commentReplyOriginal = e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].innerHTML;
		var splitString = commentReplyOriginal.split(" ");
		if (splitString[0] === "Reply"){
			var addedReplyNum = 1
			return addedReplyNum
		}
		else {
			var replyNum = parseInt(splitString[0]);
			var addedReplyNum = replyNum + 1;
			return addedReplyNum;
		}
	}

	//This function takes in the integer from the updateReplyCounter function, then returns a string of the number of replies.
	//Example: input is 14, function returns the string: "14 replies".
	function newReplyString(newNum){
		if (newNum == 1){
			var newReplyCount = "1 reply";
			return newReplyCount;
		}
		else {
			var numString = newNum.toString();
			var newReplyCount = numString + " replies";
			return newReplyCount;
		}
	}

	//This function gets the user's input from the text box, and sets it to a usable variable. It then clears the text field, returning the value to an empty string. From here, it calls the setUpSkeletonReply function.
	function getReply(e){
		userInput = e.target.parentNode.childNodes[1].value;
		e.target.parentNode.childNodes[1].value = "";
		setUpSkeletonReply(userInput, e);
	}

	//This function targets the "commentSkeleton" div within the Html file, and clones it. This div is essentially an empty div, set up to be filled in with the given information from the user. After cloning this div, it inserts it in the correct place, depending on who the user is replying to.
	function setUpSkeletonReply(userInput, e){
		var skeleton = document.getElementsByClassName("commentSkeleton")[0];
		var cloneSkeleton = skeleton.cloneNode(true);
		var replyClass = e.target.parentNode.parentNode.parentNode.parentNode
		var newPost = replyClass.insertBefore(cloneSkeleton, e.target.parentNode.parentNode.parentNode);
		writeNewReply(userInput, newPost);
	}

	//This function fills the comment skeleton with the user's information and comment, then sets the class to "comment media", so that it won't be cloned the next time a user writes a reply.
	function writeNewReply(userInput, newpost){
		newpost.style.display = "flex";
		var textNode = document.createTextNode(userInput);
		var origin = document.getElementsByClassName("commentSkeleton")[0].childNodes[3];
		origin.insertBefore(textNode, origin.childNodes[3]);
		document.getElementsByClassName("commentSkeleton")[0].className = "comment media";
		addListenersLikes();
	}

	//This function deals with submitting comments to the original post. This function first checks whether the reply text field is blank when the user clicks "submit". If so, it gives them an error message. Otherwise, it first calls the updateCommentCounter function, the newCommentString function, then sets the new comment count to the correct string. This function then calls the getComment function, then resets the form to blank, without refreshing the page.
	function commentSubmit(e){
		
		if (e.target.parentNode.childNodes[1].value == ""){
			alert("The text box is currently empty! Type in your comment and I'll submit it for you.");
			e.preventDefault();
		}
		else {
			var newCommentNum = updateCommentCounter();
			var newString = newCommentString(newCommentNum);
			e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3].innerHTML = newString;
			e.preventDefault();
			getComment();
			e.target.parentNode.reset();
		}
	}

	//This function first finds the string of the original amount of comments that are on the original post. It then splits that string into an array, grabs index [0], which will be the number of replies, parses it into an integer, and adds 1. Returns an integer.
	//Example: "13 replies" will return int 14.
	function updateCommentCounter(){
		var commentCounterOriginal = document.getElementsByClassName("commentCount")[0].innerHTML;
		var splitString = commentCounterOriginal.split(" ");
		var commentsNum = parseInt(splitString[0]);
		var addedCommentNum = commentsNum + 1;
		return addedCommentNum;
	}

	//This function takes in the integer from the updateCommentCounter function, then returns a string of the number of replies.
	//Example: input is 14, function returns the string: "14 replies".
	function newCommentString(newNum){
		var numString = newNum.toString();
		var newCommentCount = numString + " comments";
		return newCommentCount;
	}

	//This function gets the user's input from the text box, and sets it to a usable variable. It then clears the text field, returning the value to an empty string. From here, it calls the setUpSkeletonComment function.
	function getComment(){
		userInput = document.getElementsByClassName("opcomment")[0].value;
		document.getElementsByClassName("opcomment")[0].value = "";
		setUpSkeletonComment(userInput);
	}

	//This function targets the "commentSkeleton" div within the Html file, and clones it. This div is essentially an empty div, set up to be filled in with the given information from the user. After cloning this div, it inserts it in the correct place.
	function setUpSkeletonComment(userInput){
		var skeleton = document.getElementsByClassName("commentSkeleton")[0];
		var cloneSkeleton = skeleton.cloneNode(true);
		var originalPost = document.getElementsByClassName("post__details")[0];
		var newPost = originalPost.insertBefore(cloneSkeleton, originalPost.childNodes[3].nextSibling.nextSibling);
		writeNewComment(userInput, newPost);
	}

	//This function fills the comment skeleton with the user's information and comment, then sets the class to "comment media", so that it won't be cloned the next time a user writes a comment.
	function writeNewComment(userInput, newpost){
		newpost.style.display = "flex";
		var textNode = document.createTextNode(userInput);
		var origin = document.getElementsByClassName("commentSkeleton")[0].childNodes[3];
		origin.insertBefore(textNode, origin.childNodes[3]);
		document.getElementsByClassName("commentSkeleton")[0].className = "comment media";
		addListenersLikes();
	}

	//When the user clicks "Comment" on the original post, puts the cursor into the comment reply box.
	function commentFocus(e){
		document.getElementsByClassName("opcomment")[0].focus();
		e.preventDefault();
	}

	//When the user clicks on the name of the commenter, the modal will be set up with the user's name, and how many friends they have. It will not yet be displayed.
	function userNameModal(e){
		var userName = e.target.innerHTML;
		var numOfFriends = e.target.dataset.friends;
		document.getElementsByClassName("modal__title")[0].innerHTML = userName;
		if (numOfFriends == "0"){
			document.getElementsByClassName("modal__body")[0].innerHTML = "Oh dear, you have no friends.";
		}
		else if (numOfFriends == "1"){
			document.getElementsByClassName("modal__body")[0].innerHTML = "You have " + numOfFriends + " friend.";
		}
		else {
			document.getElementsByClassName("modal__body")[0].innerHTML = "You have " + numOfFriends + " friends.";
		}
		
		modalDisplay();
		
	}

	//After the modal has been set up, this function will be called to make the modal visible.
	function modalDisplay(){

		var modalBGShow = document.getElementsByClassName("modal")[0];
		var modalWindowShow = document.getElementsByClassName("modal__content")[0];
		modalBGShow.style.display = "block";
		modalWindowShow.style.display = "block";
	}

	//This function closes the modal if the user clicks on the "X" in the corner, or clicks somewhere off the modal.
	function closeModal(){

		var modalXClicked = document.getElementsByClassName("modal")[0];
		var modalXClicked2 = document.getElementsByClassName("modal__content")[0];
		modalXClicked.style.display = "none";
		modalXClicked2.style.display = "none";
	}

	//This function sets up the modal in the case that the user clicks "Share" on the original post. Does not make modal visible, but prepares it with the correct information.
	function clickShare(e){

		var userName = e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].innerHTML
		var shareThisComment = e.target.parentNode.parentNode.childNodes[3].innerHTML
		document.getElementsByClassName("modal__title")[0].innerHTML = userName;
		document.getElementsByClassName("modal__body")[0].innerHTML = shareThisComment;
		modalDisplay();
	}
	
	//Variables to set up addEventListeners on various classes.
	var replyCountArray = document.getElementsByClassName("replyCount");
	var likeCountArray = document.getElementsByClassName("likeClick");
	var submitCommentArray = document.getElementsByClassName("submitComment");
	var submitReplyArray = document.getElementsByClassName("submitReply");
	var commentClick = document.getElementsByClassName("action action--comment");
	var nameClick = document.getElementsByClassName("userName");
	var modalXClick = document.getElementsByClassName("modal__close");
	var modalGrayClick = document.getElementsByClassName("modal");
	var shareClick = document.getElementsByClassName("action action--share");

	//Adds event listeners to single buttons/links.
	//Example: There is only one Share button, so this adds event listener to that button.
	commentClick[0].addEventListener('click', commentFocus);
	modalXClick[0].addEventListener('click', closeModal);
	modalGrayClick[0].addEventListener('click', closeModal);
	shareClick[0].addEventListener('click', clickShare);
	submitCommentArray[0].addEventListener('click', commentSubmit);


	//Calls addListener functions
	addListenersReplyCount();
	addListenersLikes();
	addListenersSubmitReply();
	addListenersName();
	//Adds event listeners to buttons/links of which there are multiple.
	//Example: there are several "Submit" buttons, these for loops would set up event listeners to all of those submit buttons.
	function addListenersReplyCount(){
		for (var i = 0; i < replyCountArray.length; i++){
			replyCountArray[i].addEventListener('click', showReplies);
		}
	}
	
	function addListenersLikes(){
		for (var x = 0; x < likeCountArray.length; x++){
			likeCountArray[x].addEventListener('click', clickLike);
		}	
	}

	function addListenersSubmitReply(){
		for (var y = 0; y < submitReplyArray.length; y++){
			submitReplyArray[y].addEventListener('click', replySubmit);
		}
	}

	function addListenersName(){
		for (var i = 0; i < nameClick.length; i++){
			nameClick[i].addEventListener('click', userNameModal);
		}
	}

});