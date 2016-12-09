$('.searchbtn').click(function () {
  function n () {
    return 'sort=' + $('select').val()
  }
  function e () {
    return $('input').val() !== '' ? '&keywords=' + $('input').val() : ''
  }
  window.location = '/movies?' + n() + e()
})
$('.modal-trigger').leanModal()
$('select').material_select()
$('.tooltipped').tooltip({delay: 500})
