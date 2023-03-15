/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const userData = [
  {
    username: "Hakan",
    userEmail: "hakan@gmail.com",
    birthday: "12/09/1990",
    password: "$2a$08$boZSiWcbP2ivoVjZQcqRIeFJoQlND7R2VeVWT5ZLPcJW.1d1E8GX2",
    roleId: 1,
    avatarPhoto:
      "https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI",
  },
  {
    username: "Meltem",
    userEmail: "meltem@gmail.com",
    birthday: "05/03/1989",
    password: "$2a$08$QbT3LwJgulXBf91K5N4V8.S71McOi9zPtSisV53Urep9tv61PTNrC",
    roleId: 2,
    avatarPhoto:
      "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
  },
  {
    username: "Kenan",
    userEmail: "kenan@gmail.com",
    birthday: "12/09/1990",
    password: "$2a$08$HBRLbyfHsYNnIAq89K5Vmuqhw8XqrGrt37CU6S0GHHQevSUKByjxe",
    roleId: 2,
    avatarPhoto:
      "https://fastly.picsum.photos/id/99/4912/3264.jpg?hmac=jobkGP8_9Sch9BmMGe3xmm8yjCVQ3iSHrbu_4kOOciY",
  },
  {
    username: "Ramazan",
    userEmail: "ramazan@gmail.com",
    birthday: "11/07/1989",
    password: "$2a$08$z.NWMKqHgLIa3RNhfxdkFemkWNxO/6LilIDNN.FtZ2i6o.cE/6ecK",
    roleId: 1,
    avatarPhoto:
      "https://fastly.picsum.photos/id/88/1280/1707.jpg?hmac=NnkwPVDBTVxHkc4rALB_fyu-OHY2usdm7iRk5El7JC4",
  },
];

exports.userData = userData;
exports.seed = async function (knex) {
  return await knex("users").insert(userData);
};
