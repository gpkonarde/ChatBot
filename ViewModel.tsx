import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

// Define the message type
interface Message {
  type: 'query' | 'response';
  text: string;
}

const useChatbotViewModel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState<string>(''); // User's input
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for API

  const API_URL = 'http://192.170.1.74:11434/api/chat'; // AI Model API
  // const PARSER_API_URL = 'http:// 192.170.1.129:8000/get-string'; // Parser API
  const PARSER_API_URL = 'http://10.0.2.2:8000/get-string'

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage: Message = { type: 'query', text: query };
    setMessages([...messages, userMessage]);
    setQuery('');

    setIsLoading(true);

    try {
      // Step 1: Parse the query using the Parser API
      const parseResponse = await fetch(PARSER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "inputString": query
        }),
      });
      
      if (!parseResponse.ok) {
        throw new Error(`Parser API error! status: ${parseResponse.status}`);
      }
      const parseText = await parseResponse.text(); // Use .text() to read the response as text
      

      // const parseData = await parseResponse.json();
      const parseData = await JSON.parse(parseText);
      

      if (parseData?.message === "String is toxic") {
        // If the parser response indicates disallowed language, append a custom message
        const customMessage: Message = {
          type: 'response',
          text: 'This type of language is not allowed. Please rephrase your query.',
        };

        setMessages((prevMessages) => [...prevMessages, customMessage]);
        return; // Exit early
      }
      
      // Step 2: Send the query to the AI model API
      const aiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "mistral:latest",
          messages: [{ role: "user", content: query }],
          stream: false,
        }),
      });
      

      if (!aiResponse.ok) {
        throw new Error(`AI Model API error! status: ${aiResponse.status}`);
      }
      const aiText = await aiResponse.text(); // Read the AI response as text
      

      // const aiData = await aiResponse.json();
      const aiData = await JSON.parse(aiText);
      const botResponse = aiData?.message?.content || "No response from the bot";

      const botMessage: Message = {
        type: 'response',
        text: botResponse,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while processing your query.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    query,
    setQuery,
    isLoading,
    sendMessage,
  };
};

export default useChatbotViewModel;