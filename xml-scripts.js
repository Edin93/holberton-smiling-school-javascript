$(document).ready(function() {

    // to hide the courses-loader on courses page launch.
    $('#courses-loader').hide();

    // Loading quotes
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

    // Popular Tutorials
    let tutorialsURL = 'https://smileschool-api.hbtn.info/popular-tutorials';
    $.ajax({
        url: tutorialsURL,
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
        },
        beforeSend: function() {
            $('#tutorials-loader').show();
        },
        success: function(response) {
            let data = response;
            $('#tutorials-loader').hide();
            for (let i = 0; i < data.length; i++) {
                let stars = [];
                for (let j = 0; j < data[i].star; j++) {
                    stars.push(`
                    <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                    `)
                }
                for (let j = data[i].star; j < 5; j++) {
                    stars.push(`
                    <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                    `)
                }
                let $html = (`
                <div class="text-center col-12 col-sm-6 col-md-3">
                    <div class="carousel-item active">
                        <div class='tutorial-video-top'>
                            <img class="w-100" src=${data[i].thumb_url} alt="smile image">
                            <img src="./images/play.png" class="video-play-img" alt="video play button">
                        </div>
                        <div class="mx-1">
                            <div class="font-weight-bold text-dark text-left mt-3">
                                ${data[i].title}
                            </div>
                            <div class="text-secondary text-left mt-3 mb-3">
                                ${data[i]['sub-title']}
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <img src=${data[i].author_pic_url} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                <div class="purple-text font-weight-bold">${data[i].author}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex pt-1">
                                ${stars.map(star => star)}
                                </div>
                                <div class="purple-text font-weight-bold">
                                    ${data[i].duration}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("#tutorial-cards-container").append($html);
            }
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });

    // Latest videos
    let latestVideosURL = 'https://smileschool-api.hbtn.info/latest-videos';
    $.ajax({
        url: latestVideosURL,
        type: 'GET',
        dataType: 'json',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
        },
        beforeSend: function() {
            $('#latest-videos-loader').show();
        },
        success: function(response) {
            let data = response;
            $('#latest-videos-loader').hide();
            for (let i = 0; i < data.length; i++) {
                let stars = [];
                for (let j = 0; j < data[i].star; j++) {
                    stars.push(`
                    <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                    `)
                }
                for (let j = data[i].star; j < 5; j++) {
                    stars.push(`
                    <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                    `)
                }
                let $html = (`
                <div class="text-center col-12 col-sm-6 col-md-3">
                    <div class="carousel-item active">
                        <div class='tutorial-video-top'>
                            <img class="w-100" src=${data[i].thumb_url} alt="smile image">
                            <img src="./images/play.png" class="video-play-img" alt="video play button">
                        </div>
                        <div class="mx-1">
                            <div class="font-weight-bold text-dark text-left mt-3">
                                ${data[i].title}
                            </div>
                            <div class="text-secondary text-left mt-3 mb-3">
                                ${data[i]['sub-title']}
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <img src=${data[i].author_pic_url} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                <div class="purple-text font-weight-bold">${data[i].author}</div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex pt-1">
                                ${stars.map(star => star)}
                                </div>
                                <div class="purple-text font-weight-bold">
                                    ${data[i].duration}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                $("#latest-videos-cards-container").append($html);
            }
        },
        error: function(xhr, status) {
            console.log(`An error occured`);
        }
    });

    // Courses page filtering
    let coursesURL = 'https://smileschool-api.hbtn.info/courses';
    let $qVal = $('.user_search').val();
    let $topicVal = 'all';
    let $sortVal = 'most_popular';

    // Handle keywords search change
    $('#user_search').on('input', function(e) {
        $qVal = e.target.value;
        setTimeout(function() {
            getCourses($qVal, $topicVal, $sortVal);
        }, 500);
    });

    // Handle TOPIC filter change
    $('#topic-menu button').click(function(e) {
        $topicVal = e.target.getAttribute('data-value');
        $('#topic-menu-container').text(e.target.textContent);
        getCourses($qVal, $topicVal, $sortVal);
    });

    // Handle SORT BY filter change
    $('#sorting-menu button').click(function(e) {
        $sortVal = e.target.getAttribute('data-value');
        $('#sorting-menu-container').text(e.target.textContent);
        getCourses($qVal, $topicVal, $sortVal);
    });
    
    // GET COURSES FUNCTION
    function getCourses($qVal, $topicVal, $sortVal) {
        $.ajax({
            url: coursesURL,
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'query',
                list: 'search',
                format: 'json',
                q: $qVal,
                topic: $topicVal,
                sort: $sortVal,
            },
            beforeSend: function() {
                $('#courses-loader').show();
            },
            success: function(response) {
                let data = response;
                let courses = data.courses;
                console.log(data);
                $('#courses-loader').hide();
                $('#courses-result-number').text(`${courses.length == 1 ? '1 video': courses.length + ' videos'}`);
                $("#courses-result-container").empty();
                for (let i = 0; i < courses.length; i++) {
                    let course = courses[i];
                    let stars = [];
                    for (let j = 0; j < course.star; j++) {
                        stars.push(`
                        <img src="./images/star_on.png" class="carousel-star-icon" alt="star icon filled in purple">
                        `)
                    }
                    for (let j = course.star; j < 5; j++) {
                        stars.push(`
                        <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">
                        `)
                    }
                    let $html = (`
                    <div class="text-center col-12 col-sm-4 col-md-3 mb-5">
                        <div class="carousel-item active">
                            <img class="w-100" src=${course.thumb_url} alt="smile image">
                            <div class="mx-2">
                                <div class="font-weight-bold text-dark text-left mt-3">
                                    ${course.title}
                                </div>
                                <div class="text-secondary text-left mt-3 mb-3">
                                    ${course['sub-title']}
                                </div>
                                <div class="d-flex align-items-center mb-3">
                                    <img src=${course.author_pic_url} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                                    <div class="purple-text font-weight-bold">${course.author}</div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex pt-1">
                                        ${stars.map(star => star)}
                                    </div>
                                    <div class="purple-text font-weight-bold">
                                        ${course.duration}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                    $("#courses-result-container").append($html);
                }
            },
            error: function(xhr, status) {
                console.log(`An error occured`);
            }
        });
    }

});