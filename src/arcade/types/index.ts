import { Scene } from '@/arcade/interfaces'

export type SceneManager = import('../core/SceneManager').default
export type Game = import('../core/Game').default

export type NamedScene = { name: string; scene: Scene }
export type EventPayload = {
  eventType: string
  eventKey?: string
  action: (...args: any[]) => any
}
