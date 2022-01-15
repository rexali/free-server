const { students } = require('./db');
const db = require('./db');

class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }

}

class FullName {
    constructor(obj) {
        this.obj = obj;
    }

    fullname() {
        return db.students.get(this.obj).firstName + " : " + db.students.get(this.obj).firstName
    }

}

// If Message had any complex fields, we'd put them on this object.
class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}


var fakeDatabase = {};

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,

        test: () => 'Test Success, GraphQL server is up & running !!',

        rest: () => 'Test Success, GraphQL server is up & running !!',

        quoteOfTheDay: () => {
            return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
        },

        random: () => {
            return Math.random();
        },

        rollThreeDice: () => {
            return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
        },

        greeting: () => {
            return "hello from  TutorialsPoint is good ooooo!!!"
        },

        students: () => db.students.list(),
        // get all the offers
        offers: () => db.offers.list(),
        //   get the offer by id
        offerById: (parent, { service_id }, context, info) => {
            return db.offers.get(service_id)
        },
        // get all the freelancers
        freelancers: () => db.users.list(),
        //   get the freelancer by id
        freelancerById: (parent, args, context, info) => {
            return db.users.get(args.freelancer_id)
        },

        studentById: (parent, args, context, info) => {
            return db.students.get(args.id)
        },

        getDie: (parent, args, context, info) => {
            return new RandomDie(args.numSides || 6);
        },

        getFull: (parent, { obj }, context, info) => {
            return new FullName(obj);
        },

        getFullName: (parent, args, context, info) => db.students.get(args.id).firstName + " : " + db.students.get(args.id).firstName,


        getMessage: (parent, { id }, context, info) => {
            if (!fakeDatabase[id]) {
                throw new Error('no message exists with id ' + id);
            }
            return new Message(id, fakeDatabase[id]);
        },

        rates: (parent, { currency }, context, info) => {
            return db.exchanges.list()
        },

        ip: function (args, request) {
            return request.ip;
        },

        products: (_, { id }) => {
            return db.client.from("products").where({ product_id: id }).first();
        },

        productByCategory: async(parent, args, context, info) => {
            let sectiondata = [];
            let products = await db.mysql.readAll("select * from products");
            let category = Array.from(new Set(products.map((item) => item.product_category)));
            category.forEach((item) => {
                sectiondata.push({
                    title: item,
                    data: [...products.filter(product=>product.product_category===item)]
                }
                );
            });

            return sectiondata;
        }
    },

    Mutation: {

        createMessage: (parent, { input }, context, info) => {
            // Create a random id for our "database".
            var id = require('crypto').randomBytes(10).toString('hex');
            fakeDatabase[id] = input;
            return new Message(id, input);
        },

        updateMessage: (parent, { id, input }, context, info) => {
            if (!fakeDatabase[id]) {
                throw new Error('no message exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            fakeDatabase[id] = input;
            return new Message(id, input);
        },

        setMessage: (parent, { message }, context, info) => {
            fakeDatabase.message = message;
            return message;
        },

        updateFreelancer: (parent, { id, firstname }, context, info) => {
            db.users.update({ id: id, firstname: firstname })
        }

    },

}

module.exports = resolvers