const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const dbName = "assestment";
const url = "mongodb://localhost:27017";

const mongoOps = {
    useNewUrlParser:true
};

const state = {
    database: null
};

const connect = (cb) => {
    if(state.database)
        cb();
    else{
        mongo.connect(url,mongoOps,(err,client)=>{
            if(err)
                cb(err);
            else{
                state.database = client.db(dbName);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id)=> {
    return ObjectId(_id);
}

const getDB = () => {
    return state.database;
}

module.exports = {getDB,connect,getPrimaryKey};