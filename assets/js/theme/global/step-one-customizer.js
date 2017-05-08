import $ from 'jquery';
import magnific from './magnific';

//make an ajax call to get all kits 
var CustomizerStepOneObject = {

	buildStepOneCards : function( gaugeKit ) {

        for( var i = 0; i < gaugeKit.length; i++ ) {

			var card;

			card = ' <li class="card-item animated fadeIn"><div>';
			card += ' <div class="img"><img src=https://store-ta980ko58k.mybigcommerce.com/product_images/' + this.parseImg( gaugeKit[i].image_file  ) + ' /></div> ';
			card += ' <div class="card-content"> ';
			card += ' <div class="title"> ' + gaugeKit[i].name + '</div> ';
			card += ' <div class="description">' + this.parseShortDescription(gaugeKit[i].description) + '</div> ';
			card += ' <div class="longDescription" style="display:none">' + gaugeKit[i].description + '</div> ';
			card += ' <i class="material-icons kitInfo"><a class="kitmodal popup-step1" href="#popup-step1" data-effect="mfp-zoom-in">info_outline</a></i> ';
			card += ' <span class="kitid" style="visibility:hidden" >' + gaugeKit[i].id + '</span>';
			card += ' <span class="kitname" style="visibility:hidden" >' + gaugeKit[i].name + '</span>';
			card += ' <div class="action-btn startsteptwo"><a href="#step-two" class="Step Two" tabindex="0">START WITH ' + gaugeKit[i].name + '</a></div> ';
			card += '</div></li>';

			$("#customize-started").append(card);

		}
		
		    $('.popup-step1').magnificPopup({
			      type:'inline',
			      removalDelay: 500, //delay removal by X to allow out-animation
			  callbacks: {
			    beforeOpen: function() {
			       this.st.mainClass = this.st.el.attr('data-effect');
			    }
			  },
			  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		

	},
	parseImg: function( imgPath ) {

		var imgPathLength = imgPath.length;
		var trimmedimgPath = imgPath.substring(0, imgPathLength - 3);

		var newtrimmedimgPath = trimmedimgPath.replace(/ /g, '%20');

		var newimgPath = newtrimmedimgPath + "original.jpg";

		return newimgPath;
	
	},
	parseShortDescription: function( shortDescription ) {

		return shortDescription.substring(0, 150) + "...";

	},
	getAllGaugeKits : function(  ) {

		var self = this;

		$.ajax({

			method: "GET",
	        data: {gaugeKits: true},
	        url: "http://schurton.com/speedhutcache/styles.php" 
	        //url: "http://schurton.com/speedhutcache/styles.php" 


		}).done(function( response ) {

			//Parse JSON
			var gaugeKitJson = JSON.parse(response);

			self.buildStepOneCards( gaugeKitJson );

		})
	},
	populateModal: function( ) {



	}
	
}

$("body").on("click", ".kitmodal", function() {

	var kittitle = $(this).parent().siblings(".kitname").text();
	var kitdescription = $(this).parent().siblings(".longDescription").html();

	$("#modaltitle").text( kittitle );
	$("#modaldescription").html( kitdescription );

});

//Step one : A Kit Was Selected
$( "body" ).on( "click", ".startsteptwo", function(  ) {

	window.customizerObject.selectedGauges = []; //empty array of selected gauges because a new kit has been selected.

	window.customizerObject.kitname = $(this).siblings(".kitname").text();

	window.customizerObject.currentStep = 2; //set the customizer stage
	window.customizerObject.kitid = $(this).parent().parent().children(".kitid").text();

    $("#style-page-title").html(window.customizerObject.kitname); //set name of header on step.2

	window.customizerObject.loadStepTwo(); //load stage 2 of the customizer

});


module.exports = function() {

	$(function(){

		CustomizerStepOneObject.getAllGaugeKits();

	});

};
