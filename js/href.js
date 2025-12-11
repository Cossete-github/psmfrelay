(() => {
    const baseMessage = '下記のURLにジャンプします。\n';
    const openUrlIfConfirmed = url => {
        if (confirm(baseMessage + url)){
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferer';
            a.click();
        }
    };
    document.querySelectorAll('[confirmedhref] a').forEach(e => e.onclick = () => confirm(baseMessage + e.href));
    document.querySelectorAll('[confirmedhref] [href]:not(a)').forEach(e => {
        const url = e.getAttribute('href');
        e.title = url;
        e.onclick = () => openUrlIfConfirmed(url);
    });
})();