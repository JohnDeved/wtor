loading_screen = pleaseWait({
  logo: 'http://i.imgur.com/XV0psJa.png',
  backgroundColor: '#fff',
  loadingHtml: '<div class=spinner><div class=double-bounce1></div><div class=double-bounce2></div></div><h5 style=color:grey>Connecting...</h5>'
})

$('.data').load('../bin/html/list.html', function() {
  $('.modal-trigger').leanModal()
  $('nav').css('position', 'fixed')
  var curType = 'movies'
  var curPage = 1
  var curSort = (location.search !== '' ? location.search.split('?')[1] : 'sort=trending')

  $.ajax({
    url: 'https://tv-v2.api-fetch.website/' + curType,
    success: function(data) {
      window.pages = data
      loading_screen.finish()
      setTimeout(function () {
        loadMore()
      }, 1000);
    },
    dataType: "JSON"
  })
})
