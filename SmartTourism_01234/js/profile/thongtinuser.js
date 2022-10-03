$(document).ready(function () {
    // loadData();
    getuserData()

    // tao createProfile roi thi xoa di
        
        // tao createProfile roi thi xoa di

});


async function getuserData() {
    return await $.ajax({
        type: 'GET',
        url: `http://14.225.210.47:8000/api/profile/getProfile`,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        success: async function (responses)
        {
            console.log(responses.profile);
            let _name = responses.profile.first_name;
            let _sex =responses.profile.sex;
            let _address =responses.profile.address;
            let _phoneNumber =responses.profile.phoneNumber;
            let _email =responses.profile.email;
            let _dateOfBirth =responses.profile.dateOfBirth;
            let _color =responses.profile.color;                


            return { _name, _sex, _address, _phoneNumber, _email, _dateOfBirth, _color }
            // $("#uploadedAvatar").attr('src', responses.profile.photoURL);
            // $("#email").val(responses.profile.email);
        },
        fail: function (xhr, status, error) {
            console.log('Error fetching data');
            console.log(xhr,"|",status,"|",error);
        }
    });
   
}