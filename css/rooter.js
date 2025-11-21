class router {
    static clearContent = () => document.querySelectorAll('section[content]').forEach(e => e.classList.remove('show'));
    static changeContent = id => {
        if (id == router.getCurrentContent()) return;
        router.clearContent();
        window.history.pushState(null, '', '#' + router.showContent(id));
    };
    static showContent = id => {
        let e;
        try {
            e = document.querySelector('section[content]#' + id);
        }
        catch (ex) {
            console.log(ex);
        }
        if (!e) {
            try {
                e = document.querySelector('section[content]:has(#' + id + ')');
            }
            catch (ex) {
                console.log(ex);
            }
            if (!e) {
                try {
                    if (document.getElementById(id)) return id;
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            if (!e) {
                id = 'error';
                e = document.querySelector('section[content]#error');
            }
        }
        e.classList.add('show');
        return id;
    };
    static getCurrentContent = () => window.location.hash.substring(1) || 'home';
    static initContent = () => window.history.replaceState(null, '', '#' + router.showContent(router.getCurrentContent()));
    static onPopState = () => {
        const shown = document.querySelector('section[content].show');
        router.clearContent();
        router.showContent(router.getCurrentContent());
        if (!document.querySelector('section[content].show')) {
            shown.classList.add('show');
        }
    };
}
addEventListener('popstate', router.onPopState, false);
addEventListener('DOMContentLoaded', router.initContent, false);
