
$(document).ready(function () {

    setTimeout(() => {

        fetchProfile();

    }, 1000);
});
var isADD = false;
var firstName = $("#firstName");
var lastName = $("#lastName");
var phoneNumber = $("#phoneNumber");
var address = $("#address");
var state = $("#state");
var zipCode = $("#zipCode");
var country = $("#country");
var uploadedAvatar = $("#uploadedAvatar");

async function fetchProfile() {
    var _id = $("#_id").val();
    $.ajax({
        type: 'GET',
        url: `${baseURL}/profile/getProfile?_id=${_id}`,
        success: function (responses) {
            const profile = responses.profile;
            console.log(responses.profile);
            if (responses.profile == null) {
                isADD = true;
            }
            else {
                address.val(profile.address);
                firstName.val(profile.first_name);
                lastName.val(profile.last_name);
                state.val(profile.state);
                country.val(profile.country);
                zipCode.val(profile.zip_code);


            }
        },
        fail: function (xhr, status, error) {
            console.log('Error fetching data');
            console.log(xhr, "|", status, "|", error);
        }
    });
}

$("#btnProfile").click(function () {
    var _id = $("#_id").val();

    const profile = {
        first_name: firstName.val(),
        last_name: lastName.val(),
        address: address.val(),
        phoneNumber: phoneNumber.val(),
        country: country.val(),
        state: state.val(),
        zip_code: zipCode.val(),
    };
    if (isADD) {

        $.ajax({
            type: 'POST',
            url: `${baseURL}/profile/createProfile`,
            data: profile,
            success: function (data) {
                console.log(data);
            },
            fail: function (xhr, status, error) {
                console.log(xhr, status, error.message);
            }
        });
    }
    else {
        $.ajax({
            type: 'PUT',
            url: `${baseURL}/profile/updateProfile?uid=${_id}`,
            data: profile,
            success: function (data) {
                console.log(data);
            },
            fail: function (xhr, status, error) {
                console.log(xhr, status, error.message);
            }
        });
    }
});
$("#btnDeleteAccount").click(function () {
     var uid=$("#uid").val();
  
    PromiseDeleteUser(uid).then((res) => {
        console.log(res);
        swalToast("Successfully",200 , "Xóa người dùng thành công !", "success");
        setTimeout(() => {
            $('#toast').html(" ");
            location.href = "../../home/viewuser.html";

        }, 2000);
    }).catch((err) => {
        var errorCode = err.status;
        var errorMessage = err.responseJSON.message;

        swalToast("Error", errorCode, errorMessage, "danger");
        setTimeout(() => {
            $('#toast').html(" ");
        }, 3000);
    });



});