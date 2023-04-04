//  we can get all population information with following code
//name: "'; SELECT * FROM Country; --"
//code: "'; SELECT * FROM Country; --"


// We can fix this function like this:

function getPopulation(Country, name, code, cb) {
    conn.query(
      'SELECT Population FROM ?? WHERE Name = ? AND code = ?',
      [ name, code],
      function (err, result) {
        if (err) return cb(err);
        if (result.length == 0) return cb(new Error('Not found'));
        cb(null, result[0].Population);
      }
    );
  }