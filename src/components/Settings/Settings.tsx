import React from "react"

type SettingsProps = {
    children?:React.ReactNode,
}

const Settings:React.FC<SettingsProps> = ({ children }) => {

    
    
    return (
    <>
        <h1>SETTINGS</h1>
        { children }
    </>
    );
};

export default Settings;