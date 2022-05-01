# puro - simple react context provider

`puro` is a react typescript utility library from [plasmo](https://www.plasmo.com/) to create react context with minimal boilerplate using the [react hook API](https://reactjs.org/docs/hooks-intro.html).

## Usage

### Install

```sh
pnpm add puro
```

### Create a provider and hook pairs:

```tsx
// providers/view-provider.tsx
import { useContext, useState } from "react"

import { createProvider } from "puro"

// A simple example of a provider hook
const useViewProvider = () => {
  const [x, _setX] = useState(0)
  const [y, _setY] = useState(0)

  return {
    x,
    y,
    setX:(newX: string | number) => _setX(parseFloat(newX)),
    setY:(newY: string | number) => _setY(parseFloat(newY))
  }
}

const { BaseContext, Provider } = createProvider(useViewProvider)

export const ViewProvider = Provider

export const useView = () => useContext(BaseContext)
```

### Wrap your top component with the provider, here's a NextJS example using _app.tsx:

```tsx
// _app.tsx
import { ViewProvider } from "~providers/view-provider"
import type { AppProps } from "next/app"

function CoolApp({ Component, pageProps }: AppProps) {
  return (
    <ViewProvider>
      <Component {...pageProps} />
    </ViewProvider>
  )
}

export default CoolApp
```

### Use the context hook in your component

```tsx
// components/set-coordinate.tsx
import { useView } from "~providers/view-provider"
import type { AppProps } from "next/app"

export function XInput() {
  const { x, setX } = useView()
  return (
    <input value={x} onChange={(e)=> setX(e.target.value)}/>
  )
}

export function YInput() {
  const { x, setY } = useView()
  return (
    <input value={y} onChange={(e)=> setY(e.target.value)}/>
  )
}

```


## Development

### Terminal 1:

```sh
# install deps
pnpm i

# run dev server
pnpm dev
```

### Terminal 2:

```
pnpm test
```

## Publish process

1. Commit any changes to the repository.
2. `pnpm version patch | minor | major`
3. `pnpm publish`

# Support

The [Battle Station](https://www.plasmo.com/s/chat) is open for ambassadors.

# License

[MIT](./license) ⭐ [Plasmo Corp.](https://plasmo.com)
