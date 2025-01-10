# TaskBuddy

TaskBuddy is a modern, responsive task management application designed to streamline workflows and help users track progress effortlessly. The project leverages React and Firebase for its core functionality and incorporates Material-UI for styling and responsive design.

---

## Features

- **Authentication**: Google Sign-In and logout functionality using Firebase Authentication.
- **Task Management**: Add, view, search, and filter tasks based on category and due dates.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User Profile**: Display of user name and photo upon login.

---

## File Structure

```
src/
├── assets/                # Images and icons used in the project
├── components/            # React components
│   ├── common/            # Reusable components (e.g., Header, FilterBar)
│   └── TaskBoard/         # Components specific to task board views
├── context/               # Firebase context for authentication
├── styles/                # CSS-in-JS and style definitions
├── App.jsx                # Main app component
├── index.js               # Entry point
└── images/image.js              # Centralized image imports for better structure
```

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ravi08371/Task-Managemt.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd taskbuddy
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: Used for authentication and database management.
- **Material-UI**: For styling and responsive UI components.
- **React Query**: To manage server state and perform API calls efficiently.
- **Vite**: For fast and optimized development.

---

## Key Components

### **FilterBar**
Located in `src/components/common/FilterBar.jsx`
- Renders dropdowns for filtering tasks by category and due dates.
- Fetches filter options dynamically.

### **Header**
Located in `src/components/common/Header.jsx`
- Contains a search bar for filtering tasks by title.
- Includes an "Add Task" button to open a task creation modal.

### **TaskBoardView**
Located in `src/components/TaskBoard/TaskBoardView.jsx`
- Displays tasks in both board and list views.
- Supports real-time updates using React Query.

### **Login**
Located in `src/components/Login.jsx`
- Handles user authentication using Firebase.
- Displays user information after login.

### **Image Management**
Located in `src/images/image.js`
- Centralizes image imports to ensure cleaner and more maintainable code.

```javascript
import googleLogo from "../assets/googleLogo.png";
import taskicon from "../assets/taskicon.png";
import taskImageLoginPage from "../assets/taskImageLoginPage.png";
import taskIconTopIcon from "../assets/taskIconTopIcon.png";
import logout_icon from "../assets/logout_icon.png";

export const image = {
  googleLogo,
  taskicon,
  taskImageLoginPage,
  taskIconTopIcon,
  logout_icon,
};
```

---

## Firebase Setup

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.

2. **Enable Authentication**:
   - Navigate to the Authentication section.
   - Enable Google Sign-In.

3. **Get Firebase Config**:
   - Copy the configuration details from the project settings.
   - Replace the placeholder in your code with the actual config.

4. **Setup Firestore (if needed)**:
   - Enable Firestore Database from the Firebase Console.

---

## Responsive Design

The project is optimized for different screen sizes using Material-UI's `useMediaQuery` hook. For instance:
- The login page hides the illustration image on smaller screens (`max-width: 600px`).

```javascript
const isSmallScreen = useMediaQuery("(max-width:600px)");

// Conditional rendering
{!isSmallScreen && (
  <Stack style={{ width: "100%" }}>
    <img src={image.taskImageLoginPage} alt="Login Illustration" />
  </Stack>
)}
```

---

## Logout Functionality

The logout button in the header uses the Firebase `signOut` method:

```javascript
const logout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error: ", error);
  }
};
```


## Author

- **Ravi Singh**
- [GitHub Profile](https://github.com/ravi08371)

Feel free to contribute to the project by submitting issues or pull requests!
