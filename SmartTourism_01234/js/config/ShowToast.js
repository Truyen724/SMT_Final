
function swalToast(title, text, body, color) {

    return $('#toast').html(`<div class="bs-toast toast fade show bg-${color}  position-fixed top-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="assets/img/avatars/1.png" class="d-block w-px-20 h-auto rounded me-2" alt="" />
        <div class="me-auto fw-semibold">${title}</div>
        <small>${text}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${body}
      </div>
    </div>`);
  
  }