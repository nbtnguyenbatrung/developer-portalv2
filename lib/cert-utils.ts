import fs from 'fs'
import path from 'path'

/**
 * Đọc private key từ thư mục cert (ưu tiên private.pem)
 */
export function getPrivateKey(id: string): string | null {
  const certDir = path.resolve(process.cwd(), 'certs/signature')
  const keyPath = path.join(certDir, `${id}.pem`)
  try {
    return fs.readFileSync(keyPath, 'utf8')
  } catch (error) {
    throw new Error(`Failed to read private key: ${error}`)
  }
}

/**
 * Đọc public key từ thư mục cert (ưu tiên public.crt, rồi public.cer, rồi public.pem)
 */
export function getPublicKey(id: string): string | null {
  const certDir = path.resolve(process.cwd(), 'certs/signature')
  const crtPath = path.join(certDir, `${id}.crt`)
  const cerPath = path.join(certDir, `${id}.cer`)
  const pemPath = path.join(certDir, `${id}.pem`)
  try {
    return fs.readFileSync(crtPath, 'utf8')
  } catch {}
  try {
    return fs.readFileSync(cerPath, 'utf8')
  } catch {}
  try {
    return fs.readFileSync(pemPath, 'utf8')
  } catch (error) {
    throw new Error(`Failed to read public key`)
  }
}
