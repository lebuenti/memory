import "../style/toast.scss";

const EMOJI_SHIT = String.fromCodePoint(0x1F4A9);
const EMOJI_STAR_EYES = String.fromCodePoint(0x1F929);
const EMOJI_EXCLAMATION_MARK = String.fromCodePoint(0x2757);

const options = {
    fail: 1,
    success: 2,
    info: 3,
    default: 4
};

let root = document.createElement('div');
root.id = 'toastContainer';
document.body.insertAdjacentElement('afterbegin', root);

const toast = (message) => {
    dispatchToast(EMOJI_EXCLAMATION_MARK + message, options.default);
};

toast.fail = (message) => {
    dispatchToast(EMOJI_SHIT + message, options.fail);
};

toast.success = (message, messageLink, functionForNotClicking) => {
    dispatchToast(EMOJI_STAR_EYES + message, options.success, messageLink, functionForNotClicking);
};

toast.info = (message) => {
    dispatchToast(EMOJI_EXCLAMATION_MARK + message, options.info);
};

function dispatchToast(message, option, messageLink, functionForNotClicking) {
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('toast');

    const innerDiv = document.createElement('div');
    innerDiv.appendChild(document.createTextNode(message));

    const borderForInnerDiv = document.createElement('div');

    addOptionsCssClass(innerDiv, option);
    addOptionsCssClass(borderForInnerDiv, option);

    outerDiv.appendChild(innerDiv);

    if (messageLink) {
        let divLink = document.createElement('div');
        divLink.classList.add('link');
        addOptionsCssClass(divLink, option);
        divLink.appendChild(document.createTextNode(messageLink));
        divLink.onclick = () => {
            divLink.style.color = 'lightblue';
            functionForNotClicking = undefined;
        };
        outerDiv.appendChild(divLink);
    }

    outerDiv.appendChild(borderForInnerDiv);
    root.appendChild(outerDiv);

    window.setTimeout(() => {
        root.removeChild(outerDiv);
        if (functionForNotClicking) functionForNotClicking();
    }, 4000);
}

function addOptionsCssClass(object, option) {
    switch (option) {
        case options.fail:
            object.classList.add('fail');
            break;
        case options.success:
            object.classList.add('success');
            break;
        case options.info:
            object.classList.add('info');
            break;
        case options.default:
            break;
    }
}

export default toast;