'use client';
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SectionBox from "../layout/SectionBox";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

export const buttonsIcons ={
   email:faEnvelope, 
   mobile:faMobile,
   instagram:faInstagram,
   facebook:faFacebook, 
   discord:faDiscord, 
   tiktok:faTiktok, 
   youtube:faYoutube, 
   whatsapp:faWhatsapp, 
   github:faGithub, 
   telegram:faTelegram,  
};

export const allButtons = [
    {key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder:'test@example.com'},
    {key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder:'+91 123 123 1234'},
    {key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder:'https://instagram.com/profile/...'},
    {key: 'facebook', 'label': 'facebook', icon: faFacebook, placeholder:'https://facebook.com/profile/...'},
    {key: 'discord', 'label': 'discord', icon: faDiscord},
    {key: 'tiktok', 'label': 'tiktok', icon: faTiktok},
    {key: 'youtube', 'label': 'youtube', icon: faYoutube},
    {key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp},
    {key: 'github', 'label': 'github', icon: faGithub},
    {key: 'telegram', 'label': 'telegram', icon: faTelegram},
];

function upperFirst(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({user,page}) {

    // const pageSavedButtonsKeys = Object.keys(page.buttons);
    const pageSavedButtonsKeys = page.buttons ? Object.keys(page.buttons) : [];
    const pageSavedButtonsInfo = pageSavedButtonsKeys
        .map(k => allButtons.find(b => b.key === k));
    const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => {
            return [...prevButtons, button];
        });
    }

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Settings saved!');
    }

    function removeButton({key:keyToRemove}) {
        setActiveButtons(prevButtons => {
            return prevButtons
                .filter(button =>button.key !== keyToRemove);
        });
    }

    const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    return (
        <SectionBox>
            <form action={saveButtons}>
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                <ReactSortable 
                    handle=".handle"
                    list={activeButtons}
                    setList={setActiveButtons}>
                    {activeButtons.map(b => (
                        <div key={b.key} className="mb-4 md:flex items-center">
                            <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center ">
                                <FontAwesomeIcon icon={faGripLines} 
                                className="cursor-pointer text-gray-400 handle p-2" />
                                <FontAwesomeIcon icon={b.icon} />
                                <span>{upperFirst(b.label)}:</span>
                            </div>
                            <div className="grow flex">
                                <input
                                    placeholder={b.placeholder} 
                                    name={b.key}
                                    // defaultValue={page.buttons[b.key]}
                                    defaultValue={page.buttons ? page.buttons[b.key] : ""}
                                    type="text" style={{marginBottom:'0'}}
                                />
                                <button
                                    onClick={() => removeButton(b)}
                                    type="button" 
                                    className="py-2 px-4 bg-gray-300 cursor-pointer">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
                <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
                    {availableButtons.map(b => (
                        <button
                        key={b.key}
                            type="button"
                            onClick={() => addButtonToProfile(b)} 
                            className="flex items-center gap-2 p-2 bg-gray-200"> 
                            <FontAwesomeIcon icon={b.icon} />
                            <span className="">
                                {upperFirst(b.label)}
                            </span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}
                </div>
                <div className="max-w-xs mx-auto mt-8"> 
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}