var randomArray = [];
generateTableData = function(){
    for(i = 0; i < 100; i++){
    	randomArray[i] = Math.floor(Math.random() * 3000);
    	jQuery('.table > tbody:last').append("<tr><td style='font-weight: bold;' >"+(i+1)+"</td><td>"+randomArray[i]+"</td><td><i  id='result-icon-"+i+"' class='fa fa-spinner fa-spin' ></i></td></tr>");
    }
}
requestResults = function(){
    for(j = 0; j < 100; j++){
    	jQuery.ajax({
    		async: false,
	        url: "http://localhost:8080/isleapyear/"+randomArray[j],
	        type: 'GET',
	        dataType: 'html',
	        success: function(response) {
            	jQuery("#result-icon-"+j).removeClass();
				jQuery("#result-icon-"+j).addClass("fa");
	            if(response == "true"){
					jQuery("#result-icon-"+j).addClass("fa-check");
					jQuery("#result-icon-"+j).addClass("green");
	            }
            	else{
					jQuery("#result-icon-"+j).addClass("fa-remove");
            		jQuery("#result-icon-"+j).addClass("red");
            	}

	        },
	        error: function(response){
	            console.log("Something went wrong!");
	        }
	    });
    }
}

start = function(){
	generateTableData();
	setTimeout(requestResults, 500);
}

jQuery( document ).ready(function() {
	jQuery("#refresh-button").click(start);
	start();
});