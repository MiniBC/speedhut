import $ from 'jquery';
/* eslint-disable */

//Global Customizer Object that needs to share data and functions across all customizer steps

var customGaugeObject = {
    gauges: [],
}

var cacheKitProducts = {};

// Uncomment the customGaugeObject below for testing


/* Global Function Start Here  */
window.selectedKitObject = {}

window.setCustomGaugeKit = function( kitname, gaugename ) {

    customGaugeObject.productName = kitname;

    var gauge = {

        gaugeName: gaugename,
        gaugeAttribute:[ {name:"name3"} ,{name:"3name"} ,{name:"name9"} ]

    }

    customGaugeObject.gauges.push(gauge); 

}

window.addtionalJsonNeeded = function( requesturl ) {

    return $.ajax({
        method: "GET",
        data: {"bccurl": requesturl},
        url: "http://apps.minibc.com/bcmoreinfo.php" 
     }).done(function(response) {

        return response;
    
     }).fail(function(e) {
    
        alert( "error" );
    
    });

}

/* Global Function Ends Here  */
var currentGauge;
var editIndex;

function init() {

    $(".apply-to-kit").text("Apply to all Gauge");

    window.testvar = "mynameisryan..";

}

function getGaugeIdByName( gaugeName ) {

    for(var i = 0; i < cacheKitProducts.length; i++) {

        if(cacheKitProducts[i].name == gaugeName) {

            return cacheKitProducts[i].id;

        }

    }

}

function disableCustomizerButtom() {

    if( customGaugeObject.gauges.length == 0 ) {

        return false;
    
    } else {

        return true;

    }

}

function buildAttributeDropdown( selectedGaugeId, isEdit = false ) {

    // var customFieldsObject = {}; //Empty object for custom fields

    // cacheKitProducts.forEach(function(item, index, array) {

    //     if(item.id == selectedGaugeId) {

    //         for(var i = 0; i < item.custom_fields.customFieldData.length; i++) { //format the custom fields object

    //             if( customFieldsObject[item.custom_fields.customFieldData[i].name] ) {

    //                 customFieldsObject[item.custom_fields.customFieldData[i].name].push( item.custom_fields.customFieldData[i].text );
                
    //             } else {

    //                 customFieldsObject[item.custom_fields.customFieldData[i].name] = [ item.custom_fields.customFieldData[i].text ];

    //             }

    //         }

    //     }
        
    //     if(index == array.length - 1) {  

    //         $("#customFieldAttribute").html("");

    //         var customfieldsGaugeAttributes = "";

    //         customfieldsGaugeAttributes += "<p id='selectedGaugeId' style='display:none;'>" + selectedGaugeId + "</p>";

    //         //Now build and append custom fields to attributes.
    //         for(var key in customFieldsObject) {

    //             if( customFieldsObject[key].length > 1 ) {

    //                 customfieldsGaugeAttributes += "<div class='attribute'>";
    //                 customfieldsGaugeAttributes += "<label><span>" + key + "</span><i class='material-icons infoIcon'>info_outline</i></label>";
    //                 customfieldsGaugeAttributes += "<div class='select-style'>";
    //                 customfieldsGaugeAttributes += "<select class='attributeOption' >";

    //                 for(var i = 0; i < customFieldsObject[key].length; i++) { 

    //                     customfieldsGaugeAttributes += "<option value=" + customFieldsObject[key][i] + "> "+ customFieldsObject[key][i] +" </option>";
                
    //                 }

    //                 customfieldsGaugeAttributes += "</select>";
    //                 customfieldsGaugeAttributes += "</div>";
    //                 customfieldsGaugeAttributes += "</div>";

    //             }

    //         }

    //         $("#customFieldAttribute").prepend(customfieldsGaugeAttributes);

    //         if( isEdit ) {

    //             $(".attributeOption").each(function( index, value, array ) {

    //                 var keyname = Object.keys(isEdit.gaugeAttribute[index])[0];

    //                 console.log( isEdit.gaugeAttribute[index][keyname] );

    //                 $(this).val( isEdit.gaugeAttribute[index][keyname] );

    //             });

    //         }

    //     }

    // }); 

}

function getParameterByName(name, url) {

    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));

}


function stepThreeInit() {

    $("#customizeGaugePreview").html("");

    $("#customizeGaugePreview").css("padding-top", "1000px");

    for(var i = 0; i < customGaugeObject.gauges.length; i++) {

        if( i == 0 ) {

            var currentAttribute = '<span class="gaugePreview '+i+' active" ><img height="208" width="200" style="border:solid" src="http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/style-demo.jpg"></span>';

        } else {

            var currentAttribute = '<span class="gaugePreview '+i+'" ><img height="208" width="200" src="http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/style-demo.jpg"></span>';

        }

        $("#customizeGaugePreview").append(currentAttribute);

    }

    $("#customizer_layer_2").css('top', '0');
    $("#customizer_layer_2").css('left', '0');

    $("#step-two").hide();
    $("#step-three").show();
    $(".listOptions").hide();

    $("#second-step").css("color","#999");
    $("#third-step").css("color","black");

    customGaugeObject.gauges.length;

    for(var i = 0; i < customGaugeObject.gauges.length; i++ ) {

        MINIBC.ProductCustomizer.customGauges[i] = [];

    }

}

function displaySelectedGauges() {

    var selectedGaugeSideBar = "";

    for(var i = 0; i < customGaugeObject.gauges.length; i++) {

        selectedGaugeSideBar += '<li class="animated fadeIn">';
        selectedGaugeSideBar += "<div class='col-xs-2 col-lg-2 img'><img src=https://cdn3.bigcommerce.com/s-ta980ko58k/product_images/uploaded_images/gauge-thumbnail.png?t=1491341476&_ga=1.143031165.995689909.1490710177/></div>";
        selectedGaugeSideBar += '<div class="col-xs-6 col-lg-7">';
        selectedGaugeSideBar += '<div class="gaugeid" style="display:none;">'+ customGaugeObject.gauges[i].gaugeProductId +'</div>';
        selectedGaugeSideBar += ' <div class="title">' + customGaugeObject.gauges[i].gaugeName + '</div> ';
        selectedGaugeSideBar += ' <div class="price">$108.57</div> ';
        selectedGaugeSideBar += ' </div> ';
         selectedGaugeSideBar += '<div class="col-xs-3 col-lg-3">';
        selectedGaugeSideBar += " <div class='delete'><a class='removeAttributes' href='#''><i class='material-icons'>delete</i></a></div> ";
        selectedGaugeSideBar += ' <div class="edit"><a href="#" class="editAttributes" ><i class="material-icons">mode_edit</i></a></div> ';
        selectedGaugeSideBar += ' </div> ';
        
        selectedGaugeSideBar += '</li>';

    }

    $("#gaugeSelected").html(selectedGaugeSideBar);

}

function addSingleGaugeToSideBar( gaugeName ) {

    customGaugeObject.productName = "Ford GT";
    var gauge = {"gaugeName": gaugeName};
    customGaugeObject.gauges.push(gauge);

    //console.log(customGaugeObject);

    var selectedGaugeSideBar = "";

    selectedGaugeSideBar += '<li>';
    selectedGaugeSideBar += "<div class='col-xs-3 col-lg2 img'><img src=http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/style-demo.jpg /></div>";
    selectedGaugeSideBar += '<div class="col-xs-7 col-lg-7">';
    selectedGaugeSideBar += '<div class="gaugeid" style="display:none;">'+ getGaugeIdByName(gaugeName) +'</div>';
    selectedGaugeSideBar += ' <div class="title">' + gaugeName + '</div> ';
    selectedGaugeSideBar += ' <div class="edit"><a href="#" class="editAttributes" >Edit Attributes</a></div> ';
    selectedGaugeSideBar += ' </div> ';
	selectedGaugeSideBar += '<div class="col-xs-3 col-lg-3">';
	selectedGaugeSideBar += " <div class='delete'><a class='removeAttributes' href='#''><i class='material-icons'>delete</i></a></div> ";
	selectedGaugeSideBar += ' <div class="edit"><a href="#" class="editAttributes" ><i class="material-icons">mode_edit</i></a></div> ';
	selectedGaugeSideBar += ' </div> ';
    selectedGaugeSideBar += '</li>';

    $("#gaugeSelected").html(selectedGaugeSideBar);

}

function attributesSelected() {

    $('.addGauge').prop('disabled', true);
    $('.editGauge').prop('disabled', true);

    //each time the selected menu is changed this function is called to validate that all of the dropdowns are selected
    //If all dropdowns have a value we will the add / edit button

    $( ".attributeOption" ).each(function( index, value ) {

        if( $(this).val() !== "" ) {
            
            $('.addGauge').prop('disabled', false);
            $('.editGauge').prop('disabled', false);

        } else {


            $('.addGauge').prop('disabled', true);
            $('.editGauge').prop('disabled', true);

            return false;

        }    

    });

}

function kitnameStringFormat( kitname ) {

    return kitname.toLowerCase().replace(/ /g,'');

}

module.exports = function () {

    init();

    var currentSelectedGauge = getParameterByName("gaugeid");

    if( currentSelectedGauge == null ) {

        console.log("do nothing");
        
        $("#step-one").show();
        $("#step-two").hide();
        $("#step-three").hide();

        //now build cards based on selected gauage product

    } else {

        $("#step-one").hide();
        $("#step-two").show();

        //add to gauge to sidebar
        getBcKitData( kitnameStringFormat( "" ) ).then(function( data ) {  //Call function to get product data depending on the choosen kit. 

            cacheKitProducts = JSON.parse(data);

        }).then(function() {

            var selectedKitGauges = "";

            addSingleGaugeToSideBar(currentSelectedGauge);


            //Now we will set the data
            //$("#lightbox-style-title").html( productName );

            //$("#style-page-title").html( customGaugeObject.productName ); // set step 2 header

            $("#step-one").hide();
            $("#step-two").show();

            $("#first-step").css("color","#999");
            $("#second-step").css("color","black");
            $("#third-step").css("color","#999");

            //Now call function to set card Data.
            cacheKitProducts.forEach( function( item, index, array ) {

                selectedKitGauges += '<li class="card-item">';
                selectedKitGauges += "<div class='img style-img'><img src='/assets/img/dummy-placeholder.jpg' /></div>";
                selectedKitGauges += '<div class="card-content">';
                selectedKitGauges += '<div class="title"> ' + item.name + ' </div>';
                // selectedKitGauges += '<div class="description"> ' + item.description + ' </div>';
                selectedKitGauges += '<div class="gaugeid" style="display:none"> ' + item.id + ' </div>';
                selectedKitGauges += '<div class="action-btn"><a class="gaugeType">Select Gauge Attributes</a></div>';
                selectedKitGauges += "</div>";
                selectedKitGauges += '</li>';

                if(index == array.length - 1) {

                    $("#allAvaiable").append(selectedKitGauges);
                
                }

            })

        }); //object forEach closes

    }

    $('li.product').each(function () {
        const onsale = $(this).find('.price--rrp');

        if (onsale.length === 1) {
            $(this).append('<div class="product-item-sale-tag">Sale</div>');
        }
    });

};

$('.header-search input, .navPages-quickSearch input').on('input', function () {
    $('.quickSearchResults').toggle(this.value.length > 0);
    $('.search-close').toggle(this.value.length > 0);
});

$('.search-close').click(function () {
    $('.quickSearchResults ul').remove();
    $('.form-input').val(null);
    $('.search-close').hide();
    $('.navPages-quickSearch').hide();
    this.hide();
});

$('.my-account a').click(() => {
    $('.my-account .dropdown-menu').toggle();
});

$('a.navUser-action--quickSearch').click(() => {
    $('.navPages-quickSearch').toggle();
});

$('.blog-section').load('/ .homepage-blog-posts');

$('.customize-your-gauge ul li, .actions a').click(() => {
    //$('.options-overlay').toggle();
});

$("body").on("click", "#daynight", function() {

    if( $("#customizer_layer_3").hasClass( "pc_daytime" ) ) {

        //grab the current selected index of gauge previews and apply the html to the gauage preview
        var activeGauge = $("#customizeGaugePreview").children(".active").index();

        //append day layer
        var gaugeLayer = customGaugeObject.gauges[activeGauge - 1].dayTimeGaugeLayers;

        $("#pcCanvas").html(gaugeLayer);

    
    } else if( $("#customizer_layer_3").hasClass( "pc_nighttime" ) ) {

        //grab the current selected index of gauge previews and apply the html to the gauage preview
        var activeGauge = $("#customizeGaugePreview").children(".active").index();

        //apend night layer
        var gaugeLayer = customGaugeObject.gauges[activeGauge - 1].dayTimeGaugeLayers;

        $("#pcCanvas").html(gaugeLayer);

        MINIBC.ProductCustomizer.DayNightShowNight();

    }

});



$("body").on("change", ".attributeOption", function() {

    attributesSelected();

});


$( "body" ).on( "click", "#customize-lightbox .card-item .action-btn a", function() {

    //TEMP NOTE:
    //We will remove the Loading of the Theme over lay and instead push the user to step 2

    //This Step Loads step 2 

    //get selected name 
    var productStyle = $(this).parent().siblings()[0].innerHTML;

    //set object property
    customGaugeObject.productStyle = productStyle;

    //set style page title
    $("#style-page-title").html(productStyle);

    $("#first-step").css("color","#999");
    $("#second-step").css("color","black");

    $("#step-one").hide();
    $("#step-two").show();

});

$( "body" ).on("click", ".editAttributes", function() { 
    
    /*
    When the edit attributes button is clicked in the side bar
    */

    //hide add Gauge button
    $(".addGauge").hide();
    $(".editGauge").show();

    editIndex = $(this).parent().parent().parent().index(); //this index will be used to grade and populate the select fields
    var editSelectedGaugeId = $(this).parent().siblings(".gaugeid").text();

    var gaugeAttributeTitle = customGaugeObject.gauges[editIndex].gaugeName;

    buildAttributeDropdown(editSelectedGaugeId, customGaugeObject.gauges[editIndex]);

    $("#attribute-title").html(gaugeAttributeTitle); //Set Attributes Title
    $(".addGauge").hide();
    $(".editGauge").show();
    $('.lightbox-attributes').fadeIn(300);  //after appending is down we will fade in content

});

//-- This function is called when a gague is edited --//
$( "body" ).on("click", ".lightbox-attributes .action-btn .editGauge", function() {

    /*
    When the edit gauge button is clicked in the overlay
    */

    //Get the gaugeproduct id from the object and use it to find which properties in the gauge object to edit, afterwards 
    for(var i = 0; i < customGaugeObject.gauges[ editIndex ].gaugeAttribute.length; i++) {

        for(var property in customGaugeObject.gauges[ editIndex ].gaugeAttribute[i] ) {

            customGaugeObject.gauges[ editIndex ].gaugeAttribute[i][property] = $(".attributeOption option:selected")[i].value;

        }
    
    } 

    $('.lightbox-attributes').fadeOut(200);

});

//-- This function is called when a gague is added --//
$( "body" ).on("click", ".lightbox-attributes .action-btn .addGauge", function() {

    /*
    when the add gauge button is clicked in the overlay
    */

    var currentGauge = $("#attribute-title").text();
    var gaugeProperties = [ ];

    var selectedGaugeId = $(this).parent().siblings("#customFieldAttribute").children("#selectedGaugeId").text().trim();

    $( ".attributeOption" ).each(function( index, value ) {  //get each selected property and add to gaugeProperties array

        var selectedName = $(this).val();

        var labelName = $(this).parent().parent().children().children().first().text();
        var selectedAttributeObject = {};
        selectedAttributeObject[labelName] = selectedName;
        gaugeProperties.push( selectedAttributeObject );
    
    });

    customGaugeObject.gauges.push({
                                    "gaugeName" :  currentGauge, 
                                    "gaugeAttribute" : gaugeProperties, 
                                    "gaugeLayers" : $("#pcCanvas").html(),
                                    "gaugeProductId" : selectedGaugeId
                                }); 

    displaySelectedGauges();

    $('.lightbox-attributes').fadeOut(200);

});


// -- The remove button has been clicked -- // 
$( "body" ).on( "click", ".removeAttributes", function() {

    var removedIndex = $(this).parent().parent().index();

    customGaugeObject.gauges.splice(removedIndex, 1);

    $(this).parent().parent().remove();

});

//Increment Product Counter on click
$("body").on("click", ".button--icon", function() {

    //Check if the buton click was the increment button or decrement button
    if( $(this).attr("data-action") == "dec" ) {

        var numberOfGagues = $(".form-input--incrementTotal").val();
        numberOfGagues--;
        if(numberOfGagues <= 1) {
            numberOfGagues = 1;
        }
        $(".form-input--incrementTotal").val(numberOfGagues);

    } else if( $(this).attr("data-action") == "inc") {

        var numberOfGagues = $(".form-input--incrementTotal").val();
        numberOfGagues++;
        $(".form-input--incrementTotal").val(numberOfGagues);

    }

})

//The customize button on the gauge & attributes panel has been clicked
//we will not apply styles to show the user they are on the new section
$( "body" ).on("click", ".customizeNow", function() {

    if( disableCustomizerButtom() ){

        stepThreeInit();

    } else {

        alert("please select a gauge and its attributes");

    }

});


$("body").on("click", ".gaugePreview", function() {

    $(this).siblings().removeClass("active");

    $(".gaugePreview").children().css("border", "none");

    $(this).children().css("border", "solid");

    $(this).addClass("active");

    var previewIndex = $(this).attr('class').split(' ')[1];

    MINIBC.ProductCustomizer.currentCustomGaugeIndex = previewIndex;

    var gaugeLayer = customGaugeObject.gauges[ previewIndex ].dayTimeGaugeLayers;

    $("#pcCanvas").html(gaugeLayer);

})

$("body").on("click", ".apply-to-gauge", function() {

    var backgroundLayer = $("#pcCanvas").html();

    //Set DayTime Layer
    customGaugeObject.gauges[ MINIBC.ProductCustomizer.currentCustomGaugeIndex ].dayTimeGaugeLayers = backgroundLayer;

    var previewClone = $("#cloneclass").clone();

    $("#customizeGaugePreview").children(".active").children().replaceWith(previewClone);

    $("#customizeGaugePreview").children(".active").children().removeAttr("cloneclass");

    $("#customizeGaugePreview").children(".active").children().css("transform", "scale(0.5)");

    $("#customizerGaugePreivew").children().addClass("ryantest");

})


$("body").on("click", ".apply-to-kit", function() {

    var backgroundLayer = $("#pcCanvas").html();

    for( var i = 0; i < customGaugeObject.gauges.length; i++ ) {

        customGaugeObject.gauges[i].dayTimeGaugeLayers = backgroundLayer;

    }

    var previewClone = $("#cloneclass").clone();

    $("#customizeGaugePreview").children().children().replaceWith(previewClone);

    $("#customizeGaugePreview").children().children().removeAttr("cloneclass");

    $("#customizeGaugePreview").children().children().children().css("transform", "scale(0.5)");

})

//steps 1 header is clicked 
$("body").on("click", "#step-1", function() {

    $("#step-one").show();
    $("#step-two").hide();
    $("#step-three").hide();

    $("#first-step").css("color","black");
    $("#second-step").css("color","#999");
    $("#third-step").css("color","#999");

})

//steps 2 header is clicked 
$("body").on("click", "#step-2", function() {

    //validate that there is a value set for 
    if( customGaugeObject.productName == "" || customGaugeObject.productName == undefined ) {

    } else {    

        $("#step-one").hide();
        $("#step-two").show();
        $("#step-three").hide();

        $("#first-step").css("color","#999");
        $("#second-step").css("color","black");
        $("#third-step").css("color","#999");

    }

})

//steps 3 header is clicked 
$("body").on("click", "#step-3", function() {

    if( customGaugeObject.gauges.length == 0 ) {


    } else {

        $("#step-one").hide();
        $("#step-two").hide();
        $("#step-three").show();

        $("#first-step").css("color","#999");
        $("#second-step").css("color","#999");
        $("#third-step").css("color","black");

        stepThreeInit();

    }

})

$("body").on("click", "#form-action-addToCart", function(e) {

    for ( var i = 0; i < customGaugeObject.gauges.length; i++) {

        var requestUrl = "http://localhost:3000/cart.php?action=add&product_id=" + customGaugeObject.gauges[i].gaugeProductId; //This will change when live

        $.ajax({
            method: "GET",
            url: requestUrl, 
            async: false
        }).success(function(response) {

        
        });
        e.preventDefault();

    }

});


$('.lightbox-styles .close').click(() => {
    $('.lightbox-styles').fadeOut(200);
});

$('.lightbox-attributes .close').click(() => {
    $('.lightbox-attributes').fadeOut(200);
});
/* eslint-enable */
