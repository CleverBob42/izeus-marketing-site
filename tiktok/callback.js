// TikTok Login Kit returns here with ?code=&state= (or ?error=). The posting tool listens on this computer
// (python3 video/post_tiktok.py auth <app>), so pass the result on to it. Nothing is stored or sent anywhere else.
(function () {
  var q = new URLSearchParams(location.search);
  var h = document.getElementById('h'), msg = document.getElementById('msg'), go = document.getElementById('go');
  if (q.get('error')) {
    h.textContent = 'TikTok did not connect';
    msg.textContent = 'TikTok said: ' + (q.get('error_description') || q.get('error')) + '. Close this tab and try again.';
    go.style.display = 'none';
    return;
  }
  if (!q.get('code')) {
    h.textContent = 'Nothing to connect';
    msg.textContent = 'This page is where TikTok returns after you approve iZeus Marketing. Start from the posting tool.';
    go.style.display = 'none';
    return;
  }
  var port = /^\d{4,5}$/.test(q.get('port') || '') ? q.get('port') : '8771';
  var target = 'http://127.0.0.1:' + port + '/tiktok?' + q.toString();
  go.href = target;
  setTimeout(function () { location.href = target; }, 1200);
})();
