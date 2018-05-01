const models = require('../models');

exports.showSurveyGet = function (req, res) {
    res.render('pages/survey/showSurvey');
}

exports.createSurveyGet = function (req, res) {
    res.render('pages/survey/newSurvey');
}

exports.createSurveyPost = function (req, res) {
    if (!req.body)
        return res.sendStatus(400).send('Invalid request.');

    console.log(req.body);

    var i, j;
    var input_question;
    var input_options;

    models.Survey.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user.id
    }).then((survey) => {
        for (i = 0; i < req.body.questions.length; i++) {
            input_question = req.body.questions[i];
            models.Question.create({
                question: input_question.question,
                type: input_question.type,
                min_length: input_question.min_length,
                max_length: input_question.max_length,
                survey_id: survey.id
            }).then((question) => {
                if (undefined !== input_question.options) {
                    for(j = 0; j < input_question.options.length; j++) {
                        models.Option.create({
                            option: input_question.options[j],
                            question_id: question.id
                        });
                    }
                }
            });
        }

        res.redirect('/survey/' + survey.id);
    }).catch((err) => {
        res.status(400).send(undefined === err.errors ? "Couldn't create survey." : err.errors[0].message);
        console.log(err);
    });
}