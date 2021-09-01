import { useState, useEffect } from 'react';
 import { storage } from '../firebase/firebase';

const useStorage = (image) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references
        const storageRef = storage.ref(`images/${image.name}`);

        storageRef.put(image).on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        })
    }, [image])

    return { progress, error, url }

 };

 export default useStorage;