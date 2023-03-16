const db = require("../../data/dbconfig");

async function dataAdjuster() {
  let allData = await db("comments as c")
    .leftJoin("posts as p", "c.postId", "p.postId")
    .leftJoin("users as u", "c.userId", "u.userId")
    .leftJoin("roles as r", "u.roleId", "r.roleId")
    .select("u.*", "p.*", "c.*", "r.*");

  let postData = await db("posts as p")
    .leftJoin("users as u", "p.userId", "u.userId")
    .select("u.*", "p.*");

  let newPostArray = postData.map((post) => {
    let commentArray = [];
    allData.forEach((comment) => {
      if (comment.postId == post.postId) {
        let commentObj = {
          userId: comment.userId,
          avatarPhoto: comment.avatarPhoto,
          username: comment.username,
          commentNote: comment.commentNote,
        };
        commentArray.push(commentObj);
      }
    });
    let postObj = {
      postId: post.postId,
      userId: post.userId,
      username: post.username,
      avatarPhoto: post.avatarPhoto,
      postPhoto: post.postPhoto,
      postNote: post.postNote,
      likeNumber: post.likeNumber,
      comments: commentArray,
    };
    return postObj;
  });
  return newPostArray;
}

async function insertComment(comment) {
  const [addComment] = await db("comments").insert(comment);

  await db.transaction(async (trx) => {
    const [user] = await trx("users").where("userId", comment.userId);
    if (!user) {
      await db("comments").where("commentId", addComment).del();
    }
  });

  return await dataAdjuster();
}

module.exports = { insertComment };
