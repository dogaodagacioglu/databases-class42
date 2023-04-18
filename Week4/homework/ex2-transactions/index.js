const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://dogafb:Hyf0731@cluster0.ysqw2rl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function getPopulationForCountryPerYear(client, country) {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $addFields: {
        M_int: { $toInt: "$M" },
        F_int: { $toInt: "$F" },
      },
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: {
            $add: ["$M_int", "$F_int"],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggCursor = await client
    .db("databaseWeek4")
    .collection("population")
    .aggregate(pipeline);

  const results = await aggCursor.toArray();

  return results;
}

async function main() {
  try {
    await client.connect();

    const results = await getPopulationForCountryPerYear(client, "Netherlands");
    console.log(results);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);





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