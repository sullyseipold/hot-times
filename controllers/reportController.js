const db = require("../models");
if (typeof require !== 'undefined') XLSX = require('xlsx');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const testReport = [
    {employee: 'Alec Baldwin', regular: 25, overnight: 8, comp_used: 0, holiday: 0, overtime: 10, sick: 0, vacation: 0, detail: 0, total: 43},
    {employee: 'Jeff Lebowski', regular: 35, overnight: 0, comp_used: 0, holiday: 0, overtime: 0, sick: 0, vacation: 0, detail: 10, total: 45},
    {employee: 'Sam Kinison', regular: 0, overnight:40, comp_used: 0, holiday: 0, overtime: 10, sick: 0, vacation: 0, detail: 0, total: 50},
    {employee: 'Gilbert Gottfried', regular: 42, overnight:0, comp_used: 0, holiday: 0, overtime: 10, sick: 0, vacation: 0, detail: 0, total: 52},
    {employee: 'George Carlin', regular: 40, overnight:0, comp_used: 0, holiday: 0, overtime: 0, sick: 0, vacation: 0, detail: 0, total: 40},
    {employee: 'Robin Quivers', regular: 40, overnight:0, comp_used: 0, holiday: 0, overtime: 10, sick: 0, vacation: 0, detail: 0, total: 50},
    {employee: 'Gary DellAbate', regular: 40, overnight:0, comp_used: 0, holiday: 0, overtime: 10, sick: 0, vacation: 0, detail: 20, total: 70},
    {employee: 'Wanda Sykes', regular: 25, overnight: 10, comp_used: 0, holiday: 0, overtime: 0, sick: 0, vacation: 0, detail: 0, total: 35},
]

const headers = ['employee', 'regular', 'overnight', 'comp_used', 'holiday', 'overtime', 'sick', 'vacation', 'detail', 'total']


module.exports = {
    getPayPeriodReport: function (req, res) {

        db.Activity
        .findAll({
            where: {
                startDate: {
                    [Op.between] : [req.params.startDate, req.params.endDate]
                },
                endDate: {
                    [Op.between] : [req.params.startDate, req.params.endDate]
                }
            }
        })
        .then(activities => { 
            var actArray = [];
            activities.map(item => {
                let {id, startDate, endDate, startTime, endTime, activityType } = item;
                let obj = {id: id, startDate: startDate, endDate: endDate, startTime: startTime, endTime: endTime, activityType: activityType};
                actArray.push(obj);
            })

            var ws_name = 'timesheet_report';

            /* create a new blank workbook */
            var workbook = XLSX.utils.book_new();
    
            var worksheet = XLSX.utils.json_to_sheet(testReport, { 
                header: headers });
    
            /* Add the worksheet to the workbook */
            XLSX.utils.book_append_sheet(workbook, worksheet, ws_name);
    
            var wbopts = {
                type: 'base64',
                bookType: "xlsx",
                bookSST: false
              }
    
            var wbout = XLSX.write(workbook, wbopts);
            res.status(200).send(wbout);

        })
    }
}

