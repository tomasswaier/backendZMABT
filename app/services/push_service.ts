import User from '#models/user'
import admin from '#start/firebase'

export default class PushService {
  public static async sendPlaceNotification(excludeUserId: number,
                                            placeId: number) {
    console.log("notifying all other users")

    const users = await User.query()
                      .whereNot('id', excludeUserId)
                      .whereNotNull('fcm_token')
                      .where('fcm_token', '!=', '')

    if (users.length === 0) {
      console.log('No other users with FCM tokens')
      return
    }

    const messages =
        users
            .filter((user): user is typeof user&{fcmToken : string} =>
                        typeof user.fcmToken === 'string' &&
                        user.fcmToken !== '')
            .map(user => ({
                   token : user.fcmToken,
                   data : {
                     title : "New Place",
                     body : "Tap to view place",
                     placeId : placeId.toString()
                   },
                   android : {priority : "high" as const}
                 }))
    // sendEach sends to all tokens and returns individual results
    const response = await admin.messaging().sendEach(messages)

    console.log(`Sent: ${response.successCount} success, ${
        response.failureCount} failed`)

    // Log any failures for debugging
    response.responses.forEach((r, i) => {
      if (!r.success) {
        console.log(`Failed for user ${users[i].id}: ${r.error?.message}`)
      }
    })
  }
}
