'use strict'


const Factory = use('Factory');
const cf = use('co-functional');

class BookSeeder {
  async run() {
    const members = await Factory.model('App/Models/Member').createMany(100);
    const family_members = await Factory.model('App/Models/FamilyMember').makeMany(200);
    const trips = await Factory.model('App/Models/Trip').makeMany(30);

    const num_members = members.length;
    const num_family_members = family_members.length;

    await cf.forEach(
      async (familyMember) => {
        const member_random_index = Math.floor(Math.random() * num_members);
        familyMember.MemberID = members[member_random_index].id;
        await familyMember.save()
      }, family_members
    );

    await cf.forEach(
      async (trip) => {
        const member_random_index = Math.floor(Math.random() * num_members);
        const family_member_id_1 = family_members[Math.floor(Math.random() * num_family_members)].id;
        const family_member_id_2 = family_members[Math.floor(Math.random() * num_family_members)].id;
        const family_member_id_3 = family_members[Math.floor(Math.random() * num_family_members)].id;
        trip.MasterMemberID = members[member_random_index].id;
        trip.groupMemberIDs = JSON.stringify({family_members: [family_member_id_1, family_member_id_2, family_member_id_3]});
        await trip.save()
      }, trips
    );


  }
}

module.exports = BookSeeder
