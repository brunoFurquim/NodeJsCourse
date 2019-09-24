const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin').router;
const shopRoutes = require('./routes/shop');

const app = express();

//registers a new templating engine
app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('ejs/404', {
        pageTitle: 'Page Not Found',
        path: req.path
    })
})

app.listen(4000);

