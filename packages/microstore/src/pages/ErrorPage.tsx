import { ErrorContainer } from "#components/composite/ErrorContainer"

const Page404 = () => {
  return (
    <ErrorContainer
      errorCode="404"
      errorMessage="This store is not accessible."
    />
  )
}

export default Page404
