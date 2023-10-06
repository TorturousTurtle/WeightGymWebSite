import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/firebase/firebaseConfig'
import { collection, addDoc } from '@firebase/firestore'
import { User } from '@firebase/auth'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        const {
          id,
          title,
          date,
          image,
          content,
          user
        }: {
          id: string
          title: string
          date: Date
          image: string
          content: string
          user: User
        } = req.body
        const data = {
          id: id,
          title: title,
          date: date,
          image: image,
          content: content
        }
            try {
                const blogsCollectionRef = collection(db, 'blogs')
                await addDoc(blogsCollectionRef, data)
                res.status(200).json({ message: 'Your blog post was sent successfully.' })
              } catch (err) {
                res
                  .status(500)
                  .json({ message: `There was an error sending your blog post. ${err}` })
              }
        }
}
