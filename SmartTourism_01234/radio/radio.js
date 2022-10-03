$(document).ready(function () {
    watchSelectedValue();
    $('#btnSubmit').click(() => {
        alert(getSelectedValue());
    });

});
var getColor = ""

function watchSelectedValue() {
    $("input").on("click", function () {
        getSelectedValue();
    });
}

function getSelectedValue() {

    var selectedOption = $('input[name="role"]:checked').val();
    if (selectedOption) {
        $('#lblSelectedOption').html("You have selected : " + selectedOption)
        getColor = selectedOption
        // console.log(getColor)
        return selectedOption;
    }
    return "No option selected"

}