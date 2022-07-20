import { FormErrors } from 'redux-form'
import { IFormAddNewTransaction } from '../model/ModelValidation'

const FormAddNewTransactionValidate = (values: IFormAddNewTransaction): FormErrors<IFormAddNewTransaction> => {
    const errors: FormErrors<IFormAddNewTransaction> = {}

    if (!values.kode_toko) {
        errors.kode_toko = 'Kode Toko required'
    }

    if (!values.nama_toko) {
        errors.nama_toko = 'Nama Toko required'
    }

    if (!values.alamat) {
        errors.alamat = 'Alamat required'
    }

    if (!values.telepon) {
        errors.telepon = 'No Telepon required'
    }

    if (!values.email) {
        errors.email = 'Email required'
    }

    if (!values.product) {
        errors.product = 'Product required'
    }

    if (!values.qty && values.tipe_program === 'ONLINE') {
        errors.qty = 'Qty required'
    }

    if (!values.harga && values.tipe_program === 'ONLINE') {
        errors.harga = 'Harga required'
    }

    if (!values.bulan && values.tipe_program === 'ONLINE') {
        errors.bulan = 'Bulan required'
    }

    if (!values.total_harga && values.tipe_program === 'ONLINE') {
        errors.total_harga = 'Total Harga required'
    }

    if (!values.tgl_jatuh_tempo && values.tipe_program === 'ONLINE') {
        errors.tgl_jatuh_tempo = 'Tanggal Jatuh Tempo required'
    }

    return errors
}
export default FormAddNewTransactionValidate
