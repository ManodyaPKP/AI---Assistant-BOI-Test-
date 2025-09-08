
## BOI Virtual Help Desk - AI Assistant

A sophisticated React-based chatbot application designed to serve as a virtual help desk for the Board of Investment of Sri Lanka. This AI-powered assistant provides comprehensive information about BOI services, investment opportunities, zones, and departmental contacts.


## Features

- AI-Powered Conversations: Integrated with Google's Gemini API for intelligent responses

- Comprehensive Knowledge Base: Contains detailed information about BOI services, zones, and departments

- Responsive Design: Works seamlessly on desktop and mobile devices

- Interactive UI: Clean, modern interface with smooth animations

- Chat History Management: Ability to clear conversations while maintaining initial context

- Error Handling: Robust error management with      user-friendly messages

- The user can switch to the chatbot's dark mode theme as desired.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/boi-new.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the project:
    ```bash
    npm start
    ```

## Usage

- Click the chatbot icon in the bottom right corner to open the chat interface

- The chatbot will greet you with information about the Board of Investment of Sri Lanka

- Type your questions about BOI services, investment opportunities, or contacts

- Use the clear button (trash icon) to reset the conversation

- Use the minimize button to hide the chat interface

##  Project Structure


src/
├── components/
│   ├── ChatbotIcon.jsx      # SVG icon component
│   ├── ChatForm.jsx         # Message input form
│   └── ChatMessage.jsx      # Individual message component
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
├── companyinfo.js           # Comprehensive BOI information database
└── index.css                # Application styles


## Modifying Company Information

Edit companyinfo.js to update any BOI-related information. The structured data object contains all the information that the chatbot can access and share with users.

## Styling

The application uses CSS custom properties and a consistent color scheme. Main colors include:

- Primary purple: #AD46FF

- Secondary purple: #C27AFF

- Background gradient: #5128c2 to #DACDFF

## API Integration

The chatbot integrates with Google's Gemini API. Update the VITE_API_URL environment variable to point to your API endpoint.

## Configuration

Key configuration points in App.jsx:

- formattedCompanyInfo: Initial context provided to the AI

- generateBotResponse: Function handling API communication

- Chat history management with hidden initial context message

## Responsive Design

The application is fully responsive with breakpoints for mobile devices (max-width: 520px). The chat interface expands to full screen on mobile devices for better usability.

## Components

ChatbotIcon
- Custom SVG icon component representing the BOI chatbot.

ChatForm
Handles message input and submission, including:

- Input validation

- Enter key submission

- Prevention of duplicate API calls

ChatMessage
Renders individual chat messages with:

- Role-based styling (user vs bot)

- Error message styling

- Conditional rendering for hidden messages


## API Integration

{
  contents: [
    { role: "user", parts: [{ text: "message text" }] },
    { role: "model", parts: [{ text: "response text" }] }
  ]
}


## Scripts

- npm run dev - Start development server

- npm run build - Build for production

- npm run preview - Preview production build

- npm run lint - Run ESLint

## License

This project is created for the Board of Investment of Sri Lanka.
---