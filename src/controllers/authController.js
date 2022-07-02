import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function signUp(req, res) {
  const user = req.body;        

  const isUserAreadyExist = await db.collection('users').findOne({email: user.email})

  if (isUserAreadyExist){
    return res.sendStatus(409);
  }

  const passwordHash = bcrypt.hashSync(user.password, 10);

  delete user.confirnPassword

  await db.collection('users').insertOne({ ...user, password: passwordHash })

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    const userPreviousSession = await db.collection('sessions').findOne({userId: user._id})

    // if is the frist time user logs in creat a document in sessions for him
    if(!userPreviousSession){
        await db.collection('sessions').insertOne({ token, userId: user._id });
    }
    else{
        await db.collection('sessions').updateOne({
            userId: user._id
          }, {
            $set: {token}
          });
    }

    res.send(token);
  } else {
    res.sendStatus(401);
  }
}