$(function(){
    chrome.storage.sync.get('currentLetter', function(findLetter){
        $('#currentLetter').text(findLetter.currentLetter);
    })

    $('#btnChange').click(function(){
        var want = $('#placeText').val();
        $('#searchBar').val(want);
        $("textarea").val(want);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeField", enterSearch: want}, function(res){
                const div = document.createElement('div')
                div.textContent = `${res.count} inputs`
                document.body.appendChild(div)
                const div2 = document.createElement('div')
                div2.textContent = `${res.textCount} text areas`
                document.body.appendChild(div2)
            });
        });
    });
    
    $('#btnCopy').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "copyField"}, function(res){
                //alert("Copied Popup!")
            })
        });
    });

    $('#btnPaste').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "pasteField"})
        });
    });

    $('#btnNext').click(function(){
        chrome.storage.sync.get("data", function(result){
            chrome.storage.sync.set({'data': nextForm(result.data, 1)}, function(){
                //alert("Next Set!")
            });
        });
    });

    $('#btnPrev').click(function(){
        chrome.storage.sync.get("data", function(result){
            chrome.storage.sync.set({'data': nextForm(result.data, -1)}, function(){
                //alert("Prev Set!")
            });
        });
    });
});

//Changes the String Array to the new Letter picked
function nextForm(next, dir){
    var patt1 = /\s[a-z][^a-z]/gi; 
    var newLetter;
    if(dir > 0) { 
        for(i=0;i < next.length; i++){
            var pos = next[i].search(patt1)+1;
            var oldLetter = next[i].charAt(pos);
            newLetter = nextLetter(oldLetter, dir);
            next[i] = next[i].replace(patt1, " " + newLetter + next[i].charAt(pos+1));
        } 
    }
    else if(dir < 0) { 
        for(i=next.length-1; i >= 0; i--){
            var pos = next[i].search(patt1)+1;
            var oldLetter = next[i].charAt(pos);
            newLetter = nextLetter(oldLetter, dir);
            next[i] = next[i].replace(patt1, " " + newLetter + next[i].charAt(pos+1));
        }
    }
    $('#currentLetter').text(newLetter);
    return next;
}

//Gets prev or next letter depending on prev or next button was pressed
function nextLetter(oldLetter, dir){
    var letter = oldLetter.toLowerCase();
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if(dir > 0) { 
        for(j=0; j < alphabet.length; j++){
            if(letter == 'z'){ return 'A'; }

            if(letter == alphabet[j]){ return alphabet[j+1].toUpperCase(); }
        }
    }
    else if(dir < 0) {
        for(j=alphabet.length-1; j >= 0; j--){
            if(letter == 'a'){ return 'Z'; }

            if(letter == alphabet[j]){ return alphabet[j-1].toUpperCase(); }
        }
    }
    return oldLetter;
}