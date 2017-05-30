import $ from 'jquery';
import magnific from './magnific';


var CustomizerStepThreeObject = {  //start of step three object

	currentEditIndex: 0,
	// one of the ways to build these objects is save them here on each change?
	// then whenever the Apply to Kit button is pressed
	//
	customizedGauges: [],

	saveStyleToSelectedGauge: function() {

		var currentGaugeSelection = $("#pcCanvas").html();

		console.log( CustomizerStepThreeObject.currentEditIndex );
		console.log( $("#pcCanvas").html() );

		window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer = currentGaugeSelection;

		console.log( window.customizerObject.selectedGauges );

	},
	saveToAllGauges: function() {

		var currentGaugeSelection = $("#pcCanvas").html();

		for(var i = 0; i < window.customizerObject.selectedGauges.length; i++) {

			window.customizerObject.selectedGauges[ i ].dayTimeGaugePreviewLayyer = currentGaugeSelection;

		}

	},
	buildStepThreeGaugePreview: function() {

		var gaugePreviewSection;

		$(".selectedGaugePreivew").html("");

		for(var i = 0; i < window.customizerObject.selectedGauges.length; i++) {

			if(i % 3 == 0) {

				$(".selectedGaugePreivew").append("<br>");
			}

			// HERE WE HAVE TO APPEND THE SAME CODE THAT'S INSIDE THE MAIN GAUGE
			$(".selectedGaugePreivew").append( "<div class='gauge-preview-container' id='gauge-preview-container-"+i+"'><img class='img-preview' id="+i+" src='https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/dummy-placeholder.jpg?t=1491341974&_ga=1.163658615.995689909.1490710177'></div>" );
			// if changes have been made to the gauge, it should update its preview
			// $(".selectedGaugePreivew").append()

			// TEMPORARY
			// $('.layer_logo').remove();
			// $('.layer_lcd').remove();
		}

		console.log( window.customizerObject.selectedGauges );

	},
	swapGaugePreview: function() {
		var gaugePreviewSection;
		var previewGauge = $('#cloneclass').clone();
		previewGauge.attr('id', CustomizerStepThreeObject.currentEditIndex);
		previewGauge.addClass('gauge-preview-item');
		// to make it selectable again
		previewGauge.addClass('img-preview'); // or should it be: img-preview-select

		$('#gauge-preview-container-' + CustomizerStepThreeObject.currentEditIndex).html("");
		$('#gauge-preview-container-' + CustomizerStepThreeObject.currentEditIndex).append(previewGauge);
		// $('#'+idOfGaugeChanged).html(mainGauge);
		// $('.layer_logo').remove();
		// $('.layer_lcd').remove();
	},
	swapGaugeKitPreview: function() {
		// Currently it takes the main one and updates all the images with it

		var quantityGauges = window.customizerObject.selectedGauges.length;
		// console.log(quantityGauges);

		var $currentGaugeClone;
		// var $gaugeClonesArr = [];

		for (var index = 0; index < quantityGauges; index++) {
			$currentGaugeClone = $('#cloneclass').clone();
			$currentGaugeClone.addClass('gauge-preview-item');
			$currentGaugeClone.addClass('img-preview'); // or should it be: img-preview-select
			$currentGaugeClone.attr('id', index);

			// swap. (if it is slow, then swap them later after cloning is done in this loop)
			$('#gauge-preview-container-' + index).html("");
			$('#gauge-preview-container-' + index).append($currentGaugeClone);
		}

	},
	setStepThreeGaugePreview: function() {

		var gaugeElement;

		var backgroundLayer = $("#pcCanvas").html();

		console.log(backgroundLayer);

		for(var i = 0; i < window.customizerObject.selectedGauges.length; i++) {

			var gaugePreivew = backgroundLayer;
			//var nightGaugePreview = nightBackgroundLayer;

			window.customizerObject.selectedGauges[i].dayTimeGaugePreviewLayyer = "";
			window.customizerObject.selectedGauges[i].dayTimeGaugePreviewLayyer = gaugePreivew;

			// window.customizerObject.selectedGauges[i].nightTimeGaugePreviewLayyer = "";
			// window.customizerObject.selectedGauges[i].nightTimeGaugePreviewLayyer = "";

		}

		CustomizerStepThreeObject.buildStepThreeGaugePreview();

	},
	setSettings: function() {

		// $("#customizer_layer_2").css("left","0");
		// $("#customizer_layer_2").css("top","0");

		$(".cancel").text("Close");
		$(".apply-to-gauge").remove();

	}


} //End of step three object

module.exports = function() {

	$(function() {

		console.log( window.customizerObject.priceset );

		window.initstepthree = function() { //called when page loads

			CustomizerStepThreeObject.setSettings();
			CustomizerStepThreeObject.setStepThreeGaugePreview();
			// show title of the first gauge loaded
			$('.productView-title').text(window.customizerObject.selectedGauges[0].gaugeName);

			window.customizerObject.displayGaugeSpecs(0);

			console.log(" loading step 3...... ");

			$(".price--withoutTax").html( "$" + window.customizerObject.totalKitPrice ); // add final price to step 3 price total.
			$("#0").addClass( "img-preview-select" );
			//console.log( window.customizerObject.totalKitPrice );

		}

	});

	$("body").on("click", ".img-preview", function() {

		var currentID = $(this).attr("id");
		CustomizerStepThreeObject.currentEditIndex = currentID;
		// change title
		$('.productView-title').text(window.customizerObject.selectedGauges[currentID].gaugeName);

		$(".img-preview").removeClass("img-preview-select");
		$(this).addClass("img-preview-select");

		window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer;

		$("#pcCanvas").html( window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer );

		window.customizerObject.displayGaugeSpecs( CustomizerStepThreeObject.currentEditIndex );

	});

	$("body").on("click", "")

	$("body").on("click", ".apply-to-kit", function() {

		CustomizerStepThreeObject.saveToAllGauges();

		window.customizerObject.updateSelectedGauges();

		CustomizerStepThreeObject.swapGaugeKitPreview();

		// CustomizerStepThreeObject.buildStepThreeGaugePreview();

		// close the the menu
		$('.options-overlay').toggle();

		console.log('*&*&*&*&*&*&*&*&*&*');
		console.log(window.customizerObject.selectedGauges[0].gaugeName);
	});

	$("body").on("click", ".customizer_option_value", function() {

		// after this function is run, we need to update the preview of gauges with their mini versions
		CustomizerStepThreeObject.saveStyleToSelectedGauge();

		window.customizerObject.updateSelectedGauges();

		CustomizerStepThreeObject.swapGaugePreview(0);

		// close the the menu
		//$('.options-overlay').toggle();

	});

	// $("body").on("click", ".apply-to-gauge", function() {
	// 	// after this function is run, we need to update the preview of gauges with their mini versions
	// 	CustomizerStepThreeObject.saveStyleToSelectedGauge();

	// 	window.customizerObject.updateSelectedGauges();

	// 	CustomizerStepThreeObject.swapGaugePreview(0);
	// });

	$("body").on("click", ".edit-gauge-feature-step3", function() {

		//window.customizerObject.loadStepTwo();

		window.customizerObject.editGaugeButtonStep3 = $(".img-preview-select").attr("id");


	});

	//when day/night is toggled set index to display the correctly selected gauge.


};
