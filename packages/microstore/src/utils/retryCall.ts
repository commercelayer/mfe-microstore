import retry from "async-retry"

type FetchResource<T> = {
  /**
   * Data returned from the promise once it has been fulfilled.
   */
  object: T | undefined
  /**
   * Indicates if the async operation has been resolved or not.
   */
  success: boolean
  /**
   * When `true` it means that the operation has failed without attempting any retries.
   * This because the error returned matched one of the not-retriable conditions (eg: 401).
   */
  bailed?: boolean
}

const retries = 3

/**
 * Tries to re-execute `n` times an async operation passed as argument, in case it's rejected.
 * @param f - The original async function we need to call
 * @returns the `FetchResource<T>` object containing the resolved data and the status of requests.
 */
export const retryCall = async <T>(
  f: () => Promise<T>
): Promise<FetchResource<T> | undefined> => {
  return await retry(
    async (_, attempt) => {
      try {
        return {
          object: await f(),
          success: true,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // sdk return sa structured object in case of api error
        // we assume we hit a not-retriable error when the error object returned has no keys
        const isNotRetryiable =
          error.status === 401 || !Object.keys(error).length
        if (isNotRetryiable) {
          return {
            object: undefined,
            success: false,
            bailed: true,
          }
        }

        if (attempt === retries + 1) {
          return {
            object: undefined,
            success: false,
          }
        }

        throw error
      }
    },
    {
      retries,
    }
  )
}
