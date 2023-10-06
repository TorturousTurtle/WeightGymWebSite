import type { NextApiRequest, NextApiResponse } from 'next'
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage, StorageReference } from "firebase/storage";

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        const {
          imageFile,
          imageRef,
          storage,
          id
        }: {
          imageFile: File
          imageRef: StorageReference
          storage: FirebaseStorage
          id: string
        } = req.body
        console.log(imageRef)

      try {
        const snapshot = await uploadBytes(imageRef, imageFile);
        const image = await getDownloadURL(snapshot.ref);
        res.status(200).json({ message: 'Your image was stored successfully.', image: image });
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
        }
}
