import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'

import List from '../../models/list.js'
import User from '../../models/user.js'
import date from '../utils/date.js'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    listId: { type: GraphQLID },
  }),
})

const ListType = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    id: { type: GraphQLID },
    listname: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({
          listId: parent.id,
        })
      },
    },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getList: {
      type: ListType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return List.findById(args.id)
      },
    },

    getAllLists: {
      type: new GraphQLList(ListType),
      resolve(parent, args) {
        return List.find({})
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createList: {
      type: ListType,
      args: {
        listname: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newList = new List({
          listname: args.listname,
          date,
        })

        return newList.save()
      },
    },
    updateList: {
      type: ListType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        listname: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return List.findByIdAndUpdate(
          args.id,
          { $set: { listname: args.listname } },
          { new: true, useFindAndModify: false }
        )
      },
    },
    deleteList: {
      type: ListType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return List.findByIdAndRemove(args.id, { useFindAndModify: false })
      },
    },

    createUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        listId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const newUser = new User({
          username: args.username,
          surname: args.surname,
          age: args.age,
          city: args.city,
          listId: args.listId,
        })

        return newUser.save()
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        city: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              username: args.username,
              surname: args.surname,
              age: args.age,
              city: args.city,
            },
          },
          { new: true, useFindAndModify: false }
        )
      },
    },

    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id, { useFindAndModify: false })
      },
    },

    deleteUsersFromList: {
      type: UserType,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return User.deleteMany({ listId: args.listId })
      },
    },
  },
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
