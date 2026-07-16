import { WasmModuleImporter } from "@/arcade/types"

export default class WasmLoader<TModule extends object> {
  private modulePromise: Promise<TModule> | null = null
  private importer: WasmModuleImporter<TModule> | null = null

  public setImporter(importer: WasmModuleImporter<TModule>): void {
    this.importer = importer
    this.modulePromise = null
  }

  public loadWasm(): Promise<TModule> {
    if (!this.importer) {
      throw new Error('WebAssembly module importer not configured')
    }

    if (!this.modulePromise) {
      this.modulePromise = this.importer()
    }

    return this.modulePromise
  }

  public reset(): void {
    this.modulePromise = null
  }
}