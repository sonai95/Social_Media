/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
var profileController = require('../controllers/profileControllers')

module.exports = function (DIST_DIR, app, router) {
    router.get('/', function (req, res) {
        res.render('index')
    })
    router.get('/login', function (req, res) {
        res.render('index')
    })
    router.get('/adminlogin', function (req, res) {
        res.render('index')
    })
    router.get('/register', function (req, res) {
        res.render('index')
    })
    router.get('/loginto', function (req, res) {
        res.render('index')
    })
    router.get('/dashboard', function (req, res) {
        res.render('index')
    })
    router.get('/friends', function (req, res) {
        res.render('index')
    })
    router.get('/search', function (req, res) {
        res.render('index')
    })
    
    router.post('/register', profileController.register)
    router.post('/login', profileController.login)
    router.post('/searchFriend', profileController.searchFriend)
    router.post('/getRequestDetails', profileController.getRequestDetails )
    router.post('/addFriend', profileController.addFriend)
    router.post('/getMutualFriendDetails', profileController.getMutualFriendDetails)
    router.post('/rejectRequest', profileController.rejectRequest)
    router.post('/accepRequest', profileController.accepRequest)
    
}