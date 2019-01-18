$(document).ready(() => {
    // load question
    $.ajax({
        url: '/get-question',
        type: 'GET',
        success(data, textStatus, jqXHR) {
            const question = data.question;
            $('h1').text(question.content);
            $('.vote-button').attr("question-id", question.id);
            $('a').attr("href", `/result/${question.id}`);
            $('.notification').text("Vote success !! ").hide(1);
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    // set click vote
    $('.vote-button').on('click', function() {
        
        const questionId = $(this).attr("question-id"),
            yes = $(this).attr('yes'),
            no = $(this).attr('no');
        
        $.ajax({
            url: `/vote/${questionId }?yes=${parseInt(yes)}&no=${parseInt(no)}`,
            type: 'GET',
            success(data, textStatus, jqXHR) {
                $('.notification').show(1).delay(1000).hide(1);

            },
            error(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
    $('.questions-button').on('click', () => {
        console.log("testd");
        const request = new XMLHttpRequest();
        // request.open('GET', '/getTotalQuestions');
        // request.onreadystatechange = () => {
        //     if (request.readyState === 4 && request.status == 200) {
        //         console.log(request.response);
        //         const response = JSON.parse(request.response);
        //         $('.total-questions').text(`Total questions: ${response.totalQuestions} `);
        //     }else{
        //         console.log(request.status);
        //     }
        // };
        // request.send();

        $.ajax({
            url: '/getTotalQuestions',
            type: 'GET',
            success(data, textStatus, jqXHR) {
                console.log(data);
                $('.total-questions').text(`Total questions: ${data.totalQuestions} `);
            },
            error(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    });


});