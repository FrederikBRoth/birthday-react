import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import download from "downloadjs"

// const site = "https://federicoshytte.dk"
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
    const [playScreenOn, setPlayScreenOn] = useState(true);
    const [audioName, setAudioName] = useState("")

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
        const audio = document.getElementById('audio');
        handlePopupClick()
        handleHover()
        await getSong()
        audio.load()
        audio.play()
        history.push("/" + name)
    }

    async function handleKeyPress(event) {
        if (event.key === 'Enter') {
            const audio = document.getElementById('audio');
            handlePopupClick()
            handleHover()
            await getSong()
            audio.load()
            audio.play()
            history.push("/" + name)
        }
    }
    async function getSong(nameOfPerson) {
        const person = nameOfPerson || name;
        const audio = document.getElementById('audio');
        const source = document.getElementById('audio-source');
        audio.pause()
        await handleLoadingScreen(false)
        source.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='
        const data = await postName(person)
        await handleAudioname(data)
        source.src = (site + "/api/song/" + data)
        console.log(source.src)
        // source.src = "http://192.168.1.71:5000/c0PHe1dLOQaCdOhShj6-htAyy9Q1UYWC.mp3"
        await handleLoadingScreen(true)
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

    
    async function downloadSong(){
        const path = site + "/api/download"
        console.log(audioName)
        let response = await fetch(path, {
            method: "post",
            headers: postHeader,
            body: JSON.stringify({
                fileName: audioName
            })
        });
        const blob = await response.blob()
        download(blob, name + " - Rat Birthday Song.mp3")
        if(response.ok){
            alert("Downloaded song!")
        } else {
            alert("Download failed!")
        }
    }
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

    async function handlePlayScreen(state) {
        setPlayScreenOn(state);
    }
    async function handleAudioname(state) {
        setAudioName(state)
    }
    function handlePlay(event) {
        const audio = document.getElementById('audio');
        setPlayScreenOn(playScreenOn ? false : true)
        console.log(audioName)
        audio.load()
        audio.play()
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
                await handlePlayScreen(false)
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
                <audio id="audio" loop>
                    <source src="" id="audio-source" />
                </audio>
                <div className="settings-window">
                    <div className="settings">
                        <input type="text" className="settings-text" name="name" onChange={handleChange} id="settings-text" onKeyPress={handleKeyPress}></input>
                        <div className="settings-confirm" >
                            <button name="login" onClick={handleButtonpress}>
                                Make a birthday song!
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
            <div className="click-birthday" disabled={playScreenOn}>
                <p onClick={handlePlay}>Click here to play!</p>
            </div>
            <button className="download-button" onClick={downloadSong}>Download tune!</button>
        </div>

    )
}



export default Settings