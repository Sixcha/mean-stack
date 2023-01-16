import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const pangolinRouter = express.Router();
pangolinRouter.use(express.json());
 
pangolinRouter.get("/", async (_req, res) => {
   try {
       const pangolins = await collections.pangolins.find({}).toArray();
       res.status(200).send(pangolins);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

pangolinRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const pangolin = await collections.pangolins.findOne(query);
  
        if (pangolin) {
            res.status(200).send(pangolin);
        } else {
            res.status(404).send(`Failed to find a pangolin: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find a pangolin: ID ${req?.params?.id}`);
    }
 });

 pangolinRouter.post("/", async (req, res) => {
    try {
        const pangolin = req.body;
        const result = await collections.pangolins.insertOne(pangolin);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new pangolin: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new pangolin.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 pangolinRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const pangolin = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.pangolins.updateOne(query, { $set: pangolin });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a pangolin: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a pangolin: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a pangolin: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 pangolinRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.pangolins.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed a pangolin: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a pangolin: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a pangolin: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });