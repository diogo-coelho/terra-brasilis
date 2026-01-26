import { SceneEvent } from "@/arcade/core";
import { Scene } from "@/arcade/interfaces";
import { SceneManager } from "@/arcade/types";

export default class NewGameScene extends SceneEvent implements Scene {

  public onExit(): void {
    throw new Error("Method not implemented.");
  }

  public drawScene(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, deltaTime: number): void {
    throw new Error("Method not implemented.");
  }

  public handleKeyboardEvent?(event: KeyboardEvent, sceneManager: SceneManager): void {
    throw new Error("Method not implemented.");
  }

  public handleMouseEvent?(event: MouseEvent, sceneManager: SceneManager): void {
    throw new Error("Method not implemented.");
  }
  
  public onEnter(): void {
    throw new Error('Method not implemented.')
  } 

}