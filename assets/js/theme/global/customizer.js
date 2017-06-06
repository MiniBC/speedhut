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
    globalEditIndex: 0,
    totalKitPrice: 0,
    savedSelectedGauge: [],
    editGaugeButtonStep3: 0,
    loadStepOne: function() {

        $("#step-one").show();
        $("#step-two").hide();
        $("#step-three").hide();

        $("#first-step").css("color","black");
        $("#second-step").css("color","#999");
        $("#third-step").css("color","#999");

        $(".selectedGaugePreivew").html("");


    },
    loadStepTwo: function() {

        if( this.kitname !== "" ) {

            window.initsteptwo(); // call the global function within step 2 to load gauges

        	$("#step-one").hide();
            $("#step-two").show();
        	$("#step-three").hide();

        	$("#first-step").css("color","#999");
            $("#second-step").css("color","black");
            $("#third-step").css("color","#999");

        } else {

            alert("Please, Select a kit to start selecting your gauges");

        }

    },
    loadStepThree: function() {

        if( this.selectedGauges.length > 0 ) {

            window.initstepthree();

       	    $("#step-one").hide();
            $("#step-two").hide();
       	    $("#step-three").show();

            $("#first-step").css("color","#999");
            $("#second-step").css("color","#999");
            $("#third-step").css("color","black");

        } else {

            alert("Please, Select a Gauge to start customizing it.");

        }

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
    setLocalHostKitName: function() {

        localStorage.setItem( "my-selected-kit-name", window.customizerObject.kitname ); //Set the Kit Name on local Storage

    },
    updateSelectedGauges: function() {

        localStorage.setItem( "all-selected-gauges", JSON.stringify( window.customizerObject.selectedGauges ) );

    },
    setSelectGaugesFromLocalStroage: function() {

        if( localStorage.getItem("all-selected-gauges") ) {

            window.customizerObject.selectedGauges = JSON.parse( localStorage.getItem( "all-selected-gauges" ) );

        }

    },
    setSelectGaugeIndex: function( index ) {

        window.customizerObject.globalEditIndex = index;

    },
    getSelectGaugeIndex: function() {

        return window.customizerObject.globalEditIndex;

    },
    setSortValues: function( arrayToSetValuesTo ) {

        var itemSortOrder = [

            [1, "Vehicle"],
            [2, "Gauge Type"],
            [3, "Gauge Size"],
            [4, "Combo Options"],
            [5, "Controller Compatibility"],
            [6, "Fuel Level Signal Type"],
            [7, "Pressure Sender Type"],
            [8, "Speedometer Signal Type"],
            [9, "Tachometer Signal Type"],
            [10, "Temp Sender Type"],
            [11, "Voltage Signal Type"],
            [12, "Standard/Metric"],
            [13, "Air/Fuel Range"],
            [14, "Boost Range"],
            [15, "Dual Ranges"],
            [16, "Pressure Range"],
            [17, "Quad Ranges"],
            [18, 'RPM Range'],
            [19, "Speed Range"],
            [20, "Temperature Range"],
            [21, "Vac/Boost Range"],
            [22, "Vacuum Range"],
            [23, "Volt Range"],
            [24, "Pointer Sweep/Digital"],
            [25, "Warning Light"],
            [26, "Turn Signals and High Beam Indicator"],
            [27, "Sweep Direction"],
            [28, "Internal Shift Light"],
            [29, "Mount Style"],
            [30, "Auxiliary Shift Light Compatible"],
            [31, "Auxiliary Shift Light Included"],
            [32, "With Inclinometer"],
            [33, "Window"],
            [34, "OldSKU"]

        ];

        for( var i = 0; i < itemSortOrder.length; i++ ) {

            for( var k = 0; k < arrayToSetValuesTo.length; k++ ) {

                if( itemSortOrder[i][1] == arrayToSetValuesTo[k].name ) {

                    arrayToSetValuesTo[k].sortOrderId = itemSortOrder[i][0];

                }

            }

        }

        return arrayToSetValuesTo;

    },
    sortGaugeFeatures: function( arrayValuesToSort ) {

        var arraywithSortOrderIds = this.setSortValues( arrayValuesToSort );


        arraywithSortOrderIds.sort( function(a, b) {

            return a.sortOrderId - b.sortOrderId;

        });

        return arraywithSortOrderIds;

    },
    displayGaugeSpecs: function(index) {

        var gaugespecs = window.customizerObject.selectedGauges[index];
        var gaugeHTML = "";

        $(".gauge-spec-preview").html(""); //clear any html in the section

        for( var i = 0; i < gaugespecs.gaugeAttribute.length; i++ ) {

            var gaugeSpecName = gaugespecs.gaugeAttribute[i].name;

            if( typeof gaugespecs.gaugeAttribute[i].text === "object" ) {

                var gaugeSpecFeature = gaugespecs.gaugeAttribute[i].text[0];

            } else if( typeof gaugespecs.gaugeAttribute[i].text === "string" ) {

                var gaugeSpecFeature = gaugespecs.gaugeAttribute[i].text;

            }

            gaugeHTML += "<li><b>" + gaugeSpecName + ": </b>" + gaugeSpecFeature + "</li>";

        }

        $(".gauge-spec-preview").append( gaugeHTML );


    },
    displayGaugePreviewSpecs: function(index, element) {

      var gaugespecs = window.customizerObject.selectedGauges[index];
      var gaugeHTML = "";

      element.html(""); //clear any html in the section

      for( var i = 0; i < gaugespecs.gaugeAttribute.length; i++ ) {

          var gaugeSpecName = gaugespecs.gaugeAttribute[i].name;

          if( typeof gaugespecs.gaugeAttribute[i].text === "object" ) {

              var gaugeSpecFeature = gaugespecs.gaugeAttribute[i].text[0];

          } else if( typeof gaugespecs.gaugeAttribute[i].text === "string" ) {

              var gaugeSpecFeature = gaugespecs.gaugeAttribute[i].text;

          }

          gaugeHTML += "<li><b>" + gaugeSpecName + ": </b>" + gaugeSpecFeature + "</li>";

        }

        element.append( gaugeHTML );

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

$("body").on("click", "#backbutton", function() {

    customizerObject.loadStepTwo();

})


module.exports = function() {

	$(function() {

	});
};
/* eslint-enable */
