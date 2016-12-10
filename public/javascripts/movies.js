$('.modal-trigger').leanModal({dismissible: false})
$('.tooltipped').tooltip({delay: 500})
$('nav').css('position', 'fixed')

$.imdb_data = (id) => {
    $.ajax({
        url: ('/api?imdb/' + id),
        dataType: 'JSON',
        success: (data) => {
            console.log(data)
            if (data.Plot.length > 500) {
                $('#modal_' + id + ' .modal-content .plot').text(data.Plot.substr(0,300)+'...')
            } else {
                $('#modal_' + id + ' .modal-content .plot').text(data.Plot)
            }
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
