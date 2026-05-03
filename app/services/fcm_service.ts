import admin from 'firebase-admin'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

let messaging: admin.messaging.Messaging | null = null

function getMessaging(): admin.messaging.Messaging | null {
  if (messaging) return messaging

  const path = join(process.cwd(), 'firebase-service-account.json')
  if (!existsSync(path)) {
    console.warn('[FCM] firebase-service-account.json not found — push notifications disabled')
    return null
  }

  try {
    const serviceAccount = JSON.parse(readFileSync(path, 'utf-8'))
    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    }
    messaging = admin.messaging()
    return messaging
  } catch (error) {
    console.error('[FCM] Firebase init error:', error)
    return null
  }
}

export async function sendPushNotification(token: string, title: string, body: string): Promise<void> {
  const msg = getMessaging()
  if (!msg) return

  try {
    await msg.send({ token, notification: { title, body } })
  } catch (error) {
    console.error('[FCM] Send error:', error)
  }
}
