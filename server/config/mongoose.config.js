const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://brailliant_db:brailliant_db@cluster0.5tlakc1.mongodb.net/brailliant_db?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong WEH WEH WEH', err));

