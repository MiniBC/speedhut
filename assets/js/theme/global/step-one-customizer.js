import $ from 'jquery';

//make an ajax call to get all kits 
var CustomizerStepOneObject = {

	buildStepOneCards : function( gaugeKit ) {

        for( var i = 0; i < gaugeKit.length; i++ ) {

			var card;

			card = ' <li class="card-item"><div>';
			card += ' <div class="img"><img src=https://store-ta980ko58k.mybigcommerce.com/product_images/' + this.parseImg( gaugeKit[i].image_file  ) + ' /></div> ';
			card += ' <div class="card-content"> ';
			card += ' <div class="title"> ' + gaugeKit[i].name + '</div> ';
			card += ' <div class="description">' + this.parseShortDescription(gaugeKit[i].description) + '</div> ';
			card += ' <div class="longDescription" style="display:none">' + gaugeKit[i].description + '</div> ';
			card += ' <i class="material-icons kitInfo"><a href="javascript:void(0);">info_outline</a></i> ';
			card += ' <span class="kitid" style="visibility:hidden" >' + gaugeKit[i].id + '</span>';
			card += ' <span class="kitname" style="visibility:hidden" >' + gaugeKit[i].name + '</span>';
			card += ' <div class="action-btn startsteptwo"><a href="#step-two" class="Step Two" tabindex="0">START WITH ' + gaugeKit[i].name + '</a></div> ';
			card += '</div></li>';

			$("#customize-started").append(card);

		}

	},
	parseImg: function( imgPath ) {

		var imgPathLength = imgPath.length;
		var trimmedimgPath = imgPath.substring(0, imgPathLength - 3);

		var newimgPath = trimmedimgPath + "original.jpg";
		return newimgPath;
	
	},
	parseShortDescription: function( shortDescription ) {

		return shortDescription.substring(0, 90) + "...";

	},
	getAllGaugeKits : function(  ) {

		var self = this;

		$.ajax({

			method: "GET",
	        data: {gaugeKits: true},
	        url: "http://schurton.com/speedhutcache/styles.php" 

		}).done(function( response ) {

			//Parse JSON
			var gaugeKitJson = JSON.parse(response);

			self.buildStepOneCards( gaugeKitJson );

		})
	},
	
}

//Step one : A Kit Was Selected
$( "body" ).on( "click", ".startsteptwo", function(  ) {

	window.customGaugeObject.kitname = $(this).siblings(".kitname").text();

	window.customizerObject.currentStep = 2; //set the customizer stage
	//window.customGaugeObject.kitname = $(this).parent().parent().parent().children(".title").text();
	window.customGaugeObject.kitid = $(this).parent().parent().children(".kitid").text();

    $("#style-page-title").html(window.customGaugeObject.kitname); //set name of header on step.2

	window.customizerObject.loadStepTwo(); //load stage 2 of the customizer

});


module.exports = function() {

	$(function(){

		CustomizerStepOneObject.getAllGaugeKits();

	});

};
