var $ = function (id) {
    return document.getElementById(id);
},
show_message = function (message, hide) {
    $('message').innerHTML = message;
    if (hide) {
        setTimeout(function () {
            $('message').innerHTML = '&nbsp;';
        }, 5000);
    }

},
validate = function () {
    var token = localStorage.token || '',
        userkey = localStorage.userkey || '';

    if (!userkey || !token) {
        show_message('Please fill both fields!');
        return;
    }

    var req = new XMLHttpRequest();
    req.open('POST', 'https://api.pushover.net/1/users/validate.json', true);
    var params = 'token=' + encodeURIComponent(token) +
        '&user=' + encodeURIComponent(userkey);

    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(params);

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                localStorage.valid = token + userkey;
                show_message('OK, seems legit!', 1);
            } else {
                localStorage.valid = '';
                show_message('Something is fishy: ' + req.responseText);
            }
        }
    };
},
save = function () {
    localStorage.userkey = $('userkey').value;
    localStorage.token = $('token').value;
    show_message('Saved!');
    validate();
},
load = function () {
    $('userkey').value = localStorage.userkey || '';
    $('token').value = localStorage.token || '';
};


$('save').addEventListener('click', save);
window.addEventListener("load", load);