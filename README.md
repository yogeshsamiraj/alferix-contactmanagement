```markdown
# Contact Manager Application

## Overview
This is a contact manager application built with React. It allows you to add, update, delete, and toggle the favorites of contacts. The app uses local storage to persist the contacts data.

## Features
- Add or update contacts
- Delete contacts
- Toggle favorite status of contacts
- Search contacts by name
- Persist contacts data using local storage

## Instructions to Run the Application

Follow these steps to run the application locally:

### 1. Install Dependencies
Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 2. Run the Application
Start the development server:

```bash
npm start
# or
yarn start
```

This will run the application on `http://localhost:3000`. You can open this URL in your browser to interact with the app.

### 1. `useCallback` Hook
The `useCallback` hook was used to memoize the `addOrUpdateContact` function. By using `useCallback`, we prevent unnecessary re-renders of child components that depend on this function.

Example:
```tsx
const addOrUpdateContact = useCallback((contact: Contact) => {
  setContacts((prevContacts) => {
    const existingIndex = prevContacts.findIndex((c) => c.id === contact.id);
    if (existingIndex !== -1) {
      const updatedContacts = [...prevContacts];
      updatedContacts[existingIndex] = contact;
      return updatedContacts;
    }
    return [...prevContacts, contact];
  });
}, []);
```

### 2. `React.memo`
This would prevent unnecessary re-renders of components like `ContactList` and `Searchbar` when their props haven't changed.

Example:
```tsx
export default React.memo(SearchBar)
export default React.memo(ContactList)

```

### 3. Deep Copy for Contact Updates
When updating the contacts list, a deep copy of the contact array is created to avoid mutating the state directly. By creating a deep copy (e.g., using the spread operator), we guarantee that the state is updated in a safe and predictable manner.

Example:
```tsx
const updatedContacts = [...prevContacts];
updatedContacts[existingIndex] = contact;
return updatedContacts;
```

### 2. `Bonus Points`
localstorage implementation