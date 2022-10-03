$(document).ready(function () {

});
var email = $("#email");
var password = $("#password");

$('#btnSignIn').click(function () {
    if (email.val() == "" || password.val() == "") {
        swalToast("Error", "null", "Please enter your email address AND password", "danger");
        setTimeout(() => {
            $("#toast").html("");
        }, 3000);

    }
    else
    {
        defaultAuth.signInWithEmailAndPassword(email.val(), password.val())
        .then((userCredential) => {
            
            // Signed in
            var Datauser = userCredential.user;
            const user={
                uid:Datauser.uid,
                displayName:Datauser.displayName,
                photoURL:Datauser.photoURL,
                email:Datauser.email,
                phoneNumber:Datauser.phoneNumber,
                accessToken:Datauser._delegate.accessToken,
            };
            console.log(Datauser);
            localStorage.setItem("access_token",user.accessToken);
            localStorage.setItem("uid",user.uid);
            swalToast("Successfully", "Đăng Nhập Thành Công", user.email, "success");
            setTimeout(() => {
                $('#toast').html(" ");
                
                location.href="../../home/home.html";
               
            }, 2000);
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            swalToast("Error", errorCode, errorMessage, "danger");
            setTimeout(() => {
                $('#toast').html(" ");
            }, 3000);
        });
    }
   
});
