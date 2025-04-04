export type NamedScene = {
  name: string
  scene: Scene
}

export type Callback = <T>(...args: T[]) => T | void

export type SceneConfig = {
  event: KeyboardEvent,
  callback?: Callback,
  scene?: SceneManager,
}