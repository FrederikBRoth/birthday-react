import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

//const site = "https://federicoshytte.dk"
const site = ""

const postHeader = {
    "Content-Type": "application/json"
};

function Settings() {
    let { test } = useParams()
    const history = useHistory()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [settingsHover, setSettingsHover] = useState(false)
    const [name, setName] = useState("Michael")
    const [loadingScreenOn, setLoadingScreenOn] = useState(true);
    const [audioName, setAudioName] = useState("aOhOTevlJU_NscKxZCVzKZEjkKRcDGAK.mp3")

    function handlePopupClick() {
        setSettingsOpen(settingsOpen ? false : true);
        const settingsBar = document.getElementById("settings-parent");
        settingsBar.classList.toggle("open-nav");
    }

    function handleChange(event) {
        const { value, name } = event.target;
        if (name === "name") {
            setName(value);
            console.log(value)
        }
    }
    async function handleButtonpress(event) {
        handlePopupClick()
        handleHover()
        await getSong()
    }

    async function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handlePopupClick()
            handleHover()
            await getSong()
        }
    }
    async function getSong(nameOfPerson) {
        const person = nameOfPerson || name;
        var audio = document.getElementById('audio');
        var source = document.getElementById('audio-source');
        audio.pause()
        await handleLoadingScreen(false)
        source.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='
        const data = await postName(person)
        source.src = (site + "/api/song/" + data)
        console.log(source.src)
        // source.src = "http://192.168.1.71:5000/c0PHe1dLOQaCdOhShj6-htAyy9Q1UYWC.mp3"
        await handleLoadingScreen(true)
        audio.load()
        audio.play()
    }
    //For development
    // async function postName(name) {
    //     const path = site + "/api/post"
    //     let response = await fetch(path, {
    //         method: "post",
    //         headers: postHeader,
    //         body: JSON.stringify({
    //             name
    //         })
    //     });
    //     let data = await response.text()
    //     return data
    // }
    // For deployment
    async function postName(name) {
        const path = site + "/api/post"
        let response = await fetch(path, {
            method: "post",
            headers: postHeader,
            credentials: "include",
            body: JSON.stringify({
                name
            })
        });
        let data = await response.text()
        return data
    }

    function handleHover() {
        if (settingsOpen !== true) {
            setSettingsHover(settingsHover ? false : true)
            const settingsbutton = document.getElementById("settings-button")
            settingsbutton.classList.toggle("open-button")
        }

    }

    async function handleLoadingScreen(state) {
        setLoadingScreenOn(state);

    }

    useEffect(() => {
        const text = document.getElementById("settings-text")
        async function setupSong() {
            if (test !== undefined) {
                setName(test)
                text.value = test;
                await handleLoadingScreen(false)
                console.log(test)
                await getSong(test)
                await handleLoadingScreen(true)
            } else {
                text.value = name
                handlePopupClick()
                handleHover()
            }
        }
        setupSong();
        console.log(name)
    }, [])
    return (
        <div>
            <div className="settings-parent" id="settings-parent" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                <audio id="audio" >
                    <source src="" id="audio-source" />
                </audio>
                <div className="settings-window">
                    <div className="settings">
                        <input type="text" className="settings-text" name="name" onChange={handleChange} id="settings-text" onKeyPress={handleKeyPress}></input>
                        <div className="settings-confirm" >
                            <button name="login" onClick={handleButtonpress}>
                                Post Answer!
						</button>
                        </div>
                    </div>
                </div>
                <div className="settings-button" id="settings-button" onClick={handlePopupClick}>
                </div>
            </div>
            <div className="loading-screen" disabled={loadingScreenOn}>
                <div className="loading-message">
                    <p>Loading</p>
                    <div className="loading-circle">

                        <svg className="circular-loader" viewBox="25 25 50 50" >
                            <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Settings