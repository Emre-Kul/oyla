const models = require('../models/');
const Op = require('sequelize').Op;

const CONFIG = require('../config/appConfig.js');

listSurveyRecords = function(survey_id, page) {
    return new Promise((resolve, reject) => {
        page = (typeof page === 'undefined') ? 0 : parseInt(page);
        models.SurveyRecord.findAndCountAll(
            {
                where: {
                    survey_id: survey_id
                },
                offset: CONFIG.SQL_LIMIT * page,
                limit: CONFIG.SQL_LIMIT
            }
        ).then((surveyRecords) => {
            let surveyRecordValues = surveyRecords.rows.map((surveyRecord) => {
                return surveyRecord.dataValues;
            });
            resolve({
                surveyRecordCount : surveyRecords.count,
                surveyRecords: surveyRecordValues,
                pagination: {
                    pageStart: CONFIG.SQL_LIMIT * page,
                    pageCount: Math.ceil(surveyRecords.count / CONFIG.SQL_LIMIT)
                }
            });
        }).catch(reject);
    });

}

getSurveyStat = function(survey_id) {
    return new Promise((resolve, reject) => {
        let filteredAnswers = {};
        models.SurveyRecord.findAll({
            where: {
                survey_id: survey_id
            },
            include: [{
                model: models.Answer,
                include: [
                    { model: models.Option },
                    { model: models.Question },
                ]
            }]
        }).then((surveyRecords) => {

            surveyRecords.forEach((surveyRecord) => {
                surveyRecord.Answers.forEach((answer) => {
                    
                    if (!answer.Option || !answer.Question || answer.Question.type === "sorting") {
                        return;
                    }
                    if (typeof filteredAnswers[answer.Question.question] === "undefined") {
                        filteredAnswers[answer.Question.question] = {};
                    }
                    if (typeof filteredAnswers[answer.Question.question][answer.Option.option] === "undefined") {
                        filteredAnswers[answer.Question.question][answer.Option.option] = 0;
                    }
                    filteredAnswers[answer.Question.question][answer.Option.option]++;
                });
            });

            let stats = [];
            Object.keys(filteredAnswers).forEach((key) => {
                stats.push({
                    id: `chart${key}`,
                    chartType: "bar",
                    keys: Object.keys(filteredAnswers[key]),
                    values: Object.values(filteredAnswers[key]),
                    label: key
                });
            });
            resolve({ stats: stats });
        }).catch(reject);

    });

}

exports.reportSurveyGet = function(req, res) {
    listSurveyRecords(req.params.survey_id, req.query.page).then((surveyRecordList) => {
        getSurveyStat(req.params.survey_id).then((surveyStats) => {
            console.log(Object.assign({}, surveyRecordList, surveyStats));
            res.render('pages/report/survey', Object.assign({}, surveyRecordList, surveyStats));
        }).catch((e) => {
            console.log(e);
            res.redirect('/error/500');
        });

    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}

exports.reportUserAnswersGet = function(req, res) {
    models.Survey.findById(req.params.survey_id, {
        include: [{
            all: true,
            nested: true
        }]
    }).then((survey) => {
        //res.send(survey);
        res.render('pages/report/userAnswers', {
            survey: survey
        });
    }).catch((err) => {
        console.log(err)
        res.status(400).send(undefined === err.errors ? "Couldn't find the survey." : err.errors[0].message);
    });
}
