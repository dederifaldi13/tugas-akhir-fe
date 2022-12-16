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
              <td style={headStyle}>No Invoice</td>
              <td style={headStyle}>Toko</td>
              <td style={headStyle}>Cabang</td>
              <td style={headStyle}>Alamat</td>
              <td style={headStyle}>Alamat Korespondensi</td>
              <td style={headStyle}>Bulan</td>
              <td style={headStyle}>Total Diskon</td>
              <td style={headStyle}>Total Harga</td>
              <td style={headStyle}>Diskon Tambahan</td>
              <td style={headStyle}>Total</td>
              <td style={headStyle}>Tgl Jatuh Tempo</td>
              <td style={headStyle}>Status</td>
            </tr>
          </thead>
          <tbody>
            {this.props.dataExcel.map((row) => {
              const bodyStyle = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#fab9c9'
                    : '#fff5f8',
                textAlign: 'center',
              }
              const bodyStyleNumber = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#fab9c9'
                    : '#fff5f8',
                textAlign: 'right',
              }
              const headStyleDetail = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#fab9c9'
                    : '#fff5f8',
                textAlign: 'center',
                fontWeight: 'bold',
              }
              const bodyStyleDetail = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#fab9c9'
                    : '#fff5f8',
                textAlign: 'center',
              }
              const bodyStyleDetailNumber = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#fab9c9'
                    : '#fff5f8',
                textAlign: 'right',
              }
              const footerStyleDetail = {
                borderWidth: '0.5px',
                borderColor: '#000000',
                borderStyle: 'solid',
                backgroundColor:
                  row.status === 'OPEN'
                    ? '#fff8dd'
                    : row.status === 'PAID'
                    ? '#e8fff3'
                    : row.status === 'CLOSE'
                    ? '#fab9c9'
                    : '#fff5f8',
                textAlign: 'right',
                fontWeight: 'bold',
              }
              return (
                <>
                  <tr>
                    <td style={bodyStyle}>{row.key + 1}</td>
                    <td style={bodyStyle}>{row.no_invoice}</td>
                    <td style={bodyStyle}>{row.toko}</td>
                    <td style={bodyStyle}>{row.kode_cabang}</td>
                    <td style={bodyStyle}>{row.alamat_cabang}</td>
                    <td style={bodyStyle}>{row.alamat_korespondensi}</td>
                    <td style={bodyStyle}>{row.bulan}</td>
                    <td style={bodyStyle}>{row.total_diskon * 100} %</td>
                    <td style={bodyStyleNumber}>Rp. {row.grand_total?.toLocaleString()}</td>
                    <td style={bodyStyleNumber}>
                      Rp. {(row.diskon_tambahan || 0)?.toLocaleString()}
                    </td>
                    <td style={bodyStyleNumber}>
                      Rp. {(row.grand_total - (row.diskon_tambahan || 0))?.toLocaleString()}
                    </td>
                    <td style={bodyStyle}>{moment(row.tgl_jatuh_tempo).format('DD-MM-YYYY')}</td>
                    <td style={bodyStyle}>{row.status}</td>
                  </tr>
                  <tr>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}>Product</td>
                    <td style={headStyleDetail}>Tipe Program</td>
                    <td style={headStyleDetail}>Harga</td>
                    <td style={headStyleDetail}>Diskon Produk</td>
                    <td style={headStyleDetail}>TotalHarga</td>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}></td>
                    <td style={headStyleDetail}></td>
                  </tr>
                  {row.customer.map((detail) => {
                    return (
                      <tr>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}>{detail.product}</td>
                        <td style={bodyStyleDetail}>{detail.tipe_program}</td>
                        <td style={bodyStyleDetailNumber}>Rp. {detail.harga?.toLocaleString()}</td>
                        <td style={bodyStyleDetailNumber}>{(detail.diskon_produk || 0) * 100} %</td>
                        <td style={bodyStyleDetailNumber}>
                          Rp. {detail.total_harga?.toLocaleString()}
                        </td>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}></td>
                        <td style={bodyStyleDetail}></td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}>Sub Total</td>
                    <td style={footerStyleDetail}>
                      Rp.{' '}
                      {row.customer
                        .reduce((a, b) => a + parseInt(b.harga || 0), 0)
                        .toLocaleString()}
                    </td>
                    <td style={footerStyleDetail}>
                      {row.customer.reduce(
                        (a, b) => a + parseFloat(b.diskon_produk || 0) * 100,
                        0
                      ) + ' %'}
                    </td>
                    <td style={footerStyleDetail}>
                      Rp.{' '}
                      {row.customer
                        .reduce((a, b) => a + parseInt(b.total_harga || 0), 0)
                        .toLocaleString()}
                    </td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                    <td style={footerStyleDetail}></td>
                  </tr>
                </>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={8} style={footerStyle}>
                Grand Total :
              </td>
              <td style={footerStyle}>
                Rp.{' '}
                {this.props.dataExcel
                  .reduce((a, b) => a + parseInt(b.grand_total || 0), 0)
                  ?.toLocaleString()}
              </td>
              <td style={footerStyle}>
                Rp.{' '}
                {this.props.dataExcel
                  .reduce((a, b) => a + parseInt(b.diskon_tambahan || 0), 0)
                  ?.toLocaleString()}
              </td>
              <td style={footerStyle}>
                Rp.{' '}
                {this.props.dataExcel
                  .reduce(
                    (a, b) => a + (parseInt(b.grand_total || 0) - parseInt(b.diskon_tambahan || 0)),
                    0
                  )
                  ?.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    )
  }
}
export default ExcelReport
