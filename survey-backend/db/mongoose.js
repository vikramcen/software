const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Admin:9oZL8kcDTMv7cIvR@cluster0.cqabw.mongodb.net/survey?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})