import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HapticPressable from "../components/HapticPressable";
import Colors from "../constants/Colors";

const PrivacyPolicyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <HapticPressable 
          onPress={() => navigation.goBack()}
          hapticType="light"
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.backgroundWhite} />
        </HapticPressable>
        <Text style={styles.headerTitle}>Política de Privacidade</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Card */}
        <View style={styles.titleCard}>
          <Text style={styles.titleText}>Política de Privacidade</Text>
          <Text style={styles.lastUpdated}>Última atualização: 23/10/2025</Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introdução e Nosso Compromisso</Text>
          <Text style={styles.sectionText}>
            <Text style={styles.bold}>Propósito:</Text> Esta Política de Privacidade explica como o aplicativo Daniel - Timer de Oração Focado (o "App") coleta, usa e protege suas informações.
          </Text>
          <Text style={styles.sectionText}>
            Nosso compromisso é com o foco e a privacidade. O App Daniel foi projetado para ser minimalista e, como tal, coleta o mínimo de dados possível.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Dados Coletados (Transparência Máxima)</Text>
          <Text style={styles.sectionText}>
            O App Daniel é construído com foco em privacidade por design.
          </Text>

          <View style={styles.tableCard}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Informações de Uso Local (Métricas de Engajamento)</Text>
              <Text style={styles.tableValue}>✓ Sim (Apenas Localmente)</Text>
              <Text style={styles.tableDescription}>
                Registrar estatísticas do usuário (e.g., "Dias Consecutivos", "Orações Respondidas") para seu benefício exclusivo (gamificação e motivação).
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Dados Pessoais (Nome, E-mail, Localização)</Text>
              <Text style={styles.tableValue}>✗ Não</Text>
              <Text style={styles.tableDescription}>
                O App não exige registro, login ou qualquer informação de identificação pessoal para funcionar.
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Dados de Dispositivo (Identificador de Publicidade)</Text>
              <Text style={styles.tableValue}>✗ Não</Text>
              <Text style={styles.tableDescription}>
                O App não contém publicidade e não usa identificadores de dispositivo para rastreamento de terceiros.
              </Text>
            </View>

            <View style={[styles.tableRow, styles.lastRow]}>
              <Text style={styles.tableHeader}>Informações de Análise de Falha (Crash Reports)</Text>
              <Text style={styles.tableValue}>✓ Sim (Anônimo)</Text>
              <Text style={styles.tableDescription}>
                Coletamos dados técnicos anônimos sobre falhas (crashes) para melhorar a estabilidade e a fluidez do App.
              </Text>
            </View>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Uso e Armazenamento das Informações</Text>
          <Text style={styles.sectionText}>
            <Text style={styles.bold}>Armazenamento Local:</Text> Todas as suas métricas de oração (duração, dias consecutivos, etc.) são armazenadas exclusivamente no seu dispositivo. Se você excluir o aplicativo, esses dados serão perdidos.
          </Text>
          <Text style={styles.sectionText}>
            <Text style={styles.bold}>Dados Anônimos:</Text> Os relatórios de falha (crash reports) são agregados e completamente anônimos. Eles são usados apenas para diagnóstico de desempenho e não podem ser ligados à sua identidade.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Compartilhamento de Informações (Confiança)</Text>
          <Text style={styles.sectionText}>
            Nós não compartilhamos, vendemos ou alugamos suas informações de uso com empresas de publicidade, plataformas de análise de terceiros ou qualquer outra parte, além do estritamente necessário para operar e manter o App (ex: plataforma de hospedagem de código como o Expo/React Native, se aplicável, apenas para dados técnicos anônimos).
          </Text>
        </View>

        {/* Section 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Privacidade de Crianças</Text>
          <Text style={styles.sectionText}>
            O App Daniel não é destinado a crianças menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de crianças.
          </Text>
        </View>

        {/* Section 6 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Suas Escolhas e Direitos</Text>
          <Text style={styles.sectionText}>
            Você está no controle de suas informações. Como o App Daniel armazena a maioria dos dados localmente, o controle reside em suas mãos. A exclusão do App resulta na exclusão de todos os seus dados de progresso.
          </Text>
        </View>

        {/* Section 7 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Contato e Atualizações</Text>
          <Text style={styles.sectionText}>
            Se você tiver dúvidas sobre esta Política, entre em contato através de <Text style={styles.email}>romulocorrea88@gmail.com</Text>.
          </Text>
          <Text style={styles.sectionText}>
            Esta política pode ser atualizada ocasionalmente para refletir mudanças em nossas práticas. A versão mais recente sempre estará disponível no App.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryGreen,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.primaryGreen,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  scrollContent: {
    padding: 20,
  },
  titleCard: {
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
    marginBottom: 8,
    textAlign: "center",
  },
  lastUpdated: {
    fontSize: 14,
    color: Colors.secondaryMintLight,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryGreen,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  email: {
    color: Colors.primaryGreen,
    fontWeight: "600",
  },
  tableCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  tableRow: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  lastRow: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  tableValue: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primaryGreen,
    marginBottom: 8,
  },
  tableDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;
