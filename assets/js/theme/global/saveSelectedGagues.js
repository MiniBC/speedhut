import $ from 'jquery';


// var saveGaugeFeatures = {

//     getAllSelectedAttributes: function( cacheType ) {

//     	var title = $("#attribute-title").text().trim();

//     	var selectedAttribute = { "title": title, "attributes":[]};

//     	$("#customFieldAttribute").children(".attribute").each(function( i, val ) {

//     		if ( $(val).children(".select-style").hasClass("select-style") ) {


//     			if( cacheType == "add" ) {

//     				selectedAttribute.attributes.push( $(val).children(".select-style").children(".attributeOption").children("option").val().trim() );

//     			} else if(cacheType == "edit") {

//     				selectedAttribute.attributes.push( $(val).children(".select-style").children(".attributeOption1").children("option").val().trim() );

//     			}


//     		} else {

//     			selectedAttribute.attributes.push( $(val).children(".defaultAttributeOption").text().trim() );

//     		}

//     	});

//     	if( cacheType == "add" ) {

// 	    	window.customizerObject.savedSelectedGauge.push( selectedAttribute ); //Save this object with gauge title and attribute to window object

//     	} else if(cacheType == "edit") {

//     		console.log("editing....");

//     		console.log( window.customizerObject.savedSelectedGauge );

//     		window.customizerObject.savedSelectedGauge.splice( window.customizerObject.globalEditIndex, 1, selectedAttribute );

//     	}

//     }

// };


// $("body").on("click", ".addGauge", function() {

// 	//console.log(window.customizerObject.selectedGauges);
// 	saveGaugeFeatures.getAllSelectedAttributes( "add" );

// 	window.customizerObject.updateSelectedGauges();

// });

// $("body").on("click", ".editGauge", function() {

// 	saveGaugeFeatures.getAllSelectedAttributes( "edit" );

// 	window.customizerObject.updateSelectedGauges();
// 	//console.log( window.customizerObject.getSelectGaugeIndex() );

// 	//console.log(window.customizerObject.selectedGauges);
// 	//console.log( $(val).children(".defaultAttributeOption").children(".attributeOption").children("option").val() );

// 	//console.log( window.customizerObject.savedSelectedGauge );

// });

module.exports = function() {

    $(function() {

    	//check if all-selected-gauges localStorage already has a variable
    	//window.customizerObject.setSelectGaugesFromLocalStroage();

    });
};
