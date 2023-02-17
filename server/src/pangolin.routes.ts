import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
import { Pangolin } from "./pangolin";
import * as jwt from "jsonwebtoken";
import { User } from "./users";
import { UserInterface } from "./user";
import * as dotenv from "dotenv";
import { Friendship } from "../../client/src/app/friendship";
let cookie = require('cookie')

dotenv.config();

let cookies = cookie.parse('user')
 
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

pangolinRouter.get("/user/:id", async (req, res) => {
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
        const pangolin:Pangolin = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.pangolins.updateOne(query, { $set: {
            username: pangolin.username,
            role: pangolin.role,
            level: pangolin.level
        } });
  
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

 pangolinRouter.post("/friends", async (req, res) => {
    try{
        const newFriendship:Friendship = req.body;
        const query = {
            "$and": [{
            "user" : newFriendship.user
            },
            {
            "friend" : newFriendship.friend
            }]
        }
        const toCheck = await collections.friends.findOne(query)
        if (toCheck){
            res.status(400).send("Already Friends");
            return
        }
        const result = await collections.friends.insertOne(newFriendship)

        if (result.acknowledged) {
            res.status(201).send(`${newFriendship}Added a new friendship: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to add friendship.");
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 })

 pangolinRouter.get("/friends/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = {
             user: id 
         };
         const friends = await collections.friends.find(query).toArray()
         let friendArrayTemp:Pangolin[] = [];
         for (let i = 0; i < friends.length; i++) {
            const query = new mongodb.ObjectId(friends[i].friend);
            const pangolin = await collections.pangolins.findOne(query);
            friendArrayTemp.push(pangolin)
         }

         const friendArray:Pangolin[] = friendArrayTemp

         if (friendArray.length > 0) {
            res.status(200).send(friendArray);
        } else {
            res.status(404).send(false);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a pangolin: ID ${req?.params?.id}`)
    }
 });

 pangolinRouter.get("/friends", async (req, res) => {
    try {
        const friends = await collections.friends.find({}).toArray();
        res.status(200).send(friends);
   } catch (error) {
       res.status(500).send(error.message);
   }
 })

 pangolinRouter.get("/:name", async (req, res) => {
    try {
        const name = req?.params?.name;
        const query = {
            username :  name
        };
        const result = await collections.pangolins.findOne(query)
        res.status(200).send(result)

    } catch (error) {
        res.status(500).send(error.message);
    }
 })

 pangolinRouter.delete("/friends/:id/:friendId", async (req, res) => {
    try {
        const id = req?.params?.id;
        const friendId = req?.params?.friendId;
        const query = { $and: [
            { user :  id },
            { friend :  friendId}
        ] };
        const result = await collections.friends.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a friendship`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a friendship`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a friendship`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
})

pangolinRouter.post('/register', async (req, res) => {

    const newUser:UserInterface = req.body;

    const name = newUser.username;
    const query = {
        username :  name
    };
    const resultTest = await collections.users.findOne(query)
    if (resultTest){
        res.send('Already a user with the same name')
        return
    }

    const result = await collections.users.insertOne(newUser);
    if (result.acknowledged){
        const newPangolin:Pangolin = {
            username: newUser.username,
            role: 'Alchimiste',
            level: 1
        }
        const pangolinResult = await collections.pangolins.insertOne(newPangolin)
        if ( pangolinResult.acknowledged){
            res.status(201).send(`Created a new user and their Pangolin.`);
        } else {
            res.status(400).send(`Created a new user but failed to create their Pangolin.`);
        }
    }
    else{
        res.status(400).send(`Failed to add new user`);
    }
    
})

pangolinRouter.post('/authenticate', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = {
        username :  username
    };
    const user = await collections.users.findOne(query)
    const data = { data: user}
    if (!user){
        return res.json({success: false, msg: 'User not found'});
    }
    
    const userInstance = new User('test','test');
    userInstance.comparePassword(password, user.password, async (err:any, isMatch:any) => {
        if(err) throw err;
        if(isMatch) {
            const query = {
                username :  user.username
            };
            const result = await collections.pangolins.findOne(query)
            const userCookie = result._id
            res.json({
            success: true,
            cookie: userCookie
            })
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      })

})