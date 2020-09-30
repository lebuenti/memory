import "./loading.scss"

const loading = () => {
    if (document.getElementById('loading')) return;
    let root = document.createElement('div');
    root.id = 'loading';

    let inner = document.createElement('div');
    inner.id = 'spinner';
    inner.classList.add('fas', 'fa-spinner', 'fa-spin');
    inner.innerHTML = '&#xf110';

    root.appendChild(inner);

    document.body.insertAdjacentElement('afterbegin', root);
    document.body.classList.add('loading');
};

loading.stop = () => {
    if (document.body.classList.contains('loading')) document.body.classList.remove('loading');
    if (document.getElementById('loading')) {
        document.body.removeChild(document.getElementById('loading'));
    }
};

export default loading;