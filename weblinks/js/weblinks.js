/* 
Web Links
*/

// List of web links to display.
// A link is defined by :
// - his title
// - his URL
// - his author 
var linksList = [
    {
        title: "So Foot",
        url: "http://sofoot.com",
        author: "yann.usaille"
    },
    {
        title: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        author: "paulochon"
    },
    {
        title: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        author: "annie.zette"
    }
];


var addButtonElmt = document.getElementById("addButton");
var topElmt = document.getElementById("top");

// The form and his elements
var formElmt = document.createElement("form");
	
var authorElmt = document.createElement("input");
authorElmt.type = "text";
authorElmt.name = "auteur"
authorElmt.required = true;
authorElmt.placeholder = "Enter your name";

var linkTitleElmt = document.createElement("input");
linkTitleElmt.type = "text";
linkTitleElmt.name = "titre";
linkTitleElmt.required = true;
linkTitleElmt.placeholder = "Enter the title of the link";
	
var linkElmt = document.createElement("input");
linkElmt.type = "text";
linkElmt.name = "url";
linkElmt.required = true;
linkElmt.placeholder = "Enter the URL of the link";
	
var submitElmt = document.createElement("input");
submitElmt.type = "submit";
submitElmt.value = "Add";


// The confirmation message
var confirmAddElmt = document.createElement("p");

// STYLES
// I set a lot of styles here in order to learn how to do it in Javascript
// However the still should be declared in the css file.

confirmAddElmt.style.padding = '10px';
confirmAddElmt.style.fontSize = '25px';
confirmAddElmt.style.backgroundColor = '#95B5FE';
confirmAddElmt.style.color = '#6074A2';

authorElmt.style.padding = '5px';	
authorElmt.style.margin = '5px';
authorElmt.style.marginLeft = '0px';

linkTitleElmt.style.padding = '5px';
linkTitleElmt.style.margin = '5px';	

linkElmt.style.padding = '5px';	
linkElmt.style.margin = '5px';	

addButtonElmt.style.borderRadius = '12px 0 12px 0';
addButtonElmt.style.background = '#478bf9';
addButtonElmt.style.border = 'none';
addButtonElmt.style.color = '#fff';
addButtonElmt.style.font = 'bold 16px Arial';
addButtonElmt.style.padding = '5px 10px 5px 10px';

submitElmt.style.borderRadius = '12px 0 12px 0';
submitElmt.style.background = '#478bf9';
submitElmt.style.border = 'none';
submitElmt.style.color = '#fff';
submitElmt.style.font = 'bold 16px Arial';
submitElmt.style.padding = '5px 10px 5px 10px';

authorElmt.style.borderRadius = '5px';

linkTitleElmt.style.borderRadius = '5px';

linkElmt.style.borderRadius = '5px';

// Hide the form
formElmt.hidden = true;

// Add the elements to the form and to the web page
formElmt.appendChild(authorElmt);
formElmt.appendChild(linkTitleElmt);
formElmt.appendChild(linkElmt);
formElmt.appendChild(submitElmt);
topElmt.appendChild(formElmt);


// Get and display the link list from the server
ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens",function(response){
	
	// Data Conversion
	var linksTab = JSON.parse(response);
	
	// Loop on the linksTab
	for(var i=0; i<linksTab.length; i++){
	
		var parag = document.createElement("p");
		var titleClick = document.createElement("a");
		var bold = document.createElement("strong");

		// Bold clickable title
		titleClick.href = linksTab[i].url;
		titleClick.textContent = linksTab[i].titre;
		bold.appendChild(titleClick);
	                                                
		// Add the title and the link to the paragraph
		parag.appendChild(bold);
		parag.appendChild(document.createTextNode(" " + linksTab[i].url));

		// Add a <br> tag for the starting a new line
		parag.appendChild(document.createElement("br"));
		parag.appendChild(document.createElement("br"));
    
		// Add the author
		parag.appendChild(document.createTextNode("Added by " + linksTab[i].auteur));

		//STYLES
		parag.style.backgroundColor = "white";
		parag.style.padding = '10px';

		titleClick.style.color = '#428bca';
		titleClick.style.textDecoration = 'none';
		titleClick.style.fontSize = '19px';
    
		// Add to the website
		document.getElementById("content").appendChild(parag);
	}
		
})	

// Listener to display the reinitialized adding form
addButtonElmt.addEventListener("click", function(){
	
	// Reinitialize the form fields
	formElmt.reset();
    
    // Display the form
	formElmt.hidden = false;
	
	// Hide the initial add button
	addButtonElmt.hidden = true;
	
});

// Listener to submit a new link
formElmt.addEventListener("submit", function(e) {
		
	// Regular expression that will test the begining of the URL
	var regex = /^(http:\/\/.+|https:\/\/.+)/;
	if(!regex.test(linkElmt.value)){
		linkElmt.value = "http://"+linkElmt.value ;
	} 

	// Get the data from the form
	var data = new FormData(formElmt);

    // Send the data to the server
	ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien",data, function(response){

		var parag = document.createElement("p");
		var titleClick = document.createElement("a");
		var bold = document.createElement("strong");

		// Bold Clickable Title
		titleClick.href = linkElmt.value;
		titleClick.textContent = linkTitleElmt.value;
		bold.appendChild(titleClick);
	
		// Add the title and the link to the new paragraph
		parag.appendChild(bold);
		parag.appendChild(document.createTextNode(" " + linkElmt.value));

		// Add a <br> tag for the starting a new line
		parag.appendChild(document.createElement("br"));
		parag.appendChild(document.createElement("br"));
    
		// Add the author
		parag.appendChild(document.createTextNode("Added by " + authorElmt.value));
    
		// Style for the new link
		parag.style.backgroundColor = "white";
		parag.style.padding = '10px';
		titleClick.style.color = '#428bca';
		titleClick.style.textDecoration = 'none';
		titleClick.style.fontSize = '19px';

		// Add to the top of the list of the website
		topElmt.parentNode.insertBefore(parag, topElmt.nextSibling);

		// Set the confirmation message
		confirmAddElmt.textContent = "The link \"" + linkTitleElmt.value + "\" was successfully added."
		confirmAddElmt.appendChild(document.createElement("br"));
	
		// Display the confirmation message
		confirmAddElmt.hidden = false;
	
		// Hide the confirmation message after 2s
		setTimeout( function(){
			confirmAddElmt.hidden = true;
		},2000);

		topElmt.insertBefore(confirmAddElmt, addButtonElmt);
	},false); 

	// Hide the form
	formElmt.hidden = true;
        
	// Display the add button
    addButtonElmt.hidden = false;
	
	e.preventDefault();
});
