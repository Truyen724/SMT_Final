$(document).ready(async function(){
    fetchData()
    saveImg()
    getAPIUser()
    
    // $("#search-box").click(function(){
    //     console.log(arrSaveList)
    //     listData()
    // })
})

var arrSaveList = []
async function saveImg()
{
     let img;
    $("#buttoncamera").click( async ()=>{
        
        
        acpCamDef = true
        startup()
        var data = await fetchData();
        console.log(data.profile.dateOfBirth)
        const month = data.profile.dateOfBirth.slice(5,7)
        const day = data.profile.dateOfBirth.slice(8,10)
        const dayMonth = day+"/"+month
        console.log(dayMonth)
        setTimeout(async function(){
            takepicture();
            var linkSRC = $('#photo').attr('src');
            console.log(linkSRC)
            var image = new Image();
            image.src = linkSRC;
            console.log(linkSRC)
            
            $.ajax({
                type: "POST",
                url: "http://14.225.210.47:4999/predict",
                data: JSON.stringify(
                    
                    {
                        "image": linkSRC,  		
                        "color": data.profile.color,  		
                        "weather": theme,	
                        "temperature":temp,		
                        "day_or_night": "", 	
                        "day_of_birth": dayMonth
                    }
                ),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                success: async function (data, status, jqXHR) {
                    arrSaveList = data
                    console.log(data)
                    $(".search").addClass("active");
                    await listData()
                    alert('success');
                },
        
                error: function (jqXHR, status) {
                    // error handler
                    console.log('failer');  
                    alert('fail' + status.code);
                }
             });

        }, 2500);
        
        
        setTimeout(async function(){
            acpCamDef = false
            vidOff()
        }, 3000);
    })
    $("#startbutton").click(function(){
        

        setTimeout(function(){
            var linkSRC = $('#photo').attr('src');
            console.log(linkSRC)
            var image = new Image();
            
            image.src = linkSRC;
            console.log(image)
    
            }, 2000);


    })


}

async function listData(){
    console.log(arrSaveList)
    var arrTemp = []
    var zipCode = document.getElementById('zip-code-input').value.toLowerCase();
                    if(zipCode){
                        console.log("f")
                        let searchdata = arrSaveList.filter(value => {
                            if(value.Name.toLowerCase().includes(zipCode)){
                                arrTemp.push(value);
                            }
                        })
                    }
                    else{
                        arrTemp = arrSaveList
                    }
                    document.querySelector('.stores-list-container').style.opacity = 1;
                    clearLocations();
                    displayStores(arrTemp);
                    showStoresMarkers(arrTemp);
                    setOnClickListener();
}

async function fetchData() {
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
            
            console.log(_name)
            if(_name == "")
            {
                location.href="../../../home/edituser.html";
            }

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





