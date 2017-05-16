import $ from 'jquery';
/* eslint-disable */

window.productFromClickedCustomizeGaugeButton = {

    selectedGaugeId: 0,

}

//This script will handle the transition between the 3 gauge steps
window.customizerObject = {

    allGaugeKits: "",
	currentStep: 1,
    priceset: 0,
    kitname: "",
    kitid: 0,
    selectedGauges: [],
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

        window.initstepthree();

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
    
    },
    savedSelectedGauge: function() {

        //save gauges to localStorage
        //localStorage.setItem( "myselectedGauges", JSON.stringify( window.customizerObject.selectedGauges ) );

    },
    setSelectGaugesFromLocalStroage: function() {

        //window.customizerObject.selectedGauges = JSON.parse( localStorage.getItem( "myselectedGauges" ) );

    }
     
};

//Step 1 in the header was clicked
$("body").on("click", "#step-1", function() {

	customizerObject.loadStepOne();

})

//Step 2 in the header was clicked
$("body").on("click", "#step-2", function() {

    //if( window.customizerObject.kitname !== "" ) {
	
       customizerObject.loadStepTwo();
    
    //} else {

        //alert("select a kit to continue....");

    //}

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
