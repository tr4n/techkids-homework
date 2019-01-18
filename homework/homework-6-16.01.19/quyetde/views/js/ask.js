$(document).ready(() => {
    console.log('Document is ready');
    $('.submit-button').hover(() => {
        $('.submit-button').addClass('hover');
    });

    $('.submit-button').on('click', () => {
        const content = $('textarea').val();
        console.log("textarea: " + content);
        $.ajax({
            url: '/add-question',           
            type: 'POST',        
            data: {"content" : content},
            success: function (data, textStatus, jQxhr) {
                console.log("add success");
                $('.add-success').text("Add question success!");
                $('.add-success').show(1).delay(1000).hide(1);
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