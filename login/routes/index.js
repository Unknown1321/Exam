var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next){

    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if(user_email_address && user_password)
    {
        query = `
        SELECT * FROM user_login 
        WHERE user_email = "${user_email_address}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == user_password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

router.post('/logout', function(request, response, next) {
    var user_id = request.session.user_id;
    var name = request.body.name;
    var date = request.body.date;
    var description = request.body.description;

    if (user_id) {
        // Perform your insert query here
        var query = `
            INSERT INTO work_experience (name, date, description)
            VALUES ("${name}", "${date}", "${description}")
        `;

        database.query(query, function(error, result) {
            if (error) {
                response.send('Error occurred while inserting into');
            } else {
                // Clear the user session
                request.session.destroy(function(error) {
                    if (error) {
                        response.send('Error occurred while logging out');
                    } else {
                        response.redirect('/logout'); // Redirect to the logout page if works
                    }
                });
            }
        });
    } else {
        response.redirect('/'); // Redirect to the login page if not logged in
    }
});



module.exports = router;
