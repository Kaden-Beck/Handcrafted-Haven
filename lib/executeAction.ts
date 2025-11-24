import { isRedirectError } from 'next/dist/client/components/redirect-error';

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = 'The action was successful',
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    // Log the error for debugging
    console.error('Error executing action:', error);
    // Return a more specific error message if available
    return {
      success: false,
      message:
        error instanceof Error
          ? `Action failed: ${error.message}`
          : 'An error has occurred during executing the action',
    };
  }
};

export { executeAction };
