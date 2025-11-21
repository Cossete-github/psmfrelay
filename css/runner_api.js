document.querySelector('#form-runner button[type=submit]').onclick = function () {
    if (!document.querySelector('#form-runner form input:invalid')) {
        (() => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://script.google.com/macros/s/AKfycby2aW87Ba_kR9BPjbOLk1065KsJC0FOoqGInya-Z3AjPv3ck8V6meb0nW94tEL6sZthDg/exec');
            xhr.setRequestHeader('Content-Type', 'text/plain');
            xhr.timeout = 10000;

            xhr.ontimeout = () => window.alert('タイムアウトしました。');
            xhr.onerror = () => window.alert('エラーが発生しました。');
            xhr.onload = function () {
                document.querySelector("#form-runner form button[type='submit']").disabled = false;
                if (xhr.status != 200) {
                    window.alert('HTTPレスポンスエラー: ' + xhr.status);
                    return;
                }
                const res = JSON.parse(xhr.responseText);
                if (res.message) {
                    window.alert(res.message);
                    return;
                }
                window.alert(res.succeeded ? '解答を受け付けました。' : 'なんらかのエラーにより解答を受け付けられませんでした。')
            };

            const obj = {};
            document.querySelectorAll("#form-runner form input:not(input[type='radio'])").forEach(e => obj[e.name] = e.value);
            document.querySelectorAll("#form-runner input[type='radio']:checked").forEach(e => obj[e.name] = e.value);
            xhr.send(JSON.stringify(obj));
            document.querySelector("#form-runner form button[type='submit']").disabled = true;
        })();
        return false;
    }
};