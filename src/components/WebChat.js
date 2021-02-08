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
        context: {
          intent: "testing",
          data: {
            favoriteColor: "green",
          },
        },
        position: {
          right: 24,
          top: 135,
        },
        styles: {
          HeaderBanner: {
            // Color for the header text
            color: "#000",
          },
          HeaderMenuIcons: {
            // Color for the buttons at the top of the chat window
            // This color is just black at half-opacity so the icons would be clearly
            // visible, but also less prominent than the header text by it
            fill: "rgba(0,0,0,0.5)",
          },
          ToggleChatButton: {
            // This is different than the usual yellow color, but to my eye it matches better
            // backgroundColor: "#fae100",
            backgroundColor: "#0073e6",
            // This makes the button shadow sharper
            // The default shadow makes the button look a little blurry to me when it's yellow
            boxShadow: "rgba(0,0,0,0.3) 0px 1px 2px",
            top: 60,
          },
          // ToggleChatButtonIcon: {
          //   color: "#000",
          // },
          // ToggleChatButton: {
          //   backgroundColor: "#0073e6",
          // },
          InlineActionButton: {
            color: "#000",
          },
        },
      })
      setChatLoaded(true)
    }
    script.src = `https://${tenant}.quiq-api.com/app/webchat/index.js`
    document.head.appendChild(script)
  }, [])

  useCustomerField("firstName", firstName, submittedTime, chatLoaded)
  useCustomerField("lastName", lastName, submittedTime, chatLoaded)
  useCustomerField("phoneNumber", phoneNumber, submittedTime, chatLoaded)

  return null
}

export default WebChat
