$(document).ready(function () {
    
    console.log(defaultApp);

    defaultAuth.onAuthStateChanged((user) => {
        if (user) {
            $(".user-online").addClass("avatar avatar-online");
            defaultAuth.currentUser.getIdTokenResult().then((idTokenResult) => {
                const isAdmin = idTokenResult.claims.admin;
                if (!isAdmin) {
                    swalToast("FORBIDEN", "403", "Bạn không có quyền Admin", "info");
                    setTimeout(() => {
                        $("#toast").html("");
                        // location.href = "../../html/auth-login-basic.html";
                    }, 3000);
                }


            }).catch((error) => {
                console.log(error);
            })
        }
        else
        {
            $(".user-online").removeClass("avatar avatar-online");
            swalToast("ERROR", "401", "Bạn chua dang nhap", "warning");
            setTimeout(() => {
                $("#toast").html("");
                location.href = "../../html/auth-login-basic.html";
            }, 3000);
        }


    });

  
});

$("#log-out").click(function () {

    defaultAuth.signOut().then(() => {
        swalToast("Successfully", "OK", "Đăng Xuất Thành Công", "success");
        setTimeout(() => {
            $("#toast").html("");
            location.href = "../../html/auth-login-basic.html";
        }, 4000);

    }).catch((error) => {
        swalToast("Successfully", "OK", "Đăng Xuất Thành Công", "success");
        setTimeout(() => {
            $("#toast").html("");
        }, 3000)
    });
});