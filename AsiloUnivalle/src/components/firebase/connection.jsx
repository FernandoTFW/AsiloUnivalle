import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyA4nnLzYcNwvAtdpl3UPePRiSETjXbvkXo",
  authDomain: "asilo-216aa.firebaseapp.com",
  databaseURL: "https://asilo-216aa-default-rtdb.firebaseio.com",
  projectId: "asilo-216aa",
  storageBucket: "asilo-216aa.appspot.com",
  messagingSenderId: "734552314732",
  appId: "1:734552314732:web:198c8a8412c7353c931949",
  measurementId: "G-SJWYV82KJC"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export async function UploadFiles(image){
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, image);
    const newUrl = await getDownloadURL(storageRef);
    return newUrl;
}

export { storage, db };
