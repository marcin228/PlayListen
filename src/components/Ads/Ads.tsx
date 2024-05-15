import React from "react"
import styles from "./Ads.module.css"

type AdsProps = {
    children?:React.ReactNode,
}

const Ads:React.FC<AdsProps> = ({ children }) => {


    return (
    <>
        { children }
    </>
    );
};

export default Ads;