const { MongoClient } = require("mongodb");

const url = "YOURDATABASECONNECCTIONSTRING-PRIMARY";
const client = new MongoClient(url);

module.exports = async function (context, req) {
    try {
        await client.connect();
        const database = client.db("Town");
        const collection = database.collection("People");

        const id = req.params.id;

        if (!id) {
            context.res = {
                status: 400,
                body: "Please provide an id in the request URL"
            };
            return;
        }

        let person = await collection.findOne({ _id: id });

        if (person) {
            context.res = {
                status: 200,
                body: person
            };
        } else {
            context.res = {
                status: 404,
                body: "Person not found"
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    } finally {
        await client.close();
    }
};
