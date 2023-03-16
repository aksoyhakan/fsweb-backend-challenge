const request = require("supertest");
const server = require("./api/server");
const db = require("./data/dbconfig");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

test("test environment testing olarak ayarlanmış", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("server.js", () => {
  describe("[POST] /api/auth/login", () => {
    it("[1] geçerli kriterlerde doğru mesajı döndürüyor", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      expect(res.body.message).toMatch(/Hakan welcome/i);
    }, 1500);
    it("[2] kriterler geçersizse doğru mesaj ve durum kodu", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+12" });
      expect(res.body.message).toMatch(/invalid entry/i);
      expect(res.status).toBe(402);
      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Haka", password: "Hakan+11" });
      expect(res.body.message).toMatch(/Haka is not found/i);
      expect(res.status).toBe(404);
    }, 1500);
    it("[3] doğru token ve { subject, username, role, exp, iat } ile yanıtlıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      let decoded = jwtDecode(res.body.token);
      expect(decoded).toHaveProperty("iat");
      expect(decoded).toHaveProperty("exp");
      expect(decoded).toMatchObject({
        subject: 1,
        role: "admin",
        username: "Hakan",
        avatarPhoto:
          "https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI",
      });
      res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Meltem", password: "Meltem+11" });
      decoded = jwtDecode(res.body.token);
      expect(decoded).toHaveProperty("iat");
      expect(decoded).toHaveProperty("exp");
      expect(decoded).toMatchObject({
        subject: 2,
        role: "user",
        username: "Meltem",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
      });
    }, 1500);
  });
  describe("[POST] /api/auth/register", () => {
    it("[4] istemci verileri sağladığında veritabanına yeni kullanıcı kaydı", async () => {
      await request(server).post("/api/auth/register").send({
        username: "Zana",
        password: "Zana+11",
        userEmail: "zana@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 2,
      });
      const devon = await db("users").where("username", "Zana").first();
      expect(devon).toMatchObject({ username: "Zana" });
    }, 1500);

    it("[5] ismteci role_name admin seçmişse role_id 1 olan bir kullanıcı oluşturuluyor", async () => {
      await request(server).post("/api/auth/register").send({
        username: "Mehmet",
        password: "Mehmet+11",
        userEmail: "mehmet@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      const devon = await db("users").where("username", "Mehmet").first();
      expect(devon).toMatchObject({ roleId: 2 });
    }, 1500);

    it("[6] şifre düz metin yerine kriptolu bir şekilde kaydediliyor", async () => {
      await request(server).post("/api/auth/register").send({
        username: "Mehmet",
        password: "Mehmet+11",
        userEmail: "mehmet@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      const devon = await db("users").where("username", "Mehmet").first();
      expect(bcrypt.compareSync("Mehmet+11", devon.password)).toBeTruthy();
    }, 1500);
    it("[7] doğru kullanıcı yanıtlanıyor (istekten role_name çıkarıldığında)", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "Mehmet",
        password: "Mehmet+11",
        userEmail: "mehmet@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      expect(res.body).toMatchObject({
        username: "Mehmet",
        userEmail: "mehmet@gmail.com",
      });
    }, 1500);

    it("[8] username eksik girilirse hata mesajı dönüyor", async () => {
      const res = await request(server).post("/api/auth/register").send({
        password: "Mehmet+11",
        userEmail: "mehmet@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/username property is missing/i);
    }, 1500);

    it("[9] password eksik girilirse hata mesajı dönüyor", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "Mehmet",
        userEmail: "mehmet@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/password property is missing/i);
    }, 1500);

    it("[10] email eksik girilirse hata mesajı dönüyor", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "Mehmet",
        password: "Mehmet+11",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/email property is missing/i);
    }, 1500);
    it("[11] username unique kontrolü", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "Hakan",
        password: "Mehmet+11",
        userEmail: "mehmet@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      expect(res.status).toBe(402);
      expect(res.body.message).toMatch(/username is already used/i);
    }, 1500);
    it("[12] email unique kontrolü", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "Mehmet",
        password: "Mehmet+11",
        userEmail: "hakan@gmail.com",
        birthday: "1966-10-25",
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        roleId: 1,
      });
      expect(res.status).toBe(402);
      expect(res.body.message).toMatch(/email is already used/i);
    }, 1500);
  });
  describe("[GET] /api/posts", () => {
    it("[13] token göndermeden denenrse doğru mesaj", async () => {
      const res = await request(server).get("/api/posts");
      expect(res.body.message).toMatch(/Token not found/i);
    }, 1500);
    it("[14] geçersiz token girilirse doğru mesaj", async () => {
      const res = await request(server)
        .get("/api/users")
        .set("Authorization", "foobar");
      expect(res.body.message).toMatch(/Invalid token/i);
    }, 1500);
    it("[15] token geçerliyse postlar alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .get("/api/posts")
        .set("authorization", res.body.token);
      expect(res.body[0]).toMatchObject({ postId: 1, username: "Hakan" });
    }, 1500);
  });
  describe("[GET] /api/posts/:postId", () => {
    it("[16] ilgili post alıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .get("/api/posts/3")
        .set("authorization", res.body.token);
      expect(res.body).toMatchObject({ postId: 3, username: "Meltem" });
    }, 1500);
  });
  describe("[POST] /api/comment", () => {
    it("[17] ilgili comment alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/comment")
        .send({ commentNote: "çok güzel", postId: 1, userId: 2 })
        .set("authorization", res.body.token);
      expect(res.body[0]["comments"][3]).toMatchObject({
        avatarPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        commentNote: "çok güzel",
        userId: 2,
        username: "Meltem",
      });
    }, 1500);
    it("[18] commentNote eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/comment")
        .send({ postId: 1, userId: 2 })
        .set("authorization", res.body.token);
      expect(res.body.message).toMatch(/commentNote property is missing/i);
    }, 1500);
    it("[19] postId eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/comment")
        .send({ commentNote: "çok güzel", userId: 2 })
        .set("authorization", res.body.token);
      expect(res.body.message).toMatch(/postId property is missing/i);
    }, 1500);
    it("[20] userId eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/comment")
        .send({ commentNote: "çok güzel", postId: 1 })
        .set("authorization", res.body.token);
      expect(res.body.message).toMatch(/userId property is missing/i);
    }, 1500);
    it("[21] token eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/comment")
        .send({ postId: 1, userId: 2 });
      expect(res.body.message).toMatch(/Token not found/i);
    }, 1500);
  });

  describe("[DELETE] /api/posts", () => {
    it("[22] ilgili comment siliniyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .delete("/api/posts/1")
        .set("authorization", res.body.token);
      expect(res.body[0]).toMatchObject({
        postId: 2,
      });
    }, 1500);
    it("[23] olmayan post olunca hata mesajı veriyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .delete("/api/posts/12")
        .set("authorization", res.body.token);
      expect(res.body.message).toMatch(/ID No: 12 posts not found/i);
    }, 1500);

    it("[24] token eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server).delete("/api/posts/12");
      expect(res.body.message).toMatch(/Token not found/i);
    }, 1500);
    it("[25] token yanlış olduğunda hata mesajı alınıyorr", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .delete("/api/posts/3")
        .set("authorization", `${res.body.token}A`);
      expect(res.body.message).toMatch(/Invalid token/i);
    }, 1500);
  });
  describe("[GET] /api/users", () => {
    it("[26] admin olan kişi user bilgilerine ulaşabiliyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .get("/api/users")
        .set("authorization", res.body.token);
      expect(res.body.length).toBe(4);
    }, 1500);
    it("[27] admin olmayan kullanıcı olunca hata mesajı veriyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Meltem", password: "Meltem+11" });
      res = await request(server)
        .get("/api/users")
        .set("authorization", res.body.token);
      expect(res.body.message).toBe("You do not have authorization");
    }, 1500);
  });
  describe("[POST] /api/posts", () => {
    it("[28] ilgili post alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/posts")
        .send({
          postPhoto:
            "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
          postNote: "Good day",
          userId: 2,
          likeNumber: 0,
        })
        .set("authorization", res.body.token);
      expect(res.body[res.body.length - 1]).toMatchObject({
        postPhoto:
          "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
        postNote: "Good day",
        userId: 2,
        likeNumber: 0,
      });
    }, 1500);
    it("[29] post photo eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/posts")
        .send({
          postNote: "Good day",
          userId: 2,
          likeNumber: 0,
        })
        .set("authorization", res.body.token);
      expect(res.body.message).toBe("postPhoto property is missing");
    }, 1500);
    it("[30] userId eksik olduğunda hata mesajı alınıyor", async () => {
      let res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Hakan", password: "Hakan+11" });
      res = await request(server)
        .post("/api/posts")
        .send({
          postPhoto:
            "https://fastly.picsum.photos/id/108/2000/1333.jpg?hmac=jtsJnUALS7Y2pJnLKGF7fSvGhEKpDWLvjTr9bRVFELA",
          postNote: "Good day",
          likeNumber: 0,
        })
        .set("authorization", res.body.token);
      expect(res.body.message).toBe("userId property is missing");
    }, 1500);
  });
});
