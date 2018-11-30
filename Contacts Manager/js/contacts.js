/* 
Activity : Contacts manager
*/

console.log("Welcome in your contact manager !");

var exit = false;

// Object discribing a contact
var Contact = {
	famName: "",
	name: "",

    //Initialize the contact
    init: function(famName,name){ 
		this.famName = famName;
		this.name = name;
	},	
		
	//Display the contact
	display: function(){ 
		console.log("Family name : " + this.famName + ", Name : " + this.name);
	}
};

// Initial Contacts
var contactInit1 = Object.create(Contact);
contactInit1.init("Lévisse","Carole");

var contactInit2 = Object.create(Contact);
contactInit2.init("Nelsonne","Mélodie");

// Create and fill the array
var tabContacts = [];
tabContacts.push(contactInit1);
tabContacts.push(contactInit2);

var choice;
while (exit === false){
	
	console.log("1 to display the saved Contacts");
	console.log("2 to add a new contact");
	console.log("3 to quit the Contact Manager");
	
	choice = Number(prompt("What do you want to do ?"));
	
	switch(choice){
		case 1:
		    console.log("This is your Contacts list");
		    for(var i=0; i<tabContacts.length; i++){
				tabContacts[i].display();
			}
			break;
		
		case 2:
            var famName = prompt("Enter the family name : ");
            var name = prompt("Enter the name : ");
            var newContact = Object.create(Contact);
            newContact.init(famName,name);
            tabContacts.push(newContact);
            console.log("You add a new contact successfully");
			break;
		
		case 3:
		    exit = true;
			break;
		
		default:
			console.log("Please enter a valid choice (1, 2 or 3)");
	}
	console.log("\n");
}	

console.log("See you soon !");
