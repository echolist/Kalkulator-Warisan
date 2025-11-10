import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { InheritanceCalculator } from './InheritanceCalculator'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InheritanceCalculator />
  </StrictMode>,
)
