const models = require('../models');

exports.showSurveyGet = function (req, res) {

    models.Survey.findById(req.params.surveyId, {
        //TODO: Change include to reduce data.
        include: [{
            all: true,
            nested: true
        }]
    }).then((survey) => {
        //res.send(survey)
        res.render('pages/survey/showSurvey', {
            survey: survey
        });
    }).catch((err) => {
        res.status(400).send(undefined === err.errors ? "Couldn't find the survey." : err.errors[0].message);
    })

}

exports.createSurveyGet = function (req, res) {
    res.render('pages/survey/newSurvey');
}

exports.createSurveyPost = function (req, res) {
    if (!req.body)
        return res.sendStatus(400).send('Invalid request.');

    console.log(req.body);

    var i, j;
    var promises, questionPromises;

    models.Survey.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user.id
    }).then((survey) => {

        models.sequelize.transaction(function(t) {
            promises = []
            for (i = 0; i < req.body.questions.length; i++) {
                promises.push(models.Question.create({
                    question: req.body.questions[i].question,
                    type: req.body.questions[i].type,
                    min_length: req.body.questions[i].min_length,
                    max_length: req.body.questions[i].max_length,
                    survey_id: survey.id
                }, {
                    transaction: t
                }));
            }

            return Promise.all(promises).then(function(questions) {
                questionPromises = []
                for (i = 0; i < req.body.questions.length; i++) {
                    if (undefined !== req.body.questions[i].options) {
                        for (j = 0; j < req.body.questions[i].options.length; j++) {
                            questionPromises.push(models.Option.create({
                                option: req.body.questions[i].options[j],
                                question_id: questions[i].id
                            }, {
                                transaction: t
                            }));
                        }
                    }
                }

                return Promise.all(questionPromises);
            });
                
        }).then(() => {

            if (undefined !== req.body.private_survey) {
                models.SurveyMeta.create({
                    key: "private_survey",
                    value: "true",
                    survey_id: survey.id
                })
            }

            if (undefined !== req.body.show_results) {
                models.SurveyMeta.create({
                    key: "show_results",
                    value: "true",
                    survey_id: survey.id
                })
            }

            if (undefined !== req.body.ip_restriction) {
                models.SurveyMeta.create({
                    key: "ip_restriction",
                    value: "true",
                    survey_id: survey.id
                })
            }

            res.redirect('/survey/' + survey.id);
        }).catch((err) => {
            res.render('pages/survey/newSurvey', {
                notification: {
                    type: "error",
                    text: "Couldn't create survey."
                }
            })
            console.log(err);
        });

    }).catch((err) => {
        res.render('pages/survey/newSurvey', {
            notification: {
                type: "error",
                text: "Couldn't create survey."
            }
        })
        console.log(err);
    });
}

exports.submitSurveyPost = function (req, res) {
    var ip = req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress

    models.SurveyRecord.create({
        ip: ip,
        user_id: req.session.user.id,
        survey_id: req.params.surveyId
    }).then((record) => {

        models.sequelize.transaction(function(t) {
            var promises = []
            for (var i = 0; i < req.body.answers.length; i++) {
                if (Array.isArray(req.body.answers[i].option_id)) {
                    for (var j = 0; j < req.body.answers[i].option_id.length; j++) {
                        promises.push(models.Answer.create({
                            answer: req.body.answers[i].answer,
                            option_id: req.body.answers[i].option_id[j],
                            survey_record_id: record.id
                        }, {
                            transaction: t
                        }));
                    }
                } else {
                    promises.push(models.Answer.create({
                        answer: req.body.answers[i].answer,
                        option_id: req.body.answers[i].option_id,
                        survey_record_id: record.id
                    }, {
                        transaction: t
                    }));
                }
            }
        }).then(() => {
            models.Survey.findById(req.params.surveyId, {
                include: [{
                    all: true,
                    nested: true
                }]
            }).then((survey) => {
                res.render('pages/survey/showSurvey', {
                    survey: survey,
                    notification: {
                        type: "success",
                        text: "The survey has been submitted successfully."
                    }
                });
            })
        }).catch((err) => {
            console.log(err)
            res.status(400).send(undefined === err.errors ? "Couldn't submit the survey." : err.errors[0].message);
        })

    }).catch((err) => {
        console.log(err)
        res.status(400).send(undefined === err.errors ? "Couldn't submit the survey." : err.errors[0].message);
    })
}