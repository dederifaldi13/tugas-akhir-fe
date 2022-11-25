import React, {Component} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import moment from 'moment'

class ExcelReport extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const headStyle = {
      backgroundColor: '#99CCFF',
      color: '#000',
      textAlign: 'center',
      fontWeight: 'bold',
      borderWidth: '1px',
      borderColor: '#000000',
      borderStyle: 'solid',
    }

    const footerStyle = {
      textAlign: 'right',
      borderWidth: '1px',
      borderColor: '#000000',
      borderStyle: 'solid',
    }

    return (
      <>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          table='table-to-xls'
          filename='History Payment iPaymu'
          sheet='History Payment iPaymu'
          className={this.props.dataExcel.length === 0 ? 'd-none' : 'btn btn-md btn-light-success'}
          buttonText={
            <span className='indicator-label'>
              <i className='bi bi-file-earmark-excel'></i>Export Excel
            </span>
          }
        />
        <table id='table-to-xls' style={{display: 'none'}}>
          <thead>
            <tr>
              <th
                colSpan='10'
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000',
                  textAlign: 'center',
                }}
              >
                HISTORY PAYMENT iPaymu
              </th>
            </tr>
            <tr>
              <td style={headStyle}>No</td>
              <td style={headStyle}>Transaction ID</td>
              <td style={headStyle}>Nama Toko / Customer</td>
              <td style={headStyle}>Email</td>
              <td style={headStyle}>No Telepon</td>
              <td style={headStyle}>Total Harga</td>
              <td style={headStyle}>Biaya Admin</td>
              <td style={headStyle}>Ref ID</td>
              <td style={headStyle}>Tipe Pembayaran</td>
              <td style={headStyle}>Saluran Pembayaran</td>
              <td style={headStyle}>Tgl Transaksi</td>
              <td style={headStyle}>Tgl Terbayar</td>
              <td style={headStyle}>Tgl Expired</td>
              <td style={headStyle}>Status</td>
            </tr>
          </thead>
          <tbody>
            {this.props.dataExcel.map((row) => {
              const bodyStyle = {
                borderWidth: '1px',
                borderColor: '#000000',
                borderStyle: 'solid',
                textAlign: 'center',
              }
              const bodyStyleNumber = {
                borderWidth: '1px',
                borderColor: '#000000',
                borderStyle: 'solid',
                textAlign: 'right',
              }

              return (
                <tr>
                  <td style={bodyStyle}>{row.key + 1}</td>
                  <td style={bodyStyle}>{row.TransactionId}</td>
                  <td style={bodyStyle}>{row.BuyerName}</td>
                  <td style={bodyStyle}>{row.BuyerEmail}</td>
                  <td style={bodyStyle}>{row.BuyerPhone}</td>
                  <td style={bodyStyleNumber}>Rp. {parseInt(row.Amount).toLocaleString()}</td>
                  <td style={bodyStyleNumber}>Rp. {parseInt(row.Fee).toLocaleString()}</td>
                  <td style={bodyStyle}>{row.ReferenceId}</td>
                  <td style={bodyStyle}>{row.TypeDesc}</td>
                  <td style={bodyStyle}>{row.PaymentChannel}</td>
                  <td style={bodyStyle}>{moment(row.CreatedDate).format('DD-MM-YYYY')}</td>
                  <td style={bodyStyle}>{moment(row.SuccessDate).format('DD-MM-YYYY')}</td>
                  <td style={bodyStyle}>{moment(row.ExpiredDate).format('DD-MM-YYYY')}</td>
                  <td style={bodyStyle}>{row.StatusDesc}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} style={footerStyle}>
                Total :
              </td>
              <td style={footerStyle}>
                Rp.{' '}
                {this.props.dataExcel.reduce((a, b) => a + parseInt(b.Amount), 0).toLocaleString()}
              </td>
              <td style={footerStyle}>
                Rp. {this.props.dataExcel.reduce((a, b) => a + parseInt(b.Fee), 0).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    )
  }
}
export default ExcelReport
