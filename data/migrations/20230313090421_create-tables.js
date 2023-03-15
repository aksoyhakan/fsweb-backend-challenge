/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (role) => {
      role.increments("roleId");
      role.string("role").notNullable().unique();
    })
    .createTable("users", (user) => {
      user.increments("userId");
      user.string("username", 128).notNullable().unique();
      user.string("userEmail", 128).notNullable().unique();
      user.string("birthday", 128).notNullable();
      user.string("password", 255).notNullable();
      user
        .integer("roleId")
        .unsigned()
        .defaultTo(2)
        .references("roleId")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      user
        .string("avatarPhoto", 128)
        .defaultTo(
          "https://i.pinimg.com/originals/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
        );
    })
    .createTable("posts", (post) => {
      post.increments("postId");
      post
        .string("postPhoto", 128)
        .defaultTo(
          "https://e7.pngegg.com/pngimages/708/311/png-clipart-icon-logo-twitter-logo-twitter-logo-blue-social-media-thumbnail.png"
        );
      post.string("postNote", 255);
      post.integer("likeNumber").defaultTo(0);
      post
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", (comment) => {
      comment.increments("commentId");
      comment.string("commentNote", 255).notNullable();
      comment
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("userId")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      comment
        .integer("postId")
        .unsigned()
        .notNullable()
        .references("postId")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
