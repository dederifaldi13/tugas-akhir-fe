import React from 'react'
import ReactExport from 'react-data-export'
import {useSelector} from 'react-redux'
// import './App.css'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const ReportCustomerExcel = () => {
  const dataCustomer = useSelector((state) => state.reportCustomer.feedback)
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

  let multiDataSet = [
    {
      columns: [
        {
          title: 'No',
          width: {wpx: 20},
          style: headStyle,
        },
        {
          title: 'Toko / Customer',
          width: {wch: 20},
          style: headStyle,
        }, //char width
        {
          title: 'Alamat',
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
        {
          title: 'Tgl Jatuh Tempo',
          width: {wch: 20},
          style: headStyle,
        },
        {
          title: 'Status',
          width: {wch: 25},
          style: headStyle,
        },
      ],
      data: [],
    },
  ]

  //body
  let no = 1
  dataCustomer.forEach((element) => {
    multiDataSet[0].data.push([
      {
        value: no++,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.toko,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.alamat,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.product,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.qty,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.harga.toLocaleString('id', {style: 'currency', currency: 'IDR'}),
        style: {
          alignment: {horizontal: 'right'},
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.bulan,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.total_harga.toLocaleString('id', {style: 'currency', currency: 'IDR'}),
        style: {
          alignment: {horizontal: 'right'},
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.tgl_jatuh_tempo,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
        },
      },
      {
        value: element.status,
        style: {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb:
                element.status === 'OPEN'
                  ? 'fff8dd'
                  : element.status === 'PAID'
                  ? 'e8fff3'
                  : element.status === 'CLOSE'
                  ? 'FFFF0000'
                  : 'fff5f8',
            },
          },
          border: {
            top: {style: 'thin', color: '000000'},
            bottom: {style: 'thin', color: '000000'},
            left: {style: 'thin', color: '000000'},
            right: {style: 'thin', color: '000000'},
          },
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
    {
      value: '',
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: '',
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: 'Total : ',
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: dataCustomer.reduce((a, b) => a + b.qty, 0),
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: dataCustomer
        .reduce((a, b) => a + b.harga, 0)
        .toLocaleString('id', {style: 'currency', currency: 'IDR'}),
      style: {
        alignment: {horizontal: 'right'},
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: '',
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: dataCustomer
        .reduce((a, b) => a + b.total_harga, 0)
        .toLocaleString('id', {style: 'currency', currency: 'IDR'}),
      style: {
        alignment: {horizontal: 'right'},
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: '',
      style: {
        border: {
          top: {style: 'thin', color: '000000'},
          bottom: {style: 'thin', color: '000000'},
        },
      },
    },
    {
      value: '',
      style: {
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
        filename='Daftar VPS Client'
        element={
          <button className={dataCustomer.length === 0 ? 'd-none' : 'btn btn-md btn-light-success'}>
            <i className='bi bi-file-earmark-excel'></i>Export Excel
          </button>
        }
      >
        <ExcelSheet dataSet={multiDataSet} name='Organization' />
      </ExcelFile>
    </div>
  )
}

export default ReportCustomerExcel
