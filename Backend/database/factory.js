'use strict'


const Factory = use('Factory');
const moment = use('moment');

Factory.blueprint('App/Models/Member', (faker) => {
  return {
    FirstName: faker.first(),
    LastName: faker.last(),
    Email: faker.email(),
    DOB: faker.birthday({
      year: faker.year({
        min: 1960,
        max: 2019
      })
    }).toISOString().split('T')[0],
    Gender: faker.gender(),
    IsDisabled: faker.bool({likelihood: 10}),
    SkiAbility: faker.integer({min: 1, max: 7}),
    SnowboardAbility: faker.integer({min: 1, max: 7}),
    TelemarkAbility: faker.integer({min: 1, max: 7}),
    SnowbikeAbility: faker.integer({min: 1, max: 7}),
    SnowmobileAbility: faker.integer({min: 1, max: 7}),
    SnowshoeAbility: faker.integer({min: 1, max: 7}),
    IsActive: faker.bool({likelihood: 100}),
    IsProfileComplete: faker.bool({likelihood: 90}),
  }
});

Factory.blueprint('App/Models/FamilyMember', (faker) => {
  return {
    FirstName: faker.first({nationality: 'it'}),
    LastName: faker.last({nationality: 'it'}),
    DOB: faker.birthday({
      year: faker.year({
        min: 1960,
        max: 2019
      })
    }).toISOString().split('T')[0],
    Gender: faker.gender(),
    IsDisabled: faker.bool({likelihood: 10}),
    SkiAbility: faker.integer({min: 1, max: 7}),
    SnowboardAbility: faker.integer({min: 1, max: 7}),
    TelemarkAbility: faker.integer({min: 1, max: 7}),
    SnowbikeAbility: faker.integer({min: 1, max: 7}),
    SnowmobileAbility: faker.integer({min: 1, max: 7}),
    SnowshoeAbility: faker.integer({min: 1, max: 7}),
  }
});


Factory.blueprint('App/Models/Trip', (faker) => {
  const start_date = moment().add(Math.ceil(Math.random() * 10 + 3), 'days').format('YYYY-MM-DD');
  const end_date = moment(start_date).add((Math.ceil(Math.random() * 3 + 1)), 'days').format('YYYY-MM-DD');

  return {
    ResortID: faker.integer({min: 1, max: 3386}),
    IsTripDone: faker.bool({likelihood: 20}),
    IsMasterMemberGoing: faker.bool({likelihood: 80}),
    StartDate: start_date,
    EndDate: end_date,
    SubmitDate: moment().subtract(Math.floor(Math.random() * 7), 'days').format("YYYY-MM-DD"),
  }
});
