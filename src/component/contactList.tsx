import React from "react"
import { Contact } from "../types/contacts"

interface Props {
  contacts: Contact[]
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

const ContactList: React.FC<Props> = ({ contacts, onDelete, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="p-4 bg-white shadow rounded flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{contact.name}</h3>
            <p>{contact.email}</p>
            {contact.phoneNumbers.map((phone, index) => (
              <p key={index}>{phone}</p>
            ))}
          </div>
          <div>
            <button
              onClick={() => onToggleFavorite(contact.id)}
              className={`mr-2 ${
                contact.isFavorite ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              ★
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(ContactList)
