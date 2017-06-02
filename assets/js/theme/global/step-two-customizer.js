import $ from 'jquery';
import magnific from './magnific';

var CustomizerStepTwoObject = {

	gaugeTypeid : 126,
    gaugeViewing: "",
	gaugeTypeObject : [], // this variable has all gauge categories that are a child of gauge type, pass it to the next objct 
	productsFromKit: [], //this varaible will get all products that belong to a kit.
	customFieldsObject: [],
	cacheKitProducts: {},
    selectGaugeAttributes : [],
    editIndex: 0,
    addToSelectedGaugeFlag: false,
    settingAttributeStatus: "",
    findMatchingPriceForSelectedAttributes: function(attributes, selectedAttributes) {

        var matches = 0;
        var setPrice = 0;
        
        for(var i = 0; i < selectedAttributes.attributes.length; i++) {

            var currentMatches = 0;

            for(var k = 0; k < selectedAttributes.attributes[i].length; k++) {

                if( typeof selectedAttributes.attributes[i][selectedAttributes.attributes[i].length - 1] !== "undefined" ) {

                    for(var j = 0; j < attributes.length; j++) {

                        if( selectedAttributes.attributes[i][k] !== "OldSKU" && selectedAttributes.attributes[i][k] !== "Gauge Type" ) {

                            if( typeof attributes[j].text == "object" ) {

                                if( selectedAttributes.attributes[i][k].name == attributes[j].name ) {

                                    if( selectedAttributes.attributes[i][k].text == attributes[j].text[0] ) {

                                        currentMatches++;

                                    } 

                                }

                            } else if( typeof attributes[j].text == "string" ) {

                                if( selectedAttributes.attributes[i][k].name == attributes[j].name ) {

                                    if( selectedAttributes.attributes[i][k].text == attributes[j].text ) {

                                        currentMatches++;

                                    } 

                                }

                            }
        
                        }

                        if(currentMatches >= matches) {

                            matches = currentMatches;
                            setPrice = selectedAttributes.attributes[i][k].price;

                        }

                    }

                }

            }

        }

        return setPrice;

    },
    getPriceForCustomProduct: function(title, attributes) {

        for(var i = 0; i < this.cacheKitProducts.length; i++) {
            
            if( this.cacheKitProducts[i].title == title) {

                return this.findMatchingPriceForSelectedAttributes( attributes, this.cacheKitProducts[i] );

            }

        }

    },
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
    reBuildGaugeAttributesPage: function( selectedAttribute, unSelectedOptions) {


        var orderedSelectGaugeAttributes = window.customizerObject.sortGaugeFeatures( this.selectGaugeAttributes ); // sort user selected saved values.


        var customfieldsGaugeAttributes = "";

        var hasdropdown = false;
        var hideSubmitGaugeButton = false;
        
        // this happens 
        console.log("ordering........");
        console.log(orderedSelectGaugeAttributes);
        console.log("----------------------------------------");



        //now with we rebuild the attributes page
        orderedSelectGaugeAttributes.forEach(function(item, index, array) {

            if( item.name !== "OldSKU" && item.name !== "Gauge Type" ) {

                if( item.status == "set" ) {

                    customfieldsGaugeAttributes += "<div class='attribute'>";
                    customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'><a class='attributeinfo' href='#openModal' >info_outline</a></i></label>";

                    if(item.text.length == 1) {

                        customfieldsGaugeAttributes += "<p class='defaultAttributeOption' > "+ item.text +" </p>";

                    } else if( item.text.length > 1 ) {

                            hasdropdown = true;

                            customfieldsGaugeAttributes += "<div class='select-style'>";

                            if( CustomizerStepTwoObject.settingAttributeStatus == "add" ) {
                            
                                customfieldsGaugeAttributes += "<select class='attributeOption' >";
                            
                            } else if( CustomizerStepTwoObject.settingAttributeStatus == "edit" ) {

                                customfieldsGaugeAttributes += "<select class='attributeOption1' >";

                            }

                            for(var i = 0; i < item.text.length; i++) { 

                                customfieldsGaugeAttributes += "<option value='" + item.text[i] + "'> "+ item.text[i] +" </option>";            

                            }

                            customfieldsGaugeAttributes += "</select>";
                            customfieldsGaugeAttributes += "</div>";


                    }

                    customfieldsGaugeAttributes += "</div>";

                } else if( item.status == "unset" ) {

                    hideSubmitGaugeButton = true;


                    customfieldsGaugeAttributes += "<div class='attribute'>";
                    customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'><a class='attributeinfo' href='#openModal' >info_outline</a></i></label>";

                    if(item.text.length == 1) {

                        customfieldsGaugeAttributes += "<p class='defaultAttributeOption' > "+ item.text +" </p>";

                    } else if( item.text.length > 1 ) {

                            hasdropdown = true;

                            customfieldsGaugeAttributes += "<div class='select-style'>";

                            if( CustomizerStepTwoObject.settingAttributeStatus == "add" ) {
                            
                                customfieldsGaugeAttributes += "<select class='attributeOption' >";
                            
                            } else if( CustomizerStepTwoObject.settingAttributeStatus == "edit" ) {

                                customfieldsGaugeAttributes += "<select class='attributeOption1' >";

                            }

                            customfieldsGaugeAttributes += "<option value=''> " + "Please Select A Feature" + " </option>";            


                            for(var i = 0; i < item.text.length; i++) { 

                                customfieldsGaugeAttributes += "<option value='" + item.text[i] + "'> "+ item.text[i] +" </option>";            

                            }

                            customfieldsGaugeAttributes += "</select>";
                            customfieldsGaugeAttributes += "</div>";


                    }

                    customfieldsGaugeAttributes += "</div>";

                } else if( item.status == "locked" ) {

                    hideSubmitGaugeButton = true;


                    customfieldsGaugeAttributes += "<div class='attribute'>";
                    customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'><a class='attributeinfo' href='#openModal' >info_outline</a></i></label>";

                    if(item.text.length == 1) {


                        customfieldsGaugeAttributes += "<p class='default   ' > "+ item.text +" </p>";

                    } else if( item.text.length > 1 ) {

                            hasdropdown = true;

                            customfieldsGaugeAttributes += "<div class='select-style unselectedFeature'>";
                            
                            if( CustomizerStepTwoObject.settingAttributeStatus == "add" ) {
                            
                                customfieldsGaugeAttributes += "<select disabled class='attributeOption' >";
                            
                            } else if( CustomizerStepTwoObject.settingAttributeStatus == "edit" ) {

                                customfieldsGaugeAttributes += "<select disabled class='attributeOption1' >";

                            }
                            
                            customfieldsGaugeAttributes += "<option value=''> " + "Please Select A Feature" + " </option>";            


                            for(var i = 0; i < item.text.length; i++) { 

                                customfieldsGaugeAttributes += "<option value='" + item.text[i] + "'> "+ item.text[i] +" </option>";            

                            }

                            customfieldsGaugeAttributes += "</select>";
                            customfieldsGaugeAttributes += "</div>";


                    }

                    customfieldsGaugeAttributes += "</div>";

                }

            }

        });
        
        this.hideGaugeSubmitButton(hideSubmitGaugeButton, CustomizerStepTwoObject.settingAttributeStatus);
        this.setGaugeAttributePageDescription(hasdropdown);
        $("#customFieldAttribute").html(customfieldsGaugeAttributes);        

    },
    addUnselectedOptions: function( attributename, selectedAttribute, unSelectedOptions ) {

        //with the first instance of a drop down we will make unset can be changed
        //all the drop downs after will be locked and unable to be changed

        var locked = false;
        //push selectedAttribute in to the array unSelectedOption***

        //loop this.selectedGaugeAttributes look for a name that matches "attributename"
        for(var i = 0; i < this.selectGaugeAttributes.length; i++) {
            
            if( this.selectGaugeAttributes[i].name !== "OldSKU" && this.selectGaugeAttributes[i].name !== "Gauge Type" ) {

                if( this.selectGaugeAttributes[i].text.length == 1 ) {

                    this.selectGaugeAttributes[i].status = "set";

                }

                if( this.selectGaugeAttributes[i].name == attributename ) {

                    this.selectGaugeAttributes[i].status = "set";
                    this.selectGaugeAttributes[i].text = [];
                    this.selectGaugeAttributes[i].text[0] = selectedAttribute.trim();
                    this.selectGaugeAttributes[i].text = this.selectGaugeAttributes[i].text.concat(unSelectedOptions);


                } else if( this.selectGaugeAttributes[i].status != "set" && locked === false && this.selectGaugeAttributes[i].text.length > 1) {

                    locked = true;

                    this.selectGaugeAttributes[i].status = "unset";

                } else if ( locked == true && this.selectGaugeAttributes[i].text.length > 1) {

                    this.selectGaugeAttributes[i].status = "locked";

                }

            }

        }
        
        //add an addtional attribute on the object or array called selected

    },
    formatSelectedAttribute: function( attributesObject, attributename, selectedAttribute, unSelectedOptions ) {

        //now we create a new object for our new gauge

        for(var i = 0; i < attributesObject.length; i++) {

            for(var k = 0; k < attributesObject[i].length-1; k++) {

                var attributeExist = this.checkIfCustomFieldsAttributeExist(this.selectGaugeAttributes, attributesObject[i][k].name);

                if(attributeExist === true) {

                    var attribute = { "name": attributesObject[i][k].name, "text" : [ attributesObject[i][k].text ] };

                    this.selectGaugeAttributes.push( attribute );

                } else {

                    if( this.selectGaugeAttributes[attributeExist].text.indexOf( attributesObject[i][k].text ) == -1 ) {

                        this.selectGaugeAttributes[attributeExist].text.push( attributesObject[i][k].text );

                    }

                }


            }

        }


        //now add mark the selectedAttribute as selected and push the unSelectedOptions into the array.
        CustomizerStepTwoObject.addUnselectedOptions( attributename, selectedAttribute, unSelectedOptions ); //set the attributes function 

        CustomizerStepTwoObject.reBuildGaugeAttributesPage( selectedAttribute, unSelectedOptions );

    },
    handleSelectedAttributes: function( attributename, selectedAttribute, unSelectedOptions ) {

        var attributeObject = [];

        for(var i = 0; i < CustomizerStepTwoObject.cacheKitProducts.length; i++ ) { // loop cachekitproducts object

            if( CustomizerStepTwoObject.cacheKitProducts[i].title === CustomizerStepTwoObject.gaugeViewing.title ) { //look in the object for correctly matched title

                for(var k = 0; k < CustomizerStepTwoObject.cacheKitProducts[i].attributes.length; k++) {

                        for(var j = 0; j < CustomizerStepTwoObject.cacheKitProducts[i].attributes[k].length - 1; j++) {

                            if( CustomizerStepTwoObject.cacheKitProducts[i].attributes[k][j].text.trim() == selectedAttribute.trim() ) {
                                
                                attributeObject.push( CustomizerStepTwoObject.cacheKitProducts[i].attributes[k] ); // save the attibutes ones we have found them in the cahced object

                            }

                        }

                    //}

                } 

            }

        }

        //console.log(attributeObject); //this object now has all of the attributes that belong to this gauge type for the drop down. 
        this.formatSelectedAttribute( attributeObject, attributename, selectedAttribute, unSelectedOptions ); //this object now has all of the attributes that belong to this gauge type for the drop down.

    },
    buildAttributeDropdown: function( attributes ) {

        //this attribute builder only happens the first time before any dropdowns are changed
        $("#customFieldAttribute").html("");
        var customfieldsGaugeAttributes = "";

        var gaugedropdownindex = 0;
        var hasdropdown = false;
        var hideSubmitGaugeButton = false;

        var orderedAttributes = window.customizerObject.sortGaugeFeatures( attributes ); // sort user selected saved values.


            orderedAttributes.forEach(function(item, index, array) {

                if( item.name !== "OldSKU" && item.name !== "Gauge Type" ) {

                    customfieldsGaugeAttributes += "<div class='attribute'>";
                    customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'><a class='attributeinfo' href='#openModal' >info_outline</a></i></label>";

                    if(item.text.length == 1) { //just display as text

                        customfieldsGaugeAttributes += "<p class='defaultAttributeOption' > "+ item.text +" </p>";


                    } else if( item.text.length > 1 ) {

                        hasdropdown = true;
                        hideSubmitGaugeButton = true;

                        gaugedropdownindex++;

                        if ( gaugedropdownindex > 1 ) {

                            customfieldsGaugeAttributes += "<div class='select-style unselectedFeature'>";
                            customfieldsGaugeAttributes += "<select disabled class='attributeOption ' >";

                            customfieldsGaugeAttributes += "<option value=''> " + "Please Select A Feature" + " </option>";            

                            for(var i = 0; i < item.text.length; i++) { 

                                customfieldsGaugeAttributes += "<option value='" + item.text[i] + "'> "+ item.text[i] +" </option>";            

                            }

                            customfieldsGaugeAttributes += "</select>";
                            customfieldsGaugeAttributes += "</div>";

                        } else {

                            customfieldsGaugeAttributes += "<div class='select-style'>";
                            customfieldsGaugeAttributes += "<select class='attributeOption' >";

                            customfieldsGaugeAttributes += "<option value=''> " + "Please Select A Feature" + " </option>";            


                            for(var i = 0; i < item.text.length; i++) { 

                                customfieldsGaugeAttributes += "<option value='" + item.text[i] + "'> "+ item.text[i] +" </option>";            

                            }

                            customfieldsGaugeAttributes += "</select>";
                            customfieldsGaugeAttributes += "</div>";

                        }

                    }

                    customfieldsGaugeAttributes += "</div>";

                }

            });

        this.hideGaugeSubmitButton(hideSubmitGaugeButton, "add");
        this.setGaugeAttributePageDescription( hasdropdown );
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

        var lowestPrice = 1000;
        
        for( var i = 0; i < attributesData.length; i++ ) {

            for( var k = 0; k < attributesData[i].length; k++ ) {

                if( typeof attributesData[i][k].price !== "undefined" ) {

                    if( lowestPrice > parseFloat(attributesData[i][k].price) ) {

                        lowestPrice = attributesData[i][k].price;

                    }

                }

            }

        }
        
        return lowestPrice;

    },
    displaySelectedGauges: function() {
        
        var selectedGaugeSideBar = "";

        var gaugetotal = 0;

        if( window.customizerObject.selectedGauges.length == 0 ) {

            $("#gaugetotal").html( gaugetotal.toFixed(2) );

            selectedGaugeSideBar += '<li class="animated fadeIn">';
            selectedGaugeSideBar += "<div class='col-xs-2 col-lg-2 img'></div>";
            selectedGaugeSideBar += '<div class="col-xs-6 col-lg-7">';
            selectedGaugeSideBar += ' <div class="title">You Have Not Selected Any Gauges</div> ';
            selectedGaugeSideBar += ' </div> ';
            selectedGaugeSideBar += '<div class="col-xs-3 col-lg-3">';
            selectedGaugeSideBar += ' </div> ';
            
            selectedGaugeSideBar += '</li>';

            $("#gaugeSelected").html(selectedGaugeSideBar);

            
        }

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
            selectedGaugeSideBar += ' <div class="edit"><a href="#popup-step2" data-effect="mfp-zoom-in" class="editAttributes popup-step2" ><i class="material-icons">mode_edit</i></a></div> ';
            selectedGaugeSideBar += ' </div> ';
            
            selectedGaugeSideBar += '</li>';

            var number = parseFloat(window.customizerObject.selectedGauges[i].gaugePrice).toFixed(2);
            gaugetotal = parseFloat(number) + parseFloat(gaugetotal);

            //append total
            $("#gaugetotal").html( gaugetotal.toFixed(2) );
            window.customizerObject.totalKitPrice = gaugetotal.toFixed(2);
            $("#gaugeSelected").html(selectedGaugeSideBar);

        }


        $('.popup-step2').magnificPopup({
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
		    selectedKitGauges += '<div class="action-btn"><a class="gaugeType popup-step2" href="#popup-step2" data-effect="mfp-zoom-in">Select <span>Gauge</span> Features</a></div>';
		    selectedKitGauges += "</div>";
		    selectedKitGauges += '</li>';

			$("#allAvaiable").append(selectedKitGauges);

		}
		
			$('.popup-step2').magnificPopup({
			     type:'inline',
			     removalDelay: 500, //delay removal by X to allow out-animation
                 closeOnContentClick: false,
                 midClick: true,
			     callbacks: {
			     beforeOpen: function() {
			       this.st.mainClass = this.st.el.attr('data-effect');
			    },
                afterClose: function() {
                    console.log('Popup is completely closed');
                }
			  },
			  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			}).magnificPopup('close');



    },
    buildAttributesPage: function(attributes) {

        var selectGaugeAttribute = [];

        for(var i = 0; i < attributes.length; i++) {

            for(var k = 0; k < attributes[i].length-1; k++) {

                var attributeExist = this.checkIfCustomFieldsAttributeExist(selectGaugeAttribute, attributes[i][k].name);

                if(attributeExist === true) {

                    var attribute = { "name": attributes[i][k].name, "text" : [ attributes[i][k].text ] };

                    selectGaugeAttribute.push( attribute );

                } else {

                    //$(".addGauge").removeClass("addGauge");

                    if( selectGaugeAttribute[attributeExist].text.indexOf( attributes[i][k].text ) == -1 ) {

                        selectGaugeAttribute[attributeExist].text.push( attributes[i][k].text );

                    }

                }


            }

        }


        this.buildAttributeDropdown( selectGaugeAttribute );

    },
    checkIfCustomFieldsAttributeExist: function(customFieldsObject, customFieldName) {

    	for(var i = 0; i < customFieldsObject.length; i++) {

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

    },
    findSelectedAttributes: function( selectedGagueType ) {

    	for( var i = 0; i < this.productsFromKit.length; i++ ) {

			if( this.productsFromKit[i].title == selectedGagueType.trim() ) {

				this.buildAttributeDropdown( this.productsFromKit[i].attributes );

			}

    	}

    },
    setGaugeAttributePageDescription: function(flag) {

        var featuredescription = "Please review your gauge specifics below";

        if(flag) {

            featuredescription = "Please select your gauge specifics below";

        }

        $(".description").text(featuredescription);

    },
    hideGaugeSubmitButton: function(flag, type) {

        if(flag) {

            $(".subimtGauge").removeClass("addGauge");
            $(".submitEditGauge").removeClass("editGauge");

            $(".subimtGauge").addClass("disabled");
            $(".submitEditGauge").addClass("disabled");
        
        } else {

            $(".subimtGauge").addClass("addGauge");
            $(".submitEditGauge").addClass("editGauge");

            $(".subimtGauge").removeClass("disabled");
            $(".submitEditGauge").removeClass("disabled");

        }

    },
    buildEditAttributePage: function( editAttributeObject ) {


        $("#attribute-title").html( editAttributeObject.gaugeName );
        $("#customFieldAttribute").html("");

        var customfieldsGaugeAttributes = "";

        var hasdropdown = false;
        var hideSubmitGaugeButton = false;

        editAttributeObject.gaugeAttribute.forEach(function(item, index, array) {

            if( item.name !== "OldSKU" && item.name !== "Gauge Type" ) {

                customfieldsGaugeAttributes += "<div class='attribute'>";
                customfieldsGaugeAttributes += "<label><span class="+ item.name +" >" + item.name + "</span><i class='material-icons infoIcon'><a class='attributeinfo' href='#openModal' >info_outline</a></i></label>";

                if( typeof item.text == 'string' ) {

                    customfieldsGaugeAttributes += "<p class='defaultAttributeOption' > "+ item.text +" </p>";
                    var disableButtons = true;

                } else if( item.text.length > 1 ) {

                    hasdropdown = true;
                    hideSubmitGaugeButton = true;


                    customfieldsGaugeAttributes += "<div class='select-style'>";
                    customfieldsGaugeAttributes += "<select class='attributeOption1' >";

                    for(var i = 0; i < item.text.length; i++) { 

                        customfieldsGaugeAttributes += "<option value='" + item.text[i] + "'> "+ item.text[i] +" </option>";            

                    }

                    customfieldsGaugeAttributes += "</select>";
                    customfieldsGaugeAttributes += "</div>";

                }

                customfieldsGaugeAttributes += "</div>";
                customfieldsGaugeAttributes += "</div>";

            }

        });

        this.hideGaugeSubmitButton(hideSubmitGaugeButton, "edit");
        this.setGaugeAttributePageDescription(hasdropdown);
        $("#customFieldAttribute").html(customfieldsGaugeAttributes);        

    },
    checkResetGaguge: function( changeAttribute ) {

        var indexAt = 0;

        for(var i = 0; i < this.selectGaugeAttributes.length; i++ ) {

            if( this.selectGaugeAttributes[i].name === changeAttribute ) {

                indexAt = i;

                for( var k = indexAt+1; k < this.selectGaugeAttributes.length; k++ ) {

                    if( this.selectGaugeAttributes[k].text.length > 1 && this.selectGaugeAttributes[k].status === "set" ) {

                        console.log( this.selectGaugeAttributes[k].status = "unset" );

                    }

                }

            }

        }

    },
    allAttributesAreSet: function() {

        var allset = true;

        for( var i = 0; i < this.selectGaugeAttributes.length; i++ ) {

            if( this.selectGaugeAttributes[i].status !== "set" && this.selectGaugeAttributes[i].name !== "OldSKU" && this.selectGaugeAttributes[i].name !== "Gauge Type" ) {

                console.log( this.selectGaugeAttributes[i].status );
                allset = false;
                break;

            }

        }

        return allset;

    },
    setSelectedGauge: function(setPrice) {

        CustomizerStepTwoObject.selectGaugeAttributes = [];
        var gaugeProperties = [ ];

        $(".attribute").each(function(index, value) {

            if( $(value).children().hasClass("select-style") ) {

                //WILL NEED STUFF BELOW

                var labelName = $(value).children("label").children("span").text();//get the table of a drop down select option
                var selectedName = $(value).children(".select-style").children(".attributeOption").children("option:selected").text().trim();
                var unSelectedName = $(value).children(".select-style").children(".attributeOption").children("option:not(:selected)").text().trim();

                var res = unSelectedName.split("  ");
                res.unshift(selectedName);
                
                var selectedAttributeObject = {};
                selectedAttributeObject.name = labelName;
                selectedAttributeObject.text = res;

                gaugeProperties.push( selectedAttributeObject );


            } else if( $(value).children().hasClass("defaultAttributeOption") ) {


                var selectedName = $(value).children("label").children("span").text(); //label name
                var defaultAttributeOption = $(value).children(".defaultAttributeOption").text().trim();

                var selectedAttributeObject = {};

                selectedAttributeObject.name = selectedName;
                selectedAttributeObject.text = defaultAttributeOption.trim();

                gaugeProperties.push( selectedAttributeObject );


            }

        });

        console.log("-----------------------");
        console.log("-----------------------");
        console.log( CustomizerStepTwoObject.gaugeViewing );
        console.log("-----------------------");
        console.log("-----------------------");


        var price = CustomizerStepTwoObject.gaugeViewing.attributes[ CustomizerStepTwoObject.gaugeViewing.attributes.length - 1][ CustomizerStepTwoObject.gaugeViewing.attributes[ CustomizerStepTwoObject.gaugeViewing.attributes.length - 1].length - 1 ].price;

        var selectedGaugeAttributes = {
            "gaugeProductId" : window.customizerObject.selectedGauges.length,
            "gaugeName" : CustomizerStepTwoObject.gaugeViewing.title,
            "gaugePrice" : CustomizerStepTwoObject.getPriceForCustomProduct( CustomizerStepTwoObject.gaugeViewing.title, gaugeProperties ),
            "gaugeAttribute" : gaugeProperties
        }

        if(setPrice) {

            var currentGaugePrice = parseFloat( selectedGaugeAttributes.gaugePrice ).toFixed(2);

            $("#selectedGaugePrice").html( "<span class='customPriceTotal' >Total:</span> $" + currentGaugePrice );

        }


        if( CustomizerStepTwoObject.addToSelectedGaugeFlag ) {

            //$("#selectedGaugePrice").html( "$" + CustomizerStepTwoObject.getPriceForCustomProduct( CustomizerStepTwoObject.gaugeViewing.title, gaugeProperties ) );

            console.log( CustomizerStepTwoObject.getPriceForCustomProduct( CustomizerStepTwoObject.gaugeViewing.title, gaugeProperties ) );

            window.customizerObject.selectedGauges.push( selectedGaugeAttributes );

            CustomizerStepTwoObject.displaySelectedGauges();

            CustomizerStepTwoObject.addToSelectedGaugeFlag = false; 

        }


    },
    getAttributesForGaugeViewingVariable: function( gaugeName ) {


        console.log(" inside get Attributes For gaugeViewing Variable ");

        console.log(gaugeName);

        //console.log( CustomizerStepTwoObject.cacheKitProducts );

        for( var i = 0; i < CustomizerStepTwoObject.cacheKitProducts.length; i++ ) {

            if( CustomizerStepTwoObject.cacheKitProducts[i].title === gaugeName ) {

                return CustomizerStepTwoObject.cacheKitProducts[i];

            }

        }

    },
    checkSelectedGagues: function() {

        // //you have not selected any gauges
        // console.log(" inside check selectedGauges ");
        // console.log( window.customizerObject.selectedGauges.length );

        // if ( window.customizerObject.selectedGauges.length == 0 ) {

        //     $("#gauge-sidebar-text").text("You have not selected any gauges");

        // } else {

        //     $("#gauge-sidebar-text").text("GAUGES YOU SELECTED");

        // }

    }

}  //End of CustomizerStepTwoObject Object

module.exports = function() {

	//now we can use kit id to get the products that belong to this kit.
	$(function() {

        //$('.addGauge').attr("disabled","disabled");

        window.customizerObject.setSelectGaugesFromLocalStroage();

		//this step needs to pull all produ
		window.initsteptwo = function() { //called when page loads

            CustomizerStepTwoObject.checkSelectedGagues();


            $(".selectedGaugePreivew").html("");

            CustomizerStepTwoObject.displaySelectedGauges();

			CustomizerStepTwoObject.cacheKitProducts = {};
            $("#allAvaiable").html("");

            window.customizerObject.getBcKitData(window.customizerObject.kitname).then(function(data) {

                CustomizerStepTwoObject.cacheKitProducts = JSON.parse(data);

            }).then(function() {

                CustomizerStepTwoObject.buildGaugeTypeCards();

            });

		}

        /* Everything below are event handlers and are called on clicks or changes */

		//When the Select Gauge Attributes button is clicked on step2 
		//-- Select gauge attribute has been selected --//
		$( "body" ).on( "click", "#step-two .card-item .action-btn a", function() { //gauge selected function called

            CustomizerStepTwoObject.settingAttributeStatus = "add";

            $("#selectedGaugePrice").html( "" );

		    var customFieldsObject = {}; //Empty object for custom fields

		    var productTitle = $(this).parent().siblings(".title").text(); //Get the title of the gauge that was clicked.

            var priceindex = $(this).parent().parent().parent().index();

            console.log(priceindex);

            CustomizerStepTwoObject.gaugeViewing = CustomizerStepTwoObject.cacheKitProducts[priceindex];

            CustomizerStepTwoObject.buildAttributesPage( CustomizerStepTwoObject.cacheKitProducts[priceindex].attributes );

		    CustomizerStepTwoObject.findSelectedAttributes( productTitle );
		    
		    $("#attribute-title").html(productTitle); //Set Attributes Title
		    $(".subimtGauge").show();
		    $(".submitEditGauge").hide();
		    $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content
			

		});


        $( "body" ).on("click", ".lightbox-attributes .action-btn .addGauge", function() { //when the add to gauge button is clicked

            //console.log("add new gauge!!!");

            //alert("update gauge localhost storage -- add button clicked");


            CustomizerStepTwoObject.addToSelectedGaugeFlag = true;
            CustomizerStepTwoObject.setSelectedGauge();

            $.magnificPopup.close(); // Close popup that is currently opened (shorthand)


            console.log( window.customizerObject.selectedGauges );

            window.customizerObject.updateSelectedGauges(); //save selection to localStroage

            CustomizerStepTwoObject.checkSelectedGagues();


            //$('.lightbox-attributes').fadeOut(200);

        });

        // -- The remove button has been clicked -- // 
        $( "body" ).on( "click", ".removeAttributes", function() {

            var removedIndex = $(this).parent().parent().parent().index();

            window.customizerObject.selectedGauges.splice(removedIndex, 1);

            $(this).parent().parent().parent().remove();

            CustomizerStepTwoObject.displaySelectedGauges(); //redraw all gauges

            window.customizerObject.updateSelectedGauges();

            CustomizerStepTwoObject.checkSelectedGagues();


        });


        $( "body" ).on("click", ".editAttributes", function() { 
    
            /*
            When the edit attributes button is clicked in the side bar
            */

            //setGaugeViewing             
            var gaugeEditIndex = $(this).parent().parent().parent().index();
            CustomizerStepTwoObject.editIndex = gaugeEditIndex;

            var editGaugeName = window.customizerObject.selectedGauges[gaugeEditIndex].gaugeName;

            CustomizerStepTwoObject.gaugeViewing = CustomizerStepTwoObject.getAttributesForGaugeViewingVariable( editGaugeName ); 


            CustomizerStepTwoObject.settingAttributeStatus = "edit";


            window.customizerObject.setSelectGaugeIndex( gaugeEditIndex );


            CustomizerStepTwoObject.buildEditAttributePage( window.customizerObject.selectedGauges[gaugeEditIndex] );

            //hide add Gauge button
            $(".subimtGauge").hide();
            $(".submitEditGauge").show();


            $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content


        });

        $("body").on("click", ".close", function() {

            CustomizerStepTwoObject.selectGaugeAttributes = [];

        });

        $("body").on("click", ".attributeinfo", function() {

            var pattern = /[/\" "]/g;

            var labelName = $(this).parent().siblings("span").text().toLowerCase().split(pattern).join("-");

            var aURL = "/i-" + labelName + "/";

            $("#modaltitle").html( "" );
            $("#modaldescription").html( "" );

            $.ajax({
                url: aURL,
                type:'GET',
                success: function(data){

                    $("#modaldescription").html( data );


                }
            });

        });

        $("body").on("change", ".attributeOption", function() { //When a drop down have been modify Add New Gauge


            //check if an above attribute was change this will act as a check if see if we need to reset below attributes
            //console.log( CustomizerStepTwoObject.selectGaugeAttributes.length );

            if( CustomizerStepTwoObject.selectGaugeAttributes.length !== 0 ) {

                var changeAttributes = $(this).parent().siblings("label").children("span").text();

                //with the label name we check this.selectGaugeAttributes 
                //if there is a property within selectGaugeAttributes that is appove the label name with status === "set"

                CustomizerStepTwoObject.checkResetGaguge( changeAttributes );

            }

            var attributename = $(this).parent().siblings("label").children("span").text();

            var selectedAttribute = $(this).find("option:selected").text();
            var unSelectedOptions = [];

            $(this).find('option').each(function() {

                if( ( $(this).val() != "" ) && ( selectedAttribute != $(this).text() ) ) {

                    unSelectedOptions.push( $(this).text().trim() );

                }

            });

            CustomizerStepTwoObject.handleSelectedAttributes( attributename, selectedAttribute, unSelectedOptions );

            var isAllAttributesSet = CustomizerStepTwoObject.allAttributesAreSet();

            if(isAllAttributesSet) {

                CustomizerStepTwoObject.setSelectedGauge(true);

            } else {

                $("#selectedGaugePrice").html( "" );

            }

        });


        $("body").on("change", ".attributeOption1", function() { //When a drop down have been modify Edit Existing Gauge

            //check if an above attribute was change this will act as a check if see if we need to reset below attributes
            //console.log( CustomizerStepTwoObject.selectGaugeAttributes.length );

            if( CustomizerStepTwoObject.selectGaugeAttributes.length !== 0 ) {

                var changeAttributes = $(this).parent().siblings("label").children("span").text();

                //with the label name we check this.selectGaugeAttributes 
                //if there is a property within selectGaugeAttributes that is appove the label name with status === "set"

                CustomizerStepTwoObject.checkResetGaguge( changeAttributes );

            }

            var attributename = $(this).parent().siblings("label").children("span").text();

            var selectedAttribute = $(this).find("option:selected").text();
            var unSelectedOptions = [];

            $(this).find('option').each(function() {

                if( ( $(this).val() != "" ) && ( selectedAttribute != $(this).text() ) ) {

                    unSelectedOptions.push( $(this).text().trim() );

                }

            });

            CustomizerStepTwoObject.handleSelectedAttributes( attributename, selectedAttribute, unSelectedOptions );

            var isAllAttributesSet = CustomizerStepTwoObject.allAttributesAreSet();

            if(isAllAttributesSet) {

                CustomizerStepTwoObject.setSelectedGauge(true);

                $(".submitEditGauge").addClass("editGauge");

                //var gaugePriceTotal = parseFloat(window.customizerObject.selectedGauges[ window.customizerObject.selectedGauges.length - 1 ].gaugePrice).toFixed(2);
                //$("#selectedGaugePrice").html( "$" + gaugePriceTotal );
                //console.log( window.customizerObject.selectedGauges[ window.customizerObject.selectedGauges.length - 1 ].gaugePrice );

            } else {

                $("#selectedGaugePrice").html( "" );
                $(".submitEditGauge").removeClass("editGauge");


            }


        });

        $( "body" ).on("click", ".lightbox-attributes .action-btn .editGauge", function() { //Fix this for editGauge

            var gaugeProperties = [ ];

            window.customizerObject.selectedGauges[ CustomizerStepTwoObject.editIndex ];


            $(".attribute").each(function( item, value, array ) {

                if( $(value).children().hasClass("select-style") ) {

                    //WILL NEED STUFF BELOW

                    var labelName = $(value).children("label").children("span").text();//get the table of a drop down select option
                    var selectedName = $(value).children(".select-style").children(".attributeOption1").children("option:selected").text().trim();
                    var unSelectedName = $(value).children(".select-style").children(".attributeOption1").children("option:not(:selected)").text().trim();


                    var res = unSelectedName.split("  ");
                    res.unshift(selectedName);
                    
                    var selectedAttributeObject = {};
                    selectedAttributeObject.name = labelName;
                    selectedAttributeObject.text = res;

                    gaugeProperties.push( selectedAttributeObject );

                    console.log( gaugeProperties );

                } else if( $(value).children().hasClass("defaultAttributeOption") ) {

                    var selectedName = $(value).children("label").children("span").text(); //label name
                    var defaultAttributeOption = $(value).children(".defaultAttributeOption").text().trim();

                    var selectedAttributeObject = {};

                    selectedAttributeObject.name = selectedName;
                    selectedAttributeObject.text = defaultAttributeOption.trim();

                    gaugeProperties.push( selectedAttributeObject );

                    console.log( gaugeProperties );

                }

            });

            var selectedGaugeAttributes = {
                "gaugeProductId" : CustomizerStepTwoObject.editIndex,
                "gaugeName" : CustomizerStepTwoObject.gaugeViewing.title,
                "gaugePrice" : CustomizerStepTwoObject.getPriceForCustomProduct( CustomizerStepTwoObject.gaugeViewing.title, gaugeProperties ),
                "gaugeAttribute" : gaugeProperties
            }

            window.customizerObject.selectedGauges[ CustomizerStepTwoObject.editIndex ] = selectedGaugeAttributes;

            CustomizerStepTwoObject.displaySelectedGauges(); //select gauge sidebar

            $.magnificPopup.close(); // Close popup that is currently opened (shorthand)

            //$('.lightbox-attributes').fadeOut(200);

            window.customizerObject.updateSelectedGauges(); //save selection to localStroage

            window.customizerObject.displayGaugeSpecs( window.customizerObject.editGaugeButtonStep3 );


        });

        $("body").on("click", ".edit-gauge-feature-step3", function() {

            var gaugeEditIndex = window.customizerObject.editGaugeButtonStep3;

            CustomizerStepTwoObject.editIndex = gaugeEditIndex;

            var editGaugeName = window.customizerObject.selectedGauges[gaugeEditIndex].gaugeName;

            CustomizerStepTwoObject.gaugeViewing = CustomizerStepTwoObject.getAttributesForGaugeViewingVariable( editGaugeName ); 

            CustomizerStepTwoObject.settingAttributeStatus = "edit";

            window.customizerObject.setSelectGaugeIndex( gaugeEditIndex );

            console.log("+++++");
            console.log( window.customizerObject.selectedGauges[gaugeEditIndex] );
            console.log("*****");


            CustomizerStepTwoObject.buildEditAttributePage( window.customizerObject.selectedGauges[gaugeEditIndex] );

            //hide add Gauge button
            $(".subimtGauge").hide();
            $(".submitEditGauge").show();


            $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content

            //console.log( $(".img-preview-select").html() );
            //alert("abc!");


        });

        $("body").on("click", ".customizeNow", function() {

            console.log( window.customizerObject.editGaugeButtonStep3 );

            customizerObject.loadStepThree();

        });


	});

};

