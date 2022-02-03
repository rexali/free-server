//  logic and transformation
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

// resolvers
var resolvers = {

    getDie: (parent, args, context, info) => {
        return new RandomDie(args.numSides || 6);
    },

    getFull: (parent, { obj }, context, info) => {
        return new FullName(obj);
    },

    ip: function (parent, args, { req, token }, info) {
        return req.ip;
    },

    productByCategory: async () => {
        let sectiondata = [];
        let products = await db.mysql.readAll("select * from products");
        let category = Array.from(new Set(products.map((item) => item.product_category)));
        category.forEach((item) => {
            sectiondata.push({
                title: item,
                data: [...products.filter(product => product.product_category === item)]
            }
            );
        });

        return sectiondata;
    }
}