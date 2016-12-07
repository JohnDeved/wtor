$(document).ready(function() {
  var getHtml = {
    '/': 'bin/html/menu.html',
    '/movies/': '../bin/html/menu.html',
    '/watch/': '../bin/html/menu.html'
  }
  $('body').load(getHtml[location.pathname], function() {
    $.getScript('https://blockchain.info/Resources/js/pay-now-button.js')
    var getScript = {
      '/': 'bin/js/main.js',
      '/movies/': '../bin/js/movies.js',
      '/watch/': '../bin/js/watch.js'
    }
    $.getScript(getScript[location.pathname])
  })
})
