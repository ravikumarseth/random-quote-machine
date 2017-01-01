//Twitter Button Customization Starts

window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));

//Twitter Button Customization ends

var JSONURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
var quote = $("#quote em").text();
var author = $("#author span").text();
var tweetURL = '\"' + quote + '\" - ' + author;

$(function() {
    changeColor();
    getJSONData();
});


$("#new-quote").click(function(ev){
    changeColor();
    getJSONData();
    ev.preventDefault();
});

function changeColor(){
    var h = Math.floor((Math.random() * 360));
    var s = Math.floor((Math.random() * 50));
    var l = Math.floor((Math.random() * 50) + 50);
    
    $('html').css('background-color', "hsl(" + h + ", " + s + "%, " + l + "%)");
    $('#new-quote').hover(function() {$('#new-quote').css('background', "hsl(" + h + ", " + s + "%, " + l + "%)")}, function() {
        $('#new-quote').css('background', "#000");
    });
    $('body').css('background-color', "hsl(" + (h + 25) + ", " + (s + 25) + "%, " + (l - 50) + "%)");
    $('body, a').css('color', "hsl(" + h + ", " + s + "%, " + l + "%)");
}

function getJSONData() {
    $.getJSON(JSONURL, function(json){
    quote = json.quoteText;
    author = json.quoteAuthor;
    if(author.length == 0){
        author = "Anonymous";
    }
    tweetURL = '\"' + quote + '\" - ' + author;
    $("#quote em").text(quote);
    $("#author span").text(author);
    refreshTwitterButton();
    });
}
              
function refreshTwitterButton(){
    // Remove existing iframe
    $('#tweetBtn iframe').remove();
    // Generate new markup
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'https://twitter.com/share')
        .attr('data-text', tweetURL)
        .attr('data-hashtags', 'quotes')
        .attr('data-url', '#')
        .attr('data-size', "large");
    $('#tweetBtn').append(tweetBtn);
    twttr.widgets.load();
}