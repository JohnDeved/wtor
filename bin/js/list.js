function loadMore () {
  $.ajax({
    url: 'https://tv-v2.api-fetch.website/' + window.pages.shift() + '?' + (location.search !== '' ? location.search.split('?')[1] : 'sort=trending'),
    success: function(data) {
      for (let i = 0; i < data.length; i++) {
        $.ajax({
          url: 'http://www.omdbapi.com/?i=' + data[i].imdb_id + '&plot=full&r=json',
          success: function(imdb_data) {
            var curObj = data[i]
            curObj.imdb_data = imdb_data

            function fillIn (data, tag1, tag2) {
              return data !== void 0 && data !== 'false' ? tag1 + data + tag2 : ''
            }
            function fillIn (data, tag1, tag2) {
              return data !== void 0 && data !== 'false' && data !== 'N/A' ? tag1 + data + tag2 : ''
            }
            var torrentsHtml = ''

            if (typeof (curObj.torrents) !== 'undefined') {
              var torrentLangsTags = Object.keys(curObj.torrents)
              var torrentLangs = Object.values(curObj.torrents)
              for (var j = 0; j < torrentLangs.length; j++) {
                var torrents = Object.values(torrentLangs[j])
                var torrentsKeys = Object.keys(torrentLangs[j])
                for (var z = 0; z < torrents.length; z++) {
                  torrentsHtml += '<p class="torrentInfo grey-text text-darken-4"><a class="btn tooltipped" data-position="top" data-tooltip="click to watch"' +
                    'onclick="window.location=\'/watch#' + curObj.imdb_id + '@' + torrentsKeys[z] + '\'">' + torrentsKeys[z] + '</a>' +
                    '<br>(' + (torrentLangsTags[j]).toUpperCase() + ' | ' + torrents[z].filesize + ')<br>' +
                    '<span class="seedinfo">Seeders: ' + torrents[z].seed + ' | Peers: ' + torrents[z].peer + '</span></p>'
                }
              }
            }
            $('#freewall').append('' +
              '<div class="brick card" data-aos="fade-up">' +
              '<div class="card-image waves-effect waves-block waves-light">' +
              '<img onerror="this.src=\'https://i.imgur.com/jDYdS1L.jpg\'" class="activator" src="https://i.imgur.com/CFjUEuq.jpg">' +
              '<img onerror="this.src=\'https://i.imgur.com/CFjUEuq.jpg\'" onload="this.onload=\'\';  this.src=\'' + curObj.images.poster +'\'" class="activator" src="' + curObj.images.poster.split('/fanart/').join('/preview/') + '" style="position: absolute">' +
              //'<img onerror="this.src=\'https://i.imgur.com/jDYdS1L.jpg\'" class="activator" src="' + curObj.images.poster + '" style="position: absolute">' +
              '</div>' +
              '<div class="card-content">' +
              '<span class="card-title activator grey-text text-darken-4 truncate tooltipped" data-position="top" data-tooltip="click for more Infos">' + curObj.title + '</span>' +
              '<p><span class="seedinfo"><a target="_blank" href="http://www.imdb.com/title/' + curObj.imdb_id + '">imdb ' + curObj.imdb_data.imdbRating + '/10</a> (' + curObj.imdb_data.Released + ')</span></p>' +
              '</div>' +
              '<div class="card-reveal">' +
              '<span class="card-title grey-text text-darken-4">' + curObj.title + '<i class="material-icons right">close</i></span>' +
              '<span class="seedinfo"><a target="_blank" href="http://www.imdb.com/title/' + curObj.imdb_id + '">imdb ' + curObj.imdb_data.imdbRating + '/10</a> (' + curObj.imdb_data.Released + ')<br>' +
              (fillIn(curObj.imdb_data.Awards, 'Awards: ', '</span>')) +
              torrentsHtml +
              (fillIn(curObj.trailer, '<a target="_blank" href="', '">Trailer</a>')) +
              (fillIn(curObj.synopsis, '<p class="desc">', '</p>')) +
              '</div>' +
              '</div>' +
              '')
              AOS.init({
                duration: 1200
              });
              $('.tooltipped').tooltip({delay: 250})
          },
          dataType: "JSON"
        })
      }
      console.log(data)
    },
    dataType: "JSON"
  })
}
function workContent (content) {

}
