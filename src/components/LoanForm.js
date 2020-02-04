import React, { useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { Box, Flex, Spacer, SpaceChildren } from "../components/layoutHelpers"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

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

const Instructions = styled.h3`
  color: rgba(0, 0, 0, 0.5);
  font-weight: normal;
  letter-spacing: -0.5px;
`

const LoanForm = () => {
  const [step, setStep] = useState(0)

  const [firstName, firstNameFieldProps] = useTextField()
  const [lastName, lastNameFieldProps] = useTextField()
  const [phoneNumber, phoneNumberFieldProps] = useTextField()
  const [loanAmount, loanAmountFieldProps] = useTextField()
  const [loanAmountFieldFocused, setLoanAmountFieldFocused] = useState(false)
  const [loanTerm, setLoanTerm] = useState(null)
  const [submitCount, setSubmitCount] = useState(0)

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
      {step === 0 && (
        <>
          <h1>Loan Application</h1>
          <Instructions>Let's start with some basic questions</Instructions>
          <form noValidate autoComplete="off">
            <SpaceChildren marginBottom={4}>
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
          <form noValidate autoComplete="off">
            <SpaceChildren marginBottom={4}>
              <Flex>
                <Box flex="1 1 50%">
                  <TextField
                    label="Loan Amount"
                    variant="filled"
                    color="secondary"
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
                <Box flex="1 1 50%">
                  <FormControl variant="filled" color="secondary" fullWidth>
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
              </Flex>
              <Flex justifyContent="space-between">
                <Button variant="outlined" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!loanAmount || !loanTerm}
                  onClick={() => setSubmitCount(submitCount + 1)}
                >
                  Submit
                </Button>
              </Flex>
            </SpaceChildren>
          </form>
        </>
      )}
    </Box>
  )
}

export default LoanForm
