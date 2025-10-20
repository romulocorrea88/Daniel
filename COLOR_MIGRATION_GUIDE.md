# Guia de Migração de Cores - Daniel App

## Design System Implementado
✅ `/src/constants/Colors.js` - Paleta completa de verdes

## Arquivos Atualizados com Nova Paleta Verde:

### ✅ CONCLUÍDO:
1. `/src/constants/Colors.js` - Design System criado
2. `/src/screens/HomeScreen.js` - Verde aplicado
3. `/src/screens/SplashScreen.js` - Logo verde
4. `/src/components/HomeMetricsPanel.js` - Badges com accent colors
5. `/src/components/PrayerItem.js` - Ícones verdes
6. `/src/navigation/RootNavigator.js` - Tabs verdes quando ativas

### 🔄 EM PROGRESSO (usar Colors.js):
- AuthScreen.js - Substituir #DC2626 → Colors.primaryGreen
- CreatePrayerModal.js - Atualizar tema
- MyPrayersScreen.js - Atualizar cores
- CommunityScreen.js - Atualizar cores  
- StudiesScreen.js - Atualizar cores
- ProfileScreen.js - Atualizar cores
- FocusModeTimer.js - Modo escuro mantém atual

## Mapeamento de Cores:
- #DC2626 (Vermelho) → Colors.primaryGreen (#2E7D32)
- #B91C1C (Vermelho Escuro) → Colors.primaryGreenDark (#1B5E20)
- #F59E0B (Laranja) → Colors.accentYellow (#FFA726)
- #1F2937 (Cinza Escuro) → Colors.textPrimary (#212121)
- #6B7280 (Cinza Médio) → Colors.textSecondary (#757575)
