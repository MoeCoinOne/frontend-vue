import { s3 } from 'fine-uploader/lib/core/all'
import store from '@/store'
import { uploadConfiguration } from './config'

export function uploadSingleFile (file, category, onSuccessCallback, onErrorCallback, onProgressCallback) {
  const tomorrow = new Date()
  const user = store.state.user
  const isDebug = process.env.NODE_ENV !== 'production'
  tomorrow.setDate((new Date()).getDate() + 1)

  const fineUploadInstance = new s3.FineUploaderBasic({
    debug: isDebug,
    credentials: {
      accessKey: user.identity.accessKeyId,
      secretKey: user.identity.secretAccessKey,
      sessionToken: user.identity.sessionToken,
      expiration: tomorrow
    },
    request: {
      endpoint: `${uploadConfiguration.s3.bucketName}.s3.amazonaws.com`
    },
    objectProperties: {
      acl: 'public-read',
      key (id) {
        return `${category}/${user.uuid}/${this.getUuid(id)}-${this.getName(id)}`
      }
    },
    callbacks: {
      onProgress (id, name, loaded, total) {
        onProgressCallback && onProgressCallback({percent: loaded / total * 100})
        if (isDebug) {
          console.log('progress', arguments, loaded / total * 100)
        }
      },
      onComplete (id, name, content, xhr) {
        onSuccessCallback && onSuccessCallback(Object.assign({}, content, {
          path: `${xhr.responseURL}${category}/${user.uuid}/${this.getUuid(id)}-${this.getName(id)}`
        }))
        if (isDebug) {
          console.log('success', arguments)
        }
        this.removeFileRef(id)
      },
      onError (id, name, reason) {
        onErrorCallback && onErrorCallback({
          id,
          name,
          message: reason
        })
        this.removeFileRef(id)
      }
    }
  })

  fineUploadInstance.addFiles([file])
}
