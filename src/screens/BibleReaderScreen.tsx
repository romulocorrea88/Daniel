import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HapticPressable from "../components/HapticPressable";
import { getBibleChapter } from "../data/bibleData";
import useBibleStore from "../state/bibleStore";
import useAuthStore from "../state/authStore";
import Colors from "../constants/Colors";

const HIGHLIGHT_COLORS = [
  { id: "yellow", color: "#FEF3C7", name: "Amarelo" },
  { id: "green", color: "#D1FAE5", name: "Verde" },
  { id: "blue", color: "#DBEAFE", name: "Azul" },
  { id: "pink", color: "#FCE7F3", name: "Rosa" },
  { id: "purple", color: "#EDE9FE", name: "Roxo" },
];

const BibleReaderScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { bookId, bookName, chapter } = route.params;
  const { isGuest } = useAuthStore();
  
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [fontSize, setFontSize] = useState(18);
  
  const {
    addHighlight,
    removeHighlight,
    getHighlightsForChapter,
    addNote,
    updateNote,
    deleteNote,
    getNoteForVerse,
    addBookmark,
    setLastRead,
  } = useBibleStore();

  const highlights = useMemo(() => getHighlightsForChapter(bookId, chapter), [bookId, chapter]);

  useEffect(() => {
    loadChapter();
    setLastRead(bookId, chapter);
  }, [bookId, chapter]);

  const loadChapter = async () => {
    setLoading(true);
    try {
      const data = await getBibleChapter(bookId, chapter);
      setVerses(data.verses);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o capítulo");
    } finally {
      setLoading(false);
    }
  };

  const handleVerseLongPress = (verseNumber: number) => {
    if (isGuest) {
      Alert.alert(
        "Funcionalidade Premium",
        "Faça login para poder grifar e fazer anotações na Bíblia",
        [{ text: "OK" }]
      );
      return;
    }
    
    setSelectedVerse(verseNumber);
    setShowHighlightModal(true);
  };

  const handleHighlight = (color: string) => {
    if (!selectedVerse) return;
    
    const verse = verses.find(v => v.number === selectedVerse);
    if (!verse) return;

    // Remove existing highlight if any
    const existingHighlight = highlights.find(h => h.verse === selectedVerse);
    if (existingHighlight) {
      removeHighlight(existingHighlight.id);
    }

    // Add new highlight
    addHighlight({
      book: bookId,
      chapter,
      verse: selectedVerse,
      color,
      text: verse.text,
    });

    setShowHighlightModal(false);
    setSelectedVerse(null);
  };

  const handleRemoveHighlight = () => {
    if (!selectedVerse) return;
    
    const existingHighlight = highlights.find(h => h.verse === selectedVerse);
    if (existingHighlight) {
      removeHighlight(existingHighlight.id);
    }

    setShowHighlightModal(false);
    setSelectedVerse(null);
  };

  const handleAddNote = () => {
    setShowHighlightModal(false);
    
    const existingNote = getNoteForVerse(bookId, chapter, selectedVerse!);
    if (existingNote) {
      setNoteText(existingNote.note);
    } else {
      setNoteText("");
    }
    
    setShowNoteModal(true);
  };

  const handleSaveNote = () => {
    if (!selectedVerse) return;

    const existingNote = getNoteForVerse(bookId, chapter, selectedVerse);
    
    if (existingNote) {
      if (noteText.trim()) {
        updateNote(existingNote.id, noteText);
      } else {
        deleteNote(existingNote.id);
      }
    } else if (noteText.trim()) {
      addNote({
        book: bookId,
        chapter,
        verse: selectedVerse,
        note: noteText,
      });
    }

    setShowNoteModal(false);
    setNoteText("");
    setSelectedVerse(null);
  };

  const handleAddBookmark = () => {
    if (isGuest) {
      Alert.alert(
        "Funcionalidade Premium",
        "Faça login para adicionar marcadores",
        [{ text: "OK" }]
      );
      return;
    }

    if (selectedVerse) {
      addBookmark({
        book: bookId,
        chapter,
        verse: selectedVerse,
        label: `${bookName} ${chapter}:${selectedVerse}`,
      });
      
      Alert.alert("Sucesso", "Versículo marcado com sucesso!");
      setShowHighlightModal(false);
      setSelectedVerse(null);
    }
  };

  const getVerseHighlight = (verseNumber: number) => {
    return highlights.find(h => h.verse === verseNumber);
  };

  const getVerseNote = (verseNumber: number) => {
    return getNoteForVerse(bookId, chapter, verseNumber);
  };

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setFontSize(prev => Math.max(14, prev - 2))}
          >
            <Ionicons name="remove-circle-outline" size={24} color={Colors.backgroundWhite} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setFontSize(prev => Math.min(24, prev + 2))}
          >
            <Ionicons name="add-circle-outline" size={24} color={Colors.backgroundWhite} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : (
          <View style={styles.versesContainer}>
            {verses.map((verse) => {
              const highlight = getVerseHighlight(verse.number);
              const note = getVerseNote(verse.number);
              const highlightColor = highlight 
                ? HIGHLIGHT_COLORS.find(c => c.id === highlight.color)?.color 
                : "transparent";

              return (
                <TouchableOpacity
                  key={verse.number}
                  style={[styles.verseContainer, { backgroundColor: highlightColor }]}
                  onLongPress={() => handleVerseLongPress(verse.number)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.verseNumber}>{verse.number}</Text>
                  <View style={styles.verseContent}>
                    <Text style={[styles.verseText, { fontSize }]}>{verse.text}</Text>
                    {note && (
                      <View style={styles.noteIndicator}>
                        <Ionicons name="document-text" size={16} color={Colors.primaryGreen} />
                        <Text style={styles.notePreview} numberOfLines={2}>
                          {note.note}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Highlight Modal */}
      <Modal
        visible={showHighlightModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHighlightModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowHighlightModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Versículo {selectedVerse}</Text>
            
            <View style={styles.highlightOptions}>
              {HIGHLIGHT_COLORS.map((colorOption) => (
                <TouchableOpacity
                  key={colorOption.id}
                  style={[styles.colorOption, { backgroundColor: colorOption.color }]}
                  onPress={() => handleHighlight(colorOption.id)}
                >
                  <Text style={styles.colorOptionText}>{colorOption.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={handleAddNote}>
              <Ionicons name="create-outline" size={20} color={Colors.primaryGreen} />
              <Text style={styles.modalButtonText}>Adicionar Anotação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleAddBookmark}>
              <Ionicons name="bookmark-outline" size={20} color={Colors.primaryGreen} />
              <Text style={styles.modalButtonText}>Marcar Versículo</Text>
            </TouchableOpacity>

            {getVerseHighlight(selectedVerse!) && (
              <TouchableOpacity style={styles.modalButton} onPress={handleRemoveHighlight}>
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
                <Text style={[styles.modalButtonText, { color: Colors.error }]}>
                  Remover Grifo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowHighlightModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Note Modal */}
      <Modal
        visible={showNoteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNoteModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNoteModal(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Anotação - Versículo {selectedVerse}
            </Text>
            
            <TextInput
              style={styles.noteInput}
              placeholder="Digite sua anotação..."
              placeholderTextColor={Colors.textTertiary}
              value={noteText}
              onChangeText={setNoteText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <View style={styles.noteModalActions}>
              <TouchableOpacity 
                style={[styles.noteActionButton, styles.noteCancelButton]}
                onPress={() => {
                  setShowNoteModal(false);
                  setNoteText("");
                }}
              >
                <Text style={styles.noteCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.noteActionButton, styles.noteSaveButton]}
                onPress={handleSaveNote}
              >
                <Text style={styles.noteSaveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  versesContainer: {
    gap: 12,
  },
  verseContainer: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primaryGreen,
    marginRight: 12,
    marginTop: 2,
  },
  verseContent: {
    flex: 1,
  },
  verseText: {
    lineHeight: 28,
    color: Colors.textPrimary,
  },
  noteIndicator: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryGreen,
  },
  notePreview: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  highlightOptions: {
    gap: 10,
    marginBottom: 20,
  },
  colorOption: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  colorOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  modalCancelButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  noteInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 150,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noteModalActions: {
    flexDirection: "row",
    gap: 12,
  },
  noteActionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  noteCancelButton: {
    backgroundColor: Colors.background,
  },
  noteCancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  noteSaveButton: {
    backgroundColor: Colors.primaryGreen,
  },
  noteSaveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.backgroundWhite,
  },
});

export default BibleReaderScreen;
