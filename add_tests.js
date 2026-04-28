const fs = require('fs');

const files = [
  {
    file: 'postman/collections/ZMABT API/auth/signup/Create a new user account.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Response body is present", () => {
        pm.expect(pm.response.json()).to.be.an("object");
      });`
  },
  {
    file: 'postman/collections/ZMABT API/auth/login/Login user.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Response contains access token", () => {
        const json = pm.response.json();
        pm.expect(json).to.have.property("token");
        pm.expect(json.token).to.be.a("string").and.not.empty;
      });
      if (pm.response.code === 200) {
        pm.environment.set("bearerToken", pm.response.json().token);
      }`
  },
  {
    file: 'postman/collections/ZMABT API/auth/logout/Logout user.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });`
  },
  {
    file: "postman/collections/ZMABT API/account/profile/Get authenticated user's profile.request.yaml",
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Profile object is returned", () => {
        pm.expect(pm.response.json()).to.be.an("object");
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/account/follow/Follow a user.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not a self-follow error (400)", () => {
        pm.expect(pm.response.code).to.not.equal(400);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/account/unfollow/Unfollow a user.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not an invalid user id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: "postman/collections/ZMABT API/account/updateBio/Update authenticated user's bio.request.yaml",
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/create/Create a new post.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("No validation error (400)", () => {
        pm.expect(pm.response.code).to.not.equal(400);
      });
      pm.test("Created post object is returned", () => {
        pm.expect(pm.response.json()).to.be.an("object");
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/get/Get a single post by ID.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Post object is returned", () => {
        pm.expect(pm.response.json()).to.be.an("object");
      });
      pm.test("Not an invalid post id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/getPage/Get posts.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Paginated posts response is an array or object", () => {
        const json = pm.response.json();
        pm.expect(json).to.satisfy((v) => Array.isArray(v) || typeof v === "object");
      });
      pm.test("Not an invalid user id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/getPageFyp/Get FYP posts.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("FYP posts response is an array or object", () => {
        const json = pm.response.json();
        pm.expect(json).to.satisfy((v) => Array.isArray(v) || typeof v === "object");
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/getPagePlace/Get paginated posts for a place.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Place posts response is an array or object", () => {
        const json = pm.response.json();
        pm.expect(json).to.satisfy((v) => Array.isArray(v) || typeof v === "object");
      });
      pm.test("Not an invalid place id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/getPageUser/Get posts of authenticated user.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("User posts response is an array or object", () => {
        const json = pm.response.json();
        pm.expect(json).to.satisfy((v) => Array.isArray(v) || typeof v === "object");
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/update/Update a post.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not forbidden (403)", () => {
        pm.expect(pm.response.code).to.not.equal(403);
      });
      pm.test("Not not found (404)", () => {
        pm.expect(pm.response.code).to.not.equal(404);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/posts/delete/Delete a post.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not forbidden (403)", () => {
        pm.expect(pm.response.code).to.not.equal(403);
      });
      pm.test("Not an invalid post id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/comments/create/Create a new comment.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Created comment object is returned", () => {
        pm.expect(pm.response.json()).to.be.an("object");
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not an invalid id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/comments/getPage/Get paginated comments for a post or parent comment.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Paginated comments response is an array or object", () => {
        const json = pm.response.json();
        pm.expect(json).to.satisfy((v) => Array.isArray(v) || typeof v === "object");
      });
      pm.test("No server error (500)", () => {
        pm.expect(pm.response.code).to.not.equal(500);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/comments/update/Update a comment.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not forbidden (403)", () => {
        pm.expect(pm.response.code).to.not.equal(403);
      });
      pm.test("Not not found (404)", () => {
        pm.expect(pm.response.code).to.not.equal(404);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/comments/delete/Delete a comment.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not forbidden (403)", () => {
        pm.expect(pm.response.code).to.not.equal(403);
      });
      pm.test("Not an invalid comment id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/comments/like/Like a comment.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/comments/removeLike/Remove like from a comment.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not an invalid comment id error (422)", () => {
        pm.expect(pm.response.code).to.not.equal(422);
      });`
  },
  {
    file: 'postman/collections/ZMABT API/ratings/set/Create or update a rating for a post.request.yaml',
    script: `scripts:
  - type: afterResponse
    language: text/javascript
    code: |-
      pm.test("Status code is 200", () => {
        pm.response.to.have.status(200);
      });
      pm.test("Response time is less than 2000ms", () => {
        pm.expect(pm.response.responseTime).to.be.below(2000);
      });
      pm.test("Response is JSON", () => {
        pm.response.to.be.json;
      });
      pm.test("Not unauthorized (401)", () => {
        pm.expect(pm.response.code).to.not.equal(401);
      });
      pm.test("Not forbidden (403)", () => {
        pm.expect(pm.response.code).to.not.equal(403);
      });
      pm.test("Not not found (404)", () => {
        pm.expect(pm.response.code).to.not.equal(404);
      });
      pm.test("No validation error (400)", () => {
        pm.expect(pm.response.code).to.not.equal(400);
      });`
  }
];

let results = [];
for (const {file, script} of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/[\r\n]+$/, '');
    content = content + '\r\n' + script + '\r\n';
    fs.writeFileSync(file, content, 'utf8');
    results.push('OK: ' + file);
  } catch(e) {
    results.push('ERR: ' + file + ' -> ' + e.message);
  }
}
console.log(results.join('\n'));
