import React, { useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import {
  Box,
  Flex,
  Spacer,
  SpaceChildren,
  Text,
} from "../components/layoutHelpers"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import CircularProgress from "@material-ui/core/CircularProgress"
import CheckCircleRounded from "@material-ui/icons/CheckCircleRounded"
import WebChat from "./WebChat"
import useLocalStorage from "./useLocalStorage"

const useTextField = (fieldName, initialValue = "") => {
  const [value, setValue] = useLocalStorage(fieldName, initialValue)

  const handlers = {
    value,
    onChange: e => {
      setValue(e.target.value)
    },
  }

  return [value, handlers, setValue]
}

const ResponsiveContentBox = styled(Box)`
  margin-top: 32px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`

const FieldContainer = styled(Flex)`
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ContentBox = ({ children }) => {
  return (
    <ResponsiveContentBox
      backgroundColor="#fff"
      marginX={-4}
      padding={4}
      borderRadius="5px"
      boxShadow="0 1px 20px rgba(0,0,0,0.1)"
    >
      {children}
    </ResponsiveContentBox>
  )
}

const Instructions = styled.h3`
  color: rgba(0, 0, 0, 0.5);
  font-weight: normal;
  letter-spacing: -0.5px;
`

const ErrorHelpText = styled.p`
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 0;
`

const LoanForm = () => {
  const [step, setStep] = useState(0)

  // Step 1 fields
  const [firstName, firstNameFieldProps] = useTextField("firstName")
  const [lastName, lastNameFieldProps] = useTextField("lastName")
  const [phoneNumber, phoneNumberFieldProps, setPhoneNumber] = useTextField(
    "phoneNumber"
  )

  // Step 2 fields
  const [loanAmount, loanAmountFieldProps] = useTextField("loanAmount")
  const [loanAmountFieldFocused, setLoanAmountFieldFocused] = useState(false)
  const [loanTerm, setLoanTerm] = useState(null)

  // Submit results
  const [submitting, setSubmitting] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const content = showSuccess ? (
    <Text fontSize="2rem">
      <Flex>
        <CheckCircleRounded
          fontSize="inherit"
          style={{
            fontSize: "2.25rem",
            marginRight: "0.5rem",
            color: "#279E68",
          }}
        />
        <h1
          css={css`
            margin-bottom: 0;
          `}
        >
          Congratulations! You're approved!
        </h1>
      </Flex>
    </Text>
  ) : (
    <>
      {step === 0 && (
        <>
          <h1>Loan Application</h1>
          <Instructions>Let's start with some basic questions</Instructions>
          <form noValidate autoComplete="nope">
            <SpaceChildren marginBottom={4}>
              <FieldContainer>
                <Box flex="1 0 auto" marginBottom={3}>
                  <TextField
                    label="First Name"
                    variant="filled"
                    color="primary"
                    fullWidth
                    autoComplete="nope"
                    {...firstNameFieldProps}
                  />
                </Box>
                <Spacer marginRight={4} />
                <Box flex="1 0 auto" marginBottom={3}>
                  <TextField
                    label="Last Name"
                    variant="filled"
                    color="primary"
                    fullWidth
                    autoComplete="nope"
                    {...lastNameFieldProps}
                  />
                </Box>
                <Spacer marginRight={4} />
                <Box flex="1 0 auto" marginBottom={3}>
                  <TextField
                    label="Phone number"
                    variant="filled"
                    color="primary"
                    fullWidth
                    type="phone"
                    autoComplete="nope"
                    {...phoneNumberFieldProps}
                    onFocus={() => setPhoneNumber("+14066727600")}
                  />
                </Box>
              </FieldContainer>
              <Flex justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!firstName || !lastName | !phoneNumber}
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </Button>
              </Flex>
            </SpaceChildren>
          </form>
        </>
      )}
      {step === 1 && (
        <>
          <h2>Nice to meet you, {firstName}!</h2>
          <Instructions>
            Please give us some info about what kind of loan you need
          </Instructions>
          <form noValidate autoComplete="nope">
            <SpaceChildren marginBottom={4}>
              <FieldContainer>
                <Box flex="1 1 50%" marginBottom={3}>
                  <TextField
                    label="Loan Amount"
                    variant="filled"
                    color="primary"
                    fullWidth
                    type="number"
                    {...loanAmountFieldProps}
                    onFocus={() => setLoanAmountFieldFocused(true)}
                    onBlur={() => setLoanAmountFieldFocused(false)}
                    InputProps={{
                      startAdornment:
                        loanAmount || loanAmountFieldFocused ? (
                          <InputAdornment position="start">$</InputAdornment>
                        ) : (
                          undefined
                        ),
                    }}
                  />
                </Box>
                <Spacer marginRight={4} />
                <Box flex="1 1 50%" marginBottom={3}>
                  <FormControl variant="filled" color="primary" fullWidth>
                    <InputLabel id="loan-term-label">Loan Term</InputLabel>
                    <Select
                      labelId="loan-term-label"
                      id="loan-term"
                      value={loanTerm}
                      onChange={event => {
                        setLoanTerm(event.target.value)
                      }}
                    >
                      <MenuItem value="6-months">6 months</MenuItem>
                      <MenuItem value="1-year">1 year</MenuItem>
                      <MenuItem value="2-years">2 years</MenuItem>
                      <MenuItem value="100-years">100 years</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </FieldContainer>
              {showError && (
                <Box
                  backgroundColor="hsl(0, 52%, 75%)"
                  color="hsl(0, 52%, 25%)"
                  padding={3}
                  borderRadius="5px"
                >
                  <h2>Well this is embarrassing...</h2>
                  <ErrorHelpText>
                    Something went wrong processing your application.
                  </ErrorHelpText>
                  <ErrorHelpText>
                    Please contact customer support for assistance
                  </ErrorHelpText>
                </Box>
              )}
              <Flex justifyContent="space-between">
                <Button variant="outlined" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!loanAmount || !loanTerm}
                  onClick={() => {
                    setSubmitting(true)
                    if (!showError) {
                      setTimeout(() => {
                        setShowError(true)
                        setSubmitting(false)
                      }, 2000)
                    } else if (!showSuccess) {
                      setTimeout(() => {
                        setShowError(false)
                        setShowSuccess(true)
                      }, 1000)
                    }
                  }}
                >
                  {submitting ? (
                    <CircularProgress size={29} color="#fff" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Flex>
            </SpaceChildren>
          </form>
        </>
      )}
    </>
  )

  return (
    <ContentBox>
      {content}
      <WebChat
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
      />
    </ContentBox>
  )
}

export default LoanForm
