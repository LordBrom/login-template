const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, async (req, res, next) => {
	const { body: { user } } = req;

	if (!user.username) {
		return res.status(422).json({
			errors: {
				username: 'is required',
			},
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	console.log(user.username);
	const usernameInUseCheck = await (await Users.find({ "username": user.username }).exec());
	console.log(usernameInUseCheck);
	if (usernameInUseCheck.length !== 0) {
		return res.status(422).json({
			errors: {
				username: 'in use',
			},
		});
	}

	const finalUser = new Users(user);

	finalUser.setPassword(user.password);

	return finalUser.save()
		.then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
	const { body: { user } } = req;

	if (!user.username) {
		return res.status(422).json({
			errors: {
				username: 'is required',
			},
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
		if (err) {
			return next(err);
		}

		if (passportUser) {
			const user = passportUser;
			user.token = passportUser.generateJWT();

			return res.json({ user: user.toAuthJSON() });
		}

		return status(400).info;
	})(req, res, next);
});

router.post('/changepassword', auth.required, (req, res, next) => {
	const { body: { password } } = req;
	const { payload: { id } } = req;

	if (!password.old) {
		return res.status(422).json({
			errors: {
				oldPassword: 'is required',
			},
		});
	}

	if (!password.new) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}

	return Users.findById(id)
		.then((user) => {
			if (!user) {
				return res.sendStatus(400);
			}
			if (!user.validatePassword(password.old)) {
				return res.status(422).json({
					errors: {
						oldPassword: 'invalid',
					},
				});
			}

			user.setPassword(password.new);

			return user.save()
				.then(() => res.json({}));
		});
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
	const { payload: { id } } = req;

	return Users.findById(id)
		.then((user) => {
			if (!user) {
				return res.sendStatus(400);
			}

			return res.json({ user: user.toAuthJSON() });
		});
});

module.exports = router;
