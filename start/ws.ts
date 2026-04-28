// import PostController from "#controllers/posts_controller";
import User from "#models/user";
import CommentService from '#services/comment_service'
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

  io.on("connection", async (socket: Socket) => {
    console.log("CONNECTED")
    console.log("handshake.auth =", socket.handshake.auth)
    console.log("handshake.query =", socket.handshake.query)

    try {
      //const token = socket.handshake.auth?.token
          const token =
          socket.handshake.auth?.token ||
          socket.handshake.headers?.authorization?.replace("Bearer ", "")

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
