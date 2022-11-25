import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import moment from 'moment'

const ReportHistoryPaymentPDF = (data, head) => {
  const doc = new jsPDF('p', 'mm', 'a4')
  let tableRows = []
  let tableColumn = []

  let finalY = 30
  doc.setFontSize(10)
  doc.text('History Payment Report', 14, 15)
  // doc.text('Nagatech SI', 170, 15)
  var imgData = toAbsoluteUrl('/media/logos/nsi-logo.png')
  doc.addImage(imgData, 'png', 165, 5, 30, 26)

  doc.setProperties({
    title: 'History Payment',
  })
  doc.setFontSize(9)
  doc.text(
    `Periode : ${moment(head.tgl_awal).format('DD-MM-YYYY')}) s/d ${moment(head.tgl_akhir).format(
      'DD-MM-YYYY'
    )}`,
    14,
    25
  )

  tableColumn = [
    [
      {content: `No`},
      {content: `Kode Toko / Customer`},
      {content: `Nama Toko / Customer`},
      {content: `No Bayar`},
      {content: `Tgl Bayar`},
      {content: `Product`},
      {content: `Qty`},
      {content: `Harga`},
      {content: `Bulan`},
      {content: `Total Harga`},
    ],
  ]

  let no = 1
  data.forEach((element) => {
    const row = [
      {content: no++},
      {content: element.kode_toko},
      {content: element.toko},
      {content: element.no_bayar},
      {content: moment(element.tanggal_bayar).format('DD-MM-YYYY')},
      {content: element.product},
      {content: element.qty, styles: {halign: 'right'}},
      {
        content: 'Rp. ' + element.harga.toLocaleString(),
        styles: {halign: 'right'},
      },
      {content: element.bulan},
      {
        content: 'Rp. ' + element.total_harga.toLocaleString(),
        styles: {halign: 'right'},
      },
    ]
    tableRows.push(row)
  })

  const footer = [
    {content: 'Total : ', colSpan: 6, styles: {halign: 'right'}},
    {content: data.reduce((a, b) => a + b.qty, 0), styles: {halign: 'right'}},
    {
      content: 'Rp. ' + data.reduce((a, b) => a + b.harga, 0).toLocaleString(),
      styles: {halign: 'right'},
    },
    {
      content: '',
      styles: {halign: 'right'},
    },
    {
      content: 'Rp. ' + data.reduce((a, b) => a + b.total_harga, 0).toLocaleString(),
      styles: {halign: 'right'},
    },
  ]
  tableRows.push(footer)

  const printed = [
    {
      content: `Printed By Admin`,
      colSpan: 9,
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
  finalY = doc.autoTableEndPosY() + 20

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
    <title>History Payment</title>
    </head>
    <body style='margin:0 !important'>
    <embed width='100%' height='100%'src='${string}'></embed>
    </body>
    </html>`
  )
}

export default ReportHistoryPaymentPDF
