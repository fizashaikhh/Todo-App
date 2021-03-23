var mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0.zw5op.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)

var bodyParser = require('body-parser')


var urlencodedParser = bodyParser.urlencoded({extended:false})
module.exports = function (app) {
  app.get('/todo', function(req, res){
   Todo.find({}, function (err, data) {
     if(err) throw err;
     res.render('index', {todo:data})
   })
  })
  app.post('/todo',urlencodedParser, function(req, res){
    var newTodo = Todo(req.body).save(function (err, data) {
      if(err) throw err;
      res.json({todo:data})
    })
  })

  app.delete('/todo/:item', function (req, res){
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function (err,data) {
      if(err) throw err;
      res.json(data)
    })
  })
}