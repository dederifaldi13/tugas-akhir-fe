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
      borderWidth: '0.5px',
      borderColor: '#000000',
      borderStyle: 'solid',
    }

    const footerStyle = {
      textAlign: 'right',
      borderWidth: '0.5px',
      borderColor: '#000000',
      borderStyle: 'solid',
    }

    return (
      <>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          table='table-to-xls'
          filename='History Payment'
          sheet='History Payment'
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
                HISTORY PAYMENT CLIENT NAGATECH
              </th>
            </tr>
            <tr>
              <td style={headStyle}>No</td>
              <td style={headStyle}>No Bayar</td>
              <td style={headStyle}>No Invoice</td>
              <td style={headStyle}>Kode Toko / Customer</td>
              <td style={headStyle}>Toko / Customer</td>
              <td style={headStyle}>Cabang</td>
              <td style={headStyle}>Tanggal Bayar</td>
              <td style={headStyle}>Total Harga</td>
              <td style={headStyle}>Tipe Pembayaran</td>
            </tr>
          </thead>
          <tbody>
            {this.props.dataExcel.map((row) => {
              const bodyStyle = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                textAlign: 'center',
              }
              const bodyStyleNumber = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                textAlign: 'right',
              }

              return (
                <tr>
                  <td style={bodyStyle}>{row.key + 1}</td>
                  <td style={bodyStyle}>{row.no_bayar}</td>
                  <td style={bodyStyle}>{row.no_invoice}</td>
                  <td style={bodyStyle}>{row.kode_toko}</td>
                  <td style={bodyStyle}>{row.toko}</td>
                  <td style={bodyStyle}>{row.kode_cabang}</td>
                  <td style={bodyStyle}>{moment(row.tanggal_bayar).format('DD-MM-YYYY')}</td>
                  <td style={bodyStyleNumber}>Rp. {row.total_harga?.toLocaleString()}</td>
                  <td style={bodyStyle}>{row.tipe_pembayaran}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} style={footerStyle}>
                Total :
              </td>
              <td style={footerStyle}>
                Rp. {this.props.dataExcel.reduce((a, b) => a + b.total_harga, 0)?.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    )
  }
}
export default ExcelReport
