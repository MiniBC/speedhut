import $ from 'jquery';
import Instafeed from 'instafeed.js';

/* eslint-disable */
module.exports = function () { 
    
const userFeed = new Instafeed({
    get: 'user',
    resolution: 'standard_resolution',
    limit: '12',
    userId: '571701192',
    accessToken: '571701192.1677ed0.c400658007c24d4da32510a1f73dafc0',
    template:'<div class="col-md-3 col-lg-3 instagram-tile {{type}}"><a href="{{link}}" target="_blank"><img src="{{image}}"><span>{{caption}}</span></a></div>',
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
 
 
}

