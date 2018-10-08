'use strict';

const Database = use('Database');
const TripActivity = use('App/Models/TripActivity');
const Member = use("App/Models/Member");
const FamilyMember = use("App/Models/FamilyMember");
const moment = use('moment');

class TripActivityController {
  async getActivityInfo({params}) {
    const tripID = params.tripID;
    const masterID = params.masterID;

    const {GroupMemberIDs, IsMasterMemberGoing} = (await Database.select('GroupMemberIDs', 'IsMasterMemberGoing').from('trips').where({id: tripID}))[0];
    const family_members = JSON.parse(GroupMemberIDs).family_members;

    // see if trip activity already exists
    const activity_tmp = await Database.select('MasterMemberActivity', 'GroupMemberActivity').from('trip_activities').where({TripID: tripID});

    let members = {};

    if (IsMasterMemberGoing) {

      const {DOB, FirstName, LastName, SkiAbility, SnowboardAbility, TelemarkAbility, SnowbikeAbility, SnowshoeAbility, SnowmobileAbility}
        = (await Database
        .select('DOB', 'FirstName', 'LastName', 'SkiAbility', 'SnowboardAbility', 'TelemarkAbility', 'SnowbikeAbility', 'SnowmobileAbility', 'SnowshoeAbility')
        .from('members')
        .where({id: masterID}))[0];

      members["master " + masterID.toString()] = {
        "id": "master " + masterID.toString(),
        "firstName": FirstName,
        "fullName": FirstName + " " + LastName,
        "activity": [false, false, false, false, false, false],
        "ability": [SkiAbility, SnowboardAbility, TelemarkAbility, SnowbikeAbility, SnowshoeAbility, SnowmobileAbility],
        "age": moment().diff(moment(DOB), "years"),
        "skipEquipmentLesson": false
      };

      if (activity_tmp.length > 0) {
        const MasterMemberActivity = JSON.parse(activity_tmp[0].MasterMemberActivity)
        const key = Object.keys(MasterMemberActivity); // single element array
        if (key.length > 0) {
          const master_key = key[0];
          const activity_history = MasterMemberActivity[master_key].activity;
          const skipEquipmentLesson_history = MasterMemberActivity[master_key].skipEquipmentLesson;
          members["master " + masterID.toString()].activity = activity_history;
          members["master " + masterID.toString()].skipEquipmentLesson = skipEquipmentLesson_history;
        }
      }
    }

    for (let i = 0; i < family_members.length; i++) {
      const family_member_id = family_members[i];
      const {DOB, FirstName, LastName, SkiAbility, SnowboardAbility, TelemarkAbility, SnowbikeAbility, SnowshoeAbility, SnowmobileAbility}
        = (await Database
        .select('DOB', 'FirstName', 'LastName', 'SkiAbility', 'SnowboardAbility', 'TelemarkAbility', 'SnowbikeAbility', 'SnowmobileAbility', 'SnowshoeAbility')
        .from('family_members')
        .where({id: family_member_id}))[0];
      members[family_member_id.toString()] = {
        "id": family_member_id,
        "firstName": FirstName,
        "fullName": FirstName + " " + LastName,
        "activity": [false, false, false, false, false, false],
        "ability": [SkiAbility, SnowboardAbility, TelemarkAbility, SnowbikeAbility, SnowshoeAbility, SnowmobileAbility],
        "age": moment().diff(moment(DOB), "years"),
        "skipEquipmentLesson": false
      }
    }

    if (activity_tmp.length > 0) {
      const GroupMemberActivity = JSON.parse(activity_tmp[0].GroupMemberActivity)
      const keys = Object.keys(GroupMemberActivity); // single element array
      keys.forEach(key => {
        const activity_history = GroupMemberActivity[key].activity;
        const skipEquipmentLesson_history = GroupMemberActivity[key].skipEquipmentLesson;
        members[key].activity = activity_history;
        members[key].skipEquipmentLesson = skipEquipmentLesson_history;
      })
    }
    return JSON.stringify(members);
  }

  async uploadActivityInfo({request}) {
    const {TripID, MasterMemberActivity, GroupMemberActivity} = JSON.parse(request.raw());

    const tmp = await Database
      .select('MasterMemberActivity', 'GroupMemberActivity')
      .from('trip_activities')
      .where({TripID: TripID});

    if (tmp.length === 0) {
      const new_trip_activity = new TripActivity();
      new_trip_activity.TripID = TripID;
      new_trip_activity.MasterMemberActivity = JSON.stringify(MasterMemberActivity);
      new_trip_activity.GroupMemberActivity = JSON.stringify(GroupMemberActivity);
      await new_trip_activity.save()
    } else {
      const old_trip_activity = await TripActivity.findBy({TripID: TripID});
      old_trip_activity.MasterMemberActivity = JSON.stringify(MasterMemberActivity);
      old_trip_activity.GroupMemberActivity = JSON.stringify(GroupMemberActivity);
      await old_trip_activity.save()
    }

    const family_keys = Object.keys(GroupMemberActivity);
    for (let i = 0; i < family_keys.length; i++) {
      const key = family_keys[i];
      const ability_chart = GroupMemberActivity[key].ability;
      const old_family_member = await FamilyMember.find(parseInt(key));
      old_family_member.SkiAbility = ability_chart[0];
      old_family_member.SnowboardAbility = ability_chart[1];
      old_family_member.TelemarkAbility = ability_chart[2];
      old_family_member.SnowbikeAbility = ability_chart[3];
      old_family_member.SnowshoeAbility = ability_chart[4];
      old_family_member.SnowmobileAbility = ability_chart[5];
      await old_family_member.save();
    }

    const master_key = Object.keys(MasterMemberActivity);

    if (master_key.length > 0) {
      const key = master_key[0]; // string type
      const ability_chart = MasterMemberActivity[key].ability;
      const old_member = await Member.find(parseInt(key));
      old_member.SkiAbility = ability_chart[0];
      old_member.SnowboardAbility = ability_chart[1];
      old_member.TelemarkAbility = ability_chart[2];
      old_member.SnowbikeAbility = ability_chart[3];
      old_member.SnowshoeAbility = ability_chart[4];
      old_member.SnowmobileAbility = ability_chart[5];
      await old_member.save();
    }
  }
}

module.exports = TripActivityController
