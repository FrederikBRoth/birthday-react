import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const apiPath = "http://192.168.1.71:5000/api";

const postHeader = {
    "Content-Type": "application/json"
};

function Settings() {
    let { test } = useParams()
    const history = useHistory()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [settingsHover, setSettingsHover] = useState(false)
    const [name, setName] = useState("Michael")
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

    async function handleKeyPress(event) {
        if (event.key === 'Enter') {
            const data = await postName(name)
            var audio = document.getElementById('audio');
            var source = document.getElementById('audio-source');
            source.src = "http://192.168.1.71:5000/api/song/" + data
            console.log(source.src)
            // source.src = "http://192.168.1.71:5000/c0PHe1dLOQaCdOhShj6-htAyy9Q1UYWC.mp3"
            audio.load()
            audio.play()
            history.push("/" + name)
        }
    }

    async function polling(data) {
        const response = await fetch("http://192.168.1.71:5000/" + data, {
            cache: "no-store"
        })

        if (response.ok) {
            return response
        } else {
            await polling(data)
        }


    }
    async function postName(name) {
        let response = await fetch(apiPath, {
            method: "post",
            headers: postHeader,
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

    useEffect(() => {
        const text = document.getElementById("settings-text")
        if (test !== undefined) {
            setName(test)
            text.value = test;
            console.log(test)
        } else {
            text.value = name
        }

    }, [])
    return (
        <div className="settings-parent" id="settings-parent" onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <audio id="audio" >
                <source src="" id="audio-source" />
            </audio>
            <div className="settings-window">
                <div className="settings">
                    <input type="text" className="settings-text" name="name" onChange={handleChange} id="settings-text" onKeyPress={handleKeyPress}></input>
                    <div className="settings-confirm" >
                        <button name="login">
                            Post Answer!
						</button>
                    </div>
                </div>
            </div>
            <div className="settings-button" id="settings-button" onClick={handlePopupClick}>
            </div>

        </div>
    )
}



export default Settings