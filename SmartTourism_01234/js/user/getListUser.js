$(document).ready(function () {
    loadData();
});
function fetchData() {
    $.ajax({
        type: 'GET',
        url: `${baseURL}/user/getAllUsers`,
        success: function (response) {
            const users = response.users;
          
            $("#countUser").text(users.length);
            users.forEach((user) => {
           
                var userId=`${user.uid}`;
                // console.log(userId);
                let rows =
                    `<tr data-id="${userId}">
                    <td>${user.email}</td>
                    <td>${user.displayName}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.uid}</td>
                    <td>
                        <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="../../home/edituser.html?uid=${userId}"
                                ><i class="bx bx-edit-alt me-1"></i>Edit</a
                              >
                              <a class="dropdown-item" type="button" onClick='deleteUser(\"${userId}\");'
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                        </div>
                    </td>
                </tr>`;
                $(".tbody").append(rows);
            });
        }
    })
}
function loadData() {
    fetchData();
}

