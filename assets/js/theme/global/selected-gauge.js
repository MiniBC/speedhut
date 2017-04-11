// // user will get redirected to the product page on click

// // we need to check the value of the url after the http://localhost:3000/SST-Shift-Light---Blue-LEDs-with-Silver-Aluminum-Tube--Smart-Shift-Technology-/

// //use a switch to check if the product name is one of the ford gt kit type

// //if it is we will start step2 apply a variable that the ford kit was selected 

// var selectedGauge;

// function addSelectedGauge( gauge ) {
	
// 	var selectedGaugeSideBar = "";

//         selectedGaugeSideBar += '<li>';
//         selectedGaugeSideBar += "<div class='col-xs-3 col-lg-3 img'><img src=http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/style-demo.jpg /></div>";
//         selectedGaugeSideBar += '<div class="col-xs-7 col-lg-7">';
//         selectedGaugeSideBar += ' <div class="title">' + gauge + '</div> ';
//         selectedGaugeSideBar += ' <div class="edit"><a href="#" class="editAttributes" >Edit Attributes</a></div> ';
//         selectedGaugeSideBar += ' </div> ';
//         selectedGaugeSideBar += " <div class='col-xs-2 col-lg-2 delete'><a class='removeAttributes' href='#''><img src=http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/delete-gauge.png /></a></div> ";
//         selectedGaugeSideBar += '</li>';


//     $("#gaugeSelected").html(selectedGaugeSideBar);

// }

// function buildCardsGauges( productKitsObject ) {

// 	$("#allAvaiable").html("");

// 	var steptwoSelectedKitGauges = "";

// 	for( var i = 0; i < productKitsObject.length; i++ ) {

// 		steptwoSelectedKitGauges += '<li class="card-item">';
// 	    steptwoSelectedKitGauges += '<div class="img style-img"><img src="" /></div>';
// 	    steptwoSelectedKitGauges += '<div class="card-content">';
// 	    steptwoSelectedKitGauges += '<div class="title"> ' + productKitsObject[i].name + ' </div>';
// 	    // steptwoSelectedKitGauges += '<div class="description"> ' + productKitsObject[i].description + ' </div>';
// 	    steptwoSelectedKitGauges += '<div class="action-btn"><a class="gaugeType">Select Gauge Attributes</a></div>';
// 	    steptwoSelectedKitGauges += "</div>";
// 	    steptwoSelectedKitGauges += '</li>';

// 	}

// 	$("#allAvaiable").append(steptwoSelectedKitGauges);

// }

// function addtionalJsonNeeded( requesturl ) {

//     return $.ajax({
//             method: "GET",
//             data: {"bccurl": requesturl},
//             url: "http://minibc.dev/bcmoreinfo.php" 
//      }).done(function(response) {

//         return response;
    
//      });

// }


// function resetSelectDropDown() {

//     $( ".attributeOption" ).each(function( index, value ) {

//         $(this).val("");
    
//     });

// }

// function attributesSelected() {

//     $('.addGauge').prop('disabled', true);
//     $('.editGauge').prop('disabled', true);

//     //each time the selected menu is changed this function is called to validate that all of the dropdowns are selected
//     //If all dropdowns have a value we will the add / edit button

//     $( ".attributeOption" ).each(function( index, value ) {

//         if( $(this).val() !== "" ) {

//             console.log("enable");
            
//             $('.addGauge').prop('disabled', false);
//             $('.editGauge').prop('disabled', false);

//         } else {

//             console.log("disable");


//             $('.addGauge').prop('disabled', true);
//             $('.editGauge').prop('disabled', true);

//             return false;

//         }    

//     });

// }

// function processCustomFields( productObject ) {

//     productObject.forEach( function( item, index, array ) {

//         //get and resolve data for custom fields
//         addtionalJsonNeeded( item.custom_fields.url ).then(function(data) {

//         	window.selectedKitObject[ index ].customFieldData = data
//             //item.customFieldData = data;

//         });

//     });

// }

// function getParameterByName(name, url) {
//     if (!url) {
//       url = window.location.href;
//     }
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// module.exports = function() {

// 	var currentSelectedGauge = getParameterByName("gaugeid");

// 	if( currentSelectedGauge == null ) {

// 		console.log("do nothing");


// 	} else {

// 		$("#step-one").hide();
// 		$("#step-two").show();

// 	}

// }

// module.exports = function () {

// 	//document.localtion = "http://localhost:3000/customizerapp/";

// //http://www.speed-hut2.mybigcommerce.com/customizerapp/

// //	history.pushState("", "", "http://localhost:3000/customizerapp/");
// 	history.pushState("", "", "http://www.speed-hut2.mybigcommerce.com/customizerapp/");



// 	var currentSelectedGauge = localStorage.getItem("selectedGauge");

// 	if( currentSelectedGauge == null) {

// 		//call function to load step 2
// 		console.log("do nothing");

// 	} else {


// 		addSelectedGauge(currentSelectedGauge);

// 		$("#step-one").hide();
// 	    $("#step-two").show();

// 	    $("#first-step").css("color","#999");
// 	    $("#second-step").css("color","black");
// 	    $("#third-step").css("color","#999");


// 	    //Now we need to get the kit id that the product belongs too. Call BC API to get this product ID. 

// 	    var url = "https://store-ta980ko58k.mybigcommerce.com/api/v2/products.json?name="+currentSelectedGauge;
// 	    var parsedurl = encodeURI(url); 

// 		window.addtionalJsonNeeded( parsedurl ).then(function(data) {

// 			var selectedProductCategories = data[0].categories;

// 			for (var i = 0; i < selectedProductCategories.length; i++ ) {

// 				var url = "https://store-ta980ko58k.mybigcommerce.com/api/v2/categories/" + selectedProductCategories[i] + ".json";
// 				var categoriesParseUrl = encodeURI( url );

// 				window.addtionalJsonNeeded( categoriesParseUrl ).then(function(data) {

// 					if( data.parent_id === 118 && data.id === 119) { // currently only configure to handle FordGT gauge

// 						window.setCustomGaugeKit(data.name, currentSelectedGauge);

// 						var url = "https://store-ta980ko58k.mybigcommerce.com/api/v2/products.json?category=" + data.id;
// 						var productCategoriesParseUrl = encodeURI( url );

// 						window.addtionalJsonNeeded( productCategoriesParseUrl ).then(function( productKitsObject ) {

// 							//send data to function to get custom-fields
// 							processCustomFields( productKitsObject );

// 							//now custom fileds
// 							window.selectedKitObject = productKitsObject;

// 							console.log( productKitsObject ); //all products associated with the kit are in this variables
// 							buildCardsGauges( productKitsObject );

// 						});

// 					}

// 				});

// 			}

// 		});

// 	}

// };

// $("body").on("click", ".card", function(e) {

// 	var gaugeName = $(this).children().children().children('a').text();

// 	localStorage.setItem("selectedGauge", gaugeName);

// });


// //$(".card-figure").body

// //The following 

// // 2-5/8" Ford GT Volt Gauge

// // 2-5/8" Ford GT Oil psi Gauge

// // 2-5/8" Ford GT Boost Gauge

// // 2-5/8" Ford GT Water Temp gauge

// // 2-5/8" Ford GT Fuel level Gauge

// // 4-1/2" Ford GT Speedometer

// // 4" Ford GT Tachometer with Shift lights

// // 4" Ford GT Tachometer No Shift Lights

