export function extractErrorMessage(error: any): string {
    return (
        error?.error?.detail?.message ||
        error?.detail?.message ||
        error?.error?.detail ||
        error?.detail ||
        'Unexpected error'
    );
}
