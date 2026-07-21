# WebAssembly no projeto

Este guia mostra como carregar e usar o módulo WebAssembly gerado pelo AssemblyScript neste projeto.

## Pré-requisitos

1. Gerar os artefatos wasm/js:

```bash
npm run asbuild
```

Isso gera (entre outros):
- `build/release.wasm`
- `build/release.js`
- `build/release.d.ts`

## Opção 1: uso direto com `import()` dinâmico

Use quando quiser chamar funções wasm sem criar uma classe de suporte.

```ts
async function runWasmExample(): Promise<void> {
  const wasm = await import('../../../build/release.js')
  const total = wasm.add(2, 3)
  console.log('WASM add:', total)
}

runWasmExample()
```

## Opção 2: uso com `WasmLoader` (recomendado)

A classe `WasmLoader` adiciona cache de carregamento e evita reinstanciar o módulo sem necessidade.

```ts
import WasmLoader from '@/arcade/web-assembly'

type ReleaseWasmModule = typeof import('../../../build/release.js')

const wasmLoader = new WasmLoader<ReleaseWasmModule>()
wasmLoader.setImporter(() => import('../../../build/release.js'))

export async function sumWithWasm(a: number, b: number): Promise<number> {
  const wasm = await wasmLoader.loadWasm()
  return wasm.add(a, b)
}
```

## Exemplo de reset do cache

Se você quiser forçar novo carregamento (hot-reload, troca de módulo etc.):

```ts
wasmLoader.reset()
const wasm = await wasmLoader.loadWasm()
```

## Tratamento de erro

```ts
try {
  const wasm = await wasmLoader.loadWasm()
  console.log(wasm.add(10, 20))
} catch (error) {
  console.error('Falha ao carregar WebAssembly:', error)
}
```

## Dicas importantes

- Sempre chame `setImporter(...)` antes de `loadWasm()`.
- O caminho em `import('../../../build/release.js')` depende de onde seu arquivo TS está. Ajuste o relativo conforme necessário.
- As funções exportadas do wasm ficam tipadas via `build/release.d.ts` (por exemplo: `add(a: number, b: number): number`).
