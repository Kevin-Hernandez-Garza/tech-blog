const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access our User model and run findAll method
    User.findAll({
        // hiding the clients password, and not returning it
        attributes: { exclude: ['password']},
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post, 
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Post, 
                attributes: ['title'],
                through: Vote, 
                as: 'voted_posts'
            }
        ]
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    // creating a user (inserting data)
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login authenticator 
router.post('/login', (req, res)  => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user found with that email address!'});
            return;
        }

        // checking is the password matches
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }
        res.json({ user: dbUserData, message: 'You are logged in!'});

        // res.json({ user: dbUserData });
    });
});

// PUT /api/users/1 
router.put('/:id', (req, res) => {
    //if req.body has exact key/values pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true, 
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;