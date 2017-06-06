import $ from 'jquery';
import Instafeed from 'instafeed.js';

/* eslint-disable */
const userFeed = new Instafeed({
    get: 'user',
    resolution: 'standard_resolution',
    limit: '12',
    userId: '571701192',
    accessToken: '571701192.1677ed0.c400658007c24d4da32510a1f73dafc0',
    template:'<div class="col-md-3 col-lg-3 instagram-tile {{type}}"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div>',
});
userFeed.run();

$('.my-account a').click(() => {
 	$('.my-account .dropdown-menu').toggle();
});

 $('.header-search input, .navPages-quickSearch input').on('input', function () {
     $('.quickSearchResults').toggle(this.value.length > 0);
     $('.search-close').toggle(this.value.length > 0);
 });
 
$(".category-sidebar li .has-subMenu").click(function(){
    //$("ul.navPage-subMenu-list").toggle();
    $(this).siblings("ul.navPage-subMenu-list").toggle();
    //$(this).find("ul.navPage-subMenu-list").toggle();
    if ($("i",this).text() == "keyboard_arrow_down") {
         $("i",this).text("keyboard_arrow_up");
     }
      else {
         $("i",this).text("keyboard_arrow_down");
     } 
});
 
 
setTimeout(sideNav,500);
    
function sideNav(){    
	$('body').find('.activeCat').removeClass('activeCat');
	$('body').find('.activeSec').removeClass('activeSec');
    var pagelisting = document.querySelector(".breadcrumbs");
        
    //if on a grid list of products run for each product in a promise
    if(document.body.contains(pagelisting)){  
        var crumbs = $('.breadcrumbs').children('li').length;
        
        switch(crumbs){
            case 1:
            break;
                
            case 2:
            	$('body').find('.activeCat').removeClass('activeCat');
				$('body').find('.activeSec').removeClass('activeSec');
                var mainSection = $('.breadcrumbs').children('li:nth-child(2)').children('span').html();
                
                //gets main category
                var crumb1 = $('.category-sidebar').children('nav').find('.navPages-action:contains("'+mainSection+'")');
                $(crumb1).parent().addClass('activeCat');
                
                
                if($('.activeCat').children('.navPage-subMenu-list').length > 0){
	                $('.activeCat').children('.navPage-subMenu-list').css('display','block');
                	var crumb2 = $('.activeCat').find('li').first();
                	$(crumb2).addClass('activeSec');
                	$('.activeSec').children('a').css('font-weight','500');
                }
            break;
                
            case 3:
                var mainSection = $('.breadcrumbs').children('li:nth-child(2)').children('a').html();
                var subSection = $('.breadcrumbs').children('li:nth-child(3)').children('span').html();
               
                
                //gets main category
                //subSection = subSection.toUpperCase();
                var crumb1 = $('.category-sidebar').children('nav').find('.navPages-item:contains("'+mainSection+'")');                    
                var crumb2 = $('.category-sidebar').children('nav').find('.navPage-subMenu-action:contains("'+subSection+'")');
                    
                    $(crumb1).addClass('activeCat');
                    $(crumb2).parent().addClass('activeSec');
                
                $('.activeCat').children('.navPage-subMenu-list').css('display','block');
                $('.activeSec').children('a').css('font-weight','500');
            break;
                
            case 4:
                var mainSection = $('.breadcrumbs').children('li:nth-child(2)').children('a').html();
                var subSection = $('.breadcrumbs').children('li:nth-child(3)').children('a').html();
                var subTab = $('.breadcrumbs').children('li:nth-child(4)').children('span').html();
               
                
                //gets main category
                //subSection = subSection.toUpperCase();
                var crumb1 = $('.category-sidebar').children('nav').find('.navPages-item:contains("'+mainSection+'")');                    
                var crumb2 = $('.category-sidebar').children('nav').find('.navPage-subMenu-action:contains("'+subSection+'")');
                var crumb3 = $('.category-sidebar').children('nav').find('.navPage-childList-action:contains("'+subTab+'")');

                    
                    $(crumb1).addClass('activeCat');
                    $(crumb2).parent().addClass('activeSec');
                    $(crumb3).parent().addClass('activeSecTab');
                
                $('.activeCat').children('.navPage-subMenu-list').css('display','block');
                $('.activeSec').children('a').css('font-weight','500');
                $('.activeSecTab').children('a').css('font-weight','500');
            break;
            
            default:
            break;
        }  
    }
};


function resizeSidebarOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
  shrinkOn = 245,
  headerEl = document.body;
  
  if (distanceY > shrinkOn) {
    headerEl.classList.add("fixed-items");
  } else {
    headerEl.classList.remove("fixed-items");
  }
}

window.addEventListener('scroll', resizeSidebarOnScroll);


$(".gauge-specs .title").click(function(){
$(".gauge-specs-content").toggle();   
    if ($("i",this).text() == "keyboard_arrow_down") {
         $("i",this).text("keyboard_arrow_up");
     }
      else {
         $("i",this).text("keyboard_arrow_down");
     } 
 });


// //Global Customizer Object that needs to share data and functions across all customizer steps
// var customGaugeObject = {
//     gauges: [],
// }

// var cacheKitProducts = {};

// // Uncomment the customGaugeObject below for testing


// /* Global Function Start Here  */
// window.selectedKitObject = {}

// window.addtionalJsonNeeded = function( requesturl ) {

//     return $.ajax({
//         method: "GET",
//         data: {"bccurl": requesturl},
//         url: "http://apps.minibc.com/bcmoreinfo.php" 
//      }).done(function(response) {

//         return response;
    
//      }).fail(function(e) {
    
//         alert( "error" );
    
//     });

// }

// /* Global Function Ends Here  */
// var currentGauge;
// var editIndex;

// function init() {

//     $(".apply-to-kit").text("Apply to all Gauge");

// }

// function getGaugeIdByName( gaugeName ) {

//     for(var i = 0; i < cacheKitProducts.length; i++) {

//         if(cacheKitProducts[i].name == gaugeName) {

//             return cacheKitProducts[i].id;

//         }

//     }

// }

// function disableCustomizerButtom() {

//     if( customGaugeObject.gauges.length == 0 ) {

//         return false;
    
//     } else {

//         return true;

//     }

// }

// function buildAttributeDropdown( selectedGaugeId, isEdit = false ) {

//     // var customFieldsObject = {}; //Empty object for custom fields

//     // cacheKitProducts.forEach(function(item, index, array) {

//     //     if(item.id == selectedGaugeId) {

//     //         for(var i = 0; i < item.custom_fields.customFieldData.length; i++) { //format the custom fields object

//     //             if( customFieldsObject[item.custom_fields.customFieldData[i].name] ) {

//     //                 customFieldsObject[item.custom_fields.customFieldData[i].name].push( item.custom_fields.customFieldData[i].text );
                
//     //             } else {

//     //                 customFieldsObject[item.custom_fields.customFieldData[i].name] = [ item.custom_fields.customFieldData[i].text ];

//     //             }

//     //         }

//     //     }
        
//     //     if(index == array.length - 1) {  

//     //         $("#customFieldAttribute").html("");

//     //         var customfieldsGaugeAttributes = "";

//     //         customfieldsGaugeAttributes += "<p id='selectedGaugeId' style='display:none;'>" + selectedGaugeId + "</p>";

//     //         //Now build and append custom fields to attributes.
//     //         for(var key in customFieldsObject) {

//     //             if( customFieldsObject[key].length > 1 ) {

//     //                 customfieldsGaugeAttributes += "<div class='attribute'>";
//     //                 customfieldsGaugeAttributes += "<label><span>" + key + "</span><i class='material-icons infoIcon'>info_outline</i></label>";
//     //                 customfieldsGaugeAttributes += "<div class='select-style'>";
//     //                 customfieldsGaugeAttributes += "<select class='attributeOption' >";

//     //                 for(var i = 0; i < customFieldsObject[key].length; i++) { 

//     //                     customfieldsGaugeAttributes += "<option value=" + customFieldsObject[key][i] + "> "+ customFieldsObject[key][i] +" </option>";
                
//     //                 }

//     //                 customfieldsGaugeAttributes += "</select>";
//     //                 customfieldsGaugeAttributes += "</div>";
//     //                 customfieldsGaugeAttributes += "</div>";

//     //             }

//     //         }

//     //         $("#customFieldAttribute").prepend(customfieldsGaugeAttributes);

//     //         if( isEdit ) {

//     //             $(".attributeOption").each(function( index, value, array ) {

//     //                 var keyname = Object.keys(isEdit.gaugeAttribute[index])[0];

//     //                 console.log( isEdit.gaugeAttribute[index][keyname] );

//     //                 $(this).val( isEdit.gaugeAttribute[index][keyname] );

//     //             });

//     //         }

//     //     }

//     // }); 

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


// function stepThreeInit() {

//     $("#customizeGaugePreview").html("");

//     $("#customizeGaugePreview").css("padding-top", "1000px");

//     for(var i = 0; i < customGaugeObject.gauges.length; i++) {

//         if( i == 0 ) {

//             var currentAttribute = '<span class="gaugePreview '+i+' active" ><img height="208" width="200" style="border:solid" src="http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/style-demo.jpg"></span>';

//         } else {

//             var currentAttribute = '<span class="gaugePreview '+i+'" ><img height="208" width="200" src="http://cdn3.bigcommerce.com/s-ta980ko58k/stencil/e5183800-cba6-0134-e23c-525400970412/1400e060-cba7-0134-e230-525400970412/img/style-demo.jpg"></span>';

//         }

//         $("#customizeGaugePreview").append(currentAttribute);

//     }

//     $("#customizer_layer_2").css('top', '0');
//     $("#customizer_layer_2").css('left', '0');

//     $("#step-two").hide();
//     $("#step-three").show();
//     $(".listOptions").hide();

//     $("#second-step").css("color","#999");
//     $("#third-step").css("color","black");

//     customGaugeObject.gauges.length;

//     for(var i = 0; i < customGaugeObject.gauges.length; i++ ) {

//         MINIBC.ProductCustomizer.customGauges[i] = [];

//     }

// }


// function attributesSelected() {

//     $('.addGauge').prop('disabled', true);
//     $('.editGauge').prop('disabled', true);

//     //each time the selected menu is changed this function is called to validate that all of the dropdowns are selected
//     //If all dropdowns have a value we will the add / edit button

//     $( ".attributeOption" ).each(function( index, value ) {

//         if( $(this).val() !== "" ) {
            
//             $('.addGauge').prop('disabled', false);
//             $('.editGauge').prop('disabled', false);

//         } else {


//             $('.addGauge').prop('disabled', true);
//             $('.editGauge').prop('disabled', true);

//             return false;

//         }    

//     });

// }

// function kitnameStringFormat( kitname ) {

//     return kitname.toLowerCase().replace(/ /g,'');

// }

module.exports = function () { 
    
    $(function() {


    });

}

//     init();

//     var currentSelectedGauge = getParameterByName("gaugeid");

//     if( currentSelectedGauge == null ) {

//         console.log("do nothing");
        
//         $("#step-one").show();
//         $("#step-two").hide();
//         $("#step-three").hide();

//         //now build cards based on selected gauage product

//     } else {

//         $("#step-one").hide();
//         $("#step-two").show();

//         //add to gauge to sidebar
//         getBcKitData( kitnameStringFormat( "" ) ).then(function( data ) {  //Call function to get product data depending on the choosen kit. 

//             cacheKitProducts = JSON.parse(data);

//         }).then(function() {

//             var selectedKitGauges = "";

//             addSingleGaugeToSideBar(currentSelectedGauge);


//             $("#step-one").hide();
//             $("#step-two").show();

//             $("#first-step").css("color","#999");
//             $("#second-step").css("color","black");
//             $("#third-step").css("color","#999");

//             //Now call function to set card Data.
//             cacheKitProducts.forEach( function( item, index, array ) {

//                 selectedKitGauges += '<li class="card-item">';
//                 selectedKitGauges += "<div class='img style-img'><img src='/assets/img/dummy-placeholder.jpg' /></div>";
//                 selectedKitGauges += '<div class="card-content">';
//                 selectedKitGauges += '<div class="title"> ' + item.name + ' </div>';
//                 // selectedKitGauges += '<div class="description"> ' + item.description + ' </div>';
//                 selectedKitGauges += '<div class="gaugeid" style="display:none"> ' + item.id + ' </div>';
//                 selectedKitGauges += '<div class="action-btn"><a class="gaugeType">Select Gauge Attributes</a></div>';
//                 selectedKitGauges += "</div>";
//                 selectedKitGauges += '</li>';

//                 if(index == array.length - 1) {

//                     $("#allAvaiable").append(selectedKitGauges);
                
//                 }

//             })

//         }); //object forEach closes

//     }

//     $('li.product').each(function () {
//         const onsale = $(this).find('.price--rrp');

//         if (onsale.length === 1) {
//             $(this).append('<div class="product-item-sale-tag">Sale</div>');
//         }
//     });

// };

// $('.header-search input, .navPages-quickSearch input').on('input', function () {
//     $('.quickSearchResults').toggle(this.value.length > 0);
//     $('.search-close').toggle(this.value.length > 0);
// });

// $('.search-close').click(function () {
//     $('.quickSearchResults ul').remove();
//     $('.form-input').val(null);
//     $('.search-close').hide();
//     $('.navPages-quickSearch').hide();
//     this.hide();
// });

// $('.my-account a').click(() => {
//     $('.my-account .dropdown-menu').toggle();
// });

// $('a.navUser-action--quickSearch').click(() => {
//     $('.navPages-quickSearch').toggle();
// });

// $('.blog-section').load('/ .homepage-blog-posts');

// $('.customize-your-gauge ul li, .actions a').click(() => {
//     //$('.options-overlay').toggle();
// });

// $("body").on("click", "#daynight", function() {

//     if( $("#customizer_layer_3").hasClass( "pc_daytime" ) ) {

//         //grab the current selected index of gauge previews and apply the html to the gauage preview
//         var activeGauge = $("#customizeGaugePreview").children(".active").index();

//         //append day layer
//         var gaugeLayer = customGaugeObject.gauges[activeGauge - 1].dayTimeGaugeLayers;

//         $("#pcCanvas").html(gaugeLayer);

    
//     } else if( $("#customizer_layer_3").hasClass( "pc_nighttime" ) ) {

//         //grab the current selected index of gauge previews and apply the html to the gauage preview
//         var activeGauge = $("#customizeGaugePreview").children(".active").index();

//         //apend night layer
//         var gaugeLayer = customGaugeObject.gauges[activeGauge - 1].dayTimeGaugeLayers;

//         $("#pcCanvas").html(gaugeLayer);

//         MINIBC.ProductCustomizer.DayNightShowNight();

//     }

// });



// $("body").on("change", ".attributeOption", function() {

//     attributesSelected();

// });


// $( "body" ).on( "click", "#customize-lightbox .card-item .action-btn a", function() {

//     //TEMP NOTE:
//     //We will remove the Loading of the Theme over lay and instead push the user to step 2

//     //This Step Loads step 2 

//     //get selected name 
//     var productStyle = $(this).parent().siblings()[0].innerHTML;

//     //set object property
//     customGaugeObject.productStyle = productStyle;

//     //set style page title
//     $("#style-page-title").html(productStyle);

//     $("#first-step").css("color","#999");
//     $("#second-step").css("color","black");

//     $("#step-one").hide();
//     $("#step-two").show();

// });


// //Increment Product Counter on click
// $("body").on("click", ".button--icon", function() {

//     //Check if the buton click was the increment button or decrement button
//     if( $(this).attr("data-action") == "dec" ) {

//         var numberOfGagues = $(".form-input--incrementTotal").val();
//         numberOfGagues--;
//         if(numberOfGagues <= 1) {
//             numberOfGagues = 1;
//         }
//         $(".form-input--incrementTotal").val(numberOfGagues);

//     } else if( $(this).attr("data-action") == "inc") {

//         var numberOfGagues = $(".form-input--incrementTotal").val();
//         numberOfGagues++;
//         $(".form-input--incrementTotal").val(numberOfGagues);

//     }

// })

// //The customize button on the gauge & attributes panel has been clicked
// //we will not apply styles to show the user they are on the new section
// $( "body" ).on("click", ".customizeNow", function() {

//     if( disableCustomizerButtom() ){

//         stepThreeInit();

//     } else {

//         alert("please select a gauge and its attributes");

//     }

// });


// $("body").on("click", ".gaugePreview", function() {

//     $(this).siblings().removeClass("active");

//     $(".gaugePreview").children().css("border", "none");

//     $(this).children().css("border", "solid");

//     $(this).addClass("active");

//     var previewIndex = $(this).attr('class').split(' ')[1];

//     MINIBC.ProductCustomizer.currentCustomGaugeIndex = previewIndex;

//     var gaugeLayer = customGaugeObject.gauges[ previewIndex ].dayTimeGaugeLayers;

//     $("#pcCanvas").html(gaugeLayer);

// })

// $("body").on("click", ".apply-to-gauge", function() {

//     var backgroundLayer = $("#pcCanvas").html();

//     //Set DayTime Layer
//     customGaugeObject.gauges[ MINIBC.ProductCustomizer.currentCustomGaugeIndex ].dayTimeGaugeLayers = backgroundLayer;

//     var previewClone = $("#cloneclass").clone();

//     $("#customizeGaugePreview").children(".active").children().replaceWith(previewClone);

//     $("#customizeGaugePreview").children(".active").children().removeAttr("cloneclass");

//     $("#customizeGaugePreview").children(".active").children().css("transform", "scale(0.5)");

//     $("#customizerGaugePreivew").children().addClass("ryantest");

// })


// $("body").on("click", ".apply-to-kit", function() {

//     var backgroundLayer = $("#pcCanvas").html();

//     for( var i = 0; i < customGaugeObject.gauges.length; i++ ) {

//         customGaugeObject.gauges[i].dayTimeGaugeLayers = backgroundLayer;

//     }

//     var previewClone = $("#cloneclass").clone();

//     $("#customizeGaugePreview").children().children().replaceWith(previewClone);

//     $("#customizeGaugePreview").children().children().removeAttr("cloneclass");

//     $("#customizeGaugePreview").children().children().children().css("transform", "scale(0.5)");

// })

// //steps 1 header is clicked 
// $("body").on("click", "#step-1", function() {

//     $("#step-one").show();
//     $("#step-two").hide();
//     $("#step-three").hide();

//     $("#first-step").css("color","black");
//     $("#second-step").css("color","#999");
//     $("#third-step").css("color","#999");

// })

// //steps 2 header is clicked 
// $("body").on("click", "#step-2", function() {

//     //validate that there is a value set for 
//     if( customGaugeObject.productName == "" || customGaugeObject.productName == undefined ) {

//     } else {    

//         $("#step-one").hide();
//         $("#step-two").show();
//         $("#step-three").hide();

//         $("#first-step").css("color","#999");
//         $("#second-step").css("color","black");
//         $("#third-step").css("color","#999");

//     }

// })

// //steps 3 header is clicked 
// $("body").on("click", "#step-3", function() {

//     if( customGaugeObject.gauges.length == 0 ) {


//     } else {

//         $("#step-one").hide();
//         $("#step-two").hide();
//         $("#step-three").show();

//         $("#first-step").css("color","#999");
//         $("#second-step").css("color","#999");
//         $("#third-step").css("color","black");

//         stepThreeInit();

//     }

// })

// $("body").on("click", "#form-action-addToCart", function(e) {

//     for ( var i = 0; i < customGaugeObject.gauges.length; i++) {

//         var requestUrl = "http://localhost:3000/cart.php?action=add&product_id=" + customGaugeObject.gauges[i].gaugeProductId; //This will change when live

//         $.ajax({
//             method: "GET",
//             url: requestUrl, 
//             async: false
//         }).success(function(response) {

        
//         });
//         e.preventDefault();

//     }

// });


// $('.lightbox-styles .close').click(() => {
//     $('.lightbox-styles').fadeOut(200);
// });

// $('.lightbox-attributes .close').click(() => {
//     $('.lightbox-attributes').fadeOut(200);
// });

// $('.mobileSelectedAttributes ').click(() => {
//     $(".gauges-selected, ul.cards").toggle();
//     $("body.CustomizerApp").toggleClass("viewing-selected-gauges");
//     $(".stepper").toggle();
//     //$("i",this).toggleClass("fa-search fa-times");
// });


// /* eslint-enable */
