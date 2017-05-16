// import $ from 'jquery';

// var productFromCustomGaugeProductPage = {

// 	parseUrlForGaugeID: function() { //this function will parse the url and return the parameters as an object

// 		var query_string = {};
// 		var query = window.location.search.substring(1);
// 		var vars = query.split("&");
// 			for (var i=0;i<vars.length;i++) {
// 		    var pair = vars[i].split("=");
// 		        // If first entry with this name
// 		    if (typeof query_string[pair[0]] === "undefined") {
// 		      query_string[pair[0]] = decodeURIComponent(pair[1]);
// 		        // If second entry with this name
// 		    } else if (typeof query_string[pair[0]] === "string") {
// 		      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
// 		      query_string[pair[0]] = arr;
// 		        // If third or later entry with this name
// 		    } else {
// 		      query_string[pair[0]].push(decodeURIComponent(pair[1]));
// 		    }
// 		  } 

// 		  return query_string; 		

// 	}

// }

module.exports = function () { 
    
    $(function() {

    });

}