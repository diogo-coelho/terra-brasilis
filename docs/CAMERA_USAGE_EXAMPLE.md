# Como Usar o Sistema de Câmera/Scroll

## Configuração Básica

### 1. Criar e configurar a câmera no seu cenário

```typescript
// Em ScenarioOne.ts ou onde você cria o TileMap
import Camera from '@/arcade/core/Camera'

export default class ScenarioOne extends Scenario {
  private _camera: Camera | null = null

  constructor() {
    super()
    
    // Criar a câmera com as dimensões do canvas
    this._camera = new Camera(800, 600)
    
    // Definir limites do mundo (ajuste conforme seu mapa)
    this._camera.setWorldBounds(0, 0, 3000, 3000)
    
    // Configurar velocidade de movimento
    this._camera.speed = 5
    
    // Criar o TileMap
    this.worldMap = new TileMap(grid as Tile[][], 128, 64)
    
    // Associar a câmera ao TileMap
    this.worldMap.camera = this._camera
    
    // Opcional: centralizar a câmera em uma posição inicial
    this._camera.centerOn(1500, 1500)
  }

  public get camera(): Camera | null {
    return this._camera
  }
}
```

### 2. Adicionar controle de teclado no GameScene

```typescript
// Em GameScene.ts
import { SceneEvent } from '@/arcade/core'
import { Scene } from '@/arcade/interfaces'
import EventListenerState from '@/arcade/enums/EventListenerState'
import KeyboardKey from '@/arcade/enums/KeyboardKey'

export default class GameScene extends SceneEvent implements Scene {
  private _match: Match | null = null
  private _scenarioOne: ScenarioOne | null = null
  private _keysPressed: Set<string> = new Set()

  constructor() {
    super()
  }

  public onEnter(): void {
    const gameEngine = arcadeEngine

    this._scenarioOne = new ScenarioOne()
    this._match = new Match(
      gameEngine.canvas,
      gameEngine.context,
      this._scenarioOne
    )
    this._match.startGameSession()
  }

  /**
   * Adicionar tratamento de eventos de teclado
   */
  public handleKeyboardEvent(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    const eventType = event.type === 'keydown' 
      ? EventListenerState.KEY_DOWN 
      : EventListenerState.KEY_UP

    if (eventType === EventListenerState.KEY_DOWN) {
      this._keysPressed.add(event.key)
    } else if (eventType === EventListenerState.KEY_UP) {
      this._keysPressed.delete(event.key)
    }
  }

  /**
   * Atualizar câmera baseado nas teclas pressionadas
   */
  public update(
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    deltaTime?: number
  ): void {
    
  }

  public handleMouseEvent(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    this._match?.handleMouseEvent(event)
  }

  public onExit(): void {
    this._keysPressed.clear()
    this._scenarioOne = null
    this._match = null
  }
}
```

## Funcionalidades Avançadas

### Centralizar câmera em uma unidade

```typescript
// Seguir uma unidade específica
const playerUnit = this._units[0]
camera.centerOn(playerUnit.positionX, playerUnit.positionY)
```

### Ajustar velocidade dinamicamente

```typescript
// Movimento rápido com Shift
if (this._keysPressed.has('Shift')) {
  camera.speed = 10
} else {
  camera.speed = 5
}
```

### Zoom (se implementar no futuro)

```typescript
camera.zoomLevel = 1.5 // 150% zoom
```

### Verificar se algo está visível

```typescript
if (camera.isVisible(unit.positionX, unit.positionY, unit.width, unit.height)) {
  // Renderizar ou processar apenas se visível
}
```

### Converter coordenadas de mouse

```typescript
// Converter clique do mouse para coordenadas do mundo
public handleMouseEvent(event: MouseEvent): void {
  const camera = this._scenarioOne?.camera
  if (camera) {
    const worldCoords = camera.screenToWorld(event.offsetX, event.offsetY)
    console.log('Clicou em:', worldCoords.x, worldCoords.y)
  }
}
```

## Controles Implementados

- **Setas do teclado** ou **WASD**: Mover câmera
- A velocidade pode ser ajustada via `camera.speed`
- Os limites do mundo previnem a câmera de sair do mapa
- Sistema de culling renderiza apenas tiles visíveis (melhor performance)

## Notas Importantes

1. **Performance**: O culling automático significa que apenas tiles visíveis são renderizados
2. **Coordenadas**: Lembre-se de converter coordenadas de mouse usando `screenToWorld()` quando a câmera está ativa
3. **Limites**: Configure `setWorldBounds()` corretamente para o tamanho do seu mapa
4. **Unidades**: Se você renderizar unidades, pode precisar aplicar o mesmo offset da câmera

## Próximos Passos

- Implementar suavização de movimento (smooth scrolling)
- Adicionar zoom funcional
- Implementar "seguir unidade" automático
- Adicionar mini-mapa
