const graphql = require("graphql");
const dotenv = require('dotenv');
const _ = require("lodash");
const Books = require('../Models/Books');
const Authors = require('../Models/Author');
const Publisher = require('../Models/Publisher');
dotenv.config({path:'./.env'})
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// const books = [
//   {
//     name: "Beyond the shadows of my dream",
//     genre: "Education",
//     id: "1",
//     authorid: "1",
//   },
//   {
//     name: "The Girl who dared to dream",
//     genre: "Education",
//     id: "2",
//     authorid: "2",
//   },
//  { name: "Atomic Habits",
//  genre: "Life", id: "3", 
//  authorid: "3" 
// },
// { name: "Software Design",
// genre: "Tech", id: "4", 
// authorid: "4" 
// },
// { name: "Software Engineering",
// genre: "Tech", id: "5", 
// authorid: "4" 
// },
// ];

// const authors = [
//   { name: "Martin Odour", age: 60, id: "1" },
//   { name: "Betty Gikonyo", age: 65, id: "2" },
//   { name: "James Clear", age: 40, id: "3" },
//   { name: "Samuel Kamotho", age: 23, id: "4" },
// ];

//Graphql schema

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, arg) {
        console.log(parent, parent.authorid);
        // return _.find(authors, { id: parent.authorid });
        return Authors.findById(parent.authorId)
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    //retun books list connected to an author
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, args) {
        console.log(parents);
        // return _.filter(books,{authorid:parents.id})
        return Books.find({authorId:parent.name})
      },
    },
  }),
});

const PublisherType = new GraphQLObjectType({
  name:"Publisher",
  fields:()=>({
    id:{type:GraphQLID},
    name:{type: new GraphQLNonNull(GraphQLString)},
    books:{
    type:new GraphQLList(BookType),
    resolve(parent,args){
      return Books.find({publisher:parent.name})
    }
    }
  })
})

//queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id });
        return Books.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(par, args) {
        
        // return _.find(authors, { id: args.id });
        return Authors.findById(args.id);
      },
    },
    publisher:{
      type:PublisherType,
      args:{id:{type:GraphQLID}},
      resolve(par,args){
return Publisher.findById(args.id);
      }
    },
    //return a list of document
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        // return books
        return Books.find({})
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parents,args){
        // return authors
        return Authors.find({})
      }
    },
    Publishers:{
      type:new GraphQLList(PublisherType),
      resolve(par,args){
        return Publisher.find({})
      }
    }

  },
});

const mutations = new GraphQLObjectType({
  name:'mutation',
  fields:{
    addAuthor:{
      type:AuthorType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLString)}
      },
      resolve(parents,args){
        //create new instance with data
        let author = new Authors({
          name:args.name,
          age:args.age
        })
        //save to database
       return author.save()
      }
    },
    addBook:{
      type:BookType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type:  new GraphQLNonNull(GraphQLString)},
        authorId:{type:  new GraphQLNonNull(GraphQLString)}
      },
      resolve(parents,args){
        let book = new Books({
          name:args.name,
          genre:args.genre,
          authorId:args.authorId
        })

       return book.save()
      }
    },
    addPublisher:{
      type:PublisherType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        yearFounded:{type:new GraphQLNonNull(GraphQLString)}
      },
      resolve(par,args){
        let publisher = new Publisher({
          name:args.name,
          yearFounded:args.yearFounded,
        })
        return publisher.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:mutations
});
