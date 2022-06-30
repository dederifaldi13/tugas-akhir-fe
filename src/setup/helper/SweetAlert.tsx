import Swal from 'sweetalert2'

function AlertError(message: any) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message.response ? message.response.data : message,
  })
}

function AlertError401(message: any) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message.response ? message.response.data : message,
  }).then(() => {
    window.location.reload()
  })
}

function AlertSuccess(message: any) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload()
    }
  })
}

function AlertSuccessPayment(message: any) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  }).then((result) => {
    if (result.isConfirmed) {
      window.open('/success-payment', '_self', '')
    }
  })
}

function AlertSuccessAdd() {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Berahasil Menambahkan Data',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload()
    }
  })
}

function AlertSuccessEdit() {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Berahasil Merubah Data',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload()
    }
  })
}

function AlertSuccessDelete() {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Berahasil Menghapus Data',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload()
    }
  })
}

function AlertSuccessCancel() {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Berahasil Membatalkan Data',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload()
    }
  })
}

function AlertSuccessWithoutReload(message: any) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  })
}

const data = {
  AlertError,
  AlertError401,
  AlertSuccess,
  AlertSuccessWithoutReload,
  AlertSuccessAdd,
  AlertSuccessEdit,
  AlertSuccessDelete,
  AlertSuccessCancel,
  AlertSuccessPayment,
}

export default data
