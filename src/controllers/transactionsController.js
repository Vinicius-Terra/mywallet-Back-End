import db from "../db.js";
import dayjs from "dayjs";


export async function getTransactions(req, res) {
  const  userId  = res.locals.userId;

  const userTransactions = await db.collection('transactions').findOne({userId});
  res.send(userTransactions).status(200);
}

export async function postDeposit(req, res) {
  const  userId  = res.locals.userId;
  const  deposit  = req.body;
  const userTransactions = await db.collection('transactions').findOne({userId})

  const treatedDeposit = 
  {
    ...deposit,
    date: dayjs().format('DD/MM'),
    type:"deposit"
  }

  // if is the frist time user makes a transactions, creat a document in 'transactions' for him
  if(!userTransactions){
    await db.collection('transactions').insertOne
      ({ userId, 
        transactions:[treatedDeposit] 
      });
  }
  else{
    await db.collection('transactions').updateOne({
          userId
        }, {
          $set: {transactions: [...userTransactions.transactions, treatedDeposit]}
        });
  }
  res.sendStatus(200)
}

export async function postWithdrawal(req, res) {
  const  userId  = res.locals.userId;
  const  withdrawal  = req.body;
  const userTransactions = await db.collection('transactions').findOne({userId})

  const treatedWithdrawal = 
  {
    ...withdrawal,
    date: dayjs().format('DD/MM'),
    type:"withdrawal"
  }

  if(!userTransactions){
    await db.collection('transactions').insertOne
      ({ userId, 
        transactions:[treatedWithdrawal]
      });
  }
  else{
    await db.collection('transactions').updateOne({
          userId
        }, {
          $set: {transactions: [...userTransactions.transactions, treatedWithdrawal]}
        });
  }

  res.sendStatus(200);
}