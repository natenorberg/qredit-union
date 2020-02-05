import { useEffect } from "react"

// eslint-disable-next-line
var chat = Quiq({
  contactPoint: "main",
  colors: {
    primary: "#5c2997",
  },
})

const useCustomerField = (fieldId, value) => {
  useEffect(() => {
    console.log("setting", fieldId, "to", value)

    chat.setChatRegistrationField(
      `schema.conversation.customer.${fieldId}`,
      value
    )
  }, [value, fieldId])
}

const WebChat = ({ firstName, lastName, phoneNumber }) => {
  useCustomerField("firstName", firstName)
  useCustomerField("lastName", lastName)
  useCustomerField("phoneNumber", phoneNumber)

  return null
}

export default WebChat
