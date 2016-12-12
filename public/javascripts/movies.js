$('.modal-trigger').leanModal({dismissible: false})
$('.tooltipped').tooltip({delay: 500})
$('nav').css('position', 'fixed')

$.imdb_data = (id) => {
    $.ajax({
        url: ('/api?imdb/' + id),
        dataType: 'JSON',
        success: (data) => {
            console.log(data)
            $('#modal_' + id + ' .modal-content .awards').text(data.Awards)
            $('#modal_' + id + ' .modal-content .released').text(data.Released)
            $('#modal_' + id + ' .modal-content .runtime').text(data.Runtime)
            $('#modal_' + id + ' .modal-content .rating').text(data.imdbRating)
        }
    })
}

$.loadmore = (q) => {
    var page = $('.loadmore')[0].getAttribute('page')
    page = ((parseInt(page.split('?')[0]) + 1) + '?' + page.split('?')[1])
    $('.loadmore').remove()
    $('.listing').append('<div class="spinner" style="margin: 50px auto"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>')
    $.ajax({
        url: ('/api?load/' + q),
        success: (data) => {
            curBricks = $('.brick').length
            $('#freewall').append(data)
            $('.listing .spinner').remove()
            if (($('.brick').length - curBricks) >= 50) {
                $('.listing').append('<a class="btn loadmore waves-effect" page="' + page + '" onclick="$.loadmore(this.getAttribute(\'page\'))">load more</a>')
            } else {
                $('.listing').append('<div class="loadmore"></div>')
            }
            var bricks = $('#freewall').find('.brick')
            for (var i = 0; i < bricks.length; i++) {
                var id = bricks[i].className.split(' ')[2]
                var card = $('#freewall').find('.'+id)
                if (card.length > 1) {
                    console.log('double found', card)
                    $(card[card.length - 1]).remove()
                }
            }
            $('.modal-trigger').leanModal({dismissible: false})
            $('.tooltipped').tooltip({delay: 500})
        }
    })
}

$.getVideo = (elem, id) => {
    var callback = () => {
        window.player = new YT.Player(elem, {
            videoId: id,
            playerVars: {
                autoplay: 1,
                autohide: 1,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                iv_load_policy: 3
            },
            events: {
                'onReady': onPlayerReady,
            }
        })
    }
    window.onPlayerReady = (event) => {
        event.target.mute()
    }
    if (!window.YT) {
        $.getScript("https://www.youtube.com/iframe_api")
        window.onYouTubeIframeAPIReady = callback
    } else {
        callback()
    }
}

$.removeVideo = (id) => {
    $('.video_' + id + '_container').children().remove()
    $('.video_' + id + '_container').append('<div id="video_' + id + '" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: -1;"></div>')
    $('.volume_' + id).html('<i class="material-icons">volume_off</i>')
    $('.play_' + id).html('<i class="material-icons">pause</i>')
}

$.pauseVideo = (id) => {
    var action = {
        pause: (id) => {
            player.pauseVideo()
            $('.play_' + id).html('<i class="material-icons">play_arrow</i>')
        },
        play_arrow: (id) => {
            player.playVideo()
            $('.play_' + id).html('<i class="material-icons">pause</i>')
        }
    }
    action[$('.play_' + id).text()](id)
}

$.muteVideo = (id) => {
    var action = {
        volume_off: (id) => {
            player.unMute()
            $('.volume_' + id).html('<i class="material-icons">volume_up</i>')
        },
        volume_up: (id) => {
            player.mute()
            $('.volume_' + id).html('<i class="material-icons">volume_off</i>')
        }
    }
    action[$('.volume_' + id).text()](id)
}
