import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import moment from 'moment'

const ReportCustomerPDF = (data, head) => {
  const doc = new jsPDF('l', 'mm', 'a4')
  let tableRows = []
  let tableColumn = []

  let finalY = 30
  doc.setFontSize(10)
  doc.text('Customer Report', 14, 15)
  // doc.text('Nagatech SI', 180, 15)
  var imgData = toAbsoluteUrl('/media/logos/nsi-logo.png')
  doc.addImage(imgData, 'png', 250, 5, 30, 26)

  doc.setProperties({
    title: 'Customer',
  })
  doc.setFontSize(9)
  if (head.tgl_awal === 'all' && head.tgl_akhir === 'all') {
    doc.text(`Tgl Jatuh Tempo : Semua`, 14, 25)
  } else {
    doc.text(
      `Tgl Jatuh Tempo : ${moment(head.tgl_awal).format('DD-MM-YYYY')} s/d ${moment(
        head.tgl_akhir
      ).format('DD-MM-YYYY')}`,
      14,
      25
    )
  }

  tableColumn = [
    [
      {content: `No`},
      {content: `No Invoice`},
      {content: `Toko`},
      {content: `Cabang`},
      {content: `Alamat`},
      {content: `Alamat Korespondensi`},
      {content: `Bulan`},
      {content: `Total Diskon`},
      {content: `Total Harga`},
      {content: `Tgl Jatuh Tempo`},
      {content: `Status`},
    ],
  ]

  let no = 1
  data.forEach((element) => {
    const row = [
      {content: no++, styles: {fillColor: '#f0eded'}},
      {content: element.no_invoice, styles: {fillColor: '#f0eded'}},
      {content: element.toko, styles: {fillColor: '#f0eded'}},
      {content: element.kode_cabang, styles: {fillColor: '#f0eded'}},
      {content: element.alamat_cabang, styles: {fillColor: '#f0eded'}},
      {content: element.alamat_korespondensi, styles: {fillColor: '#f0eded'}},
      {content: element.bulan, styles: {fillColor: '#f0eded'}},
      {
        content: element.total_diskon * 100 + ' %',
        styles: {halign: 'right', fillColor: '#f0eded'},
      },
      {
        content: 'Rp. ' + element.grand_total?.toLocaleString(),
        styles: {halign: 'right', fillColor: '#f0eded'},
      },
      {
        content: moment(element.tgl_jatuh_tempo).format('DD-MM-YYYY'),
        styles: {fillColor: '#f0eded'},
      },
      {content: element.status, styles: {fillColor: '#f0eded'}},
    ]
    tableRows.push(row)
    const rowHeadDetail = [
      {
        content: '',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: 'Product',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: 'Tipe Program',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: 'Harga',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: 'Diskon Produk',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: 'Total Harga',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: '',
        colSpan: 5,
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
    ]
    tableRows.push(rowHeadDetail)
    element.customer.forEach((detail) => {
      const rowDetail = [
        {content: ''},
        {content: detail.product},
        {content: detail.tipe_program},
        {content: 'Rp. ' + detail.harga?.toLocaleString(), styles: {halign: 'right'}},
        {content: (detail.diskon_produk || 0) * 100 + ' %', styles: {halign: 'right'}},
        {content: 'Rp. ' + detail.total_harga?.toLocaleString(), styles: {halign: 'right'}},
        {
          content: '',
          colSpan: 5,
        },
      ]
      tableRows.push(rowDetail)
    })
    const rowFooterDetail = [
      {
        content: '',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: '',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
      {
        content: 'Sub Total: ',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'right',
        },
      },
      {
        content:
          'Rp. ' +
          element.customer.reduce((a, b) => a + parseInt(b.harga || 0), 0)?.toLocaleString(),
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'right',
        },
      },
      {
        content:
          element.customer.reduce((a, b) => a + parseFloat(b.diskon_produk || 0) * 100, 0) + ' %',
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'right',
        },
      },
      {
        content:
          'Rp. ' +
          element.customer.reduce((a, b) => a + parseInt(b.total_harga || 0), 0)?.toLocaleString(),
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'right',
        },
      },
      {
        content: '',
        colSpan: 5,
        styles: {
          fontSize: 7,
          fillColor: '#E8E5E5',
          textColor: '#000',
          valign: 'middle',
          halign: 'center',
        },
      },
    ]
    tableRows.push(rowFooterDetail)
  })

  const footer = [
    {
      content: 'Grand Total : ',
      colSpan: 8,
      styles: {halign: 'right', fillColor: '#E8E5E5', textColor: '#000'},
    },
    {
      content:
        'Rp. ' + data.reduce((a, b) => a + parseInt(b.grand_total || 0), 0)?.toLocaleString(),
      styles: {halign: 'right', fillColor: '#E8E5E5', textColor: '#000'},
    },
    {
      content: '',
      colSpan: 2,
      styles: {halign: 'right', fillColor: '#E8E5E5', textColor: '#000'},
    },
  ]
  tableRows.push(footer)

  const printed = [
    {
      content: `Printed By Admin`,
      colSpan: 10,
      styles: {
        fontStyle: 'italic',
        textColor: '#000',
        halign: 'left',
      },
    },
  ]
  tableRows.push(printed)

  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: finalY,
    theme: 'plain',
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    margin: {top: 10},
    bodyStyles: {
      fontSize: 7,
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fontSize: 7,
      fillColor: '#E8E5E5',
      textColor: '#000',
      valign: 'middle',
      halign: 'center',
    },
  })
  tableRows = []
  tableColumn = []
  finalY = doc.lastAutoTable.finalY + 20

  const pages = doc.internal.getNumberOfPages()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  doc.setFontSize(10)
  for (let j = 1; j < pages + 1; j += 1) {
    const horizontalPos = pageWidth / 2
    const verticalPos = pageHeight - 10
    doc.setPage(j)
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: 'center',
    })
  }
  const string = doc.output('bloburl')
  const x = window.open()
  x.document.open()
  x.document.write(
    `<html>
    <head>
    <title>Customer</title>
    </head>
    <body style='margin:0 !important'>
    <embed width='100%' height='100%'src='${string}'></embed>
    </body>
    </html>`
  )
}

export default ReportCustomerPDF
