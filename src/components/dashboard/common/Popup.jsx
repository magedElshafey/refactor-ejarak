import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useClickOutside from "../../../hooks/useClickOutside";

const Popup = ({ title, closePopup, isOpen, className, children, style }) => {
    const { t } = useTranslation();
    const popupRef = useRef();

    useClickOutside(popupRef, closePopup);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="h-screen w-screen z-50 overflow-hidden fixed top-0 left-0 flex justify-center items-center bg-lightGray dark:bg-darkLayout bg-opacity-70">
            <div
                className={`max-h-screen overflow-y-auto bg-white dark:bg-bgDark min-w-96 h-fit w-fit rounded-[30px] shadow-lg p-3 flex flex-col gap-2 ${className}`}
                ref={popupRef}
            >
                {title && (
                    <div className="flex flex-col gap-2 py-1 px-2">
                        <div className="flex justify-between items-center h-full w-full">
                            <p className={style ? style : "text-[15px] dark:text-white"}>
                                {t(title)}
                            </p>
                            {/* <IoMdClose className="text-midGray cursor-pointer hover:text-darkGray" size={20} onClick={closePopup} /> */}
                        </div>
                        {/* <div className="h-[2px] w-full bg-midGray" /> */}
                    </div>
                )}
                <div className="flex-1 dark:text-white">{children}</div>
            </div>
        </div>
    );
};

export default Popup;
