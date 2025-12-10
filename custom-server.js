import { createServer } from 'https'
import { parse } from 'url'
import { readFileSync, existsSync } from 'fs'
import next from 'next'
import path from 'path'

const dev = process.env.NODE_ENV !== 'production'
console.log('dev la::::', dev)
const app = next({ dev })
const handle = app.getRequestHandler()

// Xác định đường dẫn chứng chỉ dựa trên môi trường
const certPath = dev
  ? path.resolve('./certs/mtls/napas_ob_mtls_certificate.crt') // Local dev
  : // : '/etc/tls/napas_ob_sign_certificate.crt' // Kubernetes Secret Generic
    '/etc/tls/tls.crt' // Kubernetes Secret

const keyPath = dev
  ? path.resolve('./certs/mtls/napas_ob_mtls_private_key.pem') // Local dev
  : // : '/etc/tls/napas_ob_sign_private_key.pem' // Kubernetes Secret Generic
    '/etc/tls/tls.key' // Kubernetes Secret

// Kiểm tra xem file có tồn tại không
if (!existsSync(certPath) || !existsSync(keyPath)) {
  console.error('❌ Chứng chỉ SSL không tồn tại! Kiểm tra lại đường dẫn.')
  process.exit(1)
}

const httpsOptions = {
  key: readFileSync(keyPath),
  cert: readFileSync(certPath),
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, () => {
    console.log(`> Server running at https://localhost:3000`)
  })
})
