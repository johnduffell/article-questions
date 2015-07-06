var storage = chrome.storage.local;
storage.clear;

var key = 'JOHN';

var id = document.location.pathname;

var articleBody = document.getElementsByClassName('js-article__body')[0];
var questionDiv = document.createElement("div");
questionDiv.className = 'question';

// make a blank storage zone
var stored = {};
stored[key] = JSON.stringify({});
storage.set(stored);

// log it
chrome.storage.local.get(function(data) {console.log(data);});


function add(clazz, text) {
    var question = document.createElement('div');
    var questionText = document.createTextNode(text);
    question.className = clazz;

    question.appendChild(questionText);
    return question;
}

function answer(text) {
    var link = document.createElement("a");
    link.className = 'question__answer js-answer';

    link.addEventListener('click', function () {
        storage.get(key, function (stored) {
            var clicks = JSON.parse(stored[key]);
            clicks[id] = 'clicked';
            stored[key] = JSON.stringify(clicks);
            storage.set(stored);
            Array.prototype.forEach.call(document.getElementsByClassName('js-answer'), function (answer) {
                answer.style.display = 'none';
            });

            Array.prototype.forEach.call(document.getElementsByClassName('js-thanks'), function (answer) {
                answer.style.display = 'block';
            });

            chrome.storage.local.get(function(data) {console.log(data);});
        });
        chrome.storage.local.get(function(data) {console.log(data);});
    });

    var linkText = document.createTextNode(text);
    link.appendChild(linkText);

    return link;
}

function why() {
    var why = document.createElement('a');
    why.href = 'http://preview.gutools.co.uk/info/'

    var whyText = document.createTextNode("Why do we ask?");
    why.className = 'question__why';

    why.appendChild(whyText);
    return why;
}

var questionData = questions[id];

if (questionData.type === 'marketing') {
    questionDiv.appendChild(why());
}
questionDiv.appendChild(add('question__text', questionData.question));
questionData.answers.forEach(function (answerText) {
    questionDiv.appendChild(answer(answerText));
});
questionDiv.appendChild(add('question__thanks js-thanks', 'Thanks for answering!'));

articleBody.appendChild(questionDiv);
