import {jsPDF} from 'jspdf'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import angkaTerbilang from '@develoka/angka-terbilang-js'
import moment from 'moment'

const KwitansiPDF = (data, no) => {
  const doc = new jsPDF('p', 'mm', 'a4')
  const today = moment().format('DD MMMM YYYY')
  //   doc.text(`Kwitansi Pembayaran`, 14, 15)
  doc.setFontSize(20)
  //   doc.text(data.toko, 80, 15)

  doc.setFontSize(11)
  doc.setProperties({
    title: 'Kwitansi Pembayaran',
  })
  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Bold.ttf'), 'Lora', 'bold')
  doc.setFont('Lora', 'bold')
  var imgData = toAbsoluteUrl('/media/patterns/kuitansittd.png')
  doc.addImage(imgData, 'JPEG', 15, 17, 180, 240)
  doc.text(no, 94, 65)
  doc.text(data.toko.toUpperCase(), 80, 83)
  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Regular.ttf'), 'Lora', 'normal')
  doc.setFont('Lora', 'normal')
  //   doc.text(data.alamat, 80, 83)
  let jml_alamat = data.alamat.length
  if (jml_alamat > 20) {
    doc.text(data.alamat.slice(0, 37), 80, 89)
  }
  if (jml_alamat > 50) {
    doc.text(data.alamat.slice(37, 100), 80, 94)
  }
  if (jml_alamat < 20) {
    doc.text(data.alamat, 80, 89)
  }

  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Bold.ttf'), 'Lora', 'bold')
  doc.setFont('Lora', 'bold')
  doc.text('#' + data.total_harga.toLocaleString() + '#', 83, 104)
  doc.text('Layanan berlangganan Nagatech Sistem Integrator, ', 80, 114)
  const desk = `Total nilai Rp. ${data.total_harga.toLocaleString()} (${angkaTerbilang(
    data.total_harga
  )})`
  const jml_desk = desk.length
  if (jml_desk > 20) {
    doc.text(desk.slice(0, 53), 80, 119)
  }
  if (jml_desk > 53) {
    doc.text(desk.slice(53, 100), 80, 124)
  }
  if (jml_desk < 20) {
    doc.text(desk, 80, 119)
  }
  //   doc.text(desk, 80, 110)
  doc.text('#' + angkaTerbilang(data.total_harga) + '#', 83, 135)
  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Regular.ttf'), 'Lora', 'normal')
  doc.setFont('Lora', 'normal')
  doc.text('Bandung, ' + today, 133, 167)
  doc.addFont(toAbsoluteUrl('/media/fonts/lora/Lora-Bold.ttf'), 'Lora', 'bold')
  doc.setFont('Lora', 'bold')
  const jml_toko = data.toko.length
  if (jml_toko < 12) {
    doc.text(data.toko, 157, 216)
  } else {
    doc.text(data.toko, 147, 216)
  }

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
  //   const x = window.open()
  //   x.document.open()
  //   x.document.write(
  //     `<html>
  //     <head>
  //     <title>Kirim Pohon</title>
  //     </head>
  //     <body style='margin:0 !important'>
  //     <embed width='100%' height='100%'src='${string}'></embed>
  //     </body>
  //     </html>`
  //   )
}

export default KwitansiPDF
