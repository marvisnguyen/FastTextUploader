
var button = document.createElement("button");
button.innerText = "Click Me"
button['id'] = 'butt'
button.onclick = function(){
    alert("clicked")
}

document.body.appendChild(button);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "changeField"){
        
        $("*input:text").val(request.enterSearch);
        $("textarea").val(request.enterSearch);
        sendResponse({count: $("input").length, textCount: $('textarea').length})
    }
    if(request.todo == "copyField"){
        var itemFields = $("*input:text").map(function(){
            return $(this).val();
        }).get();

        var textFields =  $("textarea").map(function(){
            return $(this).val();
        }).get();
        
		chrome.storage.sync.set({'data': itemFields, 'data2': textFields}, function(){
            console.log('Data is set to ' + itemFields);
            console.log('Data2 is set to ' + textFields);
		});
        
    }

    if(request.todo == "pasteField"){
        chrome.storage.sync.get("data", function(result){
            console.log('itemFields currently is ' + result.data);
            console.log('itemFields currently is ' + result.data2);

            const amount = document.getElementsByTagName("input");
            const textAmount = document.getElementsByTagName("textarea");
            var amount2 = result.data.length;
            j=0;
            for(i = 0; i < amount.length; i++){
                if(amount[i].type == "text" && j < amount2){
                    $(amount[i]).val(result.data[j]);
                    j++;
                }
            }
            k=0;
            for(i = 0; i < textAmount.length; i++){
                $(textAmount[i]).val(result.data2[k]);
                k++;
            }   
		});   
    }
});