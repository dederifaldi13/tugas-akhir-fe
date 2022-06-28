import { FormErrors } from 'redux-form'
import { IFormAddNewTransaction } from '../model/FormAddNewTransactionModel'

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

    if (!values.qty) {
        errors.qty = 'Qty required'
    }

    if (!values.harga) {
        errors.harga = 'Harga required'
    }

    if (!values.bulan) {
        errors.bulan = 'Bulan required'
    }

    if (!values.total_harga) {
        errors.total_harga = 'Total Harga required'
    }

    if (!values.tgl_jatuh_tempo) {
        errors.tgl_jatuh_tempo = 'Tanggal Jatuh Tempo required'
    }

    return errors
}
export default FormAddNewTransactionValidate
