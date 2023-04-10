const { MongoClient } = require("mongodb");

async function transfer(fromAccount, toAccount, amount, remark) {
  const uri =
    "mongodb+srv://dogafb:Hyf0731@cluster0.ysqw2rl.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("mydb");
    const accounts = db.collection("accounts");

    // Start a transaction
    const session = client.startSession();
    session.startTransaction();

    // Deduct from the source account
    const sourceAccount = await accounts.findOne({
      account_number: fromAccount,
    });
    if (!sourceAccount) {
      throw new Error("Source account not found.");
    }
    if (sourceAccount.balance < amount) {
      throw new Error("Insufficient balance.");
    }
    await accounts.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: sourceAccount.account_changes.length + 1,
            amount: -amount,
            changed_date: new Date(),
            remark: remark,
          },
        },
      }
    );

    // Add to the destination account
    const destinationAccount = await accounts.findOne({
      account_number: toAccount,
    });
    if (!destinationAccount) {
      throw new Error("Destination account not found.");
    }
    await accounts.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: destinationAccount.account_changes.length + 1,
            amount: amount,
            changed_date: new Date(),
            remark: remark,
          },
        },
      }
    );

    // Commit the transaction
    await session.commitTransaction();
    console.log(
      `${amount} euros transferred from account ${fromAccount} to account ${toAccount}.`
    );
  } catch (e) {
    // Abort the transaction if there is an error
    await session.abortTransaction();
    console.error(e);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Test the transfer function
transfer("101", "102", 500, "Money transfer from account 101 to account 102");
