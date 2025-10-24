import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BIBLE_BOOKS } from "../data/bibleData";
import useBibleStore from "../state/bibleStore";
import Colors from "../constants/Colors";

const BibleScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTestament, setActiveTestament] = useState<"all" | "old" | "new">("all");
  const { lastRead, bookmarks } = useBibleStore();

  const filteredBooks = useMemo(() => {
    let books = BIBLE_BOOKS;

    // Filter by testament
    if (activeTestament !== "all") {
      books = books.filter(book => book.testament === activeTestament);
    }

    // Filter by search query
    if (searchQuery) {
      books = books.filter(book => 
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.abbr.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return books;
  }, [activeTestament, searchQuery]);

  const handleBookPress = (bookId: string, bookName: string, chapters: number) => {
    navigation.navigate("BibleBook", { bookId, bookName, chapters });
  };

  const handleContinueReading = () => {
    if (lastRead) {
      const book = BIBLE_BOOKS.find(b => b.id === lastRead.book);
      if (book) {
        navigation.navigate("BibleReader", {
          bookId: lastRead.book,
          bookName: book.name,
          chapter: lastRead.chapter,
        });
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📖 Bíblia Sagrada</Text>
        <Text style={styles.headerSubtitle}>Almeida Atualizada</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue Reading Card */}
        {lastRead && (
          <TouchableOpacity 
            style={styles.continueCard}
            onPress={handleContinueReading}
          >
            <View style={styles.continueIconContainer}>
              <Ionicons name="bookmark" size={24} color={Colors.backgroundWhite} />
            </View>
            <View style={styles.continueContent}>
              <Text style={styles.continueLabel}>Continue de onde parou</Text>
              <Text style={styles.continueText}>
                {BIBLE_BOOKS.find(b => b.id === lastRead.book)?.name} {lastRead.chapter}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.backgroundWhite} />
          </TouchableOpacity>
        )}

        {/* Bookmarks Quick Access */}
        {bookmarks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📌 Meus Marcadores</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookmarksScroll}>
              {bookmarks.slice(0, 5).map((bookmark) => (
                <TouchableOpacity
                  key={bookmark.id}
                  style={styles.bookmarkChip}
                  onPress={() => {
                    const book = BIBLE_BOOKS.find(b => b.id === bookmark.book);
                    if (book) {
                      navigation.navigate("BibleReader", {
                        bookId: bookmark.book,
                        bookName: book.name,
                        chapter: bookmark.chapter,
                      });
                    }
                  }}
                >
                  <Text style={styles.bookmarkChipText}>
                    {BIBLE_BOOKS.find(b => b.id === bookmark.book)?.abbr} {bookmark.chapter}:{bookmark.verse}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar livro..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Testament Filter */}
        <View style={styles.testamentFilter}>
          <TouchableOpacity
            style={[styles.testamentButton, activeTestament === "all" && styles.testamentButtonActive]}
            onPress={() => setActiveTestament("all")}
          >
            <Text style={[styles.testamentButtonText, activeTestament === "all" && styles.testamentButtonTextActive]}>
              Todos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.testamentButton, activeTestament === "old" && styles.testamentButtonActive]}
            onPress={() => setActiveTestament("old")}
          >
            <Text style={[styles.testamentButtonText, activeTestament === "old" && styles.testamentButtonTextActive]}>
              Antigo Testamento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.testamentButton, activeTestament === "new" && styles.testamentButtonActive]}
            onPress={() => setActiveTestament("new")}
          >
            <Text style={[styles.testamentButtonText, activeTestament === "new" && styles.testamentButtonTextActive]}>
              Novo Testamento
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books List */}
        <View style={styles.booksGrid}>
          {filteredBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => handleBookPress(book.id, book.name, book.chapters)}
            >
              <Text style={styles.bookName}>{book.name}</Text>
              <Text style={styles.bookChapters}>{book.chapters} capítulos</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.primaryGreen,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.secondaryMintLight,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  continueCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  continueIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  continueContent: {
    flex: 1,
  },
  continueLabel: {
    fontSize: 12,
    color: Colors.secondaryMintLight,
    marginBottom: 4,
  },
  continueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  bookmarksScroll: {
    marginTop: 8,
  },
  bookmarkChip: {
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bookmarkChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  testamentFilter: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  testamentButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  testamentButtonActive: {
    backgroundColor: Colors.primaryGreen,
    borderColor: Colors.primaryGreen,
  },
  testamentButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  testamentButtonTextActive: {
    color: Colors.backgroundWhite,
  },
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  bookCard: {
    width: "48%",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bookName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  bookChapters: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default BibleScreen;
