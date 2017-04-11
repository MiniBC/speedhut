import $ from 'jquery';
/* eslint-disable */

//This script will handle the transition between the 3 gauge steps
window.customizerObject = {

	currentStep: 1,

    loadStepOne: function() {

        $("#step-one").show();
        $("#step-two").hide();
   	    $("#step-three").hide();
    
        $("#first-step").css("color","black");
        $("#second-step").css("color","#999");
        $("#third-step").css("color","#999");

    },
    loadStepTwo: function() {

        window.initsteptwo(); // call the global function within step 2 to load gauges

   		$("#step-one").hide();
        $("#step-two").show();
    	$("#step-three").hide();

   	    $("#first-step").css("color","#999");
        $("#second-step").css("color","black");
        $("#third-step").css("color","#999");

    },
    loadStepThree: function() {

   	    $("#step-one").hide();
        $("#step-two").hide();
   	    $("#step-three").show();

        $("#first-step").css("color","#999");
        $("#second-step").css("color","#999");
        $("#third-step").css("color","black");

    },  
    getBcKitData: function(url) { //This function will return the kit information base on what the user has choosen

        return $.ajax({
            method: "GET",
            data: {"filepathrequest": url },
            url: "http://schurton.com/speedhutcache/crontest.php" 
         }).done(function(response) {

            return response;
        
         }).fail(function(e) {
        
            alert( "error" );
        
        });

    },
    addtionalJsonNeeded: function( requesturl ) {

        return $.ajax({
            method: "GET",
            data: {"bccurl": requesturl},
            url: "http://apps.minibc.com/bcmoreinfo.php" 
         }).done(function(response) {
            
            return response;
        
         }).fail(function(e) {
        
            alert( "error" );
        
        });
    
    } 
     
};

//Create our global Gauge object that will remember all of the users selections 
window.customGaugeObject = {
	
	kitname: "",
    kitid: "",
    selectedGauges: [],

};


//Step 1 in the header was clicked
$("body").on("click", "#step-1", function() {
	customizerObject.loadStepOne();
})
//Step 2 in the header was clicked
$("body").on("click", "#step-2", function() {

	customizerObject.loadStepTwo();

})
//Step 3 in the header was clicked
$("body").on("click", "#step-3", function() {
	customizerObject.loadStepThree();
})


module.exports = function() {

	$(function() {

	});
}; 
/* eslint-enable */
