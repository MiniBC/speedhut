import $ from 'jquery';

var CustomizerStepTwoObject = {

	gaugeTypeid : 126,
	gaugeTypeObject : [], // this variable has all gauge categories that are a child of gauge type, pass it to the next objct 
	productsFromKit: [], //this varaible will get all products that belong to a kit.
	customFieldsObject: [],
	cacheKitProducts: {},
    getAllCategories: function() {

		return $.ajax({
            method: "GET",
            data: {"allProductCategories": true},
            url: "http://schurton.com/speedhutcache/styles.php" 
         }).done(function(response) {

            return response;
        
         }).fail(function(e) {
        
            alert( "error" );
        
        });

    },
    getGaugeTypeCategories: function( categories ) {

    	for(var i = 0; i < categories.length; i++) {

    		if( categories[i].parent_category_list.indexOf( CustomizerStepTwoObject.gaugeTypeid ) !== -1 ) {

    			gaugeTypeObject.push( categories[i] );

    		}

    	}

    	//console.log(gaugeTypeObject); // this variable has all gauge categories that are a child of gauge type, pass it to the next objct 


    },
    buildGaugeTypeCards: function() {

    	$("#allAvaiable").html("");

    	for(var i = 0; i < this.productsFromKit.length; i++) {

    		var selectedKitGauges = "";

		    selectedKitGauges += '<li class="card-item animated fadeIn">';
		    selectedKitGauges += '<div class="img style-img"><img src="https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/dummy-placeholder.jpg?t=1491341974&_ga=1.163658615.995689909.1490710177" /></div>';
		    selectedKitGauges += '<div class="card-content">';
		    selectedKitGauges += '<div class="title"> ' + this.productsFromKit[i].title + ' </div>';
		   	selectedKitGauges += '<div class="price"><span>Starting From:</span> ' + parseFloat(this.productsFromKit[i].price).toFixed(2) + ' </div>';
		    // selectedKitGauges += '<div class="description"> ' + item.description + ' </div>';
		    //selectedKitGauges += '<div class="gaugeid" style="display:none"> ' + item.id + ' </div>';
		    selectedKitGauges += '<div class="action-btn"><a class="gaugeType">Select Gauge Attributes</a></div>';
		    selectedKitGauges += "</div>";
		    selectedKitGauges += '</li>';

			$("#allAvaiable").append(selectedKitGauges);

		}

    },
    checkIfGaugeTypeExist: function( currentTitle, itemtest ) { //this function prevents repeted gauge types from showing up. 

    	//console.log(itemtest.custom_fields.customFieldData);

    	for(var i = 0; i < this.productsFromKit.length; i++) {

    		if( this.productsFromKit[i].title === currentTitle ) { 

    			return false;

    		}

    	}

        return true;

    },
    checkIfCustomFieldsAttributeExist: function(customFieldsObject, customFieldName) {

    	//within this function we will loop the customFieldObject and check if for a custom field name this will determine if the function
    	//Format gauge type attribute needs to add a new object to an array or add to an exisiting objects property
    	console.log("inside checkIfCustomFieldsAttributeExist");

    	for(var i = 0; i < customFieldsObject.length; i++) {

    		if( customFieldsObject[i].name === customFieldName  ) {
    		
    			return customFieldsObject[i];
    	
    		}

    	}

    	return true;

    },
    addCustomFields: function( item ) {

    	for(var i = 0; i < item.custom_fields.customFieldData.length; i ++) {

    		for(var k = 0 ; k < this.productsFromKit.length; k++ ) {

    			if( item.custom_fields.customFieldData[i].text == this.productsFromKit[k].title ) {

    				this.productsFromKit[k].attributes.push( item.custom_fields.customFieldData );

    			} 

    		}

    	}

    },
    formatGaugeTypeAttribute: function() {

    	var customFieldsObject = [];

    	var formatGaugeIndex;
      
    	for(var i = 0; i < CustomizerStepTwoObject.productsFromKit.length; i++) {

    		if( CustomizerStepTwoObject.productsFromKit[i].attributes.length > 1) {

    			formatGaugeIndex = i;
    			console.log( CustomizerStepTwoObject.productsFromKit[i].title );

    			var newObject = [];

    			for(var k = 0; k < CustomizerStepTwoObject.productsFromKit[i].attributes.length; k++) {

	                for(var j = 0; j < CustomizerStepTwoObject.productsFromKit[i].attributes[k].length; j++) {

	                	var doesExist = this.checkIfCustomFieldsAttributeExist( customFieldsObject, CustomizerStepTwoObject.productsFromKit[i].attributes[k][j].name );

	                	//console.log(doesExist);

	                	if(doesExist === true) {

	                		var objectDetails = { "name": CustomizerStepTwoObject.productsFromKit[i].attributes[k][j].name, "text": [ CustomizerStepTwoObject.productsFromKit[i].attributes[k][j].text ] };

	                		customFieldsObject.push(objectDetails);

	                	} else {

	                		if( doesExist.text.indexOf( CustomizerStepTwoObject.productsFromKit[i].attributes[k][j].text  ) ) {

	                			console.log(doesExist.text.push( CustomizerStepTwoObject.productsFromKit[i].attributes[k][j].text ));

	                		}

	                	}

	                }

    			}

    			this.productsFromKit[i].attributes = [];
    			this.productsFromKit[i].attributes.push( customFieldsObject );
    		
    		}

    	}

    	console.log(this.productsFromKit);

    },
    doesAttributeExist: function(){

    },
    buildAttributeDropdown: function( attributes ) {

    	$("#customFieldAttribute").html("");
    	var customfieldsGaugeAttributes = "";

    	for(var i = 0; i < attributes.length; i++) {

    	    attributes[i].forEach(function(item, index, array) {


	        	customfieldsGaugeAttributes += "<div class='attribute'>";
                customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'>info_outline</i></label>";

            	if( typeof item.text === 'object' ) {

           			if( item.text.length === 1  ) {

           				customfieldsGaugeAttributes += "<p> "+ item.text +" </p>";

           			} else {

		            	customfieldsGaugeAttributes += "<div class='select-style'>";
		                customfieldsGaugeAttributes += "<select class='attributeOption' >";

			         	   	for(var i = 0; i < item.text.length; i++) { 

			               		customfieldsGaugeAttributes += "<option value=" + item.text[i] + "> "+ item.text[i] +" </option>";            

			                }

			            customfieldsGaugeAttributes += "</select>";
		                customfieldsGaugeAttributes += "</div>";

           			}
                
                } else {
                
              		//customfieldsGaugeAttributes += "<option value=" + item.text + "> "+ item.text +" </option>";
              		customfieldsGaugeAttributes += "<p> "+ item.text +" </p>";            

  
                
                }

                customfieldsGaugeAttributes += "</div>";

    		});
    	}

    	$("#customFieldAttribute").prepend(customfieldsGaugeAttributes);

    	

    },
    findSelectedAttributes: function( selectedGagueType ) {

    	for( var i = 0; i < this.productsFromKit.length; i++ ) {

			if( this.productsFromKit[i].title == selectedGagueType.trim() ) {

				this.buildAttributeDropdown( this.productsFromKit[i].attributes );

			}

    	}

    }

}

module.exports = function() {

	//now we can use kit id to get the products that belong to this kit.
	$(function() {

		//this step needs to pull all produ
		window.initsteptwo = function() {

			CustomizerStepTwoObject.cacheKitProducts = {};
            $("#allAvaiable").html("");
			
			window.customizerObject.getBcKitData(window.customGaugeObject.kitname).then(function( data ) { //Call function to get product data depending on the choosen kit. 

				CustomizerStepTwoObject.cacheKitProducts = JSON.parse(data);

				console.log( CustomizerStepTwoObject.cacheKitProducts );

	    	}).then(function() { //Find all gaugetypes
	        	
	        	var selectedKitGauges = '';
	        	CustomizerStepTwoObject.productsFromKit = [];

	        	//Now call function to set card Data.
		    	CustomizerStepTwoObject.cacheKitProducts.forEach( function( item, index, array ) {
	            	
		    		for(var i = 0; i < item.custom_fields.customFieldData.length; i++) {

		    			if( item.custom_fields.customFieldData[i].name == "Gauge Type" ) {

		    				console.log( item.custom_fields.customFieldData[i] );

		    				//check if title is already in gauge object 
		    				var inObject  = CustomizerStepTwoObject.checkIfGaugeTypeExist( item.custom_fields.customFieldData[i].text, item );

		    				if( inObject ) {

		    					var gaugeTypeObject = { 
		    											"title" : item.custom_fields.customFieldData[i].text, 
		    											"attributes": [],
		    											"price": item.price						
		    										};
		    					CustomizerStepTwoObject.productsFromKit.push( gaugeTypeObject );

		    				}

		    				CustomizerStepTwoObject.addCustomFields( item );

		    			}

		    		}

	        	})

	    	}).then(function() { //Now format customfields with multiple attributes

	    		CustomizerStepTwoObject.formatGaugeTypeAttribute();

	    	}).then(function() {

	    		CustomizerStepTwoObject.buildGaugeTypeCards();
	    		console.log(CustomizerStepTwoObject.productsFromKit);

	    	}); //object forEach closes;

		}


		//When the Select Gauge Attributes button is clicked on step2 
		//-- Select gauge attribute has been selected --//
		$( "body" ).on( "click", "#step-two .card-item .action-btn a", function() { //gauge selected function called

            //alert("hello world!!!!");

		    var customFieldsObject = {}; //Empty object for custom fields
		    //var selectedGaugeId = $(this).parent().siblings(".gaugeid").text(); //get AttributesId
		    var productTitle = $(this).parent().siblings(".title").text(); //Get the title of the gauge that was clicked.
            //var guagePrice = $(this).parent().siblings(".price").text();

            var priceindex = $(this).parent().parent().parent().index();

            //console.log(guagePrice);

            window.customizerObject = CustomizerStepTwoObject.productsFromKit[priceindex].price;

            //console.log( CustomizerStepTwoObject.productsFromKit[priceindex].price );

		    CustomizerStepTwoObject.findSelectedAttributes( productTitle );
		    
		    $("#attribute-title").html(productTitle); //Set Attributes Title
		    $(".addGauge").show();
		    $(".editGauge").hide();
		    $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content
			

		});


	});

};

