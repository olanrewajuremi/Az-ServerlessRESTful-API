const { MongoClient } = require("mongodb");

const url = "YOURCONNECTIONSTRING-PRIMARY";
const client = new MongoClient(url);

module.exports = async function (context, req) {
    try {
        await client.connect();
        const database = client.db("Town");
        const collection = database.collection("People");

        // Initial data to insert into the database
        const initialData = [
            { 
              _id: "1", 
              name: "John Doe", 
              age: 30, 
              occupation: "Engineer" 
            },
            { 
              _id: "2", 
             name: "Jane Smith", 
             age: 25, 
             occupation: "Doctor" 
            },
            { 
              _id: "3", 
             name: "Alice Johnson", 
             age: 28, 
             occupation: "Teacher" 
            }
        ];

        // Insert the initial data into the collection
        const result = await collection.insertMany(initialData, { ordered: false });

        context.res = {
            status: 200,
            body: `Database initialized with ${result.insertedCount} documents`
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    } finally {
        await client.close();
    }
};


