import type { Context, ReactNode } from "react"
import { createContext } from "react"

type ProviderHook = (_?: any) => any

export function createProvider<T extends ProviderHook>(useProvider: T) {
  type ContextProps = ReturnType<typeof useProvider>
  type ProviderProps = Parameters<T>[0] & { children?: ReactNode }
  const BaseContext = createContext<ContextProps>(null)

  const Provider = ({ children = null, ...props }: ProviderProps) => {
    const provider = useProvider(props)

    return (
      <BaseContext.Provider value={provider}>{children}</BaseContext.Provider>
    )
  }

  return {
    BaseContext,
    Provider
  }
}

export function createFlexibleProvider<T extends ProviderHook>(
  useProvider: T,
  ContextList: Context<Partial<ReturnType<T>>>[]
) {
  type ProviderProps = Parameters<T>[0] & { children?: ReactNode }

  const Provider = ({ children = null, ...props }: ProviderProps) => {
    const provider = useProvider(props)

    return ContextList.reduce(
      (output, BaseContext) => (
        <BaseContext.Provider value={provider}>{output}</BaseContext.Provider>
      ),
      children
    )
  }

  return {
    Provider
  }
}

export function createNestedProvider<T extends ProviderHook>(
  ...useProviders: Array<T>
) {
  const BaseContexts = useProviders.map((p) => {
    type ContextProps = ReturnType<typeof p>
    return createContext<ContextProps>(null)
  })
  type ProviderProps = Parameters<T>[0] & { children?: ReactNode }

  const Provider = ({ children = null, ...props }: ProviderProps) =>
    BaseContexts.reduce((output, BaseContext, i) => {
      const provider = useProviders[i](props)
      return (
        <BaseContext.Provider value={provider}>{output}</BaseContext.Provider>
      )
    }, children)

  return {
    BaseContexts,
    Provider
  }
}
