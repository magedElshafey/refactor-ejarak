import React, { useDeferredValue, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ContactsList from "./ContactsList";
import { CiSearch } from "react-icons/ci";
import { IoMdPeople, IoMdClose } from "react-icons/io";
const ProfileHeader = () => {
  const loggedUser = useSelector((state) => state?.authSlice?.userData);

  return (
    <div className="flex items-center h-14 gap-2  px-2">
      <div className="w-14 h-14 rounded-full overflow-hidden p-1">
        <img
          src={loggedUser?.pp || ""}
          alt="user"
          className="h-[110%] w-[110%] object-center object-cover"
        />
      </div>
      <div className="w-[70%] overflow-hidden text-xs h-full py-2 flex flex-col gap-2 whitespace-nowrap [&>*]:text-ellipsis [&>*]:overflow-hidden [&>*]:w-full">
        <p>{loggedUser?.name || ""}</p>
        <p className="text-[#7f8b9c] text-[0.65rem] lowercase">
          {loggedUser?.email || ""}
        </p>
      </div>
    </div>
  );
};
const ContactsSearch = ({ value, onChange }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="relative">
      <input
        className="rounded-md w-full px-2 py-1 outline-none border text-sm"
        placeholder={t("searchForPerson")}
        value={value}
        onChange={onChange}
      />
      {!value && (
        <CiSearch
          className={`absolute
                          ${
                            i18n.language === "ar"
                              ? "left-4 top-2"
                              : "right-4 top-2"
                          }
                      `}
        />
      )}
    </div>
  );
};

const ContactListContainer = () => {
  // local states
  const [search, setSearch] = useState("");
  // deffering the value of the state to avoid any heavy operations when there are lots of contacts
  const defferedSearch = useDeferredValue(search);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <div className="absolute top-0 left-0 pointer-events-none h-full w-full md:static md:w-[30%] lg:w-[27%] overflow-hidden z-10">
      <div
        className={`absolute top-1 pointer-events-auto z-20 ${
          language === "ar" ? "left-2" : "right-2"
        } h-8 w-8 bg-white rounded-full border cursor-pointer shadow flex justify-center items-center p-0 md:hidden`}
        onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
      >
        {mobileMenuOpened ? <IoMdClose size={20} /> : <IoMdPeople size={20} />}
      </div>
      <div
        className={`h-full flex transition-all pointer-events-auto ${
          mobileMenuOpened ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-[#f5f7f5] rounded-lg py-3 flex-col gap-2 [&>*]:px-2`}
      >
        <ProfileHeader />
        <p>{t("contactList")}</p>
        <ContactsSearch
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="h-full overflow-y-auto ">
          <div>
            <ContactsList
              onChoose={() => setMobileMenuOpened(false)}
              search={defferedSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListContainer;
