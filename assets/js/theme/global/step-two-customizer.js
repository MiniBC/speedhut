import $ from 'jquery';

var CustomizerStepTwoObject = {

	gaugeTypeid : 126,
    gaugeViewing: "",
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
    buildAttributeDropdown: function( attributes ) {

        $("#customFieldAttribute").html("");
        var customfieldsGaugeAttributes = "";

            attributes.forEach(function(item, index, array) {

                customfieldsGaugeAttributes += "<div class='attribute'>";
                customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'>info_outline</i></label>";

                if(item.text.length == 1) {

                    customfieldsGaugeAttributes += "<p> "+ item.text +" </p>";

                } else if( item.text.length > 1 ) {

                    customfieldsGaugeAttributes += "<div class='select-style'>";
                    customfieldsGaugeAttributes += "<select class='attributeOption' >";

                    for(var i = 0; i < item.text.length; i++) { 

                        customfieldsGaugeAttributes += "<option value=" + item.text[i] + "> "+ item.text[i] +" </option>";            

                    }

                    customfieldsGaugeAttributes += "</select>";
                    customfieldsGaugeAttributes += "</div>";

                }

                customfieldsGaugeAttributes += "</div>";

            });

        $("#customFieldAttribute").prepend(customfieldsGaugeAttributes);        

    },
    getGaugeTypeCategories: function( categories ) {

    	for(var i = 0; i < categories.length; i++) {

    		if( categories[i].parent_category_list.indexOf( CustomizerStepTwoObject.gaugeTypeid ) !== -1 ) {

    			gaugeTypeObject.push( categories[i] );

    		}

    	}

    },
    findStartingPrice: function( attributesData ) {

        var lowestPrice = attributesData[attributesData.length - 1][ attributesData[attributesData.length - 1].length - 1 ];

        for( var i = 0; i < attributesData.length; i++ ) {

            for( var k = 0; k < attributesData[i].length; k++ ) {

                if( attributesData[i][ attributesData[i].length - 1 ].price < lowestPrice ) {

                    lowestPrice = attributesData[i][ attributesData[i].length - 1 ].price;

                }

            }

        }

        return lowestPrice;

    },
    displaySelectedGauges: function() {
        
        var selectedGaugeSideBar = "";

        var gaugetotal = 0;

        for(var i = 0; i < window.customizerObject.selectedGauges.length; i++) {

            selectedGaugeSideBar += '<li class="animated fadeIn">';
            selectedGaugeSideBar += "<div class='col-xs-2 col-lg-2 img'><img src=https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/gauge-thumbnail.png?t=1491341476&_ga=1.143031165.995689909.1490710177/></div>";
            selectedGaugeSideBar += '<div class="col-xs-6 col-lg-7">';
            selectedGaugeSideBar += '<div class="gaugeid" style="display:none;">'+ window.customizerObject.selectedGauges[i].gaugeProductId +'</div>';
            selectedGaugeSideBar += ' <div class="title">' + window.customizerObject.selectedGauges[i].gaugeName + '</div> ';
            selectedGaugeSideBar += ' <div class="price">'+ parseFloat(window.customizerObject.selectedGauges[i].gaugePrice).toFixed(2) + '</div> ';
            selectedGaugeSideBar += ' </div> ';
            selectedGaugeSideBar += '<div class="col-xs-3 col-lg-3">';
            selectedGaugeSideBar += " <div class='delete'><a class='removeAttributes' href='#''><i class='material-icons'>delete</i></a></div> ";
            selectedGaugeSideBar += ' <div class="edit"><a href="#" class="editAttributes" ><i class="material-icons">mode_edit</i></a></div> ';
            selectedGaugeSideBar += ' </div> ';
            
            selectedGaugeSideBar += '</li>';

            var number = parseFloat(window.customizerObject.selectedGauges[i].gaugePrice).toFixed(2);
            gaugetotal = parseFloat(number) + parseFloat(gaugetotal);

        }

        console.log( gaugetotal );
        //append total
        $("#gaugetotal").html( gaugetotal.toFixed(2) );
        $("#gaugeSelected").html(selectedGaugeSideBar);

    },
    buildGaugeTypeCards: function() {

    	$("#allAvaiable").html("");

    	for(var i = 0; i < CustomizerStepTwoObject.cacheKitProducts.length; i++) {

    		var selectedKitGauges = "";

		    selectedKitGauges += '<li class="card-item animated fadeIn">';
		    selectedKitGauges += '<div class="img style-img"><img src="https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/dummy-placeholder.jpg?t=1491341974&_ga=1.163658615.995689909.1490710177" /></div>';
		    selectedKitGauges += '<div class="card-content">';
		    selectedKitGauges += '<div class="title"> ' + CustomizerStepTwoObject.cacheKitProducts[i].title + ' </div>';
		   	selectedKitGauges += '<div class="price"><span>Starting From:</span> ' + parseFloat( this.findStartingPrice( CustomizerStepTwoObject.cacheKitProducts[i].attributes ) ).toFixed(2) + ' </div>';
		    // selectedKitGauges += '<div class="description"> ' + item.description + ' </div>';
		    //selectedKitGauges += '<div class="gaugeid" style="display:none"> ' + item.id + ' </div>';
		    selectedKitGauges += '<div class="action-btn"><a class="gaugeType">Select Gauge Attributes</a></div>';
		    selectedKitGauges += "</div>";
		    selectedKitGauges += '</li>';

			$("#allAvaiable").append(selectedKitGauges);

		}

    },
    buildAttributesPage: function(attributes) {

        //console.log(attributes);

        var selectGaugeAttributes = [];

        for(var i = 0; i < attributes.length; i++) {

            //console.log(attributes.length);

            for(var k = 0; k < attributes[i].length-1; k++) {

                //console.log(attributes[i][k].name);
                //console.log(attributes[i][k].text);

                var attributeExist = this.checkIfCustomFieldsAttributeExist(selectGaugeAttributes, attributes[i][k].name);

                //console.log(attributeExist);

                if(attributeExist === true) {

                    var attribute = { "name": attributes[i][k].name, "text" : [ attributes[i][k].text ] };

                    selectGaugeAttributes.push( attribute );

                } else {

                    if( selectGaugeAttributes[attributeExist].text.indexOf( attributes[i][k].text ) == -1 ) {

                        selectGaugeAttributes[attributeExist].text.push( attributes[i][k].text );

                    }

                }


            }

        }


        this.buildAttributeDropdown( selectGaugeAttributes );

    },
    checkIfCustomFieldsAttributeExist: function(customFieldsObject, customFieldName) {

    	for(var i = 0; i < customFieldsObject.length; i++) {

           // console.log( customFieldsObject[i].name );

    		if( customFieldsObject[i].name == customFieldName  ) {
    		
    			return i;
    	
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
    			//console.log( CustomizerStepTwoObject.productsFromKit[i].title );

    			var newObject = [];

    			for(var k = 0; k < CustomizerStepTwoObject.productsFromKit[i].attributes.length; k++) {

	                for(var j = 0; j < CustomizerStepTwoObject.productsFromKit[i].attributes[k].length; j++) {

	                	var doesExist = this.checkIfCustomFieldsAttributeExist( customFieldsObject, CustomizerStepTwoObject.productsFromKit[i].attributes[k][j].name );

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

    	//console.log(this.productsFromKit);

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

            CustomizerStepTwoObject.displaySelectedGauges();

			CustomizerStepTwoObject.cacheKitProducts = {};
            $("#allAvaiable").html("");

           // console.log(window.customizerObject.kitname);

            window.customizerObject.getBcKitData(window.customizerObject.kitname).then(function(data) {

                CustomizerStepTwoObject.cacheKitProducts = JSON.parse(data);

               // console.log( CustomizerStepTwoObject.cacheKitProducts );

            }).then(function() {

                CustomizerStepTwoObject.buildGaugeTypeCards();

            });

		}


		//When the Select Gauge Attributes button is clicked on step2 
		//-- Select gauge attribute has been selected --//
		$( "body" ).on( "click", "#step-two .card-item .action-btn a", function() { //gauge selected function called

		    var customFieldsObject = {}; //Empty object for custom fields

		    var productTitle = $(this).parent().siblings(".title").text(); //Get the title of the gauge that was clicked.

            var priceindex = $(this).parent().parent().parent().index();

            CustomizerStepTwoObject.gaugeViewing = CustomizerStepTwoObject.cacheKitProducts[priceindex];

            CustomizerStepTwoObject.buildAttributesPage( CustomizerStepTwoObject.cacheKitProducts[priceindex].attributes );

		    CustomizerStepTwoObject.findSelectedAttributes( productTitle );
		    
		    $("#attribute-title").html(productTitle); //Set Attributes Title
		    $(".addGauge").show();
		    $(".editGauge").hide();
		    $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content
			

		});


        $( "body" ).on("click", ".lightbox-attributes .action-btn .addGauge", function() {

            var gaugeProperties = [ ];

            $( ".attributeOption" ).each(function( index, value ) {  //get each selected property and add to gaugeProperties array

                var selectedName = $(this).val();

                var labelName = $(this).parent().parent().children().children().first().text();
                var selectedAttributeObject = {};
                selectedAttributeObject[labelName] = selectedName;
                gaugeProperties.push( selectedAttributeObject );
            
            });

            var price = CustomizerStepTwoObject.gaugeViewing.attributes[ CustomizerStepTwoObject.gaugeViewing.attributes.length - 1][ CustomizerStepTwoObject.gaugeViewing.attributes[ CustomizerStepTwoObject.gaugeViewing.attributes.length - 1].length - 1 ].price;

            var selectedGaugeAttributes = {
                "gaugeProductId" : window.customizerObject.selectedGauges.length,
                "gaugeName" : CustomizerStepTwoObject.gaugeViewing.title,
                "gaugePrice" : price,
                "gaugeAttribute" : gaugeProperties
            }

            window.customizerObject.selectedGauges.push( selectedGaugeAttributes );

        // customizerObject.gauges.push({
        //                                 "gaugeName" :  currentGauge, 
        //                                 "gaugePrice" : window.customizerObject,
        //                                 "gaugeAttribute" : gaugeProperties, 
        //                                 "gaugeLayers" : $("#pcCanvas").html(),
        //                                 "gaugeProductId" : selectedGaugeId
        //                             }); 

            CustomizerStepTwoObject.displaySelectedGauges();

            $('.lightbox-attributes').fadeOut(200);


        });

        // -- The remove button has been clicked -- // 
        $( "body" ).on( "click", ".removeAttributes", function() {

            var removedIndex = $(this).parent().parent().parent().index();

            window.customizerObject.selectedGauges.splice(removedIndex, 1);

            $(this).parent().parent().parent().remove();

            CustomizerStepTwoObject.displaySelectedGauges(); //redraw all gauges


        });


        $( "body" ).on("click", ".editAttributes", function() { 
    
            /*
            When the edit attributes button is clicked in the side bar
            */

            //hide add Gauge button
            $(".addGauge").hide();
            $(".editGauge").show();

            $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content


        });

        $( "body" ).on("click", ".lightbox-attributes .action-btn .editGauge", function() {

            // /*
            // When the edit gauge button is clicked in the overlay
            // */

            //console.log( window.customizerObject.selectedGauges );

            // //Get the gaugeproduct id from the object and use it to find which properties in the gauge object to edit, afterwards 
            // for(var i = 0; i < customizerObject.gauges[ editIndex ].gaugeAttribute.length; i++) {

            //     for(var property in customizerObject.gauges[ editIndex ].gaugeAttribute[i] ) {

            //         customizerObject.gauges[ editIndex ].gaugeAttribute[i][property] = $(".attributeOption option:selected")[i].value;

            //     }
            
            // } 

            $('.lightbox-attributes').fadeOut(200);

        });


	});

};

