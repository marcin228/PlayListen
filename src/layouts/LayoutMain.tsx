import React from "react"
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./LayoutMain.module.css"

type LayoutNameProps = unknown;

const LayoutMain:React.FC<LayoutNameProps> = () => {

    return (
        <>
            <div className={styles.container}>
                <nav className={styles.navigation}>
                    <ul>
                        <li><Link to="/player">player</Link></li>
                        <li><Link to="/playlists">playlists</Link></li>
                        <li><Link to="/settings">settings</Link></li>
                    </ul>
                </nav>
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default LayoutMain;
