import { SceneManager } from '../core'

export type NamedScene = { name: string; scene: Scene }
export type Callback = <T>(...args: T[]) => T | void
export type ButtonPosition = {
  canvas: HTMLCanvasElement
  x?: number
  y?: number
  align?: 'vertical' | 'horizontal'
}
export type ButtonColorOnHover = { default: string; hover: string }
export type ButtonClickHandle = {
  event?: MouseEvent
  scene?: SceneManager
  callback?: Callback
}
