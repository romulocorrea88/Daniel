# Integração da API da Bíblia - GetBible API

## ✅ Integração Completa

A API da Bíblia foi integrada com sucesso ao aplicativo usando a **GetBible API** (https://getbible.net).

## 📚 Características

- **API Gratuita**: Sem necessidade de API key
- **Tradução**: Almeida Atualizada (1911) em Português
- **Cache**: Sistema de cache para melhor performance
- **Fallback**: Mensagens de erro amigáveis em caso de falha
- **Todos os 66 livros**: Bíblia completa disponível

## 🔧 Arquivos Criados/Modificados

### 1. **src/types/bible.ts** (NOVO)
Tipos TypeScript para a API da Bíblia:
- `BibleTranslation`
- `BibleVerse`
- `BibleChapter`
- `BibleBook`
- `BibleResponse`
- `BibleQueryResponse`

### 2. **src/api/bible-service.ts** (NOVO)
Serviço completo com funções para:
- `getBibleTranslations()` - Lista todas as traduções disponíveis
- `getPortugueseTranslations()` - Filtra apenas traduções em português
- `getBibleVerse(translation, reference)` - Busca versículos específicos
- `getBibleChapter(translation, book, chapter)` - Busca capítulos completos
- `getBibleBook(translation, book)` - Busca livros completos
- `searchBible(translation, searchTerm, book?)` - Busca por texto
- Funções auxiliares: `getVerseText()`, `formatVerseReference()`

### 3. **src/data/bibleData.ts** (ATUALIZADO)
- Adicionado campo `apiNumber` a todos os livros (1-66)
- Adicionados todos os 66 livros da Bíblia (antes tinha apenas alguns)
- Função `getBibleChapter()` atualizada para usar a API real
- Sistema de cache implementado
- Configuração da API GetBible

## 🚀 Como Usar

### Uso Básico (Já Integrado)

O app já está usando a API automaticamente! Quando você navega para qualquer livro e capítulo na tela de Bíblia, os dados são carregados da API GetBible.

**Exemplo**:
- Vá para a tela "Bíblia"
- Selecione "João"
- Selecione "Capítulo 3"
- Os versículos serão carregados da API em português (ACF)

### Uso Avançado (API Service)

Se você quiser usar as funções avançadas da API:

```typescript
import {
  getBibleVerse,
  getBibleTranslations,
  searchBible,
  PORTUGUESE_TRANSLATIONS
} from '../api/bible-service';

// Buscar um versículo específico
const verse = await getBibleVerse('acf', 'João 3:16');

// Buscar todas as traduções em português
const portugueseVersions = await getPortugueseTranslations();

// Buscar versículos com uma palavra
const results = await searchBible('acf', 'amor');
```

## 📖 Traduções Portuguesas Disponíveis

A GetBible API oferece a tradução **Almeida Atualizada** (1911) em português, que é a tradução configurada por padrão no aplicativo.

```typescript
// Configuração atual
DEFAULT_TRANSLATION = 'almeida'; // Almeida Atualizada (Portuguese)
```

## 🔄 Sistema de Cache

O sistema implementa cache automático para melhor performance:
- Capítulos carregados são armazenados em memória
- Não recarrega dados já buscados
- Cache limpo ao reiniciar o app

## 🌐 Endpoints da API

**Base URL**: `https://api.getbible.net/v2`

Exemplos de endpoints:
- Todas as traduções: `GET /translations.json`
- Capítulo específico: `GET /{translation}/{book}/{chapter}.json`
- Livro completo: `GET /{translation}/{book}.json`

**Query API**: `https://query.getbible.net/v2`
- Buscar versículo: `GET /{translation}/{reference}.json`

## ✨ Próximas Melhorias Possíveis

1. **Seletor de Tradução**: Permitir usuário escolher entre ACF, ARA, NVI
2. **Pesquisa Avançada**: Implementar busca de versículos por palavra-chave
3. **Download Offline**: Baixar livros para leitura offline
4. **Áudio da Bíblia**: Integrar narração de áudio dos capítulos
5. **Comparação de Traduções**: Ver múltiplas traduções lado a lado

## 📝 Notas Técnicas

- A API não requer autenticação
- Suporta CORS para uso em navegadores/apps
- Responde em formato JSON
- Mantida ativamente (última atualização: 2025)

## 🐛 Resolução de Problemas

Se a API não carregar:
1. Verifique conexão com internet
2. Veja logs do console para erros específicos
3. A API mostrará mensagem amigável em caso de erro
4. Sistema de fallback retorna mensagem de erro ao invés de quebrar o app

## 🎉 Status

**✅ INTEGRAÇÃO COMPLETA E FUNCIONANDO!**

O aplicativo agora tem acesso à Bíblia completa em português através da GetBible API.
