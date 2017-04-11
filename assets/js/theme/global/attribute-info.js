import $ from 'jquery';
/* eslint-disable */

var popupTemplateDetails;
var popupTemplateAttributeOptionsDetails;
var popupTemplateKitDetails;

function buildAttributeDetails ( self ) {

	popupTemplateDetails = "<p><b>" + self.parent().parent().children()[0].innerHTML + "</b></p>";

	popupTemplateDetails += "<p>" + self.parent().parent().children()[1].innerHTML + "</p>";

	popupTemplateDetails += "<hr>";

}

function buildAttributeOptionsDetails( self ) {

	popupTemplateAttributeOptionsDetails = self.parent().children()[0].innerHTML + ": " + "<br>";

	console.log( self.parent().siblings().children() );

	for(var i = 1; i < self.parent().siblings().children()[0].length; i++  ) {

		popupTemplateAttributeOptionsDetails += self.parent().siblings().children()[0][i].innerHTML + "<br>";

	}

	displayPopupWindow( "gaugeAttribute" );

}

function buildAttributeKitDetails( self ) {

	popupTemplateKitDetails = self.parent().parent().children().children(".longDescription").children().text();

	displayPopupWindow( "kits" );

}

function displayPopupWindow( popuptype ) {

 	switch (popuptype) {
            case "gaugeAttribute":  
				var finalwindow = popupTemplateDetails + popupTemplateAttributeOptionsDetails;
            	break;
            case "kits":  
				var finalwindow = popupTemplateKitDetails;
                break;
            default: 
				var finalwindow = "An error has occured, please try again.";
                break;
        }

	var x = window.open('', '', 'width=600,height=300');
    x.document.body.innerHTML = finalwindow;

}


module.exports = function() {

	$(function() {


	});
};


$("body").on("click", ".gaugeType", function() {

	buildAttributeDetails( $(this) );

});


$("body").on("click", ".infoIcon", function() {

	buildAttributeOptionsDetails( $(this) );

});

$("body").on("click", ".kitInfo", function() {

	buildAttributeKitDetails( $(this) );

}); 
/* eslint-enable */
