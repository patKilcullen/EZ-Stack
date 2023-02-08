'use strict'
const faker = require("faker")

const {db, models: {Client, Freelancer, Project, Request, Rating} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  
  for (let i = 0; i <= 100; i++) {
    await Client.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),  
      email : faker.internet.email(),
      description : faker.lorem.sentences(),
      imageUrl : faker.image.imageUrl(),  
    });
    await Freelancer.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imageUrl: faker.image.people(),
      description: faker.commerce.productDescription(),
      username: faker.internet.userName(),
      password: faker.internet.password(), 

    });
}

await Freelancer.create({
  username: 'aaaaa',
  password: '12345',
  firstName: 'Andrew',
  lastName:'Andrews',
  email:'andrew@gmail.com',
  imageUrl: faker.image.people(),
  description: 
  "Hi, I am a Professional Python Programmer and Django Developer with more than years of experience. I develop custom websites for companies and individuals. I can ace any level of complexity. The field of my Expertise includes: Frontend Development : HTML5, CSS3, Javascript",
  category: 'Python Developer',
  hourlyRate: 12,
  specialties:'Web Application, Scripting, Bug Fixes, Help/Consultation',
  bio:'I will fix your html, css, jquery, wordpress issues',
})

await Client.create({
  username: 'bbbbb',
  password: '12345',
  firstName: 'joe',
  lastName:'Bobs',
  email:'bob@gmail.com',
  imageUrl: faker.image.people(),
  description: 
  "Are you facing any layout issue or difficulty in programming, Don't worry leave it to me, i will fix html, css, jquery, php, javascript, bootstrap, wordpress, shopify issue. i will also show you where was the issue.",
  category: 'HTML & CSS Developer',
  hourlyRate: 12,
  specialties:'Custom Websites using WordPress, Shopify, Wix, etc',
  bio:'I will fix your html, css, jquery, wordpress issues',
})

await Freelancer.create({
  username: 'ccccc',
  password: '12345',
  firstName: 'Bob',
  lastName:'Bobs',
  email:'carlos@gmail.com',
  imageUrl: faker.image.people(),
  description: 
  "Are you facing any layout issue or difficulty in programming, Don't worry leave it to me, i will fix html, css, jquery, php, javascript, bootstrap, wordpress, shopify issue. i will also show you where was the issue.",
  category: 'iOS Developer',
  hourlyRate: 12,
  specialties:'Custom Websites using WordPress, Shopify, Wix, etc',
  bio:'I will fix your html, css, jquery, wordpress issues',
})
await Freelancer.create({
  username: 'ddddd',
  password: '12345',
  firstName: 'matt',
  lastName:'Bobs',
  email:'doug@gmail.com',
  imageUrl: faker.image.people(),
  description: 
  "Are you facing any layout issue or difficulty in programming, Don't worry leave it to me, i will fix html, css, jquery, php, javascript, bootstrap, wordpress, shopify issue. i will also show you where was the issue.",
  category: 'Android Developer',
  hourlyRate: 12,
  specialties:'Custom Websites using WordPress, Shopify, Wix, etc',
  bio:'I will fix your html, css, jquery, wordpress issues',
})



await Rating.create({
  freelancerId: 102,
  rating: 3,
  review: 'did super great job'
})

await Rating.create({
  freelancerId: 102,
  rating: 4,
  review: 'saved my mom from a burning building'
})

await Rating.create({
  freelancerId: 102,
  rating: 3,
  review: 'cured my blindness with the beauty of their work'
})

await Project.create({
   clientId: 102,
   freelancerId: 102,
   title: "super cool project",
  status: 'Ongoing',
  description: faker.lorem.sentences(),
  category: faker.name.jobType()
})
await Project.create({ 
  clientId: 4,
  freelancerId: 2,
  title: "medium cool project",
 status: 'Ongoing',
 description: faker.lorem.sentences(),
 category: "HTML & CSS Developer"
})

await Project.create({
   clientId: 102,
   freelancerId: 102,
   title: "nice project",
  status: 'Ongoing',
  description: faker.lorem.sentences(),

  category: "Python Developer"
})
for (let i = 0; i <= 25; i++) {
await Project.create({
  clientId: Math.floor(Math.random() * 100),
  freelancerId: Math.floor(Math.random() * 100),
  title: faker.name.jobType(),
 status: 'Ongoing',
 description: faker.lorem.sentences(),
 category: 'Android Developer'
})}
for (let i = 0; i <= 25; i++) {
  await Project.create({
    clientId: Math.floor(Math.random() * 100),
    freelancerId: Math.floor(Math.random() * 100),
    title: faker.name.jobType(),
   status: 'Ongoing',
   description: faker.lorem.sentences(),
   category: 'Python Developer'
  })}
  for (let i = 0; i <= 25; i++) {
    await Project.create({
      clientId: Math.floor(Math.random() * 100),
      freelancerId: Math.floor(Math.random() * 100),
      title: faker.name.jobType(),
     status: 'Ongoing',
     description: faker.lorem.sentences(),
     category: 'HTML & CSS Developer'
    })}
    for (let i = 0; i <= 25; i++) {
      await Project.create({
        clientId: Math.floor(Math.random() * 100),
        freelancerId: Math.floor(Math.random() * 100),
        title: faker.name.jobType(),
       status: 'Ongoing',
       description: faker.lorem.sentences(),
       category: 'iOS Developer'
      })}
      

  


await Project.create({ 
  clientId: 4,
  freelancerId: 2,
  title: "medium cool project",
 status: 'Ongoing',
 description: faker.lorem.sentences(),
 category: faker.name.jobType()
})
await Request.create({
  projectId: 2,
  freelancerId: 2,
 status: 'PENDING',
 requestMessage: faker.lorem.paragraph(),
})
await Request.create({
  projectId: 3,
  freelancerId: 2,
 status: 'PENDING',
 requestMessage: faker.lorem.paragraph(),
})
// await Request.create({
//   projectId: 4,
//   freelancerId: 2,
//  status: 'PENDING',
//  requestMessage: faker.lorem.paragraph(),
// })
await Request.create({
  projectId: 1,
  freelancerId: 3,
 status: 'PENDING',
 requestMessage: faker.lorem.paragraph(),
})
await Request.create({
  projectId: 3,
  freelancerId: 1,
 status: 'PENDING',
 requestMessage: faker.lorem.paragraph(),
})
// await Request.create({
//   projectId: 4,
//   freelancerId: 1,
//  status: 'PENDING',
//  requestMessage: faker.lorem.paragraph(),
// })

  // console.log(`seeded ${user.length} users`)
  console.log(`seeded successfully`)
    // return {
    //   users: {
    //     cody: users[0],
    //     murphy: users[1]
    //   }
    // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
