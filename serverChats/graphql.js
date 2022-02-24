const express = require("express")
const expressGraphQL = require("express-graphql").graphqlHTTP
const {request} = require("graphql-request")
const s = require( "./server.js")
const  chatSchema = require( "./models/chats.js")
//const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")




const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
}=require("graphql")

const app=express()
app.use(cookieParser())
//Some Data to Learn
// const users = [
//  	{ id: 1, username: 'Aldo', email: "golosa69@hotmail.com" },
//  	{ id: 2, username: 'Cao', email: "boladefuego@hotmail.com" },
//  	{ id: 3, username: 'Dios', email: "naruto93@hotmail.com" },
//  	{ id: 4, username: 'Papi', email: "licValeriano@hotmail.com" }
//  ]
//console.log(Subscriber)


const chatType= new GraphQLObjectType({
    name: "chat",
    description: "This represents a chat",
    fields:()=>({
        _id:{type: new GraphQLNonNull(GraphQLString)},
        roomName:{type: new GraphQLNonNull(GraphQLString)},
        participants: {type: new GraphQLList(GraphQLString)},
        messages: {type: new GraphQLList(GraphQLString)}
    })
})

//Defining the schema
const RootQueryType = new GraphQLObjectType({
    name:"Query",
    description: "Root Query",
    fields:()=>({
        chat:{
            type: chatType, //A planew subscriber(ce holder of the Actual Data
            description: "A single chat",
            args:{
                roomName:{type:GraphQLString}
            },
            resolve: async(parent, args, context)=> {
                const chat = await chatSchema.findOne({roomName: args.roomName})
                // const token=jwt.sign({_id:user._id.toString()},"secretWord")
                // console.log(token)
                //context.res.cookie("token", token,{httpOnly:true})
                return chat
            }
        },
        chats: {
            type: new GraphQLList(chatType), //A place holder of the Actual Data
            description: "List of All chats",
            resolve: ()=> chatSchema.find()
        }
        
       
    })
})

const RootMutationtype=new GraphQLObjectType({
    name: "Mutation",
    description:"Root Mutation",
    fields:()=>({
        createRoomName:{
            type:chatType,
            description: "Add a new chat",
            args:{
                roomName:{type: new GraphQLNonNull(GraphQLString)}
                 },
            resolve: async(parent, args) =>{
                if (await chatSchema.exists({roomName:args.roomName})){
                   return;
               }
               
                const chat = await new chatSchema({roomName: args.roomName})
               // //  const token = jwt.sign({_id:user._id.toString()},"myToken")
               // //  user.token=token
                chat.save()
                return chat
            }
        },
        addParticipants:{
            type: chatType,
            description:"Add participant",
            args:{
                roomName:{type:new GraphQLNonNull(GraphQLString)},
                participantEmail:{type: new GraphQLNonNull(GraphQLString)},
                participantID:{type: new GraphQLNonNull(GraphQLString)},
                participantUsername:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async(parent,args)=>{
                const chat=await chatSchema.findOne({roomName:args.roomName})
                const {participantEmail,participantID,participantUsername}=args
                 const newObj={email:participantEmail,_id:participantID, username:participantUsername}
                const objStr=JSON.stringify(newObj)
                chat.participants.push(objStr)
                chat.save();

            }
        }
         
        })
         
})
const schema= new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationtype
})

app.use("/", expressGraphQL(async (request,response)=>({
    schema: schema,
    graphiql :true, // Actual User interface
    context:{req:request, res:response, now:Date.now()}
})))

app.listen(3300, ()=>console.log("server running in port 3300"))