import type { Context } from "react"
import React, { createContext } from "react"

export function createProvider<T extends () => any>(useProvider: T) {
  type ContextProps = ReturnType<typeof useProvider>

  const BaseContext = createContext<ContextProps>(null)

  const Provider = ({ children = null }) => {
    const provider = useProvider()

    return (
      <BaseContext.Provider value={provider}>{children}</BaseContext.Provider>
    )
  }

  return {
    BaseContext,
    Provider
  }
}

export function createFlexibleProvider<T extends () => any>(
  useProvider: T,
  ContextList: Context<Partial<ReturnType<T>>>[]
) {
  const Provider = ({ children = null }) => {
    const provider = useProvider()

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

export function createNestedProvider<T extends () => any>(
  ...useProviders: Array<T>
) {
  const BaseContexts = useProviders.map((p) => {
    type ContextProps = ReturnType<typeof p>
    return createContext<ContextProps>(null)
  })

  const Provider = ({ children = null }) =>
    BaseContexts.reduce((output, BaseContext, i) => {
      const provider = useProviders[i]()
      return (
        <BaseContext.Provider value={provider}>{output}</BaseContext.Provider>
      )
    }, children)

  return {
    BaseContexts,
    Provider
  }
}
