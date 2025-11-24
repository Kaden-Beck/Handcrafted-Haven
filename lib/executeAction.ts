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
      message: 'An error occurred while executing the action. Please try again later.',
    };
  }
};

export { executeAction };
