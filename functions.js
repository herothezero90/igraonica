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
    ],
    "package3" : [
        "MAĐIONIČARSKA PREDSTAVA U TRAJANJU OD 35 MIN",
        "DO 15 DJECE", 
        "2 SATA ROĐENDANA",
        "2 ANIMATORA",
        "GRICKALICE I SOKOVI",
        "FOTOGRAFIJE",
        "SVJEĆICE",
        "BUBBLE MACHINE"
    ]
}

const prices = {
    "basic" : 100,
    "package1" : 120,
    "package2" : 150,
    "package3" : 200
}

const colors = {
    "basic" : $('button[data-package=basic]').css('background-color'),
    "package1" : $('button[data-package=package1]').css('background-color'),
    "package2" : $('button[data-package=package2]').css('background-color'),
    "package3" : $('button[data-package=package3]').css('background-color')
}

let activePackage = "basic";

$('header button').click(function(){
    $('#package').empty();
    $('#message').hide();
    $('#message').removeClass('grow');

    // add shadow to active button
    $.each($('header button'), function() {
        $(this).removeClass('custom-shadow bold');
    });
    $(this).addClass('custom-shadow bold');

    //adjust package name
    $('#package-name').text($(this).text());

    // add package content
    $.each(content[$(this).data('package')], function() {
        $('#package').append(`<p>${this}</p>`);
    });    

    // add animation for magic offer
    if ($(this).data('package') === 'package3') {
        $('#package p').first().addClass('grow');
        $('#package p').first().css('color', '#7733ff');
        $('#package p:nth-child(2)').addClass('grow');
        $('#package p:nth-child(2)').css('color', '#7733ff');
        $('#add13').removeClass('d-none');
        $('#add13 input').val(0);
    } else {
        $('#add13').addClass('d-none');
    }

    // adjust background color
    $('#package').parent().css('background-color', colors[$(this).data('package')]);

    activePackage = $(this).data('package');

    // removed checked items and adjust for relevant package
    $.each($('input'), function() {
        $(this).prop('checked', false);
        $(this).prop('disabled', false);
        $(this).parent().removeClass('grow');
    })

    if (activePackage === 'package1') {
        $('input[name=add5]').prop('checked', true);
        $('input[name=add6]').prop('checked', true);
        $('input[name=add5]').prop('disabled', true);
        $('input[name=add6]').prop('disabled', true);
        $('input[name=add5]').parent().addClass('grow');
        $('input[name=add6]').parent().addClass('grow');
    }

    if (activePackage === 'package2') {
        $('#message').show();
        $('#message').addClass('grow');
    }
    
    // display basic price for package
    $('#price').html(prices[$(this).data('package')] + '€');
})

$('input').on('change', function() {
    if (activePackage !== 'package2') {
        if ($(this).is(':checked')) {
            const newPrice = parseInt($('#price').text()) + parseInt($(this).val());
            $('#price').html(newPrice + '€');
            $(this).parent().addClass('grow');
        } else {
            const newPrice = parseInt($('#price').text()) - parseInt($(this).val());
            $('#price').html(newPrice + '€');
            $(this).parent().removeClass('grow');
        }
    } else {
        if ($(this).is(':checked')) {
            $(this).parent().addClass('grow');
        } else {
            $(this).parent().removeClass('grow');
        }
        if ($('input:checked').length > 5 && $(this).is(':checked')) {
            $(this).prop('checked', false);
            $(this).parent().removeClass('grow');
        } 
    }
})

function adjustPrice(operation) {
    let newPrice;
    if (operation === 'plus') {
        newPrice = parseInt($('#price').text()) + 5;
    } else {
        newPrice = parseInt($('#price').text()) - 5;
    } 
    
    $('#price').html(newPrice + '€');
}
