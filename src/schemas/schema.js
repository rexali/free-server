const { gql } = require('apollo-server');
const { mutationSchema } = require('./mutationSchema');
const { querySchema } = require('./querySchema');
const { subscriptionSchema } = require('./subscriptionSchema');

const typeDefs = gql`

scalar Upload

scalar Void

scalar Date

input MessageInput {
  content: String
  author: String
}

type File {
    filename: String!
    mimetype: String!
    encoding: String!
}

type Files {
  url:String
}

type Link {
  website:String
  linkedin:String
  github:String
}

type Section {
  title:String
  data:[Service]
}

type Language {
  id:Int!
  name:String
}

type Skill {
  id:Int!
  name:String
  year_of_exp:String
}

type Profile {
  id:Int!
  first_name:String
  last_name:String
  phone:String
  email: String
  picture:String
  cover_picture:String
}

type Address {
  id:Int!
  street:String
  local_govt:String
  state:String
  country:String
}

type Cart {
  id:Int
  service_id:Int
  user_id:Int
}

type Experience {
id:Int
started_at:Date
ended_at:Date
employer:String
description:String
}

type Portfolio {
id:ID
title:String
description:String
startDate:Date
endDate:Date
}

type Project {
  id:Int
  title:String
  category:String
  budget:String
  description:String
  image:String
  createdAt:Date
}

type Education {
id:Int!
institution:String
course:String
description:String
startDate:Date
endDate:Date
}

type Certification {
id:Int!
title:String
description:String
issued_at:Date
}

type Service {
  id:Int!
  title: String
  category:String
  subcategory:String
  picture:String
  description:String
  charge:String
  delivery_period:String
  search_tag:String
  hourly_rate:String
  user:User
  addons:[Addon]
}

type Addon {
  id:Int!
  title:String
  charge:Int
}

type Review{
  id:Int!
  name:String
  rating:Int
  message:String
  created_at:Date
}

type Notification {
  id:Int!
  title:String
  content:String
  created_at:String
}

type Account {
  id:Int
  balance:Int
  created_at:Date
  updated_at:Date
}

type Transaction {
  id:Int
  transaction_amount:Int
  transaction_type:String
  transaction_date:Date
}

type Order {
  id:Int!
  user_id:Int
  addon_id:Int
  service_id:Int
  charge:Int
  payment_status:String
  created_at:String
}

type Favourite {
  id:Int!
  user_id:Int
  offer_id:Int
}

type Promotion {
  id:Int
  channel:String
  charge:String
  message:String
}

input RegisterInput {
email:String
password:String
role:String
}

input LoginInput {
email:String
password:String
role:String
}

input AddonInput {
  title:String
  charge:Int
  service_id:Int

}

type User {
  id: Int!
  firstname:String
  lastname:String
  password:String
  phone:String
  email:String
  picture:String
  cover_picture:String
  job_title:String
  about:String
  role:String
  token:String
  company:String
  addresses:[Address]
  educations:[Education]
  certifications:[Certification]
  portfolios:[Portfolio]
  experiences:[Experience]
}

input AddressInput {
  id:Int!
  street:String
  local_govt:String
  state:String
  country:String
}

input EducationInput {
id:Int!
institution:String
course:String
description:String
startDate:Date
endDate:Date
}

input CertificationInput {
id:Int!
title:String
description:String
issuedDate:Date
}

input PortfolioInput {
id:Int!
title:String
description:String
startDate:Date
endDate:Date
}

input ProjectInput {
  id:Int
  title:String
  category:String
  budget:String
  description:String
  image:String
  createdAt:Date
}

input ExperienceInput {
id:Int
startDate:Date
endDate:Date
employer:String
description:String
}

input UserInput {
  id: Int
  firstname:String
  lastname:String
  password:String
  phone:String
  email:String
  picture:String
  cover_picture:String
  job_title:String
  about:String
  role:String
  token:String
  company:String
  address:[AddressInput]
  education:[EducationInput]
  certification:[CertificationInput]
  portfolio:[PortfolioInput]
  experience:[ExperienceInput]
}

input ServiceInput {
  id:Int!
  title: String
  category:String
  subcategory:String
  picture:String
  description:String
  charge:String
  delivery_period:String
  search_tag:String
  hourly_rate:String
  email:String
  role:String
  password:String
},

input MailInput {
  email:String
  subject:String,
  format:String,
  text:String,
  name:String
}


type Message {
  id: Int!
  name:String
  email:String
  subject:String
  message:String
  created_at:Date
  content: String
  author: String
}

type Post {
  author:String
  comment:String
}

type Comment {
  id:Int
  content:String
}

type Result {
    id: String
}

${querySchema}
${mutationSchema}
${subscriptionSchema}

`;

module.exports = typeDefs