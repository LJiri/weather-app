import React, { useState } from "react";
import classNames from "classnames";
import "./styles.scss";

const DISABLE_SCROLLING = "disable-scrolling";

export const About = () => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
        document.body.classList.add(DISABLE_SCROLLING);
    };

    const onClose = () => {
        setOpen(false);
        document.body.classList.remove(DISABLE_SCROLLING);
    };

    return (
        <>
            <div className={classNames("wa-about__open-btn-wrapper", open && "wa-about__open-btn-wrapper--hidden")}>
                <button className="wa-about__open-btn" onClick={onOpen}>
                    About
                </button>
            </div>

            <div className={classNames("wa-about", open && "wa-about--open")}>
                <div className="wa-about__content">
                    <button className="wa-about__close-btn" onClick={onClose}>
                        close
                    </button>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quis maiores nulla autem qui necessitatibus consectetur non,
                    quibusdam, neque expedita et officia optio voluptatem velit unde quae quas aspernatur praesentium.
                </div>
            </div>
        </>
    );
};
