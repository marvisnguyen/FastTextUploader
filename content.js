
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "copyField"){
        var itemFields = $("*input:text").map(function(){
            return $(this).val();
        }).get();

        var textFields =  $("textarea").map(function(){
            return $(this).val();
        }).get();

		chrome.storage.sync.set({'data': itemFields, 'field': textFields}, function(){
            console.log('Data is set to ' + itemFields);
            console.log('Data2 is set to ' + textFields);
		});
        
    }

    if(request.todo == "pasteField"){
        chrome.storage.sync.get(["data", "field"], function(result){
            console.log('itemFields currently is ' + result.data);
            console.log('itemFields currently is ' + result.field);

            $("*input:text").each(function(index){
                //console.log("TextInput: " + index + " is " + result.data[index]);
                $(this).val(result.data[index]);
            });
      
            $("textarea").each(function(index){
                //console.log("TextInput: " + index + " is " + result.field[index]);
                $(this).val(result.field[index]);
            });
		});   
    }
});