import type { NextApiRequest, NextApiResponse } from 'next'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { credential } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    
    if (!payload) {
      throw new Error('Invalid token payload')
    }

    // Here you would typically:
    // 1. Check if the user exists in your database
    // 2. If not, create a new user
    // 3. Create a session or JWT for the user

    // For this example, we'll just return the user info
    res.status(200).json({
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }
    })
  } catch (error) {
    console.error('Error verifying Google token:', error)
    res.status(400).json({ message: 'Invalid token' })
  }
}
