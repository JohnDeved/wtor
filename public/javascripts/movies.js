$('.modal-trigger').leanModal()
$('.tooltipped').tooltip({delay: 500})
$('.modal-movie').modal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    complete: function() { alert('Closed'); } // Callback for Modal close
})
