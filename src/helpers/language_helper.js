import en from "../lang/en";
import ta from "../lang/en";
import { getItemFromLocalStorage, setItemOnLocalStorage } from "../helpers/utils";

const language = getItemFromLocalStorage("LANGUAGE");
if (!language) {
    setItemOnLocalStorage("LANGUAGE", "en");
}

export const GetContent = (key) => {
    let message = key;
    switch (language) {
        case "ta":
            message = ta[key];
            break;
        case "en":
            message = en[key];
            break;
        default:
            message = en[key];
            break;
    }
    return message;
}

export const Message = (id) => {
    return GetContent(id);
}
