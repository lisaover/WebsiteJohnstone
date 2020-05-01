
function init() {
	
activeColor = 'rgb(255, 226, 170)';
activeBkground = 'rgb(170, 132, 57)';
hoverColor = 'rgb(85, 56, 0)';
hoverBkground = 'rgb(255, 226, 170)';
deactiveColor = 'rgb(128, 91, 21)';
deactiveBkground = 'rgb(212, 176, 106)';

//define global record class with show, hide prototype methods
Record = function (current, previous) {
  this.current = current;
  this.previous = previous;
  this.currContent = "c_" + current;
  this.prevContent = "c_" + previous;
};
Record.prototype.hidePrevious = function() {
  document.getElementById(this.prevContent).style.display = 'none';
};
Record.prototype.showContent = function() {
  document.getElementById(this.currContent).style.display = 'block';
};
Record.prototype.hideContent = function() {
  document.getElementById(this.currContent).style.display = 'none';
};
Record.prototype.activateLink = function() {
	var el = document.getElementById(this.current);
	el.style.color = activeColor;
	el.style.background = activeBkground;
	el.removeEventListener("mouseover",hoverLink,false);
   	el.removeEventListener("mouseout",resetLink,false);
};
Record.prototype.resetLinks = function() {
		
		//reset all content links except current
		for (var i = 0; i < arrayNav1ID.length; i++) {
			var link = document.getElementById(arrayNav1ID[i]);
    			if(arrayNav1ID[i] != this.current) {
    				link.style.color = deactiveColor;
					link.style.background = deactiveBkground;
					link.addEventListener("mouseover",hoverLink,false);
   					link.addEventListener("mouseout",resetLink,false);
    			}
		}	

}; //end resetLinks

//store nav IDs, add event listeners to links and hide content divs
	arrayNav1 = [];
	arrayNav1ID = [];
	
	nav1Div = document.getElementById("nav");
	
			arrayNav1 = nav1Div.getElementsByTagName("a");
							arrayNav2Div = new Array(arrayNav1.length);
							arrayNav2 = [];
							arrayNav2ID = [];
							onloadContent2 = new Array(arrayNav1.length);
				for (var i = 0; i < arrayNav1.length; i++) {
					//set array of nav 1 IDs
				   	arrayNav1ID[i] = arrayNav1[i].getAttribute("id");
				   			/**FOR SECONDARY NAVIGATION STRUCTURE - SEE EASTON AUTHORS
				   			//set array of nav 2 divs
							arrayNav2Div[i] = "t_" + 	arrayNav1ID[i];
							nav2Div = document.getElementById(arrayNav2Div[i]);
							//set array of nav 2 IDs	
							arrayNav2 = nav2Div.getElementsByTagName("a"); 
							for (var j = 0; j< arrayNav2.length; j++) {	
									arrayNav2ID[j] = arrayNav2[j].getAttribute("id");
									var el2 = document.getElementById(arrayNav2ID[j]);
									el2.addEventListener("click",displayContent2,false);
										var rec2 = new Record(arrayNav2ID[j], '');
    									rec2.hideContent();
								}
								//set onload ID for level 2
								onloadContent2[i] = arrayNav2ID[0];
					**/
							
				   	//get nav 1 elements by id, add event listeners, and hide them
				   	var el1 = document.getElementById(arrayNav1ID[i]);
    				el1.addEventListener("click",displayContent1,false);
    				el1.addEventListener("mouseover",hoverLink,false);
   					el1.addEventListener("mouseout",resetLink,false);
    					var rec1 = new Record(arrayNav1ID[i], '');
    					rec1.hideContent();
					}
					//set onload ID for level 1
					onloadContent1 = arrayNav1ID[0];
					
//**** USE corresponding elements of arrayNav1ID and onloadContent2 FOR DISPLAYING level 2 onload components
	
	//create global instance of Record 1 with id parameter for current var set to desired default content
	currentRecord1 = new Record(onloadContent1, '');
	//show content for onload currentRecord1
   currentRecord1.showContent();
   //activate tab that corresponds to current content1
   currentRecord1.activateLink();
   
   /**FOR SECONDARY NAVIGATION STRUCTURE - SEE EASTON AUTHORS
   //create global instance of Record 2 with id parameter for current var set to desired default content
	currentRecord2 = new Record(onloadContent2[0], '');
	//show content for onload currentRecord2
   currentRecord2.showContent();
   **/

} //end init

function displayContent1(evt) {
	
		//blur the selection rectangle for IE
		if(navigator.appName == 'Microsoft Internet Explorer') this.blur();
		
  		//prevent link from being followed
		evt.preventDefault();
			
 		//create a new record instance, store previous ID, get id of selected content element as current
 		currentRecord1 = new Record(evt.currentTarget.getAttribute("id"), currentRecord1.current);
 		
 		/**FOR SECONDARY NAVIGATION STRUCTURE - SEE EASTON AUTHORS
 		//reset the level 2 record and display onload content for the selection
 		for (var i = 0; i < onloadContent2.length; i++) {
 			if (currentRecord1.current == arrayNav1ID[i]) {
 				//hide current content 2
 				currentRecord2.hideContent();
				//create global instance of Record 2 with id parameter for current var set to desired default content
				currentRecord2 = new Record(onloadContent2[i], '');
				//show content for onload currentRecord2
   				currentRecord2.showContent();	
 			}
 			
 		}
 		**/
 		
 		//show current content and hide previous content
 		currentRecord1.hidePrevious();
 		currentRecord1.showContent();	
 		//activate corresponding link for current content and deactivate all other links
 		currentRecord1.activateLink();
 		currentRecord1.resetLinks();
		
}

function displayContent2(evt) {
	
		//blur the selection rectangle for IE
		if(navigator.appName == 'Microsoft Internet Explorer') this.blur();
		
  		//prevent link from being followed
			evt.preventDefault();
			
 		//create a new record instance, store previous ID, get id of selected content element as current
 		currentRecord2 = new Record(evt.currentTarget.getAttribute("id"), currentRecord2.current);
 		
 		//show current content and hide previous content
 		currentRecord2.hidePrevious();
 		currentRecord2.showContent();	
 		//activate corresponding link for current content and deactivate all other links
 		//currentRecord2.activateLink();
 		//currentRecord2.resetLinks();
		
}

/**
	resetLink is called on mouseout to style the dashboard links visited since page refresh (browser refresh not refresh button)
	because the refresh button breaks the css stylesheet 'a' styling
*/
function resetLink(evt) {
		
		var link = document.getElementById(evt.currentTarget.getAttribute("id"));
		link.style.color = deactiveColor;
		link.style.background = deactiveBkground;

} //end resetLink

/**
	hoverLink is called on mouseover to style the dashboard links visited since page refresh (browser refresh not refresh button)
	because the refresh button breaks the css stylesheet 'a:hover' styling
*/
function hoverLink(evt) {
	
	var link = document.getElementById(evt.currentTarget.getAttribute("id"));
	link.style.color = hoverColor;
	link.style.background = hoverBkground;

} //end hoverLink