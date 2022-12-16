import {jsPDF} from 'jspdf'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import angkaTerbilang from '@develoka/angka-terbilang-js'
import moment from 'moment'

const InvoicePDF = (data) => {
  const today = moment().format('YYYY-MM-DD')
  const doc = new jsPDF('p', 'mm', 'a4')
  //   doc.text(`Faktur Maintenance`, 14, 15)
  doc.setFontSize(20)
  //   doc.text(data.toko, 80, 15)

  doc.setFontSize(9)
  doc.setProperties({
    title: 'Faktur Maintenance',
  })
  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Bold.ttf'), 'Lora', 'bold')
  doc.setFont('Lora', 'bold')
  var imgData = toAbsoluteUrl('/media/patterns/FakturNew.jpg')
  doc.addImage(imgData, 'JPEG', 15, 15, 180, 240)
  doc.text(data.no_invoice, 57, 68)
  doc.text(today, 57, 73)
  doc.text(data.tgl_jatuh_tempo, 57, 77)
  doc.text(data.toko, 142, 68)
  let jml_alamat = data.alamat_cabang.length

  if (jml_alamat > 20) {
    doc.text(data.alamat_cabang.slice(0, 37), 142, 73)
  }
  if (jml_alamat > 50) {
    doc.text(data.alamat_cabang.slice(37, 75), 142, 77)
  }
  if (jml_alamat > 70) {
    doc.text(data.alamat_cabang.slice(75, 100), 142, 80)
  }
  if (jml_alamat < 20) {
    doc.text(data.alamat_cabang, 142, 73)
  }
  if (jml_alamat > 80) {
    doc.text(data.alamat_cabang.slice(78, 100), 142, 74)
  }
  // doc.text(data.alamat_cabang, 142, 68)
  // doc.text(data.alamat_cabang.slice(0, 25), 142, 68)
  doc.text(data.telepon, 142, 83)
  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Regular.ttf'), 'Lora', 'normal')
  doc.setFont('Lora', 'normal')
  let padding = 5
  for (let index = 0; index < data.customer.length; index++) {
    if (index === 0) {
      doc.text(data.customer[index].product, 30, 114)
      doc.text(data.customer[index].qty.toString(), 110, 114)
      doc.text('Rp. ' + data.customer[index].harga.toLocaleString(), 133, 114)
      doc.text('Rp. ' + data.customer[index].total_harga.toLocaleString(), 165, 114)
    } else {
      doc.text(data.customer[index].product, 30, 114 + padding)
      doc.text(data.customer[index].qty.toString(), 110, 114 + padding)
      doc.text('Rp. ' + data.customer[index].harga.toLocaleString(), 133, 114 + padding)
      doc.text('Rp. ' + data.customer[index].total_harga.toLocaleString(), 165, 114 + padding)
      padding = padding + 5
    }
  }
  doc.text('Total Harga'.toLocaleString(), 133, 166)
  doc.text('Rp. ' + data.total_harga.toLocaleString(), 163, 166)
  doc.text('Diskon Khusus'.toLocaleString(), 133, 172)
  doc.text('Rp. ' + (data.total_diskon * data.total_harga).toLocaleString(), 163, 172)
  doc.text('Diskon Tambahan'.toLocaleString(), 133, 178)
  doc.text('Rp. ' + (data.diskon_tambahan || 0).toLocaleString(), 163, 178)
  doc.setTextColor(255, 255, 255)
  doc.text('Rp. ' + (data.grand_total - (data.diskon_tambahan || 0)).toLocaleString(), 163, 189)
  doc.setTextColor(0, 0, 0)
  doc.text('#' + angkaTerbilang(data.grand_total - (data.diskon_tambahan || 0)) + '#', 127, 204)
  // doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-BoldItalic.ttf'), 'Lora', 'bold-italic')
  // doc.setFont('Lora', 'bold-italic')
  // doc.text(data.toko.toLocaleString(), 152, 211)

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
  const string = doc.output('datauristring')
  return string
  // const x = window.open()
  // x.document.open()
  // x.document.write(
  //   `<html>
  //     <head>
  //     <title>Invoice</title>
  //     </head>
  //     <body style='margin:0 !important'>
  //     <embed width='100%' height='100%'src='${string}'></embed>
  //     </body>
  //     </html>`
  // )
}

export default InvoicePDF
