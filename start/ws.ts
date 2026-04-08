// import PostController from "#controllers/posts_controller";
import User from "#models/user";
import CommentService from '#services/comment_service'
import PostService from '#services/post_service'
import {commentStoreValidator} from "#validators/comment";
import {Secret} from "@adonisjs/core/helpers";
import app from "@adonisjs/core/services/app";
import server from "@adonisjs/core/services/server";
import {Server, Socket} from "socket.io";

app.ready(() => {
  console.info("WS is running");

  const io = new Server(server.getNodeServer(), {
    cors : {origin : "*"},
  });

  (global as any).io = io;

  // idk maybe used for updating someones profile LIVE or something ?
  io.of(/^\/profile\/.+$/).on("connection", async (socket: Socket) => {
    // const namespace = socket.nsp.name;
    //  const profileId = namespace.split("/").pop();

    try {
      const token = socket.handshake.auth?.token;
      if (!token || token === "") {
        return socket.disconnect(true);
      }
      const secret = new Secret(token);
      const tokenRecord = await User.accessTokens.verify(secret);
      if (!tokenRecord) {
        return socket.disconnect(true);
      }

      const userId = tokenRecord.tokenableId;
      socket.data.userId = userId;

      /*const membership = await GroupUser.query()
                             .where("group_id", groupId!)
                             .andWhere("user_id", userId.toString())
                             .first();
      if (!membership) {
        return socket.disconnect(true);
      }
                             */

      socket.on('savePost', async (data) => {
        try {
          const userId = socket.data.userId
          const user = await User.find(userId)

          if (!user) return

              const post = await PostService.createPost(user, data)

          const allSockets = await socket.nsp.fetchSockets()

          for (const clientSocket of allSockets) {
            if (clientSocket.data.viewingUserId === user.id) {
              clientSocket.emit('newPost', post)
            }
          }
        } catch (err) {
          console.error('Post creation failed:', err)
          socket.emit('error', {message : 'Failed to create post'})
        }
      })

      socket.on(
          "inviteUser",
          async (data: {username: string}, callback: (res: any) => void) => {
            try {
              const {username} = data;
              const target = await User.findBy("username", username);
              if (!target) {
                return callback({error : "Bad userName"});
              }
              // kontrola, ci je user v skupine
              /*const existingMember =
                  await GroupUser.query()
                      .where("group_id", groupId!)
                      .andWhere("user_id", target.id.toString())
                      .first();
              if (existingMember) {
                return callback(
                    {error : `${username} is already a member of this group`},
                );
              }*/

              // Skontroluj či user už nemá pending invitation
              /*const existingInvite =
                  await GroupUserInvitation.query()
                      .where("group_id", groupId!)
                      .andWhere("user_id", target.id.toString())
                      .first();
              if (existingInvite) {
                return callback(
                    {error : `${username} already has a pending invitation`},
                );
              }

              const response = await GroupController.invite(
                  String(userId),
                  target,
                  String(groupId),
              );*/
              io.of("/user").to(`user:${target.id}`).emit("invited", {
                // groupId,
                inviterId : userId,
              });

              /*callback(
                  response,
              );*/
            } catch (err) {
              console.error("Failed to invite user:", err);

              callback({error : "Failed to send invitation"});
            }
          },
      );

      socket.on("sendMessage", async (data: {content: string}, callback) => {
        try {
          /*const message = await MessagesController.sendMessage(
              userId.toString(),
              groupId!,
              data.content,
          );*/

          const allSockets = await socket.nsp.fetchSockets();

          for (const clientSocket of allSockets) {
            const clientUserId = clientSocket.data.userId;
            const clientUser = await User.find(clientUserId);

            if (clientUser) {
              const words = data.content.trim().split(/\s+/);
              const firstWord = words[0] || "";
              const containsMention =
                  firstWord.startsWith("@") &&
                  firstWord.substring(1) === clientUser.username;

              clientSocket.emit("message", {
                //...message,
                containsMention : containsMention,
              });
            }
          }

          // callback(message);
        } catch (err) {
          console.error(err);
          callback({error : "Failed to send message"});
        }
      });

      socket.on("loadMessages", async (page: number, callback) => {
        try {
          const user = await User.find(userId);
          /*
          const messages = await MessagesController.loadMessages(
              groupId!,
              page,
          );

          const serializedMessages = messages.all().map((msg: any) => {
            const words = msg.contents.trim().split(/\s+/);
            const firstWord = words[0] || "";
            const containsMention = user && firstWord.startsWith("@") &&
                                    firstWord.substring(1) === user.username;

            return {
              id : msg.id,
              content : msg.contents,
              author : msg.user ? msg.user.username : "Unknown",
              containsMention : containsMention,
              groupId : msg.groupId,
            };
          });

          callback({
            data : serializedMessages,
            meta : messages.getMeta(),
          });
          */
        } catch (err) {
          console.error(err);
          callback({error : "Failed to load messages"});
        }
      });

      socket.on(
          "voteKick",
          async (
              data: {username: string},
              callback: (response: any) => void,
              ) => {
            try {
              if (!data.username) {
                return callback({error : "Missing username"});
              }

              // Find user by username
              const targetUser = await User.query()
                                     .where(
                                         "username",
                                         data.username,
                                         )
                                     .first();

              if (!targetUser) {
                return callback({error : "User not found"});
              }
              /*
              const result = await GroupController.voteKick({
                groupId : groupId!,
                userTargetId : targetUser.id.toString(),
                userCasterId : userId.toString(),
              });

              if (result.banned) {
                io.of("/user").to(`user:${targetUser.id}`).emit("kicked", {
                  groupId,
                  message : `You have been banned from group "${groupId}"`,
                });
              } else {
                callback({error : result.message});
              }

              callback(result);
              */
            } catch (err) {
              console.error(err);
              callback({error : "Failed to process vote kick"});
            }
          },
      );
    } catch (err) {
      console.error("Socket auth error:", err);
      socket.disconnect(true);
    }
  });
  io.of("/user").on("connection", async (socket: Socket) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token || token === "") {
        return socket.disconnect(true);
      }
      const secret = new Secret(token);
      const tokenRecord = await User.accessTokens.verify(secret);
      if (!tokenRecord) {
        return socket.disconnect(true);
      }

      const userId = tokenRecord.tokenableId;
      socket.data.userId = userId;

      socket.join(`user:${userId}`);

      if (process.env.NODE_ENV === "development") {
        console.info(`User ${userId} connected to private notifications`);
      }

      socket.on("ackNotification", (notificationId: string) => {
        console.log(
            `User ${userId} acknowledged notification ${notificationId}`,
        );
      });
    } catch (err) {
      console.error("Private socket auth error:", err);
      socket.disconnect(true);
    }
  });

  io.on("connection", async (socket: Socket) => {
    console.log("Client connected")

    try {
      const token = socket.handshake.auth?.token

      if (!token) {
        socket.emit('authError', {message : 'Missing token'})
        socket.disconnect()
        console.log("No Auth token provided");
        return
      }
      const secret = new Secret(token);
      const tokenInstance = await User.accessTokens.verify(secret)

      if (!tokenInstance) {
        throw new Error("Invalid token")
      }

      const user = await User.findOrFail(tokenInstance.tokenableId)
      if (!user) {
        console.log("no user found")
      }
      else {console.log("userIs Authenticade")}

      socket.data.user = user
      console.log("Authenticated:", user.id)

    } catch (err) {
      console.error(err)
      socket.emit('authError', {message : 'Invalid token'})
      socket.disconnect()
      return
    }

    socket.on("joinPost", (postId: number) => {
      const room = `post:${postId}`

      socket.join(room)

      console.log(`User ${socket.data.user.id} joined ${room}`)

      socket.to(room).emit("userJoined", {userId : socket.data.user.id});
    });

    socket.on("saveComment", async (request) => {
      try {
        // const user
        const data = await commentStoreValidator.validate(JSON.parse(request))
        const room = `post:${data.postId}`

        const comment =
            await CommentService.createComment(socket.data.user.id, {
              postId : data.postId,
              content : data.content,
              parentCommentId : data.commentId
            })

        io.to(room).emit("newComment", {success : true, comment})

      } catch (error) {
        console.error(error)

        socket.emit("commentError",
                    {success : false, message : "Failed to create comment"})
      }
    })
  })
});
