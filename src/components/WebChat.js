import { useEffect } from "react"

let chat

const useCustomerField = (fieldId, value, submittedTime) => {
  useEffect(() => {
    chat.setChatRegistrationField(
      `schema.conversation.customer.${fieldId}`,
      value
    )
  }, [value, fieldId, submittedTime])
}

const WebChat = ({ firstName, lastName, phoneNumber, submittedTime }) => {
  useEffect(() => {
    chat = window.Quiq({
      contactPoint: "main",
      colors: {
        primary: "#5c2997",
      },
    })
  }, [])

  useCustomerField("firstName", firstName, submittedTime)
  useCustomerField("lastName", lastName, submittedTime)
  useCustomerField("phoneNumber", phoneNumber, submittedTime)

  return null
}

export default WebChat
