const models = require('../models/');
const Op = require('sequelize').Op;

const CONFIG = require('../config/appConfig.js');

exports.reportSurveyGet = function(req, res) {
    let { survey_id } = req.params;
    let { page } = req.query;
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
        res.render('pages/report/survey', {
            surveyRecords: surveyRecordValues,
            pagination: {
                pageStart: CONFIG.SQL_LIMIT * page,
                pageCount: Math.ceil(surveyRecords.count / CONFIG.SQL_LIMIT)
            }
        });
    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}

exports.reportUserAnswersGet = function(req, res) {
    models.SurveyRecord.findById(req.params.record_id, {
        include: [{
            model: models.Survey,
            include: [{
                model: models.Question,
                include: [{
                    model: models.Answer,
                    where: {
                        survey_record_id: req.params.record_id
                    },
                    include: [{
                        model: models.Option
                    }]
                }]
            }]
        }],
        order: [
            [models.Survey, models.Question, 'id']
        ]
    }).then((record) => {
        //res.send(record);
        res.render('pages/report/userAnswers', {
            survey: record.Survey
        });
    }).catch((err) => {
        console.log(err)
        res.status(400).send(undefined === err.errors ? "Couldn't find the survey." : err.errors[0].message);
    });
}
