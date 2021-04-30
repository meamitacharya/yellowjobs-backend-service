const Tweet = require("../models/Tweet.schema");

// var redis = require("redis");
// var redis_client = redis.createClient();

// const cache_dur= 60 * 5; //60 sec * 5

// redis_client.on("connect", function () {
//   console.log("Redis Connection Successful!!");
// });

//Retrive all Tweets
// exports.findAll = async (req, res) => {
//   try {
//     let { limit = 20, offset = 0 } = req.query;
//     let { location, resource } = req.params;

//     limit = Number(limit);
//     offset = Number(offset);

//     location =
//       location[0].toUpperCase() +
//       location.substring(1, location.length).toLowerCase();
//     resource = resource.toLowerCase();

//     const query = {};

//     if (location) {
//       query.location = { [location]: true };
//     }
//     if (resource) {
//       query.resource = { [resource]: true };
//     }

//     redis_client.get(JSON.stringify(query), async (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send(err);
//       }
//       if (data != null) {
//         console.log("Data fetched from redis");
//         res.send(JSON.parse(data));
//       } else {
//         console.log("Data fetched from DB");
//         let update = await Tweet.find(query, null, {
//           limit: limit,
//           skip: offset,
//           sort: { postedAt: -1 },
//         }).exec();
//         redis_client.set(
//           JSON.stringify(query),
//           JSON.stringify(update),
//           'EX',
//           cache_dur
//         );
//         res.send(update);
//       }
//     });
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// };

//Retrive all Tweets
exports.findAll = async (req, res) => {
    try {
        let { limit = 20, offset = 0 } = req.query;
        let { location, resource } = req.params;

        limit = Number(limit);
        offset = Number(offset);

        location =
            location[0].toUpperCase() +
            location.substring(1, location.length).toLowerCase();
        resource = resource.toLowerCase();

        const query = {};

        if (location) {
            query.location = { [location]: true };
        }
        if (resource) {
            query.resource = { [resource]: true };
        }
        res.send(
            await Tweet.find(query, null, {
                limit: limit,
                skip: offset,
                sort: { postedAt: -1 },
            }).exec()
        );
    } catch (error) {
        res.send({ error: error.message });
    }
};

// //Retrive a single tweet with ID
// exports.findOne = async (req, res) => {
//   res.send("Tweet findOne");
// };

// //Update a single tweet with ID
// exports.update = async (req, res) => {
//   res.send("Tweet Update");
// };

// //Delete a single tweet with ID
// exports.delete = async (req, res) => {
//   res.send("Tweet Delete");
// };
// //Create a new Tweet
// exports.create = async (req, res) => {
//   res.send("Tweet Create");
// };
