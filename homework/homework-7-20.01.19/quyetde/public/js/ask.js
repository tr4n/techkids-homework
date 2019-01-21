$(document).ready(() => {
    console.log('Document is ready');
    $('.submit-button').hover(() => {
        $('.submit-button').addClass('hover');
    });
 

    $('.submit-button').on('click', () => {
       
        // $.ajax({
        //     url: '/getTotalQuestions',
        //     type: 'GET',
        //     success(data, textStatus, jqXHR) {
        //         console.log(data);
        //         $('.total-questions').text(`Total questions: ${data.totalQuestions} `);
        //     },
        //     error(jqXHR, textStatus, errorThrown) {
        //         console.log(errorThrown);
        //     }
        // })
    });


});