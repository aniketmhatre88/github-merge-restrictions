// ==UserScript==
// @name        Git Hub
// @namespace   http://yahoo.com
// @include     https://git.corp.yahoo.com/*/pull/*
// @include     https://git.corp.yahoo.com/*/pulls
// @version     1
// @grant       none
// ==/UserScript==

function runMonitoringScript() {
    var author = $('.timeline-comment-avatar:first').attr('alt');
    var comments = $('.timeline-comment-wrapper:not(:first):not(.timeline-new-comment)');
    var nonAuthorComments = comments.filter(function(index) {
        return ($(comments[index]).find('a img').attr('alt') !== author);
    });

    var thumbsUp = [];
    var count = 0;

    var i;
    for(i = 0; i < nonAuthorComments.length; i++) {
        var iteratorElem = nonAuthorComments[i];

        if($(iteratorElem).find('img.emoji').attr('alt') === ':+1:') {
            var commentorsName = $(iteratorElem).find('a').attr('href');
            if (thumbsUp.indexOf(commentorsName) === -1) {
                thumbsUp.push(commentorsName);
            }
        }
    }

    if(thumbsUp.length < 2 ) {
        $('.btn.merge-branch-action').prop('disabled',true);
        $('.btn.merge-branch-action').addClass('tooltipped tooltipped-s');
        $('.btn.merge-branch-action').attr('aria-label','Need thumbsup from atleast two reviewers to merge!');
    }
};

$(document).ajaxComplete(function() {
    runMonitoringScript();
});