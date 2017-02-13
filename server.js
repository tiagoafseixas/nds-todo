var express = require('express')
var path = require('path')
var compression = require('compression')
var bodyParser = require('body-parser');

var app = express();

// CONFIGURE MIDDLEWARE
// =============================================================================
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// INIT MONGOOSE STUFF
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('localhost:27017');
mongoose.Promise = global.Promise;

var Todo = require('./app/models/todo');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    console.log('Serving the application.');
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/todos')

    // create a bear (accessed at POST http://localhost:8080/api/todos)
    .post(function(req, res) {
        console.log("#post -> creating a new todo");
        //console.log(req);
        console.log(req.body);
  
        var todo = new Todo();
        todo.title = req.body.title;  
        todo.duedate = new Date(req.body.duedate + " 00:00:00");
        todo.duetime = req.body.duetime;
        todo.description = req.body.description;

        // save the bear and check for errors
        todo.save(function(err, todo) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("#post -> finished creating todo");
                res.json(todo);
            }
        });
    })
    
    .get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });

router.route('/todos/:todo_id')

    // get the todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
    .get(function(req, res) {
        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    })
    
    // update the todo with this id (accessed at PUT http://localhost:8080/api/todos/:todo_id)
    .put(function(req, res) {

        Todo.findById(req.params.todo_id, function(err, todo) {

            if (err)
                res.send(err);

            
            todo.title = req.body.title;
            todo.duedate = new Date(req.body.duedate);
            todo.duetime = req.body.duetime;
            todo.description = req.body.description;

            // save the bear
            todo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Todo updated!' });
            });

        });
    })
    
    // delete the todo with this id (accessed at DELETE http://localhost:8080/api/todos/:todo_id)
    .delete(function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// more routes for our API will happen here


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});