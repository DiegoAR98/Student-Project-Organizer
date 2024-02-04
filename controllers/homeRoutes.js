const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the homepage with project listings
// This page is accessible to both logged in and not logged in users
router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            include: [{ model: User, attributes: ['name'] }],
        });

        const projects = projectData.map((project) => project.get({ plain: true }));

        // Render the 'homepage' handlebars view, passing in project data and login status
        res.render('homepage', {
            projects,
            // The 'logged_in' variable can be used in handlebars to conditionally render content
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to render detailed project page by id
router.get('/project/:id', withAuth, async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }],
        });

        if (!projectData) {
            res.status(404).send('Project not found');
            return;
        }

        const project = projectData.get({ plain: true });

        // Render the 'project' handlebars view, passing in project data and login status
        res.render('project', {
            ...project,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route for user's profile - protected by authentication
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        if (!userData) {
            res.status(404).send('User not found');
            return;
        }

        const user = userData.get({ plain: true });

        // Render the 'profile' handlebars view, passing in user data
        res.render('profile', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to render the login page
// Redirects to profile if user is already logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
