import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../setup'
import {currencyMask} from '../../../setup/helper/function'
import FormAddNewTransactionValidate from '../../../setup/validate/FormAddNewTransactionValidate'
import {
  ReanderField,
  ReanderFieldInputGroup,
  ReanderSelect2,
} from '../../modules/redux-form/BasicInput'
import {GetStoreType} from '../master/store/redux/action/StoreActionTypes'
import {
  CountTotalHargaFinal,
  CountTotalHargaQty,
  GetMasterStoreByKodeToko,
  SetCabangByID,
  SetDiskonKhusus,
  SetTanggalJatuhTempo,
} from './redux/actions/PostActions'
import TableDetailProduct from './TableDetailProduct'

interface Props {}

const mapState = (state: RootState) => {
  const dataProduct = state.dashboard.dataProduct
  const total = dataProduct?.reduce(
    (a: any, b: {total_harga_product: any}) => a + (b.total_harga_product || 0),
    0
  )
  const diskon: any =
    state.dashboard.diskon_khusus !== undefined ? state.dashboard.diskon_khusus : 0
  const totaldiskon = total * (diskon / 100)
  const grandtotal = total - totaldiskon

  if (state.dashboard.dataTokoByKode !== undefined) {
    if (state.dashboard.cabangTokoByID !== undefined) {
      return {
        initialValues: {
          kode_toko: {
            value: state.dashboard.dataTokoByKode.kode_toko,
            label: state.dashboard.dataTokoByKode.kode_toko,
          },
          toko: state.dashboard.dataTokoByKode.toko,
          kode_cabang: {
            value: state.dashboard.cabangTokoByID.kode_cabang,
            label: state.dashboard.cabangTokoByID.nama_cabang,
          },
          alamat: state.dashboard.cabangTokoByID.alamat_cabang,
          alamat_korespondensi: state.dashboard.cabangTokoByID.alamat_korespondensi,
          telepon: state.dashboard.cabangTokoByID.telepon,
          email: state.dashboard.cabangTokoByID.email,
          bulan: state.dashboard.qty,
          grand_total: grandtotal,
          total:
            state.dashboard.total_harga_jual === 0 ? grandtotal : state.dashboard.total_harga_jual,
          diskon_tambahan: state.dashboard.diskon_tambahan,
          total_diskon: state.dashboard.diskon_khusus,
          tgl_jatuh_tempo: state.dashboard.tgl_jatuh_tempo,
        },
      }
    } else {
      return {
        initialValues: {
          kode_toko: {
            value: state.dashboard.dataTokoByKode.kode_toko,
            label: state.dashboard.dataTokoByKode.kode_toko,
          },
          toko: state.dashboard.dataTokoByKode.toko,
          kode_cabang: {
            value:
              state.dashboard.cabangToko?.length !== 0
                ? state.dashboard.cabangToko[0].kode_cabang
                : '',
            label:
              state.dashboard.cabangToko?.length !== 0
                ? state.dashboard.cabangToko[0].nama_cabang
                : '',
          },
          alamat: '',
          alamat_korespondensi: '',
          telepon: '',
          email: '',
          bulan: state.dashboard.qty,
          grand_total: grandtotal,
          total:
            state.dashboard.total_harga_jual === 0 ? grandtotal : state.dashboard.total_harga_jual,
          diskon_tambahan: state.dashboard.diskon_tambahan,
          total_diskon: state.dashboard.diskon_khusus,
          tgl_jatuh_tempo: state.dashboard.tgl_jatuh_tempo,
        },
      }
    }
  } else {
    return {
      initialValues: {
        kode_toko: '',
        toko: '',
        kode_cabang: {
          value: '',
          label: '',
        },
        telepon: '',
        email: '',
        alamat: '',
        alamat_korespondensi: '',
        bulan: state.dashboard.qty,
        grand_total: grandtotal,
        total:
          state.dashboard.total_harga_jual === 0 ? grandtotal : state.dashboard.total_harga_jual,
        diskon_tambahan: state.dashboard.diskon_tambahan,
        total_diskon: state.dashboard.diskon_khusus,
        tgl_jatuh_tempo: state.dashboard.tgl_jatuh_tempo,
      },
    }
  }
}

const FormAddNewTransaction: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, submitting} = props
  const dispatch = useDispatch()
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataToko: any = useSelector<RootState>(({masterstore}) => masterstore.feedback) || []
  // const data: any = useSelector<RootState>(({dashboard}) => dashboard.dataTokoByKode) || []
  const dataCabang: any = useSelector<RootState>(({dashboard}) => dashboard.cabangToko) || []
  const CabangID: any = useSelector<RootState>(({dashboard}) => dashboard.cabangTokoByID)
  const tipe_program: any = useSelector<RootState>(({dashboard}) => dashboard.tipe_program)

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='kode_toko'
              component={ReanderSelect2}
              options={dataToko.map((list: GetStoreType) => {
                let data = {
                  value: list.kode_toko,
                  label: list.kode_toko,
                }
                return data
              })}
              label='Kode Toko'
              onChange={(e: any) => {
                dispatch(GetMasterStoreByKodeToko(e.value))
              }}
              placeholder='Pilih Kode Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              name='toko'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Toko'
              placeholder='Masukan Toko'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='kode_cabang'
              component={ReanderSelect2}
              options={dataCabang.map((list: any) => {
                let data = {
                  value: list.kode_cabang,
                  label: list.nama_cabang,
                }
                return data
              })}
              label='Cabang'
              onChange={(e: any) => {
                dispatch(SetCabangByID(e.value))
              }}
              placeholder='Pilih Cabang'
              defaultValue={{
                value: CabangID !== undefined ? CabangID.kode_cabang : 'Pilih Kode Cabang',
                label: CabangID !== undefined ? CabangID.nama_cabang : 'Pilih Kode Cabang',
              }}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='alamat'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Alamat'
              placeholder='Masukan Alamat'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='alamat_korespondensi'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Alamat Korespondensi'
              placeholder='Masukan Alamat Korespondensi'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='telepon'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='No Telepon'
              placeholder='Masukan No Telepon'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='email'
              type='email'
              component={ReanderField}
              nouperCase={true}
              label='Email'
              placeholder='Masukan Email'
            />
          </div>

          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              // readOnly
              // customeCss='form-control-solid'
              name='bulan'
              type='text'
              component={ReanderFieldInputGroup}
              nouperCase={true}
              label='Bulan'
              placeholder='Masukan Bulan'
              onChange={(e: any) => {
                dispatch(CountTotalHargaQty(e.target.value))
              }}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='tgl_jatuh_tempo'
              type='date'
              component={ReanderField}
              nouperCase={true}
              label='Tanggal Jatuh Tempo'
              placeholder='Masukan Tanggal Jatuh Tempo'
              onChange={(e: any) => dispatch(SetTanggalJatuhTempo(e.target.value))}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='total_diskon'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Discount Khusus'
              placeholder='Masukan Discount Khusus'
              onChange={(e: any) => dispatch(SetDiskonKhusus(e.target.value))}
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='separator mt-3 mb-3 opacity-100'></div>
        </div>
        <div className='col-lg-12'>
          <TableDetailProduct />
        </div>
        <div className='col-lg-12'>
          <div className='row justify-content-end mt-2 mb-2'>
            <div className='col-lg-6 d-grid'>
              <Field
                readOnly
                customeCss='form-control-solid'
                name='grand_total'
                type='text'
                component={ReanderField}
                nouperCase={true}
                label='Grand Total'
                placeholder='Masukan Grand Total'
                {...currencyMask}
              />
            </div>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='row justify-content-end mt-2 mb-2'>
            <div className='col-lg-6 d-grid'>
              <Field
                name='diskon_tambahan'
                type='text'
                component={ReanderField}
                nouperCase={true}
                label='Diskon Tambahan'
                placeholder='Masukan Diskon Tambahan'
                {...currencyMask}
                onChange={(e: any) => dispatch(CountTotalHargaFinal(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='row justify-content-end mt-2 mb-2'>
            <div className='col-lg-6 d-grid'>
              <Field
                readOnly
                customeCss='form-control-solid'
                name='total'
                type='text'
                component={ReanderField}
                nouperCase={true}
                label='Total Harga'
                placeholder='Masukan Total Harga'
                {...currencyMask}
              />
            </div>
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button
              className='btn btn-primary'
              disabled={tipe_program === 'ONLINE' ? submitting || isSending : false}
              type='submit'
            >
              {!isSending && <span className='indicator-label'>Simpan</span>}
              {isSending && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

const form = reduxForm<{}, Props>({
  form: 'FormAddNewTransaction',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormAddNewTransactionValidate,
})(FormAddNewTransaction)
export default connect(mapState, null)(form)
