
function PromiseDeleteUser(id) {
    return new Promise((resl, reje) => {
        $.ajax({
            type: 'DELETE',
            url: `${baseURL}/user/deleteUser?uid=${id}`,
            success: function (response) {
                resl(response);
            },
            error: function (response) {
                reje(response);
            }
        });
    });
}