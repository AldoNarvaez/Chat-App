const express = require("express")
const expressGraphQL = require("express-graphql").graphqlHTTP
const {request} = require("graphql-request")
const s = require("./server")
const  password = require( "./models/password.js")



const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
}=require("graphql")

const app=express()


const passwordType=new GraphQLObjectType({
    name: "password",
    description: "This represents a password",
    fields:()=>({
        password:{type: GraphQLNonNull(GraphQLString)},
        email:{type: GraphQLNonNull(GraphQLString)}
    })
})

//Defining the schema



const RootQueryType = new GraphQLObjectType({
    name:"Query",
    description: "Root Query",
    fields:()=>({
        password:{
            type: passwordType, //new subscriber(place holder of the Actual Data
            description: "A password",
            args:{
                email:{type:GraphQLString}
            },
            resolve: async(parent, args)=> {
                const user = await password.findOne({email: args.email})
                return user
            }
        },
         passwords: {
            type: new GraphQLList(passwordType), //A place holder of the Actual Data
             description: "List of All users",
             resolve: ()=> password.find()
         }
       
    })
})

 const RootMutationtype=new GraphQLObjectType({
     name: "Mutation",
     description:"Root Mutation",
     fields:()=>({
         createPassword:{
             type:passwordType,
             description: "Add a new user",
             args:{
                 password:{type: GraphQLNonNull(GraphQLString)}
                 ,email:{type: GraphQLNonNull(GraphQLString)}
             },
             resolve: async(parent, args) =>{
                //  if (await subscriber.exists({email:args.email})){
                //     return;
                // }

                 const user = await new password({password: args.password, email:args.email})
                 user.save()
                 return user
             }
         },
         deletePassword:{
            type:passwordType,
            description: "Delete password",
            args:{
                email:{type: GraphQLNonNull(GraphQLString)},
                password:{type: GraphQLNonNull(GraphQLString)}

            },
            resolve: async(parent, args)=> {
                const user = await password.findOneAndDelete({password: args.password,email: args.email})
                console.log(user)
                return user[0]
            }
         }
        //  updateUser:{
        //      type:userType,
        //      description:"Update user",
        //      args:{
        //          id:{type:GraphQLNonNull(GraphQLString)},

        //      }
        //  }
     })
 })

const schema= new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationtype
})

const myQuerie=`query{users{username}}`
const mutQuerie=`mutation{addUser(username:"Lolis",email:"ombridge"){username}}`


//request("http://localhost:3200/",mutQuerie)

 app.use("/", expressGraphQL({
     schema: schema,
     graphiql :true // Actual User interface
 }))
app.listen(3300, ()=>console.log("server running in port 3300"))