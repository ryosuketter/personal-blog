import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useDropzone } from 'react-dropzone'
import { useController, useForm } from 'react-hook-form'

import { editUserIconValidationSchema } from '@/features/form/validationSchema'
import { uploadAndUpdateIcon } from '@/lib/firebase/uploadIcon'
import { resizeCanvasImage } from '@/lib/resizeCanvasImage'
import { EditUserIcon as EditUserIconForm } from '@/types/editUserIcon'

import styles from './style.module.scss'

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<File>()
  const [scale, setScale] = useState<number>(1)
  const avatarEditorRef = useRef<AvatarEditor>(null)

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDropAccepted,
    accept: {
      'image/png': [],
      'image/jpeg': []
    }
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EditUserIconForm>({
    mode: 'onBlur',
    resolver: zodResolver(editUserIconValidationSchema)
  })

  const { field } = useController({
    name: 'icon',
    control
  })

  const onSubmit = async (data: EditUserIconForm) => {
    const { icon } = data
    if (!icon) return
    if (icon[0].match(/^data:/)) {
      try {
        await uploadAndUpdateIcon(icon[0])
        alert('アイコンを登録しました')
      } catch (error) {
        console.error('Error during icon upload and update:', error)
        alert('アイコンの登録に失敗しました')
      }
    }
  }

  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value))
  }

  const getCroppedImage = () => {
    const image = avatarEditorRef.current?.getImage()
    if (!image) return
    const resizedCanvasImage = resizeCanvasImage({ image: image, width: 80, height: 80 })
    field.onChange([resizedCanvasImage])
    // TODO CloseModal する処理を入れる
  }

  return (
    <>
      <h1>editProfile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="icon">icon</label>
        <div {...getRootProps()} className={isDragAccept ? styles.inputWrapper : styles.inputWrapperDisabled}>
          {field.value && <img src={field.value} alt="preview" className={styles.dropImage} />}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.imgIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className={styles.dropImgText}>画像を選択</p>
          <input id="icon" {...register('icon')} {...getInputProps()} />
        </div>
        {field.value && (
          <button type="button" onClick={() => field.onChange(null)}>
            削除
          </button>
        )}
        <button type="submit">登録</button>
        {errors.icon && errors.icon.message && <p>{errors.icon.message}</p>}
      </form>
      <div>
        <Link href="/user">user</Link>
      </div>

      {/* TODO selectedImage exist TRUE なら Modal 開く仕様にする */}
      {selectedImage && (
        <div>
          <AvatarEditor
            ref={avatarEditorRef}
            image={selectedImage}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={0}
          />
          <input type="range" min={1} max={2} step={0.1} defaultValue={1} onChange={handleScaleChange} />
          <button onClick={getCroppedImage}>Cropped Image</button>
        </div>
      )}
      {/* 参考 https://youtu.be/UWt68ScIZKA?t=29012 */}
    </>
  )
}
