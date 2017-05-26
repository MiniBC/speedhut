import $ from 'jquery';
import magnific from './magnific';

var CustomizerStepThreeObject = {  //start of step three object

	currentEditIndex: 0,

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

			$(".selectedGaugePreivew").append( "<img class='img-preview' id="+i+" src='https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/dummy-placeholder.jpg?t=1491341974&_ga=1.163658615.995689909.1490710177'>" );


		}

		console.log( window.customizerObject.selectedGauges );

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

		$("#customizer_layer_2").css("left","0");
		$("#customizer_layer_2").css("top","0");
		
	}


} //End of step three object

module.exports = function() {

	$(function() {

		console.log( window.customizerObject.priceset );

		window.initstepthree = function() { //called when page loads

			CustomizerStepThreeObject.setSettings();
			CustomizerStepThreeObject.setStepThreeGaugePreview();
			window.customizerObject.displayGaugeSpecs(0);

			console.log(" loading step 3...... ");

			$(".price--withoutTax").html( "$" + window.customizerObject.totalKitPrice ); // add final price to step 3 price total.
			$("#0").addClass( "img-preview-select" );
			//console.log( window.customizerObject.totalKitPrice );

		}

	});

	$("body").on("click", ".img-preview", function() {

		CustomizerStepThreeObject.currentEditIndex = $(this).attr("id");

		$(".img-preview").removeClass("img-preview-select");
		$(this).addClass("img-preview-select");

		window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer;

		$("#pcCanvas").html( window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer );

		window.customizerObject.displayGaugeSpecs( CustomizerStepThreeObject.currentEditIndex );

	});

	$("body").on("click", ".apply-to-kit", function() {

		CustomizerStepThreeObject.saveToAllGauges();

		window.customizerObject.updateSelectedGauges();

	});

	$("body").on("click", ".apply-to-gauge", function() {

		CustomizerStepThreeObject.saveStyleToSelectedGauge();
		
		window.customizerObject.updateSelectedGauges();
		

	});

	$("body").on("click", ".edit-gauge-feature-step3", function() {

		//window.customizerObject.loadStepTwo();

		window.customizerObject.editGaugeButtonStep3 = $(".img-preview-select").attr("id");


	});

	//when day/night is toggled set index to display the correctly selected gauge.


};