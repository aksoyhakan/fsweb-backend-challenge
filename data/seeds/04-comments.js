/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const commentData = [
  {
    commentNote: "Amazing",
    userId: 2,
    postId: 1,
  },
  {
    commentNote: "Great",
    userId: 3,
    postId: 1,
  },
  {
    commentNote: "gooooood",
    userId: 4,
    postId: 1,
  },
  {
    commentNote: "Great",
    userId: 3,
    postId: 2,
  },
  {
    commentNote: "gooooood",
    userId: 4,
    postId: 2,
  },
  {
    commentNote: "Great",
    userId: 1,
    postId: 3,
  },
  {
    commentNote: "gooooood",
    userId: 3,
    postId: 3,
  },
  {
    commentNote: "Amazing",
    userId: 1,
    postId: 4,
  },
  {
    commentNote: "Great",
    userId: 4,
    postId: 5,
  },
  {
    commentNote: "gooooood",
    userId: 1,
    postId: 5,
  },

  {
    commentNote: "Amazing",
    userId: 2,
    postId: 6,
  },
  {
    commentNote: "Great",
    userId: 4,
    postId: 6,
  },
  {
    commentNote: "gooooood",
    userId: 1,
    postId: 7,
  },
  {
    commentNote: "Great",
    userId: 2,
    postId: 7,
  },
  {
    commentNote: "gooooood",
    userId: 3,
    postId: 7,
  },
];
exports.commentData = commentData;
exports.seed = async function (knex) {
  return await knex("comments").insert(commentData);
};
