'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { storageRef } from '@/lib/firebase';
import { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';
import uniqid from 'uniqid';

export const updateProfileImage = async (files: any) => {
  const session = await auth();
  const user = session?.user;

  const file = files.get('file');

  // console.log(files.get('file'));
  if (!user) {
    return { error: 'Unauthorized' };
  }

  if (user.isAdmin === false) {
    return { error: 'Unauthorized' };
  }

  const currentUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!currentUser) {
    return { error: 'Unauthorized' };
  }

  if (currentUser.image !== '') {
    // DELETE OLD AVATAR
    const ref = storageRef(currentUser.image);
    await deleteObject(ref);
  }

  const ext = file.name.split('.').slice(-1)[0];
  const newFileName = uniqid() + '.' + ext;
  const path = 'avatars/' + newFileName;

  const fileRef = storageRef(path);
  const uploadTaskSnapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

  await db.user.update({
    where: { id: user.id },
    data: { image: downloadURL },
  });

  return { success: 'Profile photo updated successfully' };
};
