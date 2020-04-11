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

toast.success = (message) => {
    dispatchToast(EMOJI_STAR_EYES + message, options.success);
};

toast.info = (message) => {
    dispatchToast(EMOJI_EXCLAMATION_MARK + message, options.info);
};

function dispatchToast(message, option) {
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('toast');

    const innerDiv = document.createElement('div');
    innerDiv.appendChild(document.createTextNode(message));

    const borderForInnerDiv = document.createElement('div');

    switch (option) {
        case options.fail:
            innerDiv.classList.add('fail');
            borderForInnerDiv.classList.add('fail');
            break;
        case options.success:
            innerDiv.classList.add('success');
            borderForInnerDiv.classList.add('success');
            break;
        case options.info:
            innerDiv.classList.add('info');
            borderForInnerDiv.classList.add('info');
            break;
        case options.default:
            break;
    }

    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(borderForInnerDiv);
    root.appendChild(outerDiv);

    window.setTimeout(() => {
        root.removeChild(outerDiv);
    }, 3500);
}

export default toast;