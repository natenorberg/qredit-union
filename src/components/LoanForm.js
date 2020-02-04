import React, { useState } from "react"
import styled from "@emotion/styled"
import { Box, Flex, Spacer, SpaceChildren } from "../components/layoutHelpers"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const useTextField = (initialValue = "") => {
  const [value, setValue] = useState(initialValue)

  const handlers = {
    value,
    onChange: e => {
      setValue(e.target.value)
    },
  }

  return [value, handlers]
}

const LoanForm = () => {
  const [firstName, firstNameFieldProps] = useTextField()
  const [lastName, lastNameFieldProps] = useTextField()
  const [phoneNumber, phoneNumberFieldProps] = useTextField()

  return (
    <Box
      backgroundColor="#fff"
      marginX={-4}
      marginTop={4}
      padding={4}
      border="1px solid hsla(197, 12%, 70%, 0.3)"
      borderRadius="5px"
      // boxShadow="0 1px 4px rgba(0,0,0,0.3)"
    >
      <h1>Let's get started on your loan application</h1>
      <h2>We'll start with some basic questions</h2>

      <form noValidate autoComplete="off">
        <SpaceChildren marginBottom={3}>
          <Flex>
            <Box flex="1 1 auto">
              <TextField
                label="First Name"
                variant="filled"
                color="secondary"
                fullWidth
                {...firstNameFieldProps}
              />
            </Box>
            <Spacer marginRight={4} />
            <Box flex="1 1 auto">
              <TextField
                label="Last Name"
                variant="filled"
                color="secondary"
                fullWidth
                {...lastNameFieldProps}
              />
            </Box>
            <Spacer marginRight={4} />
            <Box flex="1 1 auto">
              <TextField
                label="Phone number"
                variant="filled"
                color="secondary"
                fullWidth
                type="phone"
                {...phoneNumberFieldProps}
              />
            </Box>
          </Flex>
          <Flex justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!firstName || !lastName | !phoneNumber}
            >
              Submit
            </Button>
          </Flex>
        </SpaceChildren>
      </form>
    </Box>
  )
}

export default LoanForm
