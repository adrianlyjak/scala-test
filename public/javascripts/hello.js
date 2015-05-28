$(function() {
  function isUrlValid(url) {
    if (!url) return false;
    return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
  }

  var form = $('#crawl');
  var input = $('input[name="crawl-url"]')[0];
  var output = $('#crawled-title');
  var spinner = $('.crawl-spinner');

  form.submit(function(e) {
    e.preventDefault();
    var url = input.value;
    if (!isUrlValid(url)) {
      url = 'http://'+ url;
      if (!isUrlValid(url)) {
        return alert('Sorry, that\'s a no go: Your url is invalid');
      }
    }
    $.ajax('/crawl', { data: { url: url }})
      .done(function( response ) {
        spinner.hide(100);
        console.log('response', response);
        output.text(response);
      });
    spinner.show();

  });





});