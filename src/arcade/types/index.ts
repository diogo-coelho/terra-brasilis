import { Scene } from '@/arcade/interfaces'

export type SceneManager = import('../core/SceneManager').default
export type Game = import('../core/Game').default

export type NamedScene = { name: string; scene: Scene }
export type EventPayload = {
  eventType: string
  eventKey?: string
  action: (...args: any[]) => any
}
export type ImageResizePayload = {
  targetWidth?: number
  targetHeight?: number
  option?: 'cover' | 'contain'
}
export type Position = {
  x: number
  y: number
}
