//storing messages from html block with respect to id's

all_messages = document.getElementById('all_messages');
input = document.getElementById('input');
bot_block = document.getElementById('bot_block');
user_block = document.getElementById('user_block');

//ID 
msgno = 0; 

var flag=false;

//import data from json file

var products;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    products = JSON.parse(xhttp.responseText);
  }
};

xhttp.open("GET", "data.json", true);
xhttp.send();


//function to take input from the user


function taketheinput(event) {

	// if user hit's the enter key
	if(event.key === "Enter"){
		//creates use message id
		all_messages.innerHTML += user_block.outerHTML;
		// changes it's id
		msgno += 1;
		all_messages.lastChild.id = msgno;
		//changes it's text
		all_messages.lastChild.childNodes[3].textContent = input.value;
		//here processes the input
		processinput(input.value.toLowerCase());
		input.value = "";

	}
}


// function to process user input message

function processinput(inputval){
	if(inputval!=""){
		// bot message block created
		all_messages.innerHTML += bot_block.outerHTML
		// changes it's ID
		msgno += 1
		all_messages.lastChild.id = msgno
		//changing its text
		all_messages.lastChild.childNodes[3].textContent = reply(inputval)
	}
}


// function to reply user's message


function reply(inputval) {

	//regex to check input message matching...
	msg = inputval.match(/(demo)|(\w+)/g)
	
	// storing words in a variable for checking the user message..botimg

	var words = "colours brands images features demo more fitbit amazonalexa airconditioner refrigerator sportshoes thankyou thanks buynow";
	
	//condition to give reply to user's when they enter name...

	if(words.includes(inputval)==false && flag==false){
        flag=true;
        return "Hii "+inputval.toUpperCase()+"!!! Enter the product name u want to know!! The available products are 1)fitbit 2)alexa 3)airconditioner 4)refrigerator 5)sportshoes"
	}
	//from here bot check's the user's meggage is present or not..

    if(msg.includes("colours")){
        var img = document.createElement('img');
		img.src=recentproduct.images; 
		document.getElementById(msgno).appendChild(img);
		return recentproduct.colours
	}
	
    if(msg.includes("brands")){
		
		//creating new element and append's it..

        var img = document.createElement('img'); 
		img.src=recentproduct.more; 
		document.getElementById(msgno).appendChild(img);
        return recentproduct.brands
	}
	
    if(msg.includes("features")){
		return recentproduct.features
	}

    if(msg.includes("demo")){
		//iframe
		var iframe = document.createElement('iframe'); 
		//gets embeded video from data ..
		iframe.src=recentproduct.video
		document.getElementById(msgno).appendChild(iframe);
		return "Watch this demo of product!!👇🏻";
	}
	
	//if user enter buynow..
    if(msg.includes("buynow")){
		// bot will open website in new tab..

        window.open("https://www.amazon.com/");
        return recentproduct.buynow
	}

	//bot greets here !!
	if(msg.includes("thankyou") || msg.includes("thanks")){
		return "You are welcome:) 🤗"
	}

	ans="";
	msg.forEach(function(product){
		if(products.hasOwnProperty(product)){
		//It is to ask the details of the product when user enters the product name..
		ans = "Please Enter the details you want to know. For Ex: 1) colours 2) brands, 3) features 4)demo 5)buynow etc"
        recentproduct = products[product];
        }
	})

	if(ans){
		return ans;
	}

	//returns if the user's message is not available...
	return "Sorry " + inputval + " is not available!! Explore available products🤗";
}