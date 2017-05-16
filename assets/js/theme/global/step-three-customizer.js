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

			$(".selectedGaugePreivew").append( "<img class='img-preview' src='https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/dummy-placeholder.jpg?t=1491341974&_ga=1.163658615.995689909.1490710177'>" );


		}

		console.log( window.customizerObject.selectedGauges );

	},
	setStepThreeGaugePreview: function() {
	
		var gaugeElement;

		var backgroundLayer = $("#pcCanvas").html();

		console.log(backgroundLayer);

		for(var i = 0; i < window.customizerObject.selectedGauges.length; i++) {

			var gaugePreivew = backgroundLayer;

			window.customizerObject.selectedGauges[i].dayTimeGaugePreviewLayyer = "";
			window.customizerObject.selectedGauges[i].dayTimeGaugePreviewLayyer = gaugePreivew;


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

		window.initstepthree = function() { //called when page loads

			CustomizerStepThreeObject.setSettings();
			CustomizerStepThreeObject.setStepThreeGaugePreview();

		}

	});

	$("body").on("click", ".img-preview", function() {

		CustomizerStepThreeObject.currentEditIndex = $(this).index();

		$(".img-preview").removeClass("img-preview-select");
		$(this).addClass("img-preview-select");

		window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer;

		$("#pcCanvas").html( window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer );


	});

	$("body").on("click", ".apply-to-kit", function() {

		//alert("kit");
		CustomizerStepThreeObject.saveToAllGauges();

	});

	$("body").on("click", ".apply-to-gauge", function() {

		CustomizerStepThreeObject.saveStyleToSelectedGauge();
		

	});

	$("body").on("click", "#daynight", function() {


		//$("#pcCanvas").html( window.customizerObject.selectedGauges[ CustomizerStepThreeObject.currentEditIndex ].dayTimeGaugePreviewLayyer );


		//alert("switch daynight");

	});

	//when day/night is toggled set index to display the correctly selected gauge.


};