import type {HttpContext} from '@adonisjs/core/http'

export default class NotificationController {

  async saveToken({auth, request}: HttpContext) {
    console.log("fcm apiCalled");
    const user = auth.user!

                 const token = request.input('token')

    user.fcmToken = token;
    console.log(token);
    await user.save()

    return { success: true }
  }
}
