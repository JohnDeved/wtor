$('.modal-trigger').leanModal({
    dismissible: false
})
$('.tooltipped').tooltip({delay: 500})
$('nav').css('position', 'fixed')

$.imdb_data = function (id) {
    $.ajax({
        url: ('/api?imdb/' + id),
        dataType: 'JSON',
        success: (data) => {
            console.log(data)
            $('#modal_' + id + ' .modal-content .plot').text(data.Plot)
            $('#modal_' + id + ' .modal-content .awards').text(data.Awards)
            $('#modal_' + id + ' .modal-content .released').text(data.Released)
            $('#modal_' + id + ' .modal-content .runtime').text(data.Runtime)
            $('#modal_' + id + ' .modal-content .rating').text(data.imdbRating)
        }
    })
}
