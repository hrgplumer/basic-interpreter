import {useState, useEffect} from 'react';

const useBeep = (src) => {
    console.log(src);
    const [beep] = useState(new Audio(src));
    const [play, setPlay] = useState(false);

    const playNow = () => setPlay(true);

    useEffect(() => {
        beep.play();
    }, [play]);

    return [playNow];
}

export default useBeep;