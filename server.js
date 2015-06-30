var express = require("express"),
    app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
        extended: false
    })
    //var port = process.env.VCAP_APP_PORT || 8080;
var port = 8888;

app.use(express.static(__dirname + '/public'));

app.get("/", function(request, response) {
    response.render('index');
});

app.post('/fact', urlencodedParser, function(req, res) {

    // Prepare output in JSON format
    var no = req.body.factNo;
    var result = getFactorial(no);
    response = {
        inputNumber: req.body.factNo,
        factorial: result
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

/**
 * finds the factorial of a number
 * @param   {Number} factNO input number
 * @returns {Number} the factorial of the input
 */
function getFactorial(factNO) {
    if (factNO == 0) {
        return 1;
    } else {
        return (factNO * (getFactorial(factNO - 1)));
    }
}




app.listen(port);

require("cf-deployment-tracker-client").track();