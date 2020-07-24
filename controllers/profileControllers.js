var newUSer = require('../models/newUSer')
const bcryptJS = require('bcryptjs');
var shortid = require('shortid');
const salt = bcryptJS.genSaltSync(10);

exports.login = function (req, res) {
    newUSer.findOne({
        "email": req.body.username
    }, (err, response) => {
        if(response){
            console.log("response11", response)
            if (bcryptJS.compareSync(req.body.pass, response.password)) {
                console.log('Login success!')
                res.status(200).send(response)
            } else {
                res.status(500).send('Password is not correct')
            }
        } else {
            res.status(500).send('Error')
        }
    })
}
exports.register = function (req, res) {
    var name = req.body.name;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    var userId = shortid.generate();

    var encryptedPassword = bcryptJS.hashSync(password, salt);
    var userDetails = {
        'name': name,
        'mobile': mobile,
        'email': email,
        'userId': userId,
        'password': encryptedPassword,
        'age': age
    }
    var newCustomer = new newUSer(userDetails);
    newCustomer.save((error, customer) => {
        if (error) {
            console.log('ERror', error)
        } else {
            res.status(200).send({ 'message': 'Successfully created account!' })
            
        }
    })
}

exports.searchFriend = (req, res) => {
    newUSer.find({ 'mobile': req.body.payload.search, 'userId': { '$ne': req.body.payload.user } }, function (err, resp) {
        for (var i = 0; i < resp.length; i++) {
            if (resp[i].friends.includes(req.body.payload.user)) {
                resp[i].isFriend = true
            }
        }
        res.status(200).send(resp)
    })
}

exports.getRequestDetails = function (req, res) {
    newUSer.find({ 'userId': { $in: req.body.payload.request } }, {password: 0}, function (err, resp) {
        if (err) {
            res.status(500).send
        } else {
            res.status(200).send(resp)
        }
    })
}
exports.addFriend = function (req, res) {
    newUSer.findOneAndUpdate({ 'userId': req.body.payload.user }, { $push: { 'requested': req.body.payload.friend }}, (err, resp1) => {
        if (err) {
            console.log(err)
        } else {
            newUSer.findOneAndUpdate({ 'userId': req.body.payload.friend }, { $push: { 'received': req.body.payload.user } }, (error, resp2) => {
                if (error) {
                    console.log(err)
                } else {
                    res.status(200).send()
                }
            })
        }
    })
}

exports.getMutualFriendDetails = function (req, res) {
    newUSer.findOne({ 'userId': req.body.payload.userId }, function (err1, resp1) {
        if (err1) {
            res.status(500).send()
        } else {
            newUSer.findOne({ 'userId': req.body.payload.currUserId }, function (err2, resp2) {
                if (err2) {
                    res.status(500).send()
                } else {
                    var mutualFriend = resp2.friends.filter(friend => resp1.friends.includes(friend));
                    newUSer.find({ 'userId': { '$in': mutualFriend } }, function (err3, resp3) {
                        if (err3) {
                            res.status(500).send()
                        } else {
                            res.status(200).send(resp3)
                        }
                    })
                }
            })
        }
    })
}

exports.rejectRequest = function (req, res) {
    newUSer.findOneAndUpdate({ 'userId': req.body.payload.user }, { $pull: { 'received': req.body.payload.request } }, function (err, res1) {
        newUSer.findOneAndUpdate({ 'userId': req.body.payload.request }, { $pull: { 'requested': req.body.payload.user } }, function (err, res3) {
            res.status(200).send()
        })
    })
}

exports.accepRequest = function (req, res) {
    newUSer.findOneAndUpdate({ 'userId': req.body.payload.user }, { $pull: { 'received': req.body.payload.request } }, function (err, res1) {
        newUSer.findOneAndUpdate({ 'userId': req.body.payload.user }, { $push: { 'friends': req.body.payload.request } }, function (err, res2) {
            newUSer.findOneAndUpdate({ 'userId': req.body.payload.request }, { $pull: { 'requested': req.body.payload.user } }, function (err, res3) {
                newUSer.findOneAndUpdate({ 'userId': req.body.payload.request }, { $push: { 'friends': req.body.payload.user } }, function (err, res4) {
                    res.status(200).send()
                })
            })
        })
    })
}