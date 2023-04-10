const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://dogafb:Hyf0731@cluster0.ysqw2rl.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    // const result = await getTotalPopulationByYear(
    //   client,
    //   "Germany",
    //   1950,
    //   2000
    // );
    // console.log(result);

    const result1 = await getContinentDataByYearAndAge(client, 1950, 40);

    console.log(result1);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function getTotalPopulationByYear(client, country, startYear, endYear) {
  const pipeline = [
    {
      $match: {
        Country: country,
        Year: { $gte: startYear, $lte: endYear },
      },
    },
    {
      $group: {
        _id: "$Year",
        totalPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const result = await client
    .db("databaseWeek4")
    .collection("population")
    .aggregate(pipeline)
    .toArray();

  return result;
}

async function getContinentDataByYearAndAge(client, year, age) {
  const pipeline = [
    {
      $match: {
        Year: year,
        Age: age,
      },
    },
    {
      $addFields: {
        TotalPopulation: { $add: ["$M", "$F"] },
      },
    },
    {
      $group: {
        _id: "$Continent",
        data: { $push: "$$ROOT" },
      },
    },
  ];

  const cursor = await client
    .db("databaseWeek4")
    .collection("population")
    .aggregate(pipeline);

  const results = await cursor.toArray();

  return results;
}
