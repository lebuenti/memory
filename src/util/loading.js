import "../style/loading.scss"

const loading = () => {
    let root = document.createElement('div');
    root.id = 'loading';

    let inner = document.createElement('div');
    inner.id = 'spinner';
    inner.classList.add('fas', 'fa-spinner', 'fa-spin');
    inner.innerHTML = '&#xf110';

    root.appendChild(inner);

    document.body.insertAdjacentElement('afterbegin', root);

    if (document.getElementById('content')) {
        document.getElementById('content').classList.add('loading');
    } else {
        document.body.classList.add('loading');
    }
};

loading.stop = () => {
    if (document.body.classList.contains('loading')) {
        document.body.classList.remove('loading');
    }
    if (document.getElementById('content') && document.getElementById('content').classList.contains('loading')) {
        document.getElementById('content').classList.remove('loading');
    }
    if (document.getElementById('loading')) {
        document.body.removeChild(document.getElementById('loading'));
    }
};

export default loading;