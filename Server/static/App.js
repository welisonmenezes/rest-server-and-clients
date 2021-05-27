var form = document.querySelector('.validate-form');
if (form) {
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        var requireds = document.querySelectorAll('.required');
        var hasError = false;
        for (i = 0; i < requireds.length; ++i) {
            var field = requireds[i];
            if (field.value.trim() == "") {
                field.classList.add('invalid');
                hasError = true;
            }
        }
        if (! hasError) form.submit();
    });
}