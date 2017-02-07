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
		likeOrLikes(addLikeNumber);
	}

	function subtractLikeCount(likecounter){		
		addLikeArray = likecounter.split(" ");
		likeNumber = parseInt(addLikeArray[0]);
		subLikeNumber = likeNumber - 1;
		likeOrLikes(subLikeNumber);
	}

	function likeOrLikes(likeNum){
		if (likeNum == 1){
			likeBackToString = addLikeNumber.toString();
			oneLike = likeBackToString + " like";
			return oneLike;
		}
		else {
			likeBackToString = addLikeNumber.toString();
			moreLikes = likeBackToString + " likes";
			return moreLikes;
		}
		
	}
	
	var replyCountArray = document.getElementsByClassName("replyCount");
	var likeCountArray = document.getElementsByClassName("likeClick");

	for (var i = 0; i < replyCountArray.length; i++){
		replyCountArray[i].addEventListener('click', showReplies);
	}

	for (var x = 0; x < likeCountArray.length; x++){
		likeCountArray[x].addEventListener('click', clickLike);
	}
		// var clicketyLike = document.getElementsByClassName("likeClick")[0];

		// clicketyLike.addEventListener("click", showReplies);
});