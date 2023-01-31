'use strict'
const faker = require("faker")

const {db, models: {Client, Freelancer, Project, Request} } = require('../server/db')

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
      imageUrl: faker.image.imageUrl(),
      description: faker.commerce.productDescription(),
      categories: faker.name.jobType(),
      username: faker.internet.userName(),
      password: faker.internet.password(), 

    });
}

await Freelancer.create({
  username: 'aaaaa',
  password: '12345'
})


// await Request.create({
//   // projectId: 2,
//   // freelancerId: 1,
//   status:"ACCEPTED",
//   requestMessage: faker.lorem.paragraph(),

// });

await Project.create({
   clientId: 1,
   freelancerId: 102,
  status: 'Ongoing',
  description: faker.lorem.sentences(),
  category: faker.name.jobType()
})

await Project.create({
   clientId: 2,
   freelancerId: 2,
  status: 'Ongoing',
  description: faker.lorem.sentences(),
  category: faker.name.jobType()
})
await Project.create({
  clientId: 3,
  freelancerId: 1,
 status: 'Ongoing',
 description: faker.lorem.sentences(),
 category: faker.name.jobType()
})

await Project.create({ 
  clientId: 4,
  freelancerId: 2,
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
await Request.create({
  projectId: 4,
  freelancerId: 2,
 status: 'PENDING',
 requestMessage: faker.lorem.paragraph(),
})
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
await Request.create({
  projectId: 4,
  freelancerId: 1,
 status: 'PENDING',
 requestMessage: faker.lorem.paragraph(),
})

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
