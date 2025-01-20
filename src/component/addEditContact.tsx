import React, { useState } from "react"
import { Contact } from "../types/contacts"
import { v4 as uuidv4 } from "uuid"

interface Props {
  onSave: (contact: Contact) => void
}

const AddEditContact: React.FC<Props> = ({ onSave }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""])

  const handleSave = () => {
    if (!name || !email) return
    const newContact: Contact = {
      id: uuidv4(),
      name,
      email,
      phoneNumbers,
      isFavorite: false,
    }
    onSave(newContact)
    setName("")
    setEmail("")
    setPhoneNumbers([""])
  }

  return (
    <div className="mb-5 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Add New Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      {phoneNumbers.map((phone, index) => (
        <input
          key={index}
          type="tel"
          placeholder={`Phone ${index + 1}`}
          value={phone}
          onChange={(e) => {
            const updatedPhones = [...phoneNumbers]
            updatedPhones[index] = e.target.value
            setPhoneNumbers(updatedPhones)
          }}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
      ))}
      <button
        onClick={() => setPhoneNumbers([...phoneNumbers, ""])}
        className="text-blue-500 mb-2"
      >
        + Add Another Phone
      </button>
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Save Contact
      </button>
    </div>
  )
}

export default AddEditContact
