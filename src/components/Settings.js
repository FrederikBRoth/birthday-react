import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function Settings() {
    let { test } = useParams()
    const history = useHistory()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [settingsHover, setSettingsHover] = useState(false)
    const [name, setName] = useState("Michael")

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

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            history.push("/" + name)
        }
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