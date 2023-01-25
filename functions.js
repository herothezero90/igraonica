const content = {
    "basic" : [
        "NEOGRANIČENI BROJ DJECE", 
        "2 SATA ANIMACIJE",
        "2 ANIMATORA",
        "GRICKALICE I SOKOVI",
        "FOTOGRAFIJE",
        "SVJEĆICE",
        "BUBBLE MACHINE"
        ],
    "package1" : [
        "NEOGRANIČENI BROJ DJECE", 
        "2 SATA ANIMACIJE",
        "2 ANIMATORA",
        "GRICKALICE I SOKOVI",
        "FOTOGRAFIJE",
        "SVJEĆICE",
        "BUBBLE MACHINE"
    ],
    "package2" : [
        "NEOGRANIČENI BROJ DJECE", 
        "2 SATA ANIMACIJE",
        "2 ANIMATORA",
        "GRICKALICE I SOKOVI",
        "FOTOGRAFIJE",
        "SVJEĆICE",
        "BUBBLE MACHINE"
    ]
}

const prices = {
    "basic" : 100,
    "package1" : 150,
    "package2" : 200
}

const colors = {
    "basic" : $('button[data-package=basic]').css('background-color'),
    "package1" : $('button[data-package=package1]').css('background-color'),
    "package2" : $('button[data-package=package2]').css('background-color')
}

let activePackage = "basic";

$('header button').click(function(){
    $('#package').empty();
    $('#message').hide();

    // add package content
    $.each(content[$(this).data('package')], function() {
        $('#package').append(`<p>${this}</p>`);
    });    
    // adjust background color
    $('#package').parent().css('background-color', colors[$(this).data('package')]);

    activePackage = $(this).data('package');

    // removed checked items and adjust for relevant package
    $.each($('input'), function() {
        $(this).prop('checked', false);
        $(this).prop('disabled', false);
    })

    if (activePackage === 'package1') {
        $('input[name=add5]').prop('checked', true);
        $('input[name=add6]').prop('checked', true);
        $('input[name=add5]').prop('disabled', true);
        $('input[name=add6]').prop('disabled', true);
    }

    if (activePackage === 'package2') {
        $('#message').show();
    }
    
    // display basic price for package
    $('#price').html(prices[$(this).data('package')] + '€');
})

$('input').on('change', function() {
    if (activePackage !== 'package2') {
        if ($(this).is(':checked')) {
            const newPrice = parseInt($('#price').text()) + parseInt($(this).val());
            $('#price').html(newPrice + '€');
        } else {
            const newPrice = parseInt($('#price').text()) - parseInt($(this).val());
            $('#price').html(newPrice + '€');
        }
    } else {
        if ($('input:checked').length > 5 && $(this).is(':checked')) {
            $(this).prop('checked', false)
        }
    }
})
