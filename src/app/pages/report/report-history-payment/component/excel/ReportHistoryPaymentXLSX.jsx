import React, {Component} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

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
              <td style={headStyle}>Kode Toko / Customer</td>
              <td style={headStyle}>Toko / Customer</td>
              <td style={headStyle}>No Bayar</td>
              <td style={headStyle}>Tanggal Bayar</td>
              <td style={headStyle}>Product</td>
              <td style={headStyle}>Qty</td>
              <td style={headStyle}>Harga</td>
              <td style={headStyle}>Bulan</td>
              <td style={headStyle}>Total Harga</td>
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
                  <td style={bodyStyle}>{row.kode_toko}</td>
                  <td style={bodyStyle}>{row.toko}</td>
                  <td style={bodyStyle}>{row.no_bayar}</td>
                  <td style={bodyStyle}>{row.tanggal_bayar}</td>
                  <td style={bodyStyle}>{row.product}</td>
                  <td style={bodyStyleNumber}>{row.qty}</td>
                  <td style={bodyStyleNumber}>Rp. {row.harga.toLocaleString()}</td>
                  <td style={bodyStyle}>{row.bulan}</td>
                  <td style={bodyStyleNumber}>Rp. {row.total_harga.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} style={footerStyle}>
                Total :
              </td>
              <td style={footerStyle}>{this.props.dataExcel.reduce((a, b) => a + b.qty, 0)}</td>
              <td style={footerStyle}>
                Rp. {this.props.dataExcel.reduce((a, b) => a + b.harga, 0).toLocaleString()}
              </td>
              <td style={footerStyle}></td>
              <td style={footerStyle}>
                Rp. {this.props.dataExcel.reduce((a, b) => a + b.total_harga, 0).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    )
  }
}
export default ExcelReport
