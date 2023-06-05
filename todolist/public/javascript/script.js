$('#newItem').focus(function () {
    $('#newComment').show();
});

$('.listItem').on('click', function() {
    $('.showItem').show();
    $('.editItem').hide();
    $(this).parent().hide();
    $(this).parent().next().show();
});

$(document).on('click', function(e) {
    console.log(!$(e.target).closest('.editElement').length)
	if(!$(e.target).closest('#newComment').length && !$(e.target).closest('#newItem').length){
		$('#newComment').hide();
	}
    if(!$(e.target).closest('.listItem').length && !$(e.target).closest('.editElement').length) {
        $('.showItem').show();
        $('.editItem').hide();
    }
});