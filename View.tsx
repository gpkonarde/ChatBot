import React from 'react';
import { View, TextInput, StatusBar,TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import useChatbotViewModel from './ViewModel'; // Import ViewModel

const ChatbotApp = () => {
  const {
    messages,
    query,
    setQuery,
    isLoading,
    sendMessage,
  } = useChatbotViewModel(); // Use the ViewModel

  return (
    <View style={styles.container}>
        <View style={styles.appBar}>
            <Text style={styles.appBarText}>ChatBot</Text>
        </View>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.type === 'query' ? styles.userMessage : styles.botMessage,
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {isLoading && (
          <ActivityIndicator size="small" color="#007bff" style={styles.loading} />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatbotApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  appBar: {
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  appBarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#d1fcd3',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#e2e2e2',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 10,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});