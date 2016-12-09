$('.modal-trigger').leanModal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    complete: function() { alert('Closed'); } // Callback for Modal close
})
$('.tooltipped').tooltip({delay: 500})
