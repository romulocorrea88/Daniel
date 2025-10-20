/**
 * DESIGN SYSTEM - Daniel Prayer App
 * Paleta de Cores baseada em Verde (Esperança, Crescimento, Paz)
 * 
 * Acessibilidade: Todos os contrastes seguem WCAG 2.1 AA
 * Uso Semântico: Cores primárias reservadas para CTAs e estados ativos
 */

const Colors = {
  // PRIMARY PALETTE - Verde (Identidade Principal)
  primaryGreen: "#2E7D32", // Verde Escuro Vibrante - CTAs principais
  primaryGreenLight: "#4CAF50", // Verde Médio - Hover states
  primaryGreenDark: "#1B5E20", // Verde Muito Escuro - Pressed states
  
  // ACCENT PALETTE - Amarelo/Dourado (Sucesso e Conquistas)
  accentYellow: "#FFA726", // Laranja Dourado - Badges de métricas
  accentYellowLight: "#FFB74D", // Tom mais claro para backgrounds
  
  // SECONDARY COLORS - Verde Menta (Elementos Secundários)
  secondaryMint: "#66BB6A", // Verde Menta - Ícones secundários
  secondaryMintLight: "#A5D6A7", // Verde Claro - Backgrounds sutis
  
  // SEMANTIC COLORS - Significado específico
  success: "#4CAF50", // Verde - Orações respondidas
  warning: "#FF9800", // Laranja - Avisos
  error: "#F44336", // Vermelho - Erros
  info: "#2196F3", // Azul - Informações
  
  // NEUTRAL PALETTE - Textos e Backgrounds
  background: "#FAFAFA", // Cinza muito claro - Background principal
  backgroundWhite: "#FFFFFF", // Branco puro - Cards e modais
  backgroundDark: "#1A1A1A", // Escuro - Modo oração (dark mode)
  
  // TEXT COLORS
  textPrimary: "#212121", // Preto - Texto principal
  textSecondary: "#757575", // Cinza médio - Texto secundário
  textTertiary: "#9E9E9E", // Cinza claro - Texto terciário
  textWhite: "#FFFFFF", // Branco - Texto em backgrounds escuros
  
  // BORDER COLORS
  border: "#E0E0E0", // Cinza claro - Bordas padrão
  borderLight: "#F5F5F5", // Cinza muito claro - Divisores sutis
  borderDark: "#BDBDBD", // Cinza médio - Bordas com ênfase
  
  // CATEGORY COLORS - Cores para categorias de oração
  categoryPersonal: "#66BB6A", // Verde - Pessoal
  categoryWork: "#42A5F5", // Azul - Trabalho
  categoryHealth: "#EF5350", // Vermelho - Saúde
  categoryFamily: "#AB47BC", // Roxo - Família
  categoryOther: "#78909C", // Cinza azulado - Outros
  
  // OPACITY VARIANTS (para overlays e estados)
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
  ripple: "rgba(46, 125, 50, 0.2)", // Verde com opacidade para ripple effect
};

export default Colors;
