export type AppModule = "b2c" | "c2c"

const APP_MODULE_KEY = "app-module"

/** Remember last active module for tab screens without ?module= in URL. */
export function setAppModule(module: AppModule): void {
  if (typeof window === "undefined") return
  sessionStorage.setItem(APP_MODULE_KEY, module)
}

export function getAppModule(): AppModule {
  if (typeof window === "undefined") return "c2c"
  return sessionStorage.getItem(APP_MODULE_KEY) === "b2c" ? "b2c" : "c2c"
}

/** URL param wins; otherwise fall back to session (defaults c2c). */
export function resolveAppModule(param: string | null): AppModule {
  if (param === "b2c" || param === "c2c") {
    setAppModule(param)
    return param
  }
  return getAppModule()
}
