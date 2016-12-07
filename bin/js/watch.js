/* global $, pleaseWait, ttOps, torrentsTime */
$('.data').load('../bin/html/watch.html', function() {
  if (location.hash.match(/#(tt\d+)@(\d+p)\b/) !== null) {
    $.ajax({
      url: 'https://tv-v2.api-fetch.website/movie/' + location.hash.match(/#(tt\d+)@(\d+p)\b/)[1],
      success: function(data) {
        var self = {
          res: window.location.href.match(/#(tt\d+)@(\d+p)\b/)[2],
          data: data
        }
        console.log(self.data)
        var torUrl = self.data.torrents.en[self.res].url
        console.log(torUrl)
        $('.titel').text(self.data.title)
        $('.card-action a').text(torUrl.match(/\burn:btih:([A-F\d]+)\b/)[1])
        $('.card-action a').attr('href', torUrl)
        setTimeout(function () {
          ttOps = {
            publisher_id: 765,
            source: escape(torUrl),
            imdbid: self.data.imdb_id,
            poster: self.data.images.fanart,
            title: self.data.title
          }
          torrentsTime.init(ttOps)
          $('.modal-trigger').leanModal()
        }, 2000)
      },
      dataType: "JSON"
    })

  } else {
    window.location = '/'
  }
})
