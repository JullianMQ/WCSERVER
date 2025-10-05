require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('ERROR: MONGO_URI not set in .env');
  process.exit(1);
}
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

const exerciseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  date: { type: Date, required: true }
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

/*
  Create new user
  POST /api/users
  body: { username }
  response: { username, _id }
*/
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
      await user.save();
    }

    res.json({ username: user.username, _id: user._id.toString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/*
  Get all users
  GET /api/users
  response: [ { username, _id }, ... ]
*/
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username _id').exec();
    res.json(users.map(u => ({ username: u.username, _id: u._id.toString() })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/*
  Add exercise
  POST /api/users/:_id/exercises
  body: { description, duration, date? } (date optional, format: yyyy-mm-dd or other Date.parse)
  response:
  {
    username: "fcc_test",
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
    _id: "5fb5853f734231456ccb3b05"
  }
*/
app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const userId = req.params._id;
    const { description, duration, date } = req.body;

    if (!description || !duration) {
      return res.status(400).json({ error: 'description and duration are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const dur = parseInt(duration);
    if (isNaN(dur)) return res.status(400).json({ error: 'duration must be a number' });

    let dateObj;
    if (!date) {
      dateObj = new Date();
    } else {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ error: 'Invalid date' });
      }
    }

    const exercise = new Exercise({
      userId: user._id,
      description,
      duration: dur,
      date: dateObj
    });

    await exercise.save();

    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: user._id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/*
  Get exercise log
  GET /api/users/:_id/logs?from=&to=&limit=
  returns:
  {
    username: "fcc_test",
    count: 1,
    _id: "5fb5853f734231456ccb3b05",
    log: [{
      description: "test",
      duration: 60,
      date: "Mon Jan 01 1990",
    }]
  }
*/
app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const userId = req.params._id;
    const { from, to, limit } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const query = { userId: user._id };

    if (from || to) {
      query.date = {};
      if (from) {
        const fromDate = new Date(from);
        if (isNaN(fromDate.getTime())) return res.status(400).json({ error: 'Invalid from date' });
        query.date.$gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to);
        if (isNaN(toDate.getTime())) return res.status(400).json({ error: 'Invalid to date' });
        query.date.$lte = toDate;
      }
    }

    let q = Exercise.find(query).sort({ date: 'asc' });

    if (limit) {
      const lim = parseInt(limit);
      if (!isNaN(lim) && lim > 0) q = q.limit(lim);
    }

    const exercises = await q.exec();

    const log = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString()
    }));

    res.json({
      username: user.username,
      count: log.length,
      _id: user._id.toString(),
      log
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users/:_id', async (req, res) => {
  try {
    const user = await User.findById(req.params._id).exec();
    if (!user) return res.status(400).json({ error: 'User not found' });
    res.json({ username: user.username, _id: user._id.toString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

