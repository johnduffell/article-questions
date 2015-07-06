var storage = chrome.storage.local;
storage.clear;

var key = 'JOHN';

var id = 'articleId';

var articleBody = document.getElementsByClassName('js-article__body')[0];
console.log('articleBody', articleBody);
var questionDiv = document.createElement("div");
questionDiv.className = 'question';


var stored = {};
stored[key] = JSON.stringify({});
storage.set(stored);
chrome.storage.local.get(function(data) {console.log(data);});


function question() {
    var question = document.createTextNode("What do you think?");
    question.className = 'question__text';
    return question;
}

function answer(text) {
    var link = document.createElement("a");
    link.className = 'answer';

    link.addEventListener('click', function () {
        storage.get(key, function (stored) {
            var clicks = JSON.parse(stored[key]);
            clicks[id] = 'clicked';
            stored[key] = JSON.stringify(clicks);
            storage.set(stored);
            chrome.storage.local.get(function(data) {console.log(data);});
        });
        chrome.storage.local.get(function(data) {console.log(data);});
    });

    var linkText = document.createTextNode(text);
    link.appendChild(linkText);

    return link;
}

questionDiv.appendChild(question());
questionDiv.appendChild(answer('Agree'));
questionDiv.appendChild(answer('Disagree'));

articleBody.appendChild(questionDiv);
