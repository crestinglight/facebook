window.addEventListener("load", function(){

	hideAllReplies();

	function hideAllReplies(e){
		var replies = document.getElementsByClassName("replies");

		for (var i = 0; i < replies.length; i++){
			replies[i].style.display = "none";
		}
	}

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

	function clickLike(e){
		var likeLink = e.target.innerHTML;
		var likeCounter = e.target.nextElementSibling.nextElementSibling.innerHTML;
		
		if (likeLink == "Like"){
			e.target.innerHTML = "Unlike";
			newLikeString = addLikeCount(likeCounter);
			console.log(newLikeString);
			e.target.nextElementSibling.nextElementSibling.innerHTML = newLikeString;
		}
		else {
			e.target.innerHTML = "Like";
			newLikeString = subtractLikeCount(likeCounter);
			e.target.nextElementSibling.nextElementSibling.innerHTML = newLikeString;
		}
		e.preventDefault();
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

	function replySubmit(e){
		if (e.target.parentNode.childNodes[1].value == ""){
			alert("The text box is currently empty! Type in your comment and I'll submit it for you.");
			e.preventDefault();
		}
		else {
			// var newCommentNum = updateCommentCounter();
			// var newString = newCommentString(newCommentNum);
			// e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3].innerHTML = newString;
			e.preventDefault();
			getReply(e);
			e.target.parentNode.reset();
		}
	}

	function getReply(e){
		userInput = e.target.parentNode.childNodes[1].value;
		e.target.parentNode.childNodes[1].value = "";
		setUpSkeletonReply(userInput, e);
	}

	function setUpSkeletonReply(userInput, e){
		var skeleton = document.getElementsByClassName("commentSkeleton")[0];
		var cloneSkeleton = skeleton.cloneNode(true);
		var replyClass = e.target.parentNode.parentNode.parentNode.parentNode
		var newPost = replyClass.insertBefore(cloneSkeleton, e.target.parentNode.parentNode.parentNode);
		writeNewReply(userInput, newPost);
	}

	function writeNewReply(userInput, newpost){
		newpost.style.display = "flex";
		var textNode = document.createTextNode(userInput);
		var origin = document.getElementsByClassName("commentSkeleton")[0].childNodes[3];
		origin.insertBefore(textNode, origin.childNodes[3]);
		document.getElementsByClassName("commentSkeleton")[0].className = "comment media";
	}

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

	function getComment(){
		userInput = document.getElementsByClassName("opcomment")[0].value;
		document.getElementsByClassName("opcomment")[0].value = "";
		setUpSkeletonComment(userInput);
	}

	function setUpSkeletonComment(userInput){
		var skeleton = document.getElementsByClassName("commentSkeleton")[0];
		var cloneSkeleton = skeleton.cloneNode(true);
		var originalPost = document.getElementsByClassName("post__details")[0];
		var newPost = originalPost.insertBefore(cloneSkeleton, originalPost.childNodes[3].nextSibling.nextSibling);
		writeNewComment(userInput, newPost);
	}

	function writeNewComment(userInput, newpost){
		newpost.style.display = "flex";
		var textNode = document.createTextNode(userInput);
		var origin = document.getElementsByClassName("commentSkeleton")[0].childNodes[3];
		origin.insertBefore(textNode, origin.childNodes[3]);
		document.getElementsByClassName("commentSkeleton")[0].className = "comment media";
	}

	function commentFocus(){
		
		document.getElementsByClassName("opcomment")[0].focus();
	}

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

	function clickShare(e){

		var userName = e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].innerHTML
		var shareThisComment = e.target.parentNode.parentNode.childNodes[3].innerHTML
		document.getElementsByClassName("modal__title")[0].innerHTML = userName;
		document.getElementsByClassName("modal__body")[0].innerHTML = shareThisComment;
		modalDisplay();
	}
	
	var replyCountArray = document.getElementsByClassName("replyCount");
	var likeCountArray = document.getElementsByClassName("likeClick");
	var submitCommentArray = document.getElementsByClassName("submitComment");
	var submitReplyArray = document.getElementsByClassName("submitReply");
	var commentClick = document.getElementsByClassName("action action--comment");
	var nameClick = document.getElementsByClassName("userName");
	var modalXClick = document.getElementsByClassName("modal__close");
	var modalGrayClick = document.getElementsByClassName("modal");
	var shareClick = document.getElementsByClassName("action action--share");


	commentClick[0].addEventListener('click', commentFocus);
	modalXClick[0].addEventListener('click', closeModal);
	modalGrayClick[0].addEventListener('click', closeModal);
	shareClick[0].addEventListener('click', clickShare);
	submitCommentArray[0].addEventListener('click', commentSubmit);

	for (var i = 0; i < replyCountArray.length; i++){
		replyCountArray[i].addEventListener('click', showReplies);
	}

	for (var x = 0; x < likeCountArray.length; x++){
		likeCountArray[x].addEventListener('click', clickLike);
	}

	for (var y = 0; y < submitReplyArray.length; y++){
		submitReplyArray[y].addEventListener('click', replySubmit);
	}

	for (var i = 0; i < nameClick.length; i++){
		nameClick[i].addEventListener('click', userNameModal);
	}
	
});