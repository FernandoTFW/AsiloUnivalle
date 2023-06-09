import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
    apiKey: "AIzaSyCcXMipr7U-Ukt_EVxTw-WE_-UBgEfkFrg",
    authDomain: "asiloprueba-c9f28.firebaseapp.com",
    projectId: "asiloprueba-c9f28",
    storageBucket: "asiloprueba-c9f28.appspot.com",
    messagingSenderId: "1006064524190",
    appId: "1:1006064524190:web:aa89489541a2af3063148f"
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
