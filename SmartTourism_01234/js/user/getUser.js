
$(document).ready(function () {
    
    fetchData();
    
    setTimeout(() => {
      
        if(uidGlobal==""||uidGlobal!=$("#uid").val())
        {
            // location.href ="../../../html/pages/pages-misc-error.html";
        }
    }, 1000);
  
    

});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var uidGlobal = getParameterByName("uid");

async function fetchData() {
    $.ajax({
        type: 'GET',
        url: `${baseURL}/user/getUser?uid=${uidGlobal}`,
        success: function (responses)
        {
            console.log(responses.user);
            $("#_id").val(responses.user._id);
            $("#uid").val(responses.user.uid);
            $("#uploadedAvatar").attr('src', responses.user.photoURL);
            $("#email").val(responses.user.email);
        },
        fail: function (xhr, status, error) {
            console.log('Error fetching data');
            console.log(xhr,"|",status,"|",error);
        }
    });
}
