import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import moment from 'moment'

const ReportHistoryPaymentPDF = (data, head) => {
  const doc = new jsPDF('l', 'mm', 'a4')
  let tableRows = []
  let tableColumn = []

  let finalY = 30
  doc.setFontSize(10)
  doc.text('History Payment Report iPaymu', 14, 15)
  // doc.text('Nagatech SI', 170, 15)
  var imgData = toAbsoluteUrl('/media/logos/nsi-logo.png')
  doc.addImage(imgData, 'png', 165, 5, 30, 26)

  doc.setProperties({
    title: 'History Payment iPaymu',
  })
  doc.setFontSize(9)
  doc.text(`Periode : ${head.tgl_awal} s/d ${head.tgl_akhir}`, 14, 25)

  tableColumn = [
    [
      {content: `No`},
      {content: `Transaction ID`},
      {content: `Nama Toko / Customer`},
      {content: `Email`},
      {content: `No Telepon`},
      {content: `Total Harga`},
      {content: `Biaya Admin`},
      {content: `Ref ID`},
      {content: `Tipe Pembayaran`},
      {content: `Saluran Pembayaran`},
      {content: `Tgl Transaksi`},
      {content: `Tgl Terbayar`},
      {content: `Tgl Expired`},
      {content: `Status`},
    ],
  ]

  let no = 1
  data.forEach((element) => {
    const row = [
      {content: no++},
      {content: element.TransactionId},
      {content: element.BuyerName},
      {content: element.BuyerEmail},
      {content: element.BuyerPhone},
      {
        content: 'Rp. ' + parseInt(element.Amount).toLocaleString(),
        styles: {halign: 'right'},
      },
      {
        content: 'Rp. ' + parseInt(element.Fee).toLocaleString(),
        styles: {halign: 'right'},
      },
      {content: element.ReferenceId},
      {content: element.TypeDesc},
      {content: element.PaymentChannel},
      {content: moment(element.CreatedDate).format('DD-MM-YYYY')},
      {content: moment(element.SuccessDate).format('DD-MM-YYYY')},
      {content: moment(element.ExpiredDate).format('DD-MM-YYYY')},
      {content: element.StatusDesc},
    ]
    tableRows.push(row)
  })

  const footer = [
    {content: 'Total : ', colSpan: 5, styles: {halign: 'right'}},
    {
      content: 'Rp. ' + data.reduce((a, b) => a + parseInt(b.Amount), 0).toLocaleString(),
      styles: {halign: 'right'},
    },
    {
      content: 'Rp. ' + data.reduce((a, b) => a + parseInt(b.Fee), 0).toLocaleString(),
      styles: {halign: 'right'},
    },
  ]
  tableRows.push(footer)

  const printed = [
    {
      content: `Printed By Admin`,
      colSpan: 14,
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
