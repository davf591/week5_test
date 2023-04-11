# Notes

## How to

- Rename `dotenv` file to `.env`, and update `MONGO_URI`
- `npm install`
- `npm run dev`

## Steps

1.  Update `./model/userModel.js`. You can use `enum` vs `array` e.g.

```js
const UserSchema = new mongoose.Schema({
  //...

  role: {
    type: String,
    enum: ['patient', 'doctor', 'nurse'],
    default: 'patient',
  },
  //...
});
```

2. Update `./model/userModel.js`

```js
//..
userSchema.statics.signup;
const user = await this.create({ username, email, password: hash, role });
```

3. Update `./middleware/auth.js` e.g.

```js
// add authorization middleware
//...
  authorize: function (...roles) {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        next();
      }
    };
  },

```

4. Update `./views/register.hbs`

```handlebars
<label for='cars'>Choose a role:
  <select name='roles' id='roles'>
    <option value='patient' selected>Patient</option>
    <option value='doctor'>Doctor</option>
    <option value='nurse'>Nurse</option>
  </select>
</label>
```

5. Update `./routes/auth.js`

```js
// @route   POST /auth/register
router.post('/register', async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.signup(email, password, role);
```

6. Update `./controllers/userController.js`

```js
const signupUser = async (req, res) => {
  const {email, password, role} = req.body
  const user = await User.signup(email, password, role);
```

7. etc.

## Links

- [How To Use node-cron to Run Scheduled Jobs in Node.js](https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples)
- [Handlebars Built-in Helpers vs Front vend JavaScript](https://handlebarsjs.com/guide/builtin-helpers.html)
