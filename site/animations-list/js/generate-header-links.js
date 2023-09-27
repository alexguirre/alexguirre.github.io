var div = document.createElement("div");
div.className = "header-links-div";

// GitHub
var githubLink = document.createElement("a");
githubLink.href = "https://github.com/alexguirre";
githubLink.title = "GitHub";

var githubImage = document.createElement("img");
githubImage.style.float = "right";
githubImage.src = document.location.origin + "/alexguirre.github.io/images/github.png";
githubImage.width = 32;
githubImage.height = 32;
githubImage.style.marginRight = "0.25em";
githubImage.style.marginLeft = "0.25em";

githubLink.appendChild(githubImage);


// YT
var youtubeLink = document.createElement("a");
youtubeLink.href = "https://www.youtube.com/channel/UCJxYR4tBSP6dP9fJica6uuw";
youtubeLink.title = "YouTube";

var youtubeImage = document.createElement("img");
youtubeImage.style.float = "right";
youtubeImage.src = document.location.origin + "/alexguirre.github.io/images/youtube.png";
youtubeImage.width = 32;
youtubeImage.height = 32;
youtubeImage.style.marginLeft = "0.25em";

youtubeLink.appendChild(youtubeImage);


// Home
var homeText = document.createElement("h1");

var homeLink = document.createElement("a");
homeLink.href = document.location.origin + "/alexguirre.github.io";
homeLink.className = "header-link";
homeLink.textContent = "alexguirre";

homeText.appendChild(homeLink);


div.appendChild(githubLink);
div.appendChild(youtubeLink);
div.appendChild(homeText);

document.body.appendChild(div);

/* output html
 <div class="header-links-div">
     <a href="https://github.com/alexguirre" ><img style="float: right" src="images/github.png" width="32" height="32"/></a>
     <a href="https://www.youtube.com/channel/UCJxYR4tBSP6dP9fJica6uuw" ><img style="float: right" src="images/youtube.png" width="32" height="32"/></a>
     <h1><a href="./" class="header-link">alexguirre</a></h1>
 </div>
*/