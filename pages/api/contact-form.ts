import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.error('SENDGRID_API_KEY is not defined in the environment.')
}

type Data = {
  message: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const {
      name,
      email,
      message
    }: { name: string; email: string; message: string } = req.body
    const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`
    const data = {
      to: 'weightgyminc@gmail.com',
      from: 'weightgyminc@gmail.com',
      subject: `${name.toUpperCase()} sent you a message from Contact Form`,
      text: `Email => ${email}`,
      html: msg.replace(/\r\n/g, '<br>')
    }
    try {
      await sgMail.send(data)
      res.status(200).json({ message: 'Your message was sent successfully.' })
    } catch (err) {
      res
        .status(500)
        .json({ message: `There was an error sending your message. ${err}` })
    }
  }
}
