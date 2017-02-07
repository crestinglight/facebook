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
		}
		else {
			updateCommentCounter();
			alert("There's something here.");
		}
	}

	function updateCommentCounter(){
		commentArray = document.getElementsByClassName("post__info").childNodes[1];
		debugger;
	}

	function commentFocus(){
		
		document.getElementsByClassName("opcomment")[0].focus();
	}
	
	var replyCountArray = document.getElementsByClassName("replyCount");
	var likeCountArray = document.getElementsByClassName("likeClick");
	var submitCommentArray = document.getElementsByClassName("submitComment");
	var commentClick = document.getElementsByClassName("action action--comment");

	commentClick[0].addEventListener('click', commentFocus);

	for (var i = 0; i < replyCountArray.length; i++){
		replyCountArray[i].addEventListener('click', showReplies);
	}

	for (var x = 0; x < likeCountArray.length; x++){
		likeCountArray[x].addEventListener('click', clickLike);
	}

	for (var y = 0; y < submitCommentArray.length; y++){
		submitCommentArray[y].addEventListener('click', commentSubmit);
	}
		// var clicketyLike = document.getElementsByClassName("likeClick")[0];

		// clicketyLike.addEventListener("click", showReplies);
});