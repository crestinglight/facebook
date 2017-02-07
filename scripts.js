window.addEventListener("load", function(){

	hideAllReplies();

	function hideAllReplies(){
		var replies = document.getElementsByClassName("replies");

		for (var i = 0; i < replies.length; i++){
			replies[i].style.display = "none";
		}
	}

	function showReplies(){
		
		var nextReplyBlock = this.parentNode.nextElementSibling;

		if (nextReplyBlock.style.display == "block"){
			nextReplyBlock.style.display = "none";
		}
		else {
			nextReplyBlock.style.display = "block";
		}
	}

	function clickLike(){
		var likeLink = this.innerHTML;
		var likeCounter = this.nextElementSibling.nextElementSibling.innerHTML;
		
		if (likeLink == "Like"){
			this.innerHTML = "Unlike";
			newLikeString = addLikeCount(likeCounter);
			console.log(newLikeString);
			this.nextElementSibling.nextElementSibling.innerHTML = newLikeString;
		}
		else {
			this.innerHTML = "Like";
			newLikeString = subtractLikeCount(likeCounter);
			this.nextElementSibling.nextElementSibling.innerHTML = newLikeString;
		}
	}

	function addLikeCount(likecounter){
		addLikeArray = likecounter.split(" ");
		likeNumber = parseInt(addLikeArray[0]);
		addLikeNumber = likeNumber + 1;
		updateLike = likeOrLikes(addLikeNumber);
		return updateLike;
	}

	function subtractLikeCount(likecounter){		
		addLikeArray = likecounter.split(" ");
		likeNumber = parseInt(addLikeArray[0]);
		subLikeNumber = likeNumber - 1;
		updateLike = likeOrLikes(subLikeNumber);
		return updateLike;
	}

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

	function commentSubmit(){
		
		if (this.parentNode.childNodes[1].value == ""){
			alert("The text box is currently empty! Type in your comment and I'll submit it for you.");
			event.preventDefault();
		}
		else {
			var newCommentNum = updateCommentCounter();
			var newString = newCommentString(newCommentNum);
			this.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3].innerHTML = newString;
			event.preventDefault();
		}

	}

	function updateCommentCounter(){
		var commentCounterOriginal = document.getElementsByClassName("commentCount")[0].innerHTML;
		var splitString = commentCounterOriginal.split(" ");
		var commentsNum = parseInt(splitString[0]);
		var addedCommentNum = commentsNum + 1;
		return addedCommentNum;
	}

	function newCommentString(newNum){
		var numString = newNum.toString();
		var newCommentCount = numString + " comments";
		return newCommentCount;
	}

	function commentFocus(){
		
		document.getElementsByClassName("opcomment")[0].focus();
	}

	function userNameModal(){

		var userName = this.innerHTML;
		var numOfFriends = this.dataset.friends;
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

	function modalDisplay(){

		var modalBGShow = document.getElementsByClassName("modal")[0];
		var modalWindowShow = document.getElementsByClassName("modal__content")[0];
		modalBGShow.style.display = "block";
		modalWindowShow.style.display = "block";
	}

	function closeModal(){

		var modalXClicked = document.getElementsByClassName("modal")[0];
		var modalXClicked2 = document.getElementsByClassName("modal__content")[0];
		modalXClicked.style.display = "none";
		modalXClicked2.style.display = "none";
	}

	function clickShare(){

		var userName = this.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].innerHTML
		var shareThisComment = this.parentNode.parentNode.childNodes[3].innerHTML
		document.getElementsByClassName("modal__title")[0].innerHTML = userName;
		document.getElementsByClassName("modal__body")[0].innerHTML = shareThisComment;
		modalDisplay();
	}
	
	var replyCountArray = document.getElementsByClassName("replyCount");
	var likeCountArray = document.getElementsByClassName("likeClick");
	var submitCommentArray = document.getElementsByClassName("submitComment");
	var commentClick = document.getElementsByClassName("action action--comment");
	var nameClick = document.getElementsByClassName("userName");
	var modalXClick = document.getElementsByClassName("modal__close");
	var modalGrayClick = document.getElementsByClassName("modal");
	var shareClick = document.getElementsByClassName("action action--share");

	commentClick[0].addEventListener('click', commentFocus);
	modalXClick[0].addEventListener('click', closeModal);
	modalGrayClick[0].addEventListener('click', closeModal);
	shareClick[0].addEventListener('click', clickShare);

	for (var i = 0; i < replyCountArray.length; i++){
		replyCountArray[i].addEventListener('click', showReplies);
	}

	for (var x = 0; x < likeCountArray.length; x++){
		likeCountArray[x].addEventListener('click', clickLike);
	}

	for (var y = 0; y < submitCommentArray.length; y++){
		submitCommentArray[y].addEventListener('click', commentSubmit);
	}

	for (var i = 0; i < nameClick.length; i++){
		nameClick[i].addEventListener('click', userNameModal);

	}
	
});