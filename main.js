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
    why.href = 'http://preview.gutools.co.uk/info/';

    var whyText = document.createTextNode("Why do we ask?");
    why.className = 'question__why';

    why.appendChild(whyText);
    return why;
}

function addManage(clazz) {
    var wrap = document.createElement('div');
    wrap.className = clazz;

    var why = document.createElement('a');
    why.href = 'http://preview.gutools.co.uk/info/';

    var whyText = document.createTextNode("Undo");
    why.className = 'question__onward';

    why.appendChild(whyText);

    var why2 = document.createElement('a');
    why2.href = 'http://preview.gutools.co.uk/info/';

    var whyText2 = document.createTextNode("Manage your data");
    why2.className = 'question__onward';

    why2.appendChild(whyText2);

    wrap.appendChild(why);
    wrap.appendChild(why2);
    return wrap;
}

function addMembership(clazz) {
    var wrap = document.createElement('div');
    wrap.className = clazz;

    var why = document.createElement('a');
    why.href = 'http://membership.theguardian.com/';

    var whyText = document.createTextNode("Help fund our work by becoming a member");
    why.className = 'question__onward';

    why.appendChild(whyText);

    wrap.appendChild(why);
    return wrap;
}

function addLogo(clazz, file) {
    var wrap = document.createElement('div');
    wrap.className = clazz;

    var fb = document.createElement('img');
    fb.className = 'question__onward';
    fb.src = chrome.extension.getURL("FB.png");

    var tw = document.createElement('img');
    tw.className = 'question__onward';
    tw.src = chrome.extension.getURL("TW.png");

    wrap.appendChild(fb);
    wrap.appendChild(tw);
    return wrap;
}

function addIceCream(clazz, file) {
    var wrap = document.createElement('div');
    wrap.className = clazz;

    //var fb = document.createElement('img');
    //fb.className = 'question__icecream';
    //fb.src = chrome.extension.getURL("icecream.jpeg");

    var tw = document.createElement('img');
    tw.className = 'question__icecream';
    tw.src = chrome.extension.getURL("icecream.gif");

    //wrap.appendChild(fb);
    wrap.appendChild(tw);
    return wrap;
}

var questionData = questions[id];

if (questionData.marketing) {
    questionDiv.appendChild(why());
}
questionDiv.appendChild(add('question__text', questionData.question));
questionData.answers.forEach(function (answerText) {
    questionDiv.appendChild(answer(answerText));
});
if (questionData.marketing) {
    questionDiv.appendChild(add('question__thanks js-thanks', 'That\'s crazy!  No-one could eat that much!'));
    questionDiv.appendChild(addIceCream('question__thanks__wrapper js-thanks'));
    questionDiv.appendChild(addManage('question__thanks__wrapper js-thanks'));
} else {
    if (questionData.membership) {
        questionDiv.appendChild(add('question__thanks js-thanks', 'We appreciate your support.'));
        questionDiv.appendChild(addMembership('question__thanks__wrapper js-thanks'));
    } else {
        questionDiv.appendChild(add('question__thanks js-thanks', '57% of readers agree with you, why not share your thoughts?'));
        questionDiv.appendChild(addLogo('question__thanks__wrapper js-thanks'));
    }
}

articleBody.appendChild(questionDiv);