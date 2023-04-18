const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://dogafb:Hyf0731@cluster0.ysqw2rl.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("mydb");
    const collection = db.collection("accounts");

    // Clean up accounts array
    await collection.deleteMany({});

    // Insert sample data
    const accounts = [
      {
        account_number: "101",
        balance: 1000,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: new Date(),
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: "102",
        balance: 500,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date(),
            remark: "Initial deposit",
          },
          {
            change_number: 2,
            amount: -50,
            changed_date: new Date(),
            remark: "Withdrawal",
          },
        ],
      },
    ];

    const result = await collection.insertMany(accounts);
    console.log(`${result.insertedCount} accounts inserted.`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

