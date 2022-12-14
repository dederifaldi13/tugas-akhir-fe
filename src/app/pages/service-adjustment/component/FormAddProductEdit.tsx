import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {RootState} from '../../../../setup'
import {currencyMask} from '../../../../setup/helper/function'
import FormAddProductValidate from '../../../../setup/validate/FormAddNewProduct'
import {ReanderField, ReanderSelect2} from '../../../modules/redux-form/BasicInput'
import {GetProductType} from '../../master/product/redux/action/ProductActionTypes'
import {
  //   AddProductToLocal,
  CountTotalHarga,
  CountTotalHargaDiscountProduct,
  PostDataProductCustomer,
  PutDataProductCustomer,
  SetProduct,
} from '../redux/action/ServiceAdjustmentAction'

interface Props {}

const mapState = (state: RootState) => {
  if (state.serviceAdjustment.productID !== undefined) {
    return {
      initialValues: {
        product: {
          value: state.serviceAdjustment.product,
          label: state.serviceAdjustment.product,
        },
        tipe_program: state.serviceAdjustment.tipe_program,
        id: state.serviceAdjustment.productID._id,
        qty: 1,
        harga: state.serviceAdjustment.harga,
        diskon_produk: state.serviceAdjustment.diskon_produk,
        total_harga_product: state.serviceAdjustment.totalHarga,
      },
    }
  }
}

const FormAddProductEdit: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const {handleSubmit, submitting} = props

  const dispatch = useDispatch()
  const isSending = useSelector<RootState>(({loader}) => loader.loading)
  const dataProduct: any = useSelector<RootState>(({masterproduct}) => masterproduct.feedback) || []
  const tipe_program: any = useSelector<RootState>(({dashboard}) => dashboard.tipe_program)
  const tipeProgram = useSelector<RootState>(({serviceAdjustment}) => serviceAdjustment.product)
  const cek = useSelector<RootState>(({serviceAdjustment}) => serviceAdjustment.productID)
  const type = {value: tipeProgram, label: tipeProgram}

  const handleClick = () => {
    if (cek === undefined) {
      dispatch(PostDataProductCustomer())
    } else {
      dispatch(PutDataProductCustomer())
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='ant-form ant-form-vertical'>
        <div className='row'>
          <div className='col-lg-6 mb-2 mt-2'>
            <Field
              name='product'
              component={ReanderSelect2}
              options={dataProduct.map((list: GetProductType) => {
                let data = {
                  value: list.product,
                  label: `${list.product} - ${list.tipe_program}`,
                }
                return data
              })}
              defaultValue={{value: type.value, label: type.label}}
              label='Product'
              placeholder='Pilih Product'
              onChange={(e: any) => dispatch(SetProduct(e))}
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='id'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='ID'
              placeholder='Masukan ID'
            />
          </div>
          <div className='col-lg-6 mb-2 mt-2 d-none'>
            <Field
              readOnly
              name='tipe_program'
              type='text'
              customeCss='form-control-solid'
              component={ReanderField}
              nouperCase={true}
              label='Tipe'
              placeholder='Masukan Tipe'
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 d-none`}>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='qty'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Qty'
              placeholder='Masukan Qty'
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              name='harga'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Harga'
              placeholder='Masukan Harga'
              {...currencyMask}
              onChange={(e: any) => {
                dispatch(CountTotalHarga(e.target.value))
              }}
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              name='diskon_produk'
              type='number'
              component={ReanderField}
              nouperCase={true}
              label='Discount Product'
              placeholder='Masukan Discount Product'
              onChange={(e: any) => {
                dispatch(CountTotalHargaDiscountProduct(e.target.value))
              }}
            />
          </div>
          <div className={`col-lg-6 mb-2 mt-2 ${tipe_program === 'OFFLINE' && 'd-none'}`}>
            <Field
              readOnly
              customeCss='form-control-solid'
              name='total_harga_product'
              type='text'
              component={ReanderField}
              nouperCase={true}
              label='Total Harga'
              {...currencyMask}
              placeholder='Masukan Total Harga'
            />
          </div>
        </div>
        <div className='row justify-content-end mt-2 mr-2'>
          <div className='col-lg-2 d-grid'>
            <button
              className='btn btn-primary'
              disabled={submitting || isSending}
              onClick={(e: any) => {
                e.preventDefault()
                handleClick()
              }}
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
  form: 'FormAddProductEdit',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  enableReinitialize: true,
  validate: FormAddProductValidate,
})(FormAddProductEdit)
export default connect(mapState, null)(form)
