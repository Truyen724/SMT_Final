$(document).ready(function () {
    // loadData();
    saveChange()

});
var fullName = $("#firstName");
var sex = $("#sex");
var dateBirth = $("#date");
var phoneNumber = $("#phoneNumber");
var address = $("#address");
var email = $("#email");

function saveChange() {
    $("#btnProfile").click(function () {
        // console.log(getColor)
        const profile = {
            first_name: fullName.val(),
            sex: sex.val(),
            address: address.val(),
            phoneNumber: phoneNumber.val(),
            email: email.val(),
            dateOfBirth: dateBirth.val(),
            color: getColor,
        };


        $.ajax({
            type: 'PUT',
            url: `${baseURL}/profile/updateProfile`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            data: profile,

            success: function (data) {
                console.log(data)
            },
            fail: function (xhr, status, error) {
                console.log(xhr, status, error.message);
            }
        });

        var fd = new FormData();
        var files = $('#upload')[0].files;

        // Check file selected or not
        var fd = new FormData();
        var files = $('#upload')[0].files;
        
        // Check file selected or not
        if (files.length > 0) {
            fd.append('avatar', files[0]);
            // const avatar = {
            //     avatar: fd
            // };
            $.ajax({
                url: `${baseURL}/user/uploadAvatar`,
                type: 'POST',
                
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                data: fd,

                success: function (data) {
                    console.log(data)
                },
                fail: function (xhr, status, error) {
                    console.log(xhr, status, error.message);
                }
            });
        }


    })
}
