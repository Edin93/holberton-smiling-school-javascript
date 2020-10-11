$(document).ready(function() {
    let quotesURL = 'https://smileschool-api.hbtn.info/quotes';
    $.ajax({
        url: quotesURL,
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
        },
        beforeSend: function() {
            $('#quotes-loader').show();
        },
        success: function(response) {
            let data = response;
            $('#quotes-loader').hide();
            for (let i = 0; i < data.length; i++) {
                let $html = (`
                <div class='carousel-item carousel-item-content ${i === 0 ? 'active' : ''}'>
                    <div class="row">
                        <div class="col-sm-3 text-center">
                            <img class="rounded-circle" src=${data[i].pic_url} class="d-block w-100" alt="random person image">
                        </div>
                        <div class="col-sm-8 ml-3 d-flex flex-column">
                            <div>&lt;&lt; ${data[i].text} &gt;&gt;</div>
                            <div class="font-weight-bold mt-3">${data[i].name}</div>
                            <div>${data[i].title}</div>
                        </div>
                    </div>
                </div>`);
                $("#quotes-carousel-inner").append($html);
            }
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });
});
