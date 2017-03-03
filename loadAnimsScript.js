var trianglePointRight = '\u25B6';
var trianglePointBottom = '\u25BC';

function addAnims(array) {  // array[0] == anim dicti // array[i] (where i != 0) == anim name
	var animDictList = document.getElementById('dictList');
	
	var dictItem = document.createElement('li');
	
	
	var playButton = document.createElement('button');
	playButton.id = array[0] + '-play-button';
	playButton.className = 'play-button';
	playButton.appendChild(document.createTextNode(trianglePointRight));
	playButton.onclick = onPlayButtonClick;
	
	var h = document.createElement('h3');
	
	h.appendChild(document.createTextNode(array[0] + '	'));
	h.appendChild(playButton);

	dictItem.appendChild(h);
	dictItem.id = array[0];
	dictItem.className = 'dict-name';
	
	var namesList = document.createElement('ul');
	
	for(var i = 1; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));
		item.className = 'clip-name';
		
        // Add it to the list:
        namesList.appendChild(item);
    }
	
	dictItem.appendChild(namesList);
	
	animDictList.appendChild(dictItem);
}

function addAllAnims() {
	
	var animsDictsCount = animations.length;
	var animsClipsCount = 0;
	
	for(var i = 0; i < animations.length; i++) {
		animsClipsCount += (animations[i].length - 1);
		addAnims(animations[i]);
	}
	
	var animCountP = document.getElementById('animsCount');
	
	animCountP.appendChild(document.createTextNode('There are ' + animsDictsCount + ' animation dictionaries.'));
	animCountP.appendChild(document.createElement('br'));
	animCountP.appendChild(document.createTextNode('There are ' + animsClipsCount + ' animation clips.'));
}

window.onload = init;

function init() {
	addAllAnims();
	var spinLoader = document.getElementById("spinLoader");
	spinLoader.parentNode.removeChild(spinLoader);
	document.getElementById("mainDiv").style.display = "block";
}


var currentOpenPlayButton = null;
var videoPlayerFrame = null;
function onPlayButtonClick() {
	
	if(this != currentOpenPlayButton) // open this
	{
		this.childNodes[0].nodeValue = trianglePointBottom;
		
		if(currentOpenPlayButton != null) // close other
			currentOpenPlayButton.childNodes[0].nodeValue = trianglePointRight;
			
		if(videoPlayerFrame != null && videoPlayerFrame.parentNode != null)
		{
			videoPlayerFrame.parentNode.removeChild(videoPlayerFrame);
		}
		else
		{
			videoPlayerFrame = document.createElement('iframe');
			videoPlayerFrame.setAttribute("allowfullscreen", "allowfullscreen");
		}
		
		
		videoPlayerFrame.className = 'video-player';
		var videoId = getVideoId(this.id.substring(0, this.id.indexOf('-play-button')));
		videoPlayerFrame.src = (videoId == null) ? ('notAvailableYet.html') : ('https://www.youtube.com/embed/' + videoId + '?autoplay=1');
		this.appendChild(videoPlayerFrame);
			
		currentOpenPlayButton = this;
	}
	else // close this
	{
		this.childNodes[0].nodeValue = trianglePointRight;
		if(videoPlayerFrame != null && videoPlayerFrame.parentNode != null)
			videoPlayerFrame.parentNode.removeChild(videoPlayerFrame);
		
		currentOpenPlayButton = null;
	}
	
} 


function getVideoId(animDict)
{
	return videosIds[animDict];
}



