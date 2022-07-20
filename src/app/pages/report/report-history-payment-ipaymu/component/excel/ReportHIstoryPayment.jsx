import React from 'react'
import ReactExport from 'react-data-export'
import {useSelector} from 'react-redux'
// import './App.css'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const ReportHistoryPaymentExcel = () => {
  const dataHistory = useSelector((state) => state.reportHistoryPayment.feedback)
  const headStyle = {
    border: {
      top: {style: 'thin', color: '000000'},
      bottom: {style: 'thin', color: '000000'},
      left: {style: 'thin', color: '000000'},
      right: {style: 'thin', color: '000000'},
    },
    font: {bold: true},
    fill: {patternType: 'solid', fgColor: {rgb: 'dce6f1'}},
  }
  const bodyStyle = {
    border: {
      top: {style: 'thin', color: '000000'},
      bottom: {style: 'thin', color: '000000'},
      left: {style: 'thin', color: '000000'},
      right: {style: 'thin', color: '000000'},
    },
  }

  const footerStyle = {
    alignment: {horizontal: 'right'},
    border: {
      top: {style: 'thin', color: '000000'},
      bottom: {style: 'thin', color: '000000'},
    },
  }

  let multiDataSet = [
    {
      columns: [
        {
          title: 'No',
          width: {wpx: 20},
          style: headStyle,
        },
        {
          title: 'Kode Toko / Customer',
          width: {wch: 20},
          style: headStyle,
        },
        {
          title: 'Nama Toko / Customer',
          width: {wch: 20},
          style: headStyle,
        },
        {
          title: 'No Bayar',
          width: {wch: 20},
          style: headStyle,
        },
        {
          title: 'Tgl Bayar',
          width: {wch: 20},
          style: headStyle,
        },
        {
          title: 'Product',
          width: {wch: 20},
          style: headStyle,
        },
        {
          title: 'Qty',
          width: {wpx: 80},
          style: headStyle,
        },
        {
          title: 'Harga',
          width: {wpx: 90},
          style: headStyle,
        },
        {
          title: 'Bulan',
          width: {wpx: 80},
          style: headStyle,
        },
        {
          title: 'Total Harga',
          width: {wch: 20},
          style: headStyle,
        },
      ],
      data: [],
    },
  ]

  //body
  let no = 1
  dataHistory.forEach((element) => {
    multiDataSet[0].data.push([
      {value: no++, style: bodyStyle},
      {value: element.kode_toko, style: bodyStyle},
      {value: element.toko, style: bodyStyle},
      {value: element.no_bayar, style: bodyStyle},
      {value: element.tanggal_bayar, style: bodyStyle},
      {value: element.product, style: bodyStyle},
      {value: element.qty, style: bodyStyle},
      {
        value: element.harga.toLocaleString('id', {style: 'currency', currency: 'IDR'}),
        style: {
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
          alignment: {horizontal: 'right'},
        },
      },
      {value: element.bulan, style: bodyStyle},
      {
        value: element.total_harga.toLocaleString('id', {style: 'currency', currency: 'IDR'}),
        style: {
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
          alignment: {horizontal: 'right'},
        },
      },
    ])
  })

  //footer
  multiDataSet[0].data.push([
    {
      value: '',
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          left: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {value: '', style: footerStyle},
    {value: '', style: footerStyle},
    {value: '', style: footerStyle},
    {value: '', style: footerStyle},
    {value: 'Total Bayar : ', style: footerStyle},
    {value: dataHistory.reduce((a, b) => a + b.qty, 0), style: footerStyle},
    {
      value: dataHistory
        .reduce((a, b) => a + b.harga, 0)
        .toLocaleString('id', {style: 'currency', currency: 'IDR'}),
      style: footerStyle,
    },
    {value: '', style: footerStyle},
    {
      value: dataHistory
        .reduce((a, b) => a + b.total_harga, 0)
        .toLocaleString('id', {style: 'currency', currency: 'IDR'}),
      style: {
        alignment: {horizontal: 'right'},
        border: {
          top: {style: 'thin', color: '000000'},
          right: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
  ])

  return (
    <div>
      <ExcelFile
        filename='History Payment'
        element={
          <button className={dataHistory.length === 0 ? 'd-none' : 'btn btn-md btn-light-success'}>
            <i className='bi bi-file-earmark-excel'></i>Export Excel
          </button>
        }
      >
        <ExcelSheet dataSet={multiDataSet} name='Organization' />
      </ExcelFile>
    </div>
  )
}

export default ReportHistoryPaymentExcel
