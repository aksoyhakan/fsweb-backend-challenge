/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const postData = [
  {
    postPhoto:
      "https://fastly.picsum.photos/id/46/3264/2448.jpg?hmac=ZHE8nk-Q9uRp4MxgKNvN7V7pYFvA-9BCv99ltY3HBv4",
    postNote: "What a beatiful scene...",
    likeNumber: 0,
    userId: 1,
  },
  {
    postPhoto:
      "https://fastly.picsum.photos/id/56/2880/1920.jpg?hmac=BIplhYgNZ9bsjPXYhD0xx6M1yPgmg4HtthKkCeJp6Fk",
    postNote: "What a beatiful photo...",
    likeNumber: 0,
    userId: 1,
  },
  {
    postPhoto:
      "https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ",
    postNote: "Perfect",
    likeNumber: 0,
    userId: 2,
  },
  {
    postPhoto:
      "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
    postNote: "welcome ...",
    likeNumber: 0,
    userId: 2,
  },
  {
    postPhoto:
      "https://fastly.picsum.photos/id/69/4912/3264.jpg?hmac=Q08LW3SoOxPfaE-y8-braexxvm5PESXMCdEDqFbEhQ8",
    postNote: "far awayyy",
    likeNumber: 0,
    userId: 3,
  },
  {
    postPhoto:
      "https://fastly.picsum.photos/id/76/4912/3264.jpg?hmac=VkFcSa2Rbv0R0ndYnz_FAmw02ON1pPVjuF_iVKbiiV8",
    postNote: "no comment",
    likeNumber: 0,
    userId: 3,
  },
  {
    postPhoto:
      "https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s",
    postNote: "Harikaaaa",
    likeNumber: 0,
    userId: 4,
  },
];

exports.postData = postData;

exports.seed = async function (knex) {
  return await knex("posts").insert(postData);
};
