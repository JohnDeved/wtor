$('.searchbtn').click(function () {
  function n () {
    return 'sort=' + $('select').val()
  }
  function e () {
    return $('input').val() !== '' ? '&keywords=' + escape($('input').val()) : ''
  }
  window.location = '/movies?' + n() + e()
})
$('.modal-trigger').leanModal({
    dismissible: false
})
$('select').material_select()
$('.tooltipped').tooltip({delay: 500})
