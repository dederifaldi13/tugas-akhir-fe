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
          filename='Daftar VPS Client'
          sheet='Daftar VPS Client'
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
                DAFTAR VPS CLIENT NAGATECH
              </th>
            </tr>
            <tr>
              <td style={headStyle}>No</td>
              <td style={headStyle}>Toko / Customer</td>
              <td style={headStyle}>Alamat</td>
              <td style={headStyle}>Product</td>
              <td style={headStyle}>Tipe</td>
              <td style={headStyle}>Qty</td>
              <td style={headStyle}>Harga</td>
              <td style={headStyle}>Bulan</td>
              <td style={headStyle}>Total Harga</td>
              <td style={headStyle}>Tgl Jatuh Tempo</td>
              <td style={headStyle}>Status</td>
            </tr>
          </thead>
          <tbody>
            {this.props.dataExcel.map((row) => {
              const bodyStyle = {
                borderWidth: '1px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#f1416c'
                    : '#fff5f8',
                textAlign: 'center',
              }
              const bodyStyleNumber = {
                borderWidth: '1px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#f1416c'
                    : '#fff5f8',
                textAlign: 'right',
              }

              return (
                <tr>
                  <td style={bodyStyle}>{row.key + 1}</td>
                  <td style={bodyStyle}>{row.toko}</td>
                  <td style={bodyStyle}>{row.alamat}</td>
                  <td style={bodyStyle}>{row.product}</td>
                  <td style={bodyStyle}>{row.tipe_program}</td>
                  <td style={bodyStyleNumber}>{row.qty}</td>
                  <td style={bodyStyleNumber}>Rp. {row.harga.toLocaleString()}</td>
                  <td style={bodyStyle}>{row.bulan}</td>
                  <td style={bodyStyleNumber}>Rp. {row.total_harga.toLocaleString()}</td>
                  <td style={bodyStyle}>{moment(row.tgl_jatuh_tempo).format('DD-MM-YYYY')}</td>
                  <td style={bodyStyle}>{row.status}</td>
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
                {this.props.dataExcel.reduce((a, b) => a + parseInt(b.qty || 0), 0)}
              </td>
              <td style={footerStyle}>
                Rp.{' '}
                {this.props.dataExcel
                  .reduce((a, b) => parseInt(a + b.harga || 0), 0)
                  .toLocaleString()}
              </td>
              <td style={footerStyle}></td>
              <td style={footerStyle}>
                Rp.{' '}
                {this.props.dataExcel
                  .reduce((a, b) => parseInt(a + b.total_harga || 0), 0)
                  .toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    )
  }
}
export default ExcelReport
