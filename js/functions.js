var randomArray = [];
var N = 100;
generateTableData = function(){
    for(i = 0; i < N; i++){
    	randomArray[i] = Math.floor(Math.random() * 3000);
    	jQuery('.table > tbody:last').append("<tr><td style='font-weight: bold;' >"+(i+1)+"</td><td>"+randomArray[i]+"</td><td><i  id='result-icon-"+i+"' class='fa fa-spinner fa-spin' ></i></td></tr>");
    }
}
requestResults = function(index){
    	jQuery.ajax({
    		async: false,
	        url: "http://localhost:8080/isleapyear/"+randomArray[index],
	        type: 'GET',
	        dataType: 'html',
	        success: function(response) {
            	jQuery("#result-icon-"+index).removeClass();
				jQuery("#result-icon-"+index).addClass("fa");
	            if(response == "true"){
					jQuery("#result-icon-"+index).addClass("fa-check");
					jQuery("#result-icon-"+index).addClass("green");
	            }
            	else{
					jQuery("#result-icon-"+index).addClass("fa-remove");
            		jQuery("#result-icon-"+index).addClass("red");
            	}

	        },
	        error: function(response){
	            console.log("Something went wrong!");
            	jQuery("#result-icon-"+index).removeClass();
	        }
	    });
    }


jQuery( document ).ready(function() {
	generateTableData();
	for(i = 0; i < N; i++)
		setTimeout(requestResults(i), 500);
});