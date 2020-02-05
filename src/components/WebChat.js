import { useEffect } from "react"

let chat

const useCustomerField = (fieldId, value) => {
  useEffect(() => {
    chat.setChatRegistrationField(
      `schema.conversation.customer.${fieldId}`,
      value
    )
  }, [value, fieldId])
}

const WebChat = ({ firstName, lastName, phoneNumber }) => {
  useEffect(() => {
    chat = window.Quiq({
      contactPoint: "main",
      colors: {
        primary: "#5c2997",
      },
    })
  }, [])

  useCustomerField("firstName", firstName)
  useCustomerField("lastName", lastName)
  useCustomerField("phoneNumber", phoneNumber)

  return null
}

export default WebChat
