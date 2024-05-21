import React from "react"
import { ReactSVG } from "react-svg";

type PlaylistToolboxButtonProps = {

    src:string,
    children:React.ReactNode,
} & React.HTMLAttributes<HTMLDivElement>

const PlaylistToolboxButton:React.FC<PlaylistToolboxButtonProps> = ({ src, className, children, ...props }) => {

    return (
        <div {...props}>
            <ReactSVG src={ src } className={className} />{ children }
        </div>
    );
};

export default PlaylistToolboxButton;