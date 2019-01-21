const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');
const app = express();



mongoose.connect('mongodb://localhost:27017/web18', (error) => {
    console.log(error || "connect success!!");
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const Random = {
    nextInt(value) {
        return Math.floor(Math.random() * value);
    },
    getInt(first, second) {
        return first >= second ? second : first + Math.floor(Math.random() * (second - first))
    }
}


// routers for page
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/html/index.html");

});

app.get("/ask", (request, response) => {
    response.sendFile(__dirname + "/public/html/ask.html");
});

app.get("/answer/:questionId", (request, response) => {
    response.sendFile(__dirname + "/public/html/answer.html");
});




// routers for json data

/*
 * get -> lay data
 * post -> tao moi
 * put -> update data
 * delete -> delete
 */

app.post('/api/questions', async (request, response) => {
    try {
        const questionContent = request.body.questionContent;
        if (questionContent.toString().length < 1) return;

        let newQuestion = {
            content: questionContent,
            createdAt: new Date()
        };

        const result = await QuestionModel.create([newQuestion]);
        //   console.log(result);

        response.json({
            success: true
        });
    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }

});

app.get('/api/questions/getRandomQuestion', async (request, response) => {
    try {
        await QuestionModel.find({}, (error, questions) => {
            if (error) {
                console.log(error);
            } else {
                const index = Random.nextInt(questions.length),
                    randomQuestion = questions[index];

                response.json(randomQuestion);
            }
        });



    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    };

});

app.get('/api/questions/getQuestionById/:questionId', async (request, response) => {
    try {
        await QuestionModel.find({}, (error, questions) => {
            if (error) {
                console.log(error);
            } else {
                questionId = (request.params.questionId),
                    selectedQuestion = questions.filter((item) => (item._id == questionId))[0];

                if (selectedQuestion) {
                    response.json(selectedQuestion);
                } else {
                    response.json({
                        success: false,
                        message: 'question not found'
                    })
                }
            }
        });


    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }
});

app.put('/api/questions', async (request, response) => {
    try {
        const questionId = request.body.questionId,
            vote = request.body.vote;
        let question;
        await QuestionModel.findById(questionId, (error, data) => {
            question = data;
        });
        const newQuestion = question;
        newQuestion[vote]++;
       // console.log(newQuestion);

        await QuestionModel.findByIdAndUpdate(questionId, newQuestion);

        response.json({
            success: true
        });



    } catch (error) {
        response.json({
            success: false,
            message: error.message
        });
    }
});


// see result vote


app.use('/', express.static('public'));
app.listen("1234", (error) => {
    console.log(error || "server start success!! port: 1234");
});