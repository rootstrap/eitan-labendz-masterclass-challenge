export type Course = {
  title: string
  instructor_name: string
  instructor_image_url: string
  favorite: boolean
  id: number
}

export type ToggleFavoriteResponse = {
  status: ResponseStatus
  message: string
}

export enum ResponseStatus {
  success = 'success',
  error = 'error',
}
