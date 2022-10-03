$(document).ready(function () {

});
var email = $("#email");
var password = $("#password");
$("#btnSignup").click(function () {
    if (email.val() == "" || password.val() == "") {
        swalToast("Error", "null", "Please enter your email address AND password", "danger");
        setTimeout(() => {
            $("#toast").html("");
        }, 3000);
    }
    else {
        // console.log(defaultAuth);
        defaultAuth.createUserWithEmailAndPassword(email.val(), password.val())
        .then((userCredential) => {
              // Signed up 
            
            var Datauser = userCredential.user;
            var uid=Datauser.uid;
            var email = Datauser.email;
            var displayName   = email.substring(0, email.lastIndexOf("@"));

            const user={
               
                displayName:displayName,
                photoURL:"https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
                email:Datauser.email,
                phoneNumber:Datauser.phoneNumber,
                accessToken:Datauser._delegate.accessToken,
            };
            console.log(user.accessToken)
            $.ajax({
                type: 'POST',
                url:`${baseURL}/user/createUser`,
                data:user,
                headers :{
                    Authorization: `Bearer ${user.accessToken}`,
                },
                success:function(response){
                    if(response)
                    {
                        const profile = {
                            first_name: "",
                            last_name: "",
                            address: "",
                            phoneNumber: "",
                            country: "",
                            state: "",
                            zip_code: "",
                        };
                       
                    
                            $.ajax({
                                type: 'POST',
                                url: `${baseURL}/profile/createProfile`,
                                headers: {
                                    Authorization: `Bearer ${user.accessToken}`,
                                },
                                data: profile,
                                success: function (data) {
                                    console.log(data);
                                },
                                fail: function (xhr, status, error) {
                                }
                          });
                    
                        swalToast("Successfully", "Đăng Ký Thành Công", email, "success");
                        setTimeout(() => {
                            $('#toast').html(" ");
            
                            location.href="../../html/auth-login-basic.html";
            
                        }, 2000);
                    }
                   
                }
                // error:function(response){
                //     // error.message = response.message;
                //     swalToast("Error", 500, error.message, "danger");
                //     setTimeout(() => {
                //         $('#toast').html(" ");
                //     }, 3000);
                // }
            });
          
           
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