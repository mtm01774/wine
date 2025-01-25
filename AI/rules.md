Aqui está um conjunto de regras padronizadas para desenvolvimento do site de vinhos em Next.js 14+, projetado para garantir consistência entre diferentes LLMs:

### 1. **Estrutura do Projeto**
```bash
/src
  /app
    /[lang]
      /(public)
        /home
        /products
        /about
      /(auth)
        /login
        /register
      layout.tsx
  /components
    /ui
      /Button
        Button.tsx
        Button.test.tsx
        index.ts
  /hooks
  /lib
  /stores
  /types
  /public
    /fonts
    /images
  /styles
```

### 2. **Regras Principais**

**TypeScript:**
- Interfaces para todos os props de componentes
- Type guards para dados de API
- Tipagem estrita (`strict: true` no tsconfig)

**Componentes:**
```tsx
// Exemplo de componente
interface WineCardProps {
  vintage: number;
  region: string;
}

export default function WineCard({ vintage, region }: WineCardProps) {
  return (
    <article className="wine-card">
      <h3>{vintage} Vintage</h3>
      <p>{region}</p>
    </article>
  )
}
```

**Estilização:**
- Tailwind CSS com configuração de tema
- Arquivo `tokens.ts` para cores e tipografia
```ts
// tokens.ts
export const colors = {
  burgundy: '#6d071a',
  oak: '#d4a373',
}
```

### 3. **Gerenciamento de Estado**
- Zustand para estado global
- Schema Zod para validação de formulários
```ts
// stores/wineStore.ts
import { create } from 'zustand'

interface WineState {
  selectedWine: Wine | null;
  setSelectedWine: (wine: Wine) => void;
}

export const useWineStore = create<WineState>((set) => ({
  selectedWine: null,
  setSelectedWine: (wine) => set({ selectedWine: wine }),
}))
```

### 4. **API e Data Fetching**
```tsx
// app/[lang]/products/page.tsx
async function getWines() {
  const res = await fetch('https://api.wines.com/vintages', {
    next: { tags: ['wines'] }
  })
  return res.json()
}

export default async function ProductsPage() {
  const wines = await getWines()
  
  return (
    <WineGrid wines={wines} />
  )
}
```

### 5. **Otimizações**
- Dynamic imports para componentes pesados
```tsx
const WineCarousel = dynamic(() => import('@/components/WineCarousel'), {
  ssr: false,
  loading: () => <Skeleton />
})
```

### 6. **Testes**
```tsx
// Button.test.tsx
test('renders primary button', () => {
  render(<Button variant="primary">Buy Now</Button>)
  expect(screen.getByRole('button')).toHaveClass('bg-burgundy')
})
```

### 7. **Segurança**
```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}'';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
  `
}
```

### 8. **Internacionalização**
```ts
// i18n-config.ts
export const locales = ['en', 'fr', 'es']
export const defaultLocale = 'en'
```

### 9. **Padrões de Commit**
```
feat: add wine filtering component
fix: resolve mobile menu overflow
docs: update authentication guide
```

### 10. **Monitoramento**
```tsx
// app/[lang]/layout.tsx
export function reportWebVitals(metric) {
  console.log(metric) // Integrar com serviço de analytics
}
```

### Checklist de Validação:
1. [ ] Teste de Lighthouse Score > 90
2. [ ] Validação de acessibilidade com axe DevTools
3. [ ] Verificação de tipos (`npm run type-check`)
4. [ ] Cobertura de testes > 80%

Essas regras garantem performance, segurança e manutenibilidade, especialmente importante para um site de vinhos que provavelmente terá: 
- Galerias de imagens pesadas
- Sistemas complexos de filtragem
- Integração com APIs de estoque
- Componentes interativos de degustação virtual

Quer detalhes específicos de alguma seção?