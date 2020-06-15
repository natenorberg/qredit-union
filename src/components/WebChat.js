import { useEffect, useState } from "react"
import queryString from "query-string"

let chat

const useCustomerField = (fieldId, value, submittedTime, chatLoaded) => {
  useEffect(() => {
    if (chatLoaded) {
      chat.setChatRegistrationField(
        `schema.conversation.customer.${fieldId}`,
        value
      )
    }
  }, [value, fieldId, submittedTime, chatLoaded])
}

const WebChat = ({ firstName, lastName, phoneNumber, submittedTime }) => {
  const [chatLoaded, setChatLoaded] = useState(false)

  useEffect(() => {
    const { tenant = "sfdc1-demo", cp = "main" } = queryString.parse(
      window.location.search
    )

    const script = document.createElement("script")
    script.onload = () => {
      chat = window.Quiq({
        contactPoint: cp,
        colors: {
          primary: "#5c2997",
        },
        styles: {
          InitialMessageContainer: {
            display: "none",
          },
          AgentDisplayName: {
            display: "none",
          },
        },
      })
      setChatLoaded(true)
    }
    script.src = `https://${tenant}.quiq-api.com/app/webchat/index.js`
    script.defer = true
    document.body.appendChild(script)
  }, [])

  useCustomerField("firstName", firstName, submittedTime, chatLoaded)
  useCustomerField("lastName", lastName, submittedTime, chatLoaded)
  useCustomerField("phoneNumber", phoneNumber, submittedTime, chatLoaded)

  return null
}

export default WebChat
