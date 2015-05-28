$(function() {
  function isUrlValid(url) {
    if (!url) return false;
    return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
  }

  var form = $('#crawl');
  var input = $('input[name="crawl-url"]')[0];
  var output = $('#crawled-title');
  var spinner = $('.crawl-spinner');
  output.hide();
  input.value = "flimflam.com";
  
  function showOutput(alertType, html) {
    var opposite = alertType === 'danger' ? 'success' : 'danger';
    output.removeClass('alert-'+opposite).addClass('alert-'+alertType);
    output.html(html);
    output.show();
  }


  form.submit(function(e) {
    e.preventDefault();
    var url = input.value;
    if (!isUrlValid(url)) {
      url = 'http://'+ url;
      if (!isUrlValid(url)) {
        return showOutput('danger', 'Sorry, that\'s a no go: Your url is invalid');
      }
    }
    $.ajax('/crawl', { data: { url: url }})
      .done(function( response ) {
        spinner.hide();
        console.log('response', response);
        var iUrl = '<em>'+url+'</em>';
        var title = '<code>&lt;title&gt;</code>';
        if (response) {
          showOutput('success', 'The '+title+' of '+iUrl+' is <strong>'+response+'</strong>');
        } else {
          showOutput('danger', 'Uh oh! There is no '+title+' for '+iUrl);
        }
      });

    spinner.show();
  });





});