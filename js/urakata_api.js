document.querySelector('#form-urakata button[type=submit]').onclick = function () {
    if (!document.querySelector('#form-urakata form input:invalid')) {
        (() => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzXv5QDYMAA2Jx9DZOiEjt4JMEYrvh1_vukF0WN9g_CDXtp1KljxmERkvI6jd8-I5_pdw/exec');
            xhr.setRequestHeader('Content-Type', 'text/plain');
            xhr.timeout = 10000;

            xhr.ontimeout = () => window.alert('タイムアウトしました。');
            xhr.onerror = () => window.alert('エラーが発生しました。');
            xhr.onload = function () {
                document.querySelector("#form-urakata form button[type='submit']").disabled = false;
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
            document.querySelectorAll("#form-urakata form input[type='text']").forEach(e => obj[e.name] = e.value);
            document.querySelectorAll("#form-urakata form textarea").forEach(e => obj[e.name] = e.value);
            document.querySelectorAll("#form-urakata input[type='radio']:checked").forEach(e => obj[e.name] = e.value);
            document.querySelectorAll("#form-urakata input[type='checkbox']:checked").forEach(e => obj[e.name] = e.value);
            xhr.send(JSON.stringify(obj));
            document.querySelector("#form-urakata form button[type='submit']").disabled = true;
        })();
        return false;
    }
};