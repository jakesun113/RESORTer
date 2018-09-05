'use strict';
const Hash = use('Hash');

const MemberHook = exports = module.exports = {};

MemberHook.hashPassword = async (member) => {
  member.EncryptedPW = await Hash.make(member.EncryptedPW)
};
