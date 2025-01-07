document
  .getElementById("chatbot-button")
  .addEventListener("click", function () {
    document.getElementById("chatbot-container").style.display = "flex";
  });

// Close the chatbot when the close (X) button is clicked
document.getElementById("close-chat").addEventListener("click", function () {
  document.getElementById("chatbot-container").style.display = "none";
});

// Handle sending a message when the "Send" button is clicked or Enter key is pressed
document.getElementById("send-button").addEventListener("click", handleSend);
document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleSend();
  });

function handleSend() {
  const chatInput = document.getElementById("chat-input");
  const chatArea = document.getElementById("chat-area");
  const userMessage = chatInput.value.trim();

  if (userMessage) {
    // Add user's message
    addMessage(chatArea, userMessage, "user-message");

    // Generate bot's response dynamically
    const botResponse = generateDynamicResponse(userMessage);
    if (typeof botResponse === "string") {
      // If it's a direct response
      setTimeout(() => {
        addMessage(chatArea, botResponse, "bot-message");
      }, 500);
    } else if (typeof botResponse === "object") {
      // If it contains follow-up options
      setTimeout(() => {
        addMessage(chatArea, botResponse.response, "bot-message");
        if (botResponse.followUp) {
          addFollowUpOptions(chatArea, botResponse.followUp);
        }
      }, 500);
    }

    // Clear input field
    chatInput.value = "";
  }
}

function addMessage(chatArea, message, className) {
  const messageElement = document.createElement("div");
  messageElement.className = className;

  // Use innerHTML to allow HTML tags (like links) to be rendered
  messageElement.innerHTML = message;

  chatArea.appendChild(messageElement);

  // Scroll to the bottom
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addFollowUpOptions(chatArea, options) {
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "follow-up-options";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "follow-up-button";
    button.addEventListener("click", () => handleFollowUp(option));
    optionsContainer.appendChild(button);
  });

  chatArea.appendChild(optionsContainer);
  chatArea.scrollTop = chatArea.scrollHeight;
}

let context = null; // Global context to track follow-up questions

function generateDynamicResponse(userMessage) {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // Patterns for chatbot responses
  const patterns = [
    {
      pattern: /\b(hello|hi|hey|sup|hii|hiii)\b/i,
      response: "Hello! How can I assist you today?",
    },
    {
      pattern: /\b(infotech day|infotechday)\b/i,
      response: {
        response:
          "InfoTech Day is an annual event at Temasek Polytechnic showcasing student projects. Would you like to know about the event schedule or featured projects?",
        followUp: ["Event Schedule", "Featured Projects"],
        context: "infotech",
      },
    },
    {
      pattern: /\b(event schedule)\b/i,
      response: {
        response:
          "The event schedule will be released closer to the event date. Would you like to learn more about the featured projects?",
        followUp: ["Featured Projects"],
        context: "event_schedule",
      },
    },
    {
      pattern: /\b(featured projects|projects|project)\b/i,
      response: {
        response:
          'Featured projects include cutting-edge student innovations and demonstrations. You can check them out on the <a href="../pages/project.html">Project Page</a>.',
        context: "featured_projects",
      },
    },
    {
      pattern: /\b(explore more|learn)\b/i,
      response: {
        response:
          "You can check out the full list of featured projects at the event's official website. Would you like to go back to the event schedule or featured projects?",
        followUp: ["Event Schedule", "Featured Projects"],
        context: "explore_more",
      },
    },
    {
      pattern: /\b(location|where is it|where)\b/i,
      response: {
        response:
          "InfoTech Day is held at Temasek Polytechnic's School of IIT. Would you like directions?",
        followUp: ["Yes", "No"],
        context: "location",
      },
    },
    {
      pattern: /\b(schedule|agenda|program|programs)\b/i,
      response:
        'The event schedule includes project showcases, seminars, and workshops. Check the full schedule <a href="../index.html">Here</a>.',
    },
    {
      pattern: /\b(parking|car|vehicle|carpark|motorbike)\b/i,
      response:
        "Parking is available at Temasek Polytechnic. Please head to Carpark C for the nearest parking lot.",
    },
    {
      pattern:
        /\b(transportation|directions|how to get there|mrt|bustop|bus stop|bicycle)\b/i,
      response: {
        response:
          'For transportation details, please refer to our <a href="../pages/direction.html">Directions Page</a> for more information on how to get to InfoTech Day.',
        context: "transportation",
      },
    },
    {
      pattern: /\b(bye|goodbye|byes)\b/i,
      response: "Goodbye! Have a great day!",
    },
    {
      pattern: /\b(contact|email|phone)\b/i,
      response:
        "For any inquiries, please refer to the InfoTech Day FAQ page or visit our event website for more details.",
    },
    {
      pattern: /\b(toilet|restroom|bathroom)\b/i,
      response:
        "The toilets are located at the main foyer or outside of Auditorium 1 and 2.",
    },
    {
      pattern:
        /\b(who created this website|who made this website|creators|creator|website)\b/i,
      response: {
        response: `
          This website was created by students from Temasek Polytechnic as part of their major project. The creators are:
          <ul>
            <li><strong>Ho Wei Ting Jerlyn</strong> - Student at Temasek Polytechnic</li>
            <li><strong>Ngim Hui Yue</strong> - Student at Temasek Polytechnic</li>
          </ul>
          You can connect with them on <a href="https://www.linkedin.com/in/jerlyn-ho-a752a723a/" target="_blank">LinkedIn (Ho Wei Ting Jerlyn)</a> and <a href="https://www.linkedin.com/in/hui-yue-n-11a80a239/" target="_blank">LinkedIn (Ngim Hui Yue)</a>.
          <h3>About the Project:</h3>
          <p>
            The project showcases an innovative approach to displaying and interacting with student projects at Temasek Polytechnic. As part of the InfoTech Day event, this website was designed to allow users to explore featured projects, view the event schedule, and navigate through different sections, providing an engaging and informative experience. The goal was to create a seamless, user-friendly interface that would present key information about the event in an accessible and interactive manner.
          </p>
        `,
        context: "about_creators",
      },
    },
    {
      pattern:
        /\b(who made this chatbot|creator of this chatbot|who made this ai chatbot|chatbot)\b/i,
      response: {
        response: `
          This chatbot was created by Jerlyn Ho, a year-three student from Temasek Polytechnic, pursuing a Diploma in Information Technology. Jerlyn is expected to graduate in 2025. 
          <p>You can find more about Jerlyn's work on <a href="https://www.linkedin.com/in/jerlyn-ho-a752a723a/" target="_blank">LinkedIn</a>.</p>
          <h3>About the Chatbot:</h3>
          <p>
            This chatbot was developed as part of Jerlyn's major project, aimed at enhancing user interaction for InfoTech Day 2025. The chatbot helps guide users through event details, project showcases, and more.
          </p>
          <img src="../images/jerlyn.jpg" alt="Jerlyn Ho" style="width: 200px; border-radius: 10px;"/>
        `,
        context: "about_chatbot_creator",
      },
    },
    {
      pattern: /\b(location|where is it|where)\b/i,
      response: {
        response:
          "InfoTech Day is held at Temasek Polytechnic Main Foyer & Auditorium 1 & 2",
        context: "location",
      },
    },
    {
      pattern: /\b(no)\b/i, // This will trigger when the user says "No"
      response: {
        response: "Okay, let me know if you need further assistance.",
        followUp: [],
        context: null, // Clear the context after "No"
      },
    },
  ];

  // Handle regular message matching
  return (
    patterns.find(({ pattern }) => pattern.test(normalizedMessage))?.response ||
    "Sorry, I didn't understand that."
  );
}
